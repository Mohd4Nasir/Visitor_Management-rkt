import apiClient from "./apiClient";

// GET all hosts
export const getHosts = async () => {
  return await apiClient.get("/users");
};

export const getRoles = () => apiClient.get("/roles");
export const getDepartments = () => apiClient.get("/departments");
// GET single host
export const getHostById = async (id) => {
  return await apiClient.get(`/users/${id}`);
};

// CREATE host
export const createHost = async (hostData) => {
  return await apiClient.post("/users", hostData);
};

// UPDATE host
export const updateHost = async (id, hostData) => {
  return await apiClient.put(`/users/${id}`, hostData);
};

// DELETE host
export const deleteHost = async (id) => {
  return await apiClient.delete(`/users/${id}`);
};
