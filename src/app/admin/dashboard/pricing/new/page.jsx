"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Package,
  Zap,
  Crown,
  Star,
  Sparkles,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function NewPricingPlan() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    price_min: "",
    price_max: "",
    price_display: "",
    features: [""],
    not_included: [""],
    badge: "",
    badge_color: "primary",
    button_text: "Get Started",
    button_link: "/contact",
    is_featured: false,
    is_popular: false,
    is_active: true,
    order: 0,
    icon: "package",
    gradient_from: "blue-500",
    gradient_to: "cyan-500",
  });

  const icons = [
    { value: "package", label: "Package", icon: Package },
    { value: "zap", label: "Zap", icon: Zap },
    { value: "crown", label: "Crown", icon: Crown },
    { value: "star", label: "Star", icon: Star },
    { value: "sparkles", label: "Sparkles", icon: Sparkles },
  ];

  const gradients = [
    { from: "blue-500", to: "cyan-500", label: "Blue to Cyan" },
    { from: "purple-500", to: "pink-500", label: "Purple to Pink" },
    { from: "orange-500", to: "red-500", label: "Orange to Red" },
    { from: "green-500", to: "emerald-500", label: "Green to Emerald" },
    { from: "indigo-500", to: "purple-500", label: "Indigo to Purple" },
  ];

  const badgeColors = [
    { value: "primary", label: "Primary (Blue)" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" },
    { value: "orange", label: "Orange" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Auto-generate slug from name
    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }));
    }

    // Auto-generate price display
    if (name === "price_min" || name === "price_max") {
      const min = name === "price_min" ? value : formData.price_min;
      const max = name === "price_max" ? value : formData.price_max;
      const display = max && max !== min ? `${min}K - ${max}K` : `${min}K`;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        price_display: display,
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures.length ? newFeatures : [""] });
  };

  const handleNotIncludedChange = (index, value) => {
    const newItems = [...formData.not_included];
    newItems[index] = value;
    setFormData({ ...formData, not_included: newItems });
  };

  const addNotIncluded = () => {
    setFormData({ ...formData, not_included: [...formData.not_included, ""] });
  };

  const removeNotIncluded = (index) => {
    const newItems = formData.not_included.filter((_, i) => i !== index);
    setFormData({ ...formData, not_included: newItems.length ? newItems : [""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price_min: parseInt(formData.price_min) || 0,
          price_max: formData.price_max ? parseInt(formData.price_max) : null,
          features: formData.features.filter((f) => f.trim()),
          not_included: formData.not_included.filter((f) => f.trim()),
          order: parseInt(formData.order) || 0,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create pricing plan");
      }

      router.push("/admin/dashboard/pricing");
    } catch (error) {
      console.error("Error creating pricing plan:", error);
      alert("Failed to create pricing plan. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin");
  };

  return (
    <div className="admin-workspace">
      <AdminSidebar onLogout={handleLogout} />

      <div className="admin-main">
        <AdminHeader title="New Pricing Plan" onLogout={handleLogout} />

        <main className="p-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Pricing
          </button>

          <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Basic Information
                  </h2>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Plan Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                          placeholder="e.g., Basic, Pro, Enterprise"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Slug
                        </label>
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                          placeholder="auto-generated"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Tagline
                      </label>
                      <input
                        type="text"
                        name="tagline"
                        value={formData.tagline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                        placeholder="e.g., Perfect for Small Businesses"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-none"
                        placeholder="Brief description of what this plan offers..."
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Pricing (in thousands NPR)
                  </h2>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Minimum Price (K) *
                      </label>
                      <input
                        type="number"
                        name="price_min"
                        value={formData.price_min}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                        placeholder="e.g., 50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Maximum Price (K)
                      </label>
                      <input
                        type="number"
                        name="price_max"
                        value={formData.price_max}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                        placeholder="Leave empty for fixed price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Display Text
                      </label>
                      <input
                        type="text"
                        name="price_display"
                        value={formData.price_display}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                        placeholder="e.g., 50K or 75K - 95K"
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                      Features Included
                    </h2>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Feature
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                          placeholder="Enter feature..."
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not Included */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                      Features Not Included (Optional)
                    </h2>
                    <button
                      type="button"
                      onClick={addNotIncluded}
                      className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.not_included.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleNotIncludedChange(index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                          placeholder="Feature not included..."
                        />
                        <button
                          type="button"
                          onClick={() => removeNotIncluded(index)}
                          className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Appearance */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Appearance
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Icon
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {icons.map((icon) => (
                          <button
                            key={icon.value}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, icon: icon.value })
                            }
                            className={`p-3 rounded-xl border transition-all ${
                              formData.icon === icon.value
                                ? "border-primary-500 bg-primary-500/20 text-primary-400"
                                : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
                            }`}
                          >
                            <icon.icon size={20} className="mx-auto" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Gradient Colors
                      </label>
                      <select
                        value={`${formData.gradient_from}-${formData.gradient_to}`}
                        onChange={(e) => {
                          const [from, to] = e.target.value.split("-").reduce(
                            (acc, part, i, arr) => {
                              if (i % 2 === 1) {
                                acc.push(`${arr[i - 1]}-${part}`);
                              }
                              return acc;
                            },
                            []
                          );
                          const selected = gradients.find(
                            (g) => `${g.from}-${g.to}` === e.target.value
                          );
                          if (selected) {
                            setFormData({
                              ...formData,
                              gradient_from: selected.from,
                              gradient_to: selected.to,
                            });
                          }
                        }}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                      >
                        {gradients.map((g) => (
                          <option key={`${g.from}-${g.to}`} value={`${g.from}-${g.to}`}>
                            {g.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        name="badge"
                        value={formData.badge}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                        placeholder="e.g., Most Popular"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Badge Color
                      </label>
                      <select
                        name="badge_color"
                        value={formData.badge_color}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                      >
                        {badgeColors.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Button Settings */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Button
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        name="button_text"
                        value={formData.button_text}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                        placeholder="Get Started"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Button Link
                      </label>
                      <input
                        type="text"
                        name="button_link"
                        value={formData.button_link}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                        placeholder="/contact"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-6">
                    Status & Order
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Display Order
                      </label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                      />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Active (Visible on website)</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_popular"
                        checked={formData.is_popular}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Mark as Popular</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-300">Featured (Highlighted card)</span>
                    </label>
                  </div>
                </div>

                {/* Save Button */}
                <motion.button
                  type="submit"
                  disabled={saving}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Create Plan
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
