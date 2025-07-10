// src/pages/ResourcesPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthListener } from "../components/useAuthListener";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const ResourcesPage = () => {
  const [userEmail, setUserEmail] = useState("");
  useAuthListener(setUserEmail);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-pacifico text-primary">CampusConnect</h1>

            <nav className="hidden md:block flex-1 mx-24">
              <ul className="flex justify-center space-x-8">
                <li><Link to="/" className="text-gray-600 font-medium hover:text-primary transition">HOME</Link></li>
                <li><Link to="/events" className="text-gray-600 font-medium hover:text-primary transition">EVENTS</Link></li>
                <li><Link to="/jobs" className="text-gray-600 font-medium hover:text-primary transition">JOBS</Link></li>
                <li><Link to="/study-groups" className="text-gray-600 font-medium hover:text-primary transition whitespace-nowrap">STUDY GROUPS</Link></li>
                <li><Link to="/articles" className="text-gray-600 font-medium hover:text-primary transition">ARTICLES</Link></li>
                <li><Link to="/resources" className="text-primary font-medium border-b-2 border-primary pb-1 transition">RESOURCES</Link></li>
              </ul>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="px-3 py-1.5 bg-white text-primary border border-primary rounded-button text-sm font-medium">{userEmail}</span>
              <button onClick={handleLogout} className="px-3 py-1.5 bg-white text-primary border border-primary rounded-button text-sm font-medium hover:bg-primary/5 whitespace-nowrap">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Resources</h1>
            <p className="text-gray-600">
              Share and access study materials, notes and resources from other students.
            </p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-button font-medium hover:bg-opacity-90 transition whitespace-nowrap flex items-center">
            <i className="ri-upload-2-line mr-2"></i>
            Upload Resource
          </button>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example Resource Card */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
            <div className="flex justify-between mb-2 text-sm">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Mathematics</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">Notes</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Calculus II - Integration Techniques Notes</h3>
            <p className="text-sm text-gray-600 mt-1">Comprehensive notes covering integration by parts, partial fractions, and trigonometric substitution.</p>
            <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
              <span>By Sarah Kim</span>
              <span>April 25, 2024</span>
              <button className="text-blue-600 underline hover:font-medium">Download</button>
            </div>
          </div>

          {/* Add more cards here */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-pacifico mb-3">CampusConnect</h3>
            <p className="text-gray-400 mb-4 max-w-md text-sm">
              Your all-in-one platform for campus life, connecting students with opportunities, events, and each other.
            </p>
            <div className="flex space-x-6 mb-4">
              <Link to="/" className="text-gray-400 hover:text-white transition">Home</Link>
              <Link to="/events" className="text-gray-400 hover:text-white transition">Events</Link>
              <Link to="/jobs" className="text-gray-400 hover:text-white transition">Jobs</Link>
              <Link to="/study-groups" className="text-gray-400 hover:text-white transition">Study Groups</Link>
              <Link to="/articles" className="text-gray-400 hover:text-white transition">Articles</Link>
            </div>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="ri-facebook-fill"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="ri-twitter-x-fill"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="ri-instagram-fill"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="ri-linkedin-fill"></i></a>
            </div>
            <div className="border-t border-gray-800 w-full mt-4 pt-4 text-center text-gray-400">
              <p className="text-sm">&copy; 2025 CampusConnect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResourcesPage;
