"use client";

import { useState, useRef } from "react";
import {
  Image,
  X,
  Plus,
  Link2,
  AlertCircle,
  Upload,
  Loader2,
} from "lucide-react";

/**
 * Reusable Image URL Input for admin forms.
 * Supports single image mode and gallery (multi-image) mode.
 * Allows both URL pasting and file browsing/uploading.
 */
export default function ImageUrlInput({
  label = "Image URL",
  value = "",
  onChange,
  placeholder = "https://example.com/image.jpg",
  gallery = false,
  galleryValues = [],
  onGalleryChange,
}) {
  const [imageError, setImageError] = useState(false);
  const [galleryInput, setGalleryInput] = useState("");
  const [galleryErrors, setGalleryErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);

  // Convert file to base64 data URL
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        reject(new Error("Please select an image file"));
        return;
      }
      // Limit to 5MB
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error("Image must be under 5MB"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  // Handle single file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      onChange(base64);
      setImageError(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      // Reset input so same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle gallery file upload (multiple files)
  const handleGalleryFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const base64Images = await Promise.all(
        files.map((file) => fileToBase64(file)),
      );
      onGalleryChange([...galleryValues, ...base64Images]);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      if (galleryFileInputRef.current) galleryFileInputRef.current.value = "";
    }
  };

  // Single image mode
  if (!gallery) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          <span className="flex items-center gap-2">
            <Image size={14} />
            {label}
          </span>
        </label>
        <div className="space-y-3">
          {/* URL Input + Browse Button */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link2
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={16}
              />
              <input
                type="url"
                value={value && !value.startsWith("data:") ? value : ""}
                onChange={(e) => {
                  onChange(e.target.value);
                  setImageError(false);
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-all"
                placeholder={placeholder}
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              Browse
            </button>
          </div>

          {/* Preview */}
          {value && (
            <div className="relative group">
              <div className="relative w-full h-48 bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                {imageError ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <AlertCircle size={24} className="mb-2" />
                    <span className="text-sm">Failed to load image</span>
                  </div>
                ) : (
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setImageError(false);
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
              {value.startsWith("data:") && (
                <span className="absolute bottom-2 left-2 text-xs bg-primary-600/80 text-white px-2 py-0.5 rounded">
                  Uploaded
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Gallery (multi-image) mode
  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      onGalleryChange([...galleryValues, galleryInput.trim()]);
      setGalleryInput("");
    }
  };

  const removeGalleryImage = (index) => {
    const updated = galleryValues.filter((_, i) => i !== index);
    onGalleryChange(updated);
    const updatedErrors = { ...galleryErrors };
    delete updatedErrors[index];
    setGalleryErrors(updatedErrors);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        <span className="flex items-center gap-2">
          <Image size={14} />
          {label}
        </span>
      </label>

      {/* Add new image - URL input + Browse */}
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <Link2
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
          <input
            type="url"
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addGalleryImage();
              }
            }}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-all"
            placeholder="Paste image URL and click Add"
          />
        </div>
        <button
          type="button"
          onClick={addGalleryImage}
          className="flex items-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
        >
          <Plus size={16} />
          Add
        </button>
        <input
          ref={galleryFileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryFileUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => galleryFileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Upload size={16} />
          )}
          Browse
        </button>
      </div>

      {/* Gallery previews */}
      {galleryValues.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryValues.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-32 bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                {galleryErrors[index] ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <AlertCircle size={20} className="mb-1" />
                    <span className="text-xs">Failed to load</span>
                  </div>
                ) : (
                  <img
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={() =>
                      setGalleryErrors((prev) => ({ ...prev, [index]: true }))
                    }
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute top-1.5 right-1.5 w-7 h-7 bg-red-500/80 hover:bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
              <span className="absolute bottom-1.5 left-1.5 text-xs bg-black/60 text-white px-2 py-0.5 rounded">
                {url.startsWith("data:") ? "[img]" : "[url]"} {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {galleryValues.length === 0 && (
        <p className="text-sm text-gray-600 italic">
          No gallery images added yet
        </p>
      )}
    </div>
  );
}
