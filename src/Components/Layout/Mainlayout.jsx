import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

// Dummy user data for demonstration
const dummyUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Administrator",
  avatarUrl: ""
}

function MainLayout() {
  const handleLogout = () => {
    console.log("Logging out...");
    // Add actual logout logic here
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Header fixed top */}
      <Header currentUser={dummyUserData} onLogout={handleLogout} />

      {/* Scrollable main area */}
      <main className="h-[calc(100vh-4rem)] overflow-y-auto  pt-2 ">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
