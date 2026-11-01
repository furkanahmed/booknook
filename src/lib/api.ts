const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper to make API requests with optional JWT token
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("booknook_auth_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(`API Error on ${endpoint}:`, error);
    return { success: false, message: error?.message || "Network request failed" };
  }
}
