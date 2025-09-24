import React from "react";
import VisitorCard from "./VisitorsCard";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Visitors = () => {
  const visitors = [
    {
      id: 1,
      name: " John Doe",
      company: "Acme Corp",
      visiting: "-",
      purpose: "Personal",
      createdAt: "15/09/2025, 12:30",
      status: "Pending",
    },
    {
      id: 2,
      name: "Martin",
      company: "Vranded",
      visiting: "-",
      purpose: "Business",
      createdAt: "12/09/2025, 00:29",
      status: "Checked-in",
    },


    {
      id: 3,
      name: "Mary",
      company: "slack",
      visiting: "Emily Davis",
      purpose: "Personal",
      createdAt: "08/09/2025, 12:48",
      status: "Checked-out",
    },
    {
      id: 4,
      name: "robert",
      company: "-",
      visiting: "Brian Smith",
      purpose: "Personal",
      createdAt: "04/09/2025, 08:27",
      status: "Pending",
    },
    {
      id: 5,
      name: "shutan",
      company: "-",
      visiting: "Brian Smith",
      purpose: "Personal",
      createdAt: "04/09/2025, 08:27",
      status: "Checked-in",
    },
    {
      id: 6,
      name: "madhu",
      company: "-",
      visiting: "Brian Smith",
      purpose: "Personal",
      createdAt: "04/09/2025, 08:27",
      status: "Checked-out",
    },
    {
      id: 7,
      name: " ashok",
      company: "-",
      visiting: "Brian Smith",
      purpose: "Personal",
      createdAt: "04/09/2025, 08:27",
      status: "Checked-in",
    }, {
      id: 8,
      name: "shutan",
      company: "-",
      visiting: "Brian Smith",
      purpose: "Personal",
      createdAt: "04/09/2025, 08:27",
      status: "Checked-out",
    },
  ];
  const navigate = useNavigate();


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Visitors</h2>
          <p className="text-sm text-gray-500">
            All the visitors that are currently on the premises
          </p>
        </div>
        <button
          onClick={() => navigate("/create-pass")}
          className="bg-[#4FB7B3] flex items-center text-white px-4 py-2 rounded-md shadow hover:bg-[#3e9793] transition"
        >
          <FaPlus className="text-lg font-bold" />
          <span className="ml-2 font-semibold">Create Pass</span>
        </button>
      </div>

      {/* Search + filters */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search visitors"
          className="flex-1 border rounded-md px-3 text-black py-2 text-sm focus:ring-2 focus:ring-[#4FB7B3] focus:outline-none"
        />
        <select className="border rounded-md text-black px-3 py-2 text-sm">
          <option>Status</option>
        </select>
        <select className="border rounded-md text-black px-3 py-2 text-sm">
          <option>Purpose</option>
        </select>
      </div>

      {/* Visitors grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visitors.map((visitor) => (
          <VisitorCard key={visitor.id} visitor={visitor} />
        ))}
      </div>
    </div>
  );
};

export default Visitors;
