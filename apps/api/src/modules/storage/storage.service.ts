import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private supabase: SupabaseClient | null = null;

  public readonly BUCKET_EMPLOYEE = 'employee-documents';
  public readonly BUCKET_EMPLOYER = 'employer-documents';

  onModuleInit() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const secretKey =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && secretKey) {
      try {
        this.supabase = createClient(supabaseUrl, secretKey, {
          auth: { persistSession: false },
        });
        this.logger.log('Supabase client initialized successfully.');
        this.ensureBuckets();
      } catch (err: any) {
        this.logger.warn(`Supabase client initialization deferred: ${err.message}`);
      }
    } else {
      this.logger.warn('SUPABASE_URL not configured. Supabase Storage runs in mock/deferred mode.');
    }
  }

  /**
   * Automatically creates the two required private buckets if they don't already exist
   */
  async ensureBuckets() {
    if (!this.supabase) return;

    const buckets = [this.BUCKET_EMPLOYEE, this.BUCKET_EMPLOYER];
    for (const bucketName of buckets) {
      try {
        const { data, error } = await this.supabase.storage.getBucket(bucketName);
        if (error && error.message.includes('not found')) {
          this.logger.log(`Bucket '${bucketName}' does not exist. Creating private bucket...`);
          const { error: createError } = await this.supabase.storage.createBucket(bucketName, {
            public: false,
            fileSizeLimit: 10485760, // 10MB limit
            allowedMimeTypes: ['application/pdf', 'image/png', 'image/jpeg', 'application/zip'],
          });
          if (createError) {
            this.logger.error(`Failed to create bucket '${bucketName}': ${createError.message}`);
          } else {
            this.logger.log(`Bucket '${bucketName}' successfully created.`);
          }
        } else if (!error) {
          this.logger.log(`Bucket '${bucketName}' verified and ready.`);
        }
      } catch (err: any) {
        this.logger.warn(`Could not verify bucket '${bucketName}': ${err.message}`);
      }
    }
  }

  /**
   * Upload an employee/student document (resumes, project capstones, assignment files)
   */
  async uploadEmployeeDocument(fileName: string, fileBuffer: Buffer, mimeType: string) {
    if (!this.supabase) {
      return {
        success: true,
        mock: true,
        bucket: this.BUCKET_EMPLOYEE,
        path: `mock/${fileName}`,
        message: 'File recorded locally. Connect SUPABASE_URL to persist to cloud.',
      };
    }

    const { data, error } = await this.supabase.storage
      .from(this.BUCKET_EMPLOYEE)
      .upload(`students/${Date.now()}_${fileName}`, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed to ${this.BUCKET_EMPLOYEE}: ${error.message}`);
    }

    return {
      success: true,
      bucket: this.BUCKET_EMPLOYEE,
      path: data.path,
    };
  }

  /**
   * Upload an employer verification document (business registration, tax document, job specs)
   */
  async uploadEmployerDocument(fileName: string, fileBuffer: Buffer, mimeType: string) {
    if (!this.supabase) {
      return {
        success: true,
        mock: true,
        bucket: this.BUCKET_EMPLOYER,
        path: `mock/${fileName}`,
        message: 'File recorded locally. Connect SUPABASE_URL to persist to cloud.',
      };
    }

    const { data, error } = await this.supabase.storage
      .from(this.BUCKET_EMPLOYER)
      .upload(`employers/${Date.now()}_${fileName}`, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed to ${this.BUCKET_EMPLOYER}: ${error.message}`);
    }

    return {
      success: true,
      bucket: this.BUCKET_EMPLOYER,
      path: data.path,
    };
  }

  /**
   * Generate a secure, time-limited signed URL for viewing private documents
   */
  async getSignedUrl(bucketName: string, path: string, expiresInSeconds: number = 3600) {
    if (!this.supabase) {
      return {
        signedUrl: `https://mock.storage.studentverse.com/${bucketName}/${path}`,
      };
    }

    const { data, error } = await this.supabase.storage
      .from(bucketName)
      .createSignedUrl(path, expiresInSeconds);

    if (error) {
      throw new Error(`Failed to create signed URL for ${path}: ${error.message}`);
    }

    return data;
  }
}
