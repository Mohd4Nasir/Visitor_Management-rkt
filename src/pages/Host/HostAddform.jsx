import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaPlus,
  FaUser,
  FaUserTie,
  FaIdBadge,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { createHost, getDepartments, getRoles } from "../../Service/userService";
import { Navigate, useNavigate } from "react-router-dom";

function HostAddForm() {
  const [hostData, setHostData] = useState({
    userName: "",
    email: "",
    mobileNumber: "",
    employeeCode: "",
    roleId: 0,
    departmentId: 0,
    password: "",
    isActive: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoles();
        console.log("Roles fetched:", res);
        setRoles(res?.data || []);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await getDepartments();
        console.log("Departments fetched:", res);
        setDepartments(res?.data || []);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchRoles();
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHostData({
      ...hostData,
      [name]:
        name === "roleId" || name === "departmentId"
          ? Number(value) // convert to number
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Host Data Submitted:", hostData);

    setIsSubmitted(true);
    createHost(hostData).then((res) => {
      console.log("Response from API:", res);
    });
    Navigate("/hosts");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl border bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-[#4FB7B3] p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPlus />
          </div>
          <h2 className="text-2xl font-bold">Add New User</h2>
          <p className="text-blue-100 mt-2">Please fill in the host details below</p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-50 p-4 flex items-center">
            <div className="bg-green-100 p-2 rounded-full">
              <FaCheckCircle className="text-green-500 text-xl" />
            </div>
            <div className="ml-3">
              <h3 className="text-green-800 font-medium">Success!</h3>
              <p className="text-green-600 text-sm">Host information has been saved.</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-black" />
                </div>
                <input
                  type="text"
                  name="userName"
                  value={hostData.userName}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-gray-300 text-black bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-black" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={hostData.email}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-gray-300 text-black bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-black" />
                </div>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={hostData.mobileNumber}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-gray-300 text-black bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* Employee Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdBadge className="text-black" />
                </div>
                <input
                  type="text"
                  name="employeeCode"
                  value={hostData.employeeCode}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-gray-300 text-black bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter employee code"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 mt-5 flex items-center pointer-events-none">
                  <FaUserTie className="text-black" />
                </div>
              </div>
              <select
                name="roleId"
                value={hostData.roleId}
                onChange={handleChange}
                className="pl-10 w-full rounded-lg border border-gray-300 text-black bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value={0}>Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-black" />
                </div>
                <select
                  name="departmentId"
                  value={hostData.departmentId}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-gray-300 text-black bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value={0}>Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-black" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={hostData.password}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-gray-300 text-black bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {/* Employee Active */}
            <div className="relative text-black">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee IsActive
              </label>
              {hostData.isActive ? (
                <FaCheckCircle className="absolute left-3 inset-y-0 my-auto mt-8.5 text-green-500 pointer-events-none" />
              ) : (
                <FaTimesCircle className="absolute left-3 inset-y-0 my-auto mt-8.5 text-red-500 pointer-events-none" />
              )}
              <select
                name="isActive"
                value={hostData.isActive}
                onChange={(e) =>
                  setHostData({ ...hostData, isActive: e.target.value === "true" })
                }
                className="pl-10 w-full rounded-lg border border-gray-300 text-black bg-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-[#4FB7B3] text-white py-3 rounded-lg font-medium hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                <i className="fas fa-save mr-2"></i>
                Save User Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HostAddForm;
