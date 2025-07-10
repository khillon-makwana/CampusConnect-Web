// src/pages/StudyGroupsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthListener } from "../components/useAuthListener";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import UpdateStudyGroups from "../components/UpdateStudyGroups";

const StudyGroupsPage = () => {
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

            {/* Navigation */}
            <nav className="hidden md:block flex-1 mx-24">
              <ul className="flex justify-center space-x-8">
                <li><a href="/" className="text-gray-600 font-medium hover:text-primary transition">HOME</a></li>
                <li><a href="/events" className="text-gray-600 font-medium hover:text-primary transition">EVENTS</a></li>
                <li><a href="/jobs" className="text-gray-600 font-medium hover:text-primary transition">JOBS</a></li>
                <li><a href="/study-groups" className="text-primary font-medium border-b-2 border-primary pb-1 transition whitespace-nowrap">STUDY GROUPS</a></li>
                <li><a href="/articles" className="text-gray-600 font-medium hover:text-primary transition">ARTICLES</a></li>
              </ul>
            </nav>

            {/* User Info */}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Groups</h1>
            <p className="text-gray-600">
              Tackle challenging subjects together and enhance your understanding through group discussions and collaborative problem-solving
            </p>
          </div>

          <div className="flex space-x-4">
            <Link to="/post-study-group">
              <button className="bg-primary text-white px-4 py-2 rounded-button font-medium hover:bg-opacity-90 transition whitespace-nowrap flex items-center">
                <i className="ri-add-line mr-2"></i>
                  Create a Group
              </button>
            </Link>
            <Link to="/my-study-groups">
              <button className="bg-primary text-white px-4 py-2 rounded-button font-medium hover:bg-opacity-90 transition whitespace-nowrap flex items-center">
                <i className="ri-group-line mr-2"></i>
                  My Study Groups
              </button>
            </Link>
          </div>
        </div>

        {/* Study Group Cards */}
           <UpdateStudyGroups userEmail={userEmail} />{/* Dynamic study group cards go here */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-pacifico mb-3">CampusConnect</h3>
            <p className="text-gray-400 mb-4 max-w-md text-sm">
              Your all-in-one platform for campus life, connecting students with
              opportunities, events, and each other.
            </p>

            <div className="flex space-x-6 mb-4">
              <a href="/" className="text-gray-400 hover:text-white transition">Home</a>
              <a href="/events" className="text-gray-400 hover:text-white transition">Events</a>
              <a href="/jobs" className="text-gray-400 hover:text-white transition">Jobs</a>
              <a href="/study-groups" className="text-gray-400 hover:text-white transition">Study Groups</a>
              <a href="/articles" className="text-gray-400 hover:text-white transition">Articles</a>
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

export default StudyGroupsPage;
