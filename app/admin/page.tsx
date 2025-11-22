// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Report = {
  id: string;
  title: string;
  subtitle?: string;
  fairValue?: string;
  upsideDownside?: string;
  driveLink?: string;
  excelLink?: string;
  createdAt: string;
};

const AUTH_KEY = "valuation_admin_auth_v1";

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [reports, setReports] = useState<Report[]>([]);

  const emptyForm = {
    title: "",
    subtitle: "",
    fairValue: "",
    upsideDownside: "",
    driveLink: "",
    excelLink: "",
  };
  const [form, setForm] = useState<any>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const val = typeof window !== "undefined" ? localStorage.getItem(AUTH_KEY) : null;
    setIsAuthed(!!val);
    setLoading(false);
    if (val) {
      fetchReports();
    }
  }, []);

  async function fetchReports() {
    try {
      const res = await fetch("/api/reports");
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "failed" }));
        setMessage(err?.error || "Failed to load reports");
        setTimeout(() => setMessage(null), 1500);
        return;
      }
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("fetchReports error:", e);
      setMessage("Network error");
      setTimeout(() => setMessage(null), 1500);
    }
  }

  async function login(username: string, password: string) {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.success) {
        localStorage.setItem(AUTH_KEY, "1");
        setIsAuthed(true);
        fetchReports();
        setMessage("Logged in");
        setTimeout(() => setMessage(null), 1500);
      } else {
        const errMsg = data?.error || "Invalid credentials";
        setMessage(errMsg);
        setTimeout(() => setMessage(null), 2000);
      }
    } catch (err) {
      console.error("login error:", err);
      setMessage("Network error");
      setTimeout(() => setMessage(null), 2000);
    }
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthed(false);
  }

  async function createReport(e?: any) {
    e?.preventDefault();
    if (!form.title?.trim()) {
      setMessage("Title required");
      setTimeout(() => setMessage(null), 1500);
      return;
    }
    setSaving(true);
    const payload = { ...form };
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "failed" }));
        setMessage(err?.error || "Failed");
      } else {
        const newr = await res.json();
        setReports((p) => [newr, ...p]);
        setForm(emptyForm);
        setMessage("Created");
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 1200);
    }
  }

  function startEdit(r: Report) {
    setEditingId(r.id);
    setForm({
      title: r.title || "",
      subtitle: r.subtitle || "",
      fairValue: r.fairValue || "",
      upsideDownside: r.upsideDownside || "",
      driveLink: r.driveLink || "",
      excelLink: r.excelLink || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveEdit(e?: any) {
    e?.preventDefault();
    if (!editingId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/reports/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "failed" }));
        setMessage(err?.error || "Failed");
      } else {
        const updated = await res.json();
        setReports((p) => p.map((x) => (x.id === updated.id ? updated : x)));
        setEditingId(null);
        setForm(emptyForm);
        setMessage("Saved");
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 1200);
    }
  }

  async function deleteReport(id: string) {
    if (!confirm("Delete this report?")) return;
    try {
      const res = await fetch(`/api/reports/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "failed" }));
        setMessage(err?.error || "Failed to delete");
      } else {
        setReports((p) => p.filter((r) => r.id !== id));
        setMessage("Deleted");
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setTimeout(() => setMessage(null), 1200);
    }
  }

  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  if (loading) return <div className="p-8">Loading...</div>;

  if (!isAuthed) {
    return (
      <main className="min-h-screen bg-[#0f1724] text-slate-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white/6 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <p className="text-sm text-slate-200 mb-6">Enter credentials to continue.</p>

          <div className="space-y-3">
            <input
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              placeholder="username"
              className="w-full px-4 py-2 rounded bg-white/5 border border-white/8"
            />

            {/* password row with show/hide button */}
            <div className="relative">
              <input
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded bg-white/5 border border-white/8 pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm rounded bg-white/6"
              >
                {showPassword ? " Hide" : " Show"}
              </button>
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => login(loginUser.trim(), loginPass)}
                className="px-4 py-2 rounded bg-[#d7b37c] text-black font-semibold"
              >
                Login
              </button>

            
            </div>

            {message && <div className="text-sm text-amber-100 mt-2">{message}</div>}
          </div>
        </div>
      </main>
    );
  }

  // Admin panel UI remains exactly as you have it
  return (
    <main className="min-h-screen bg-[#0f1724] text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold">Admin — Reports</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-slate-300 hover:text-white">View site</Link>
            <button onClick={logout} className="px-3 py-1 rounded bg-white/6">Logout</button>
          </div>
        </div>

        {/* CREATE / EDIT FORM */}
        <div className="bg-white/5 border border-white/8 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit Report" : "Create Report"}</h2>

          <form onSubmit={(e) => (editingId ? saveEdit(e) : createReport(e))} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-300 mb-1">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 rounded bg-white/6 border border-white/8" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-slate-300 mb-1">Subtitle</label>
              <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full px-4 py-2 rounded bg-white/6 border border-white/8" />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Fair Value</label>
              <input value={form.fairValue} onChange={(e) => setForm({ ...form, fairValue: e.target.value })}
                className="w-full px-4 py-2 rounded bg-white/6 border border-white/8" />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Upside / Downside</label>
              <input value={form.upsideDownside} onChange={(e) => setForm({ ...form, upsideDownside: e.target.value })}
                className="w-full px-4 py-2 rounded bg-white/6 border border-white/8" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-slate-300 mb-1">Summary link</label>
              <input value={form.driveLink} onChange={(e) => setForm({ ...form, driveLink: e.target.value })}
                placeholder="https://drive.google.com/..."
                className="w-full px-4 py-2 rounded bg-white/6 border border-white/8" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-slate-300 mb-1">Excel / Sheet Link</label>
              <input value={form.excelLink} onChange={(e) => setForm({ ...form, excelLink: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 rounded bg-white/6 border border-white/8" />
            </div>

            <div className="md:col-span-2 flex gap-3 items-center">
              <button type="submit" disabled={saving}
                className="px-4 py-2 rounded bg-[#d7b37c] text-black font-semibold">
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Report"}
              </button>

              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }}
                  className="px-3 py-2 rounded border border-white/8">Cancel</button>
              )}

              <div className="text-sm text-slate-300 ml-auto">{message}</div>
            </div>
          </form>
        </div>

        {/* REPORTS LIST */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Existing Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.length === 0 ? (
              <div className="text-slate-400 p-4">No reports yet.</div>
            ) : (
              reports.map((r) => (
                <div key={r.id} className="bg-white/6 border border-white/8 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-white">{r.title}</div>
                      {r.subtitle && <div className="text-sm text-slate-300">{r.subtitle}</div>}
                      <div className="mt-2 text-xs text-slate-400">Published: {new Date(r.createdAt).toLocaleString()}</div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => startEdit(r)} className="px-3 py-1 bg-white/6 rounded">Edit</button>
                      <button onClick={() => deleteReport(r.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2 flex-wrap">
                    {r.driveLink && <a href={r.driveLink} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded bg-[#d7b37c] text-[#0f1724]">Drive</a>}
                    {r.excelLink && <a href={r.excelLink} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded border border-white/10 text-slate-100">Excel</a>}
                    {r.fairValue && <span className="text-xs text-slate-300 px-2 py-1 bg-white/5 rounded">Fair: {r.fairValue}</span>}
                    {r.upsideDownside && <span className="text-xs text-[#d7b37c] px-2 py-1 rounded">Upside: {r.upsideDownside}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
