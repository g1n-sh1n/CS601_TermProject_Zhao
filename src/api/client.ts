import type { ContactInput, ContactMessage } from "../types.ts";

// Base URL of the Node API (server/). Set VITE_API_URL in .env.local for local dev
// and as a GitHub repo variable for the deployed site.
export const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

// Small wrapper around fetch: sends/receives JSON and turns API errors into Error objects
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers }
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    const error = new Error(body?.error ?? `Request failed (${response.status})`) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

// ---------- Contact messages (CRUD) ----------

// Create
export function sendMessage(data: ContactInput): Promise<{ message: ContactMessage; editToken: string }> {
  return request("/api/messages", { method: "POST", body: JSON.stringify(data) });
}

// Read
export function getMessage(id: number, token: string): Promise<ContactMessage> {
  return request(`/api/messages/${id}`, { headers: { "X-Edit-Token": token } });
}

// Update
export function updateMessage(id: number, data: ContactInput, token: string): Promise<ContactMessage> {
  return request(`/api/messages/${id}`, {
    method: "PUT",
    headers: { "X-Edit-Token": token },
    body: JSON.stringify(data)
  });
}

// Delete
export function deleteMessage(id: number, token: string): Promise<void> {
  return request(`/api/messages/${id}`, { method: "DELETE", headers: { "X-Edit-Token": token } });
}
