// Service/auth.js
import apiClient from "./apiClient";

export const LoginApi = async (credentials) => {
  try {
    console.log("API called with credentials:", credentials);
    const response = await apiClient.post("/auth/login", credentials);
    return response; 
  } catch (error) {
    console.error("Login API error:", error);
    throw error; 
  }
};
