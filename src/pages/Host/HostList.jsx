import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaTh, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteHost, getHosts } from "../../Service/userService";

function HostManagement() {
    const navigate = useNavigate();
    const [hosts, setHosts] = useState([]);
    const [selectedHost, setSelectedHost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("cards");

    // Fetch hosts
    useEffect(() => {
        const fetchHosts = async () => {
            try {
                setLoading(true);
                const data = await getHosts();
                const hostData = data.data || data;
                if (hostData && Array.isArray(hostData)) setHosts(hostData);
                else setHosts([]);
            } catch (error) {
                console.error("Error fetching hosts:", error);
                setHosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchHosts();
    }, []);

    const openModal = (host) => {
        setSelectedHost(host);
        const modal = document.getElementById("delete_modal");
        if (modal) modal.showModal();
    };

    const closeModal = () => {
        const modal = document.getElementById("delete_modal");
        if (modal) modal.close();
        setSelectedHost(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedHost) return;
        try {
            await deleteHost(selectedHost.id);
            setHosts((prev) => prev.filter((h) => h.id !== selectedHost.id));
        } catch (error) {
            console.error("Error deleting host:", error);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="w-full mx-auto px-6 text-gray-900">
            {/* Toast Notifications */}
            <div id="toast-success" className="hidden fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow">
                User deleted successfully!
            </div>
            <div id="toast-error" className="hidden fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow">
                Failed to delete user!
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
                <div>
                    <h2 className="text-3xl font-bold">User Management</h2>
                    <p className="text-gray-700 mt-2">Manage your organization's users and their details</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setViewMode("cards")}
                        className={`px-3 py-2 rounded ${viewMode === "cards" ? "bg-[#4FB7B3] text-white" : "bg-gray-200"}`}
                    >
                        <FaTh />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`px-3 py-2 rounded ${viewMode === "list" ? "bg-[#4FB7B3] text-white" : "bg-gray-200"}`}
                    >
                        <FaBars />
                    </button>
                    <button
                        onClick={() => navigate("/create-host")}
                        className="bg-[#4FB7B3] flex items-center gap-2 text-white px-5 py-3 rounded-lg shadow-md hover:bg-[#3e9793] transition-all font-medium"
                    >
                        <FaPlus className="text-lg" />
                        <span className="text-lg">Create User</span>
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
                <div className="relative w-full md:w-1/2">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search hosts..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#4FB7B3] focus:outline-none text-gray-900"
                    />
                </div>
            </div>

            {/* Loader / Empty / Views */}
            {loading ? (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#4FB7B3]"></div>
                    <p className="mt-2">Loading users...</p>
                </div>
            ) : hosts.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">No users found.</p>
                    <button onClick={() => navigate("/create-host")} className="bg-[#4FB7B3] text-white px-4 py-2 rounded-lg mt-4">
                        Create First User
                    </button>
                </div>
            ) : viewMode === "cards" ? (
                // Card View
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hosts.map((host) => (
                        <div
                            key={host.id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`${host.badgeBg || "bg-gray-200"} text-gray-900 text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                                        {host.departmentName}
                                    </div>
                                    <div
                                        className={`w-3 h-3 ${host.isActive ? "bg-green-400" : "bg-gray-400"} rounded-full`}
                                        title={host.isActive ? "Active" : "Inactive"}
                                    ></div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
                                        style={{ backgroundColor: host.avatarBg || "#4FB7B3" }}
                                    >
                                        {host.initials || host.userName?.[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{host.userName}</h3>
                                        <p className="text-sm text-gray-600">Employee ID: {host.employeeCode}</p>
                                        <p className="text-sm text-gray-600">{host.roleName}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm text-gray-700">
                                    <p>{host.email}</p>
                                    <p>{host.mobileNumber}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
                                <button
                                    onClick={() => navigate(`/edit-host/${host.id}`)}
                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                                >
                                    Edit
                                </button>
                                <button onClick={() => openModal(host)} className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // List View
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {hosts.map((host) => (
                                    <tr key={host.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3"
                                                    style={{ backgroundColor: host.avatarBg }}
                                                >
                                                    {host.initials}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{host.userName}</div>
                                                    <div className="text-sm text-gray-500">{host.employeeCode}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{host.email}</div>
                                            <div className="text-sm text-gray-500">{host.mobileNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{host.departmentName}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${host.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {host.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => navigate(`/edit-host/${host.id}`)}
                                                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                >
                                                    Edit
                                                </button>
                                                <button onClick={() => openModal(host)

                                                } className="text-red-600 hover:text-red-900 text-sm font-medium">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            <dialog id="delete_modal" className="modal bg-gray-50 bg-opacity-50">
                <div className="modal-box bg-gray-50 text-gray-900">
                    <h3 className="font-bold text-lg">Confirm Delete</h3>
                    {selectedHost && (
                        <div className="py-4">
                            <p className="text-gray-700">Are you sure you want to delete this user?</p>
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p>
                                    <strong>Id:</strong> {selectedHost.id}
                                </p>
                                <p>
                                    <strong>Name:</strong> {selectedHost.userName}
                                </p>
                                <p>
                                    <strong>Email:</strong> {selectedHost.email}
                                </p>
                                <p>
                                    <strong>Department:</strong> {selectedHost.departmentName}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <button className="btn btn-ghost" onClick={closeModal}>
                            Cancel
                        </button>
                        <button className="btn btn-error text-white" onClick={handleConfirmDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default HostManagement;
