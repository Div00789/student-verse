# How to Generate Muskan Kawatra's 4K/1080p AI Avatar MP4 Video

This guide explains how to produce the final photorealistic MP4 video with high-precision lip synchronization using the assets in this folder:
- **Reference Photo**: `video/muskan-kawatra.jpg`
- **Verbatim Script**: `video/script.txt`
- **Phonetic SSML Audio Script**: `video/script_ssml.xml`
- **Interactive Visual Preview**: `video/preview.html`

---

## Option 1: HeyGen (Recommended for Ultra-Realistic Talking Photo & Natural Lipsync)

1. Open [HeyGen.com](https://app.heygen.com).
2. Click **Create Video** -> Select **16:9 Landscape**.
3. Under **Photo Avatar**, click **Upload Talking Photo** and upload [`video/muskan-kawatra.jpg`](file:///d:/heistproof.ai/StudentVerse/video/muskan-kawatra.jpg).
4. In the **Text Script** panel:
   - Paste the verbatim text from [`video/script.txt`](file:///d:/heistproof.ai/StudentVerse/video/script.txt).
5. In the **Voice Selection**:
   - Choose **English (India)** -> Select a natural female voice (such as **Swara**, **Aditi**, or **Shreya**).
   - Set speed to **0.95x** (118–122 WPM) for clear educational delivery.
6. Under **Overlays / Captions**:
   - Turn on **Auto Captions** (Font: *Poppins*, White text with dark backing).
   - Add a lower-third banner for Scene 1 (0s–12s):
     - **Title**: Muskan Kawatra
     - **Subtitle**: Digital Marketing Trainer &bull; 5+ Years Industry Experience
7. Click **Submit / Export** (Select **1080p** or **4K Ultra HD**).
8. Save the exported MP4 to [`video/muskan_kawatra_intro.mp4`](file:///d:/heistproof.ai/StudentVerse/video).

---

## Option 2: D-ID Creative Reality Studio

1. Open [studio.d-id.com](https://studio.d-id.com).
2. Click **Create Video**.
3. Click **Add Presenter** and upload [`video/muskan-kawatra.jpg`](file:///d:/heistproof.ai/StudentVerse/video/muskan-kawatra.jpg).
4. In the Script tab on the right:
   - Select Language: **English (India)**.
   - Voice: **Neerja (Neural)** or **Kavya**.
   - Paste the exact text from [`video/script.txt`](file:///d:/heistproof.ai/StudentVerse/video/script.txt).
5. Click **Generate Video**.
6. Download the resulting MP4 into the [`video/`](file:///d:/heistproof.ai/StudentVerse/video) folder.

---

## Option 3: Runway Gen-3 Alpha (Cinematic Camera Push & Ambient Studio)

1. Open [runwayml.com](https://runwayml.com) -> Gen-3 Alpha Video.
2. Select **Image to Video**.
3. Upload [`video/muskan-kawatra.jpg`](file:///d:/heistproof.ai/StudentVerse/video/muskan-kawatra.jpg) as the initial frame.
4. Prompt:
   ```text
   A professional Indian female digital marketing trainer sitting in an elegant modern recording studio with soft blue and warm ambient lighting. Eye-level camera, subtle eye contact and natural breathing, speaking directly to the camera with realistic lip synchronization and confident expressions, 4k resolution, cinematic lighting, photorealistic.
   ```
5. Combine the generated video with the voiceover track generated from [`video/script_ssml.xml`](file:///d:/heistproof.ai/StudentVerse/video/script_ssml.xml) using ElevenLabs.
