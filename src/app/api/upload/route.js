import { NextResponse } from "next/server";

/**
 * Cloudinary Upload API Route
 * Handles image uploads to Cloudinary cloud storage
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be under 10MB" },
        { status: 400 }
      );
    }

    // Verify environment variables
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Missing Cloudinary credentials");
      return NextResponse.json(
        { error: "Cloudinary configuration error. Please contact administrator." },
        { status: 500 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Generate timestamp and signature for Cloudinary
    const timestamp = Math.round(new Date().getTime() / 1000);
    const crypto = require("crypto");

    // Create signature - parameters must be sorted alphabetically
    const signatureString = `folder=siteera&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    // Upload to Cloudinary
    const uploadFormData = new FormData();
    uploadFormData.append("file", base64File);
    uploadFormData.append("timestamp", timestamp.toString());
    uploadFormData.append("api_key", apiKey);
    uploadFormData.append("signature", signature);
    uploadFormData.append("folder", "siteera"); // Optional: organize uploads in a folder

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const uploadResponse = await fetch(cloudinaryUrl, {
      method: "POST",
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Cloudinary upload error:", errorText);
      
      // Try to parse as JSON, fallback to text
      let errorData;
      let errorMessage = "Failed to upload image to cloud storage";
      
      try {
        errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (e) {
        // If not JSON, use the raw text
        errorMessage = errorText || "Upload failed";
      }
      
      return NextResponse.json(
        { error: errorMessage, details: errorData || errorText },
        { status: uploadResponse.status }
      );
    }

    const uploadData = await uploadResponse.json();

    return NextResponse.json({
      success: true,
      url: uploadData.secure_url,
      public_id: uploadData.public_id,
      width: uploadData.width,
      height: uploadData.height,
      format: uploadData.format,
      bytes: uploadData.bytes,
      created_at: uploadData.created_at,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", message: error.message },
      { status: 500 }
    );
  }
}
