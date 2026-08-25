"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Plus, ShieldCheck, UserCog, Users } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const emptyForm = { username: "", email: "", password: "", role: "viewer" };

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/admin");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
      return;
    }

    fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Failed to load users");
        setUsers(Array.isArray(payload) ? payload : []);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [router]);

  const createUser = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Failed to create user");

      setUsers((current) => [payload, ...current]);
      setForm(emptyForm);
      setSuccess(`${payload.username} was created and saved successfully.`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-workspace">
      <AdminSidebar onLogout={logout} />
      <div className="admin-main">
        <AdminHeader title="User management" onLogout={logout} />
        <main>
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[.18em] text-violet-600">Super admin</span>
              <h1 className="mt-2 text-3xl font-bold text-gray-950">Users & access</h1>
              <p className="mt-1 text-sm text-gray-500">Create persistent dashboard accounts and assign the right access level.</p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700">
              <ShieldCheck size={16} /> Protected workspace
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
            <Card className="overflow-hidden">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Directory</p><h2 className="mt-1 text-xl font-semibold">Saved users</h2></div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600"><Users size={14} /> {users.length}</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="grid min-h-56 place-items-center"><Loader2 className="animate-spin text-violet-600" /></div>
                ) : error && users.length === 0 ? (
                  <div className="p-8 text-sm text-red-600">{error}</div>
                ) : users.length === 0 ? (
                  <div className="p-10 text-center text-sm text-gray-500">No users have been created yet.</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <div key={user.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gray-950 text-sm font-bold text-white">{user.username.slice(0, 2).toUpperCase()}</span>
                          <div className="min-w-0"><strong className="block truncate text-sm text-gray-950">{user.username}</strong><span className="block truncate text-xs text-gray-500">{user.email}</span></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold capitalize text-violet-700">{user.role.replace("_", " ")}</span>
                          <span className={`h-2.5 w-2.5 rounded-full ${user.active ? "bg-emerald-500" : "bg-gray-300"}`} title={user.active ? "Active" : "Inactive"} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="h-fit xl:sticky xl:top-24">
              <CardHeader><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-700"><UserCog size={19} /></span><div><p className="text-xs font-semibold uppercase tracking-wider text-gray-400">New account</p><h2 className="text-lg font-semibold">Create user</h2></div></div></CardHeader>
              <CardContent>
                <form onSubmit={createUser} className="space-y-4">
                  <label className="block text-xs font-semibold text-gray-600">Username<input required minLength={3} value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100" placeholder="e.g. content.manager" /></label>
                  <label className="block text-xs font-semibold text-gray-600">Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100" placeholder="name@company.com" /></label>
                  <label className="block text-xs font-semibold text-gray-600">Temporary password<div className="relative mt-2"><input required minLength={8} type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-11 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100" placeholder="Minimum 8 characters" /><button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
                  <label className="block text-xs font-semibold text-gray-600">Role<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"><option value="viewer">Viewer</option><option value="editor">Editor</option><option value="admin">Administrator</option></select></label>
                  {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">{error}</p>}
                  {success && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700">{success}</p>}
                  <Button type="submit" disabled={saving} className="w-full rounded-xl bg-gray-950 py-6 hover:bg-violet-700">{saving ? <Loader2 size={17} className="mr-2 animate-spin" /> : <Plus size={17} className="mr-2" />}{saving ? "Creating user..." : "Create and save user"}</Button>
                  <p className="text-[11px] leading-relaxed text-gray-400">Passwords are hashed before storage and are never returned by the API.</p>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
