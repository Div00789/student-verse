// Bidirectional mapping between frontend lesson codes ("l-1-1") and database UUIDs
export const CODE_TO_UUID: Record<string, string> = {
  "l-1-1": "f24ba563-0ac7-450f-bb3f-e8214a074a81",
  "l-1-2": "8f84ad0c-aa83-4033-84cf-7e570b3c888a",
  "l-1-3": "3baec439-8036-4506-b344-bfb76a04a63f",
  "l-1-4": "e49a6333-e20b-4af3-9b65-58ab69417157",
  "l-1-5": "74e44891-0b03-43e5-8333-be1ebc4a4abc",
  "l-1-6": "de911742-198f-42e4-9114-e81d5381787e",
  "l-2-1": "0f737376-ee3a-4cfe-8a7c-0095193ba3a9",
  "l-2-2": "74f355f1-0060-45ef-8007-2209ad96c37f",
  "l-2-3": "931ea199-82cb-4458-a6df-4d67575cd671",
  "l-2-4": "1a81f69e-0558-4e04-8fb1-ec29be6079c4",
  "l-3-1": "a4ec3966-b289-4532-9f32-e31360345ba7",
  "l-3-2": "d395f8ee-9c16-4d36-8062-7692cc622453",
  "l-3-3": "418da5eb-3f42-4b29-a486-8324028557b5",
  "l-3-4": "80415166-c404-4a9b-a5ff-c21cc519652a",
  "l-4-1": "fadf4525-1255-41df-9c48-ce1287924122",
  "l-4-2": "b919050d-74e1-441f-8bf3-06fc37921021",
  "l-4-3": "d562ef05-3eac-4635-a848-c91684a94b2c",
  "l-5-1": "ec10db49-c279-4ecf-94bd-613dd6eef5bb",
  "l-5-2": "971fc8e3-4e3b-42f9-8b2b-96a4d229ab73",
  "l-5-3": "5960ad0d-76eb-4463-a53d-cfbc39bf42b9",
  "l-6-1": "d0dbdb20-bde6-4d88-b058-d0e87baf1751",
  "l-6-2": "d05a3f46-0ada-431e-bca8-d7403e9580b1",
  "l-6-3": "ecf4de94-b975-44e7-b8b7-24da080a1c4e",
  "l-7-1": "28911c4b-e12d-4c95-9210-77ae38cfe4b7",
  "l-7-2": "393002c1-efe6-4d01-aa4f-26cd6a5816ac",
  "l-8-1": "15550476-2549-4f22-afca-354523b6fa1d",
  "l-8-2": "3a61eff5-5065-4f23-a544-d34e3a0a1368",
  "l-9-1": "7f42fb97-b880-4d14-85cd-b1a00ea7d7bf",
  "l-9-2": "d1935a3c-f38a-4a23-a617-76803ee553d7",
  "l-10-1": "4d953b25-dff9-4bf4-88fa-68f290513e71",
  "l-10-2": "e2529ee5-e63a-4eab-afe1-8557f747068a",
  "l-11-1": "c92640e3-3e0b-4e73-b786-f1162bf5a612",
  "l-11-2": "c4d3911c-8ce9-4081-9d81-efceadfbf883",
  "l-12-1": "a0278dbb-a0a7-4922-9af1-2c1d494263af",
  "l-12-2": "c5689d3f-3239-4baf-bce6-1b575cf4a7ea",
  "l-13-1": "ddb04a61-d02e-4130-9685-6b7048cff267",
  "l-13-2": "0070c41a-8869-4f2f-8a4d-a7cb08109b53",
  "l-13-3": "9e851666-2698-453e-ba8e-be81ca633c77",
  "l-14-1": "3bbcfad7-ca82-4dfb-8d2f-e417b8decefe",
  "l-14-2": "e1c7c6ef-4754-4589-8151-87a37847a504",
  "l-14-3": "e395078a-5d14-4aee-91ab-b337360dd60f",
};

export const UUID_TO_CODE: Record<string, string> = {};
for (const [code, uuid] of Object.entries(CODE_TO_UUID)) {
  UUID_TO_CODE[uuid] = code;
}

export function resolveToDbLessonId(id: string): string {
  return CODE_TO_UUID[id] || id;
}

export function resolveToFrontendLessonCode(id: string): string {
  return UUID_TO_CODE[id] || id;
}
