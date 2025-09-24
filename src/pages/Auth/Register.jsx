import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("Admin"); // default Admin
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      alert(
        `Registration attempted:\nRole: ${role}\nName: ${name}\nGender: ${gender}\nMobile: ${mobile}\nEmail: ${email}`
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F9F8] to-[#CFF2F1] p-4">
      <div className="flex-grow flex items-center justify-center pb-14 px-4">
        {/* Main card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4FB7B3] to-[#4FB7B3] p-6 text-center">
            <h1 className="text-white text-3xl font-bold">Visitor Management</h1>
            <p className="text-white/90 mt-1">Create your account</p>
          </div>

          {/* Role Tabs */}
          <div className="flex justify-around bg-gray-100 px-2 py-3">
            {["Admin", "Visitor", "Host"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  role === r
                    ? "bg-[#4FB7B3] text-white shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="px-10 pt-8 pb-6">
            {/* Row 1: Name + Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="pl-4 pr-4 py-3 w-full text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4FB7B3] focus:ring-2 focus:ring-[#4FB7B3]/30 transition-all duration-300"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="pl-4 pr-4 py-3 w-full text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4FB7B3] focus:ring-2 focus:ring-[#4FB7B3]/30 transition-all duration-300"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Row 2: Mobile + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Mobile
                </label>
                <input
                  type="tel"
                  className="pl-4 pr-4 py-3 w-full text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4FB7B3] focus:ring-2 focus:ring-[#4FB7B3]/30 transition-all duration-300"
                  placeholder="9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="pl-4 pr-4 py-3 w-full text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4FB7B3] focus:ring-2 focus:ring-[#4FB7B3]/30 transition-all duration-300"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Row 3: Password + Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="pl-4 pr-4 py-3 w-full text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4FB7B3] focus:ring-2 focus:ring-[#4FB7B3]/30 transition-all duration-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="pl-4 pr-4 py-3 w-full text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4FB7B3] focus:ring-2 focus:ring-[#4FB7B3]/30 transition-all duration-300"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4FB7B3] to-[#4FB7B3] hover:from-[#3a8e8a] hover:to-[#3a8e8a] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>Register as {role}</>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-10 py-4 rounded-b-2xl text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to={"/"}
                className="font-semibold text-[#4FB7B3] hover:text-[#3a8e8a] transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
