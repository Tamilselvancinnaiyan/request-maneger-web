const API_URL = import.meta.env.VITE_SERVER_URL;

export async function apiRequest(path, method = "GET", body, token) {
  console.log('import.meta.env.SERVER_URL',   import.meta.env.VITE_SERVER_URLcc)
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
}
