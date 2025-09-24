import React from 'react';
import {
    FaUsers,
    FaUserCheck,
    FaClock,
    FaChartLine,
    FaCalendarCheck,
    FaBuilding,
} from "react-icons/fa";

const Dashboard = ({ currentUser, }) => {
    // Dummy data for charts and statistics
    const statsData = [
        { title: "Visitors Today", value: 124, icon: <FaUsers className="text-2xl" />, change: "+12%", color: "bg-blue-500" },
        { title: "Hosts Available", value: 18, icon: <FaUserCheck className="text-2xl" />, change: "+2", color: "bg-green-500" },
        { title: "Pending Approvals", value: 7, icon: <FaClock className="text-2xl" />, change: "-3", color: "bg-yellow-500" },
        { title: "Monthly Visitors", value: "2,458", icon: <FaChartLine className="text-2xl" />, change: "+18%", color: "bg-purple-500" }
    ];

    const recentVisitors = [
        { name: "Amit Sharma", purpose: "Meeting", checkIn: "09:30 AM", status: "Checked-in", statusColor: "text-green-600", profile: "AS" },
        { name: "Neha Gupta", purpose: "Delivery", checkIn: "10:10 AM", status: "Pending", statusColor: "text-yellow-600", profile: "NG" },
        { name: "Rahul Verma", purpose: "Interview", checkIn: "11:00 AM", status: "Rejected", statusColor: "text-red-600", profile: "RV" },
        { name: "Priya Singh", purpose: "Client Meeting", checkIn: "11:45 AM", status: "Checked-in", statusColor: "text-green-600", profile: "PS" },
        { name: "Vikram Patel", purpose: "Maintenance", checkIn: "01:15 PM", status: "Pending", statusColor: "text-yellow-600", profile: "VP" }
    ];

    const upcomingAppointments = [
        { time: "02:00 PM", visitor: "Sanjay Mehta", host: "Sarah Johnson", location: "Conference Room A" },
        { time: "02:30 PM", visitor: "Lina Zhang", host: "Michael Chen", location: "Meeting Room 3" },
        { time: "03:15 PM", visitor: "Robert Kim", host: "David Wilson", location: "Executive Suite" },
        { time: "04:00 PM", visitor: "Emily Davis", host: "Lisa Brown", location: "Main Lobby" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left side - Stats / Cards */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Welcome message */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl shadow text-white">
                        <h1 className="text-2xl font-bold">Welcome back, {currentUser?.name}!</h1>
                        <p className="mt-2 opacity-90">Here's what's happening with your visitor management system today.</p>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statsData.map((stat, index) => (
                            <div key={index} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm">{stat.title}</p>
                                        <p className="text-2xl  text-black font-bold mt-1">{stat.value}</p>
                                        <p className={`text-xs mt-1 ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                                            {stat.change} from yesterday
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-full ${stat.color} text-white`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table section */}
                    {/* Table + Upcoming Appointments in one row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Visitors (takes 2/3 width) */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Recent Visitors
                                </h3>
                                <button className="text-sm text-blue-500 hover:text-blue-700 font-medium">
                                    View All
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="p-3 text-gray-600 font-medium">Visitor</th>
                                            <th className="p-3 text-gray-600 font-medium">Purpose</th>
                                            <th className="p-3 text-gray-600 font-medium">Check-in</th>
                                            <th className="p-3 text-gray-600 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentVisitors.map((visitor, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50">
                                                <td className="p-3">
                                                    <div className="flex text-gray-700 items-center">
                                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 font-medium">
                                                            {visitor.profile}
                                                        </div>
                                                        {visitor.name}
                                                    </div>
                                                </td>
                                                <td className="p-3 text-gray-700">{visitor.purpose}</td>
                                                <td className="p-3 text-gray-700">{visitor.checkIn}</td>
                                                <td className={`p-3 font-medium ${visitor.statusColor}`}>
                                                    {visitor.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Upcoming Appointments (takes 1/3 width) */}
                        <div className="bg-white p-5 rounded-xl shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-700">Upcoming Appointments</h3>
                                <FaCalendarCheck className="text-blue-500" />
                            </div>
                            <div className="space-y-4">
                                {upcomingAppointments.map((appointment, index) => (
                                    <div key={index} className="border-l-4 border-blue-400 pl-3 py-1">
                                        <p className="font-medium text-gray-900">{appointment.time}</p>
                                        <p className="text-sm text-gray-600">{appointment.visitor} → {appointment.host}</p>
                                        <p className="text-xs text-gray-500 flex items-center mt-1">
                                            <FaBuilding className="mr-1" /> {appointment.location}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>



                    {/* Quick actions */}
                    {/*  */}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;