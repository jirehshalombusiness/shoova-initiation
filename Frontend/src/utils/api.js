export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("adminToken");

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`
    }
  });
};