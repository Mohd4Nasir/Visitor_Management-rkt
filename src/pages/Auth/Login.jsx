import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginApi } from "../../Service/auth";
import { loginSuccess } from "../../Store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(localStorage.getItem("rememberedEmail") || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("rememberedEmail"));
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await LoginApi({ email, password });
      console.log("Login response:", response);

      if (response?.data?.data) {
        const { token, email: userEmail, role, userName, isActive } = response.data.data;
        // ✅ Save in Redux
        dispatch(
          loginSuccess({
            token,
            user: {
              email: userEmail,
              role,
              userName,
              isActive,
            },
          })
        );


        // ✅ Save token
        localStorage.setItem("authToken", token);

        // ✅ Remember email
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", userEmail);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // ✅ Navigate to dashboard via "/" route
        navigate("/");
      } else {
        alert("Login failed: No data returned from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Invalid credentials or server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F9F8] to-[#CFF2F1] p-4">
      <div className="flex-grow flex items-center justify-center pb-14 px-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg">
          <div className="bg-gradient-to-r from-[#4FB7B3] to-[#4FB7B3] p-6 text-center">
            <h1 className="text-white text-3xl font-bold">Visitor Management</h1>
            <p className="text-white/90 mt-1">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="px-10 pt-8 pb-6">
            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="pl-4 pr-4 py-3 w-full text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4FB7B3] focus:ring-2 focus:ring-[#4FB7B3]/30 transition-all duration-300"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold">
                  Password
                </label>
                <a href="#" className="text-xs text-[#4FB7B3] hover:text-[#3a8e8a] transition-colors duration-300 font-medium">
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                className="pl-4 pr-4 py-3 w-full text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4FB7B3] focus:ring-2 focus:ring-[#4FB7B3]/30 transition-all duration-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-6">
              <input
                id="remember"
                type="checkbox"
                className="mr-2 accent-[#4FB7B3]"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4FB7B3] to-[#4FB7B3] hover:from-[#3a8e8a] hover:to-[#3a8e8a] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>Sign in</>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-10 py-4 rounded-b-2xl text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <Link to="/contact-admin" className="font-semibold text-[#4FB7B3] hover:text-[#3a8e8a] transition-colors duration-300">
                Contact Administration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
