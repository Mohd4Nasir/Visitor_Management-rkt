import React from "react";

const VisitorCard = ({ visitor }) => {
  const statusColors = {
    Pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      dot: "bg-yellow-400"
    },
    "Checked-in": {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      dot: "bg-green-400"
    },
    "Checked-out": {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-400"
    },
  };

  const statusConfig = statusColors[visitor.status] || statusColors.Pending;
  
  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name || name === "-") return "?";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a consistent color based on name
  const getAvatarColor = (name) => {
    if (!name || name === "-") return "bg-gray-400";
    
    const colors = [
      "bg-pink-500", "bg-purple-500", "bg-indigo-500", 
      "bg-blue-500", "bg-teal-500", "bg-green-500",
      "bg-yellow-500", "bg-orange-500", "bg-red-500"
    ];
    
    const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  return (
    <div className={`w-80 h-72 ${statusConfig.bg} ${statusConfig.border} rounded-2xl border shadow-sm p-5 flex flex-col transition-all duration-200 hover:shadow-md hover:scale-[1.02]`}>
      
      {/* Header with avatar and status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className={`${getAvatarColor(visitor.name)} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3 shadow-inner`}>
            {getInitials(visitor.name)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">
              {visitor.name || "Unknown Visitor"}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {visitor.company || "No company specified"}
            </p>
          </div>
        </div>
        
        <div className={`flex items-center ${statusConfig.text} px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.border}`}>
          <span className={`w-2 h-2 ${statusConfig.dot} rounded-full mr-2`}></span>
          {visitor.status}
        </div>
      </div>

      {/* Details section */}
      <div className="flex-1 mt-2 space-y-3">
        <div className="flex items-center">
          <div className="w-8">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <span className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Visiting: </span>
            {visitor.visiting || "Not specified"}
          </span>
        </div>
        
        <div className="flex items-center">
          <div className="w-8">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <span className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Purpose: </span>
            {visitor.purpose || "Not specified"}
          </span>
        </div>
        
        <div className="flex items-center">
          <div className="w-8">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <span className="text-xs text-gray-500">
            Arrived: {visitor.createdAt}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex items-center gap-2">
        {visitor.status === "Pending" && (
          <button className="flex-1 bg-gray-900 text-white text-sm py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-all font-medium shadow-sm">
            Assign Employee
          </button>
        )}

        {visitor.status === "Checked-in" && (
          <button className="flex-1 bg-white text-red-600 border border-red-200 text-sm py-2.5 px-4 rounded-lg hover:bg-red-50 transition-all font-medium shadow-sm">
            Check Out
          </button>
        )}

        {visitor.status === "Checked-out" && (
          <button className="flex-1 bg-white text-green-600 border border-green-200 text-sm py-2.5 px-4 rounded-lg hover:bg-green-50 transition-all font-medium shadow-sm">
            Check In Again
          </button>
        )}

        <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VisitorCard;