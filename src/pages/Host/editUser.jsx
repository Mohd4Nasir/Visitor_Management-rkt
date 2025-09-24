import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaBriefcase,
  FaBuilding,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { getDepartments, getHostById, getRoles, updateHost } from "../../Service/userService";

function EditHost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobileNumber: "",
    employeeCode: "",
    roleId: 0,
    departmentId: 0,
    isActive: true,
  });

  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesRes, deptsRes, hostRes] = await Promise.all([
          getRoles(),
          getDepartments(),
          getHostById(id),
        ]);

        setRoles(rolesRes?.data || []);
        setDepartments(deptsRes?.data || []);

        const data = hostRes.data;
        setFormData({
          userName: data.userName || "",
          email: data.email || "",
          mobileNumber: data.mobileNumber || "",
          employeeCode: data.employeeCode || "",
          roleId: data.roleId || 0,
          departmentId: data.departmentId || 0,
          isActive: data.isActive || false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert numeric fields to number
    if (name === "roleId" || name === "departmentId") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else if (name === "isActive") {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
      await updateHost(id, formData);
      navigate("/hosts");
    } catch (error) {
      console.error("Error updating host:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-[#4FB7B3] p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
            <FaEdit />
          </div>
          <h2 className="text-2xl font-bold">Edit User</h2>
          <p className="text-blue-100 mt-2">Please fill in the host details below</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="relative flex flex-col">
              <label className="text-sm text-black font-medium mb-1">Full Name</label>
              <FaUser className="absolute left-3 top-10 text-gray-600 pointer-events-none" />
              <input
                type="text"
                name="userName"
                placeholder="Enter full name"
                value={formData.userName}
                onChange={handleChange}
                className="w-full border border-gray-300 text-black rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Email */}
            <div className="relative flex flex-col">
              <label className="text-sm text-black font-medium mb-1">Email Address</label>
              <FaEnvelope className="absolute left-3 top-10 text-gray-600 pointer-events-none" />
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 text-black rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Phone */}
            <div className="relative flex flex-col">
              <label className="text-sm text-black font-medium mb-1">Phone Number</label>
              <FaPhone className="absolute left-3 top-10 text-gray-600 pointer-events-none" />
              <input
                type="text"
                name="mobileNumber"
                placeholder="Enter phone number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 text-black rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Employee Code */}
            <div className="relative flex flex-col">
              <label className="text-sm text-black font-medium mb-1">Employee Code</label>
              <FaIdBadge className="absolute left-3 top-10 text-gray-600 pointer-events-none" />
              <input
                type="text"
                name="employeeCode"
                placeholder="Enter employee code"
                value={formData.employeeCode}
                onChange={handleChange}
                className="w-full border border-gray-300 text-black rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Role */}
            <div className="relative flex flex-col">
              <label className="text-sm text-black font-medium mb-1">Role</label>
              <FaBriefcase className="absolute left-3 top-10 text-gray-600 pointer-events-none" />
              <select
                name="roleId"
                value={formData.roleId}
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
            <div className="relative flex flex-col">
              <label className="text-sm text-black font-medium mb-1">Department</label>
              <FaBuilding className="absolute left-3 top-10 text-gray-600 pointer-events-none" />
              <select
                name="departmentId"
                value={formData.departmentId}
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

            {/* Active */}
            <div className="relative flex flex-col">
              <label className="text-sm text-black font-medium mb-1">Employee Active</label>
              <select
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
                className="w-full border border-gray-300 text-black rounded-lg p-3 pl-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-all duration-300"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditHost;
