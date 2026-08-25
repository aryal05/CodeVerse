"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  DollarSign,
  Package,
  Zap,
  Crown,
  Search,
  MoreVertical,
  Check,
  X,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function PricingManagement() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const router = useRouter();

  // Icon mapping
  const iconMap = {
    package: Package,
    zap: Zap,
    crown: Crown,
    sparkles: Sparkles,
    star: Star,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
      return;
    }
    fetchPlans();
  }, [router]);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/pricing?all=true");
      const data = await res.json();
      setPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch pricing plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (plan) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/pricing/${plan.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_active: !plan.is_active }),
      });
      fetchPlans();
    } catch (error) {
      console.error("Failed to toggle plan status:", error);
    }
  };

  const handleTogglePopular = async (plan) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/pricing/${plan.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_popular: !plan.is_popular }),
      });
      fetchPlans();
    } catch (error) {
      console.error("Failed to toggle popular status:", error);
    }
  };

  const handleDelete = async () => {
    if (!planToDelete) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/pricing/${planToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      setPlanToDelete(null);
      fetchPlans();
    } catch (error) {
      console.error("Failed to delete plan:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin");
  };

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-workspace">
      <AdminSidebar onLogout={handleLogout} />

      <div className="admin-main">
        <AdminHeader title="Pricing Plans" onLogout={handleLogout} />

        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Pricing Management
              </h1>
              <p className="text-gray-500">
                Manage your pricing plans and packages
              </p>
            </div>

            <Link href="/admin/dashboard/pricing/new">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
              >
                <Plus size={18} />
                Add New Plan
              </motion.button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Plans Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-900 border border-gray-800 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : filteredPlans.length === 0 ? (
            <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-2xl">
              <DollarSign size={48} className="mx-auto mb-4 text-gray-700" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No Pricing Plans Found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? "No plans match your search"
                  : "Get started by creating your first pricing plan"}
              </p>
              {!searchQuery && (
                <Link href="/admin/dashboard/pricing/new">
                  <button className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                    Create First Plan
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan, index) => {
                const IconComponent = iconMap[plan.icon] || Package;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative bg-gray-900 border rounded-2xl overflow-hidden ${
                      plan.is_popular
                        ? "border-primary-500"
                        : "border-gray-800"
                    } ${!plan.is_active ? "opacity-60" : ""}`}
                  >
                    {/* Status Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {plan.is_popular && (
                        <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                      {!plan.is_active && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs font-medium rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>

                    {/* Action Menu */}
                    <div className="absolute top-4 right-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActionMenuOpen(
                              actionMenuOpen === plan.id ? null : plan.id
                            )
                          }
                          className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>

                        <AnimatePresence>
                          {actionMenuOpen === plan.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-10 overflow-hidden"
                            >
                              <Link
                                href={`/admin/dashboard/pricing/${plan.id}`}
                              >
                                <button className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2">
                                  <Edit2 size={14} />
                                  Edit Plan
                                </button>
                              </Link>
                              <button
                                onClick={() => handleToggleActive(plan)}
                                className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
                              >
                                {plan.is_active ? (
                                  <>
                                    <EyeOff size={14} />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Eye size={14} />
                                    Activate
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleTogglePopular(plan)}
                                className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
                              >
                                <Star
                                  size={14}
                                  className={
                                    plan.is_popular ? "fill-yellow-500" : ""
                                  }
                                />
                                {plan.is_popular
                                  ? "Remove Popular"
                                  : "Mark as Popular"}
                              </button>
                              <button
                                onClick={() => {
                                  setPlanToDelete(plan);
                                  setShowDeleteModal(true);
                                  setActionMenuOpen(null);
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                              >
                                <Trash2 size={14} />
                                Delete Plan
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Plan Content */}
                    <div className="p-6 pt-14">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${plan.gradient_from || "blue-500"} to-${plan.gradient_to || "cyan-500"} flex items-center justify-center`}
                          style={{
                            background: `linear-gradient(135deg, var(--tw-gradient-from, #3b82f6), var(--tw-gradient-to, #06b6d4))`,
                          }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {plan.name}
                          </h3>
                          <p className="text-sm text-gray-500">{plan.tagline}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-gray-500">NPR </span>
                        <span className="text-2xl font-bold text-white">
                          {plan.price_display}
                        </span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-400">
                          {(plan.features || []).length} features included
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>Order: {plan.order}</span>
                        <span>•</span>
                        <span>
                          {plan.badge || "No badge"}
                        </span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="px-6 py-4 border-t border-gray-800 flex gap-2">
                      <Link
                        href={`/admin/dashboard/pricing/${plan.id}`}
                        className="flex-1"
                      >
                        <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleToggleActive(plan)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                          plan.is_active
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {plan.is_active ? "Active" : "Inactive"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                Delete Pricing Plan?
              </h3>
              <p className="text-gray-400 text-center mb-6">
                Are you sure you want to delete &quot;{planToDelete?.name}&quot;?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
