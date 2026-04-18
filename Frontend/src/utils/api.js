export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // 🔥 Handle expired/invalid token globally
  if (res.status === 401) {
    console.warn("Unauthorized → logging out");
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  }

  return res;
};