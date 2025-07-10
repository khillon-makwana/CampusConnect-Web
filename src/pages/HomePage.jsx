// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useAuthListener } from "../components/useAuthListener";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import LatestEvents from "../components/LatestEvents";
import LatestJobs from "../components/LatestJobs";
import LatestStudyGroups from "../components/LatestStudyGroups";
import LatestArticles from "../components/LatestArticles";

const HomePage = () => {
  const [userEmail, setUserEmail] = useState("");
  useAuthListener(setUserEmail);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen font-inter">
      <header className="w-full">
        <div
          className="hero-section w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Strathmore_University_Student_Centre.jpg/1200px-Strathmore_University_Student_Centre.jpg?20190308141855')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-white text-3xl font-bold font-pacifico">
                CampusConnect
              </h1>
              <nav className="hidden md:block">
                <ul className="flex space-x-8 items-center">
                  <li>
                    <a href="/" className="text-white font-medium hover:text-primary transition">
                      HOME
                    </a>
                  </li>
                  <li>
                    <a href="/events" className="text-white font-medium hover:text-primary transition">
                      EVENTS
                    </a>
                  </li>
                  <li>
                    <a href="/jobs" className="text-white font-medium hover:text-primary transition">
                      JOBS
                    </a>
                  </li>
                  <li>
                    <a href="/study-groups" className="text-white font-medium hover:text-primary transition">
                      STUDY GROUPS
                    </a>
                  </li>
                  <li>
                    <a href="/articles" className="text-white font-medium hover:text-primary transition">
                      ARTICLES
                    </a>
                  </li>
                  
                  <span className="px-3 py-1.5 bg-white text-primary border border-primary rounded-button text-sm font-medium">
                      {userEmail}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-white text-primary border border-primary rounded-button text-sm font-medium hover:bg-primary/5 whitespace-nowrap"
                      >
                      Log Out
                  </button>
                </ul>
              </nav>
            </div>
          </div>

          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl">
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
                Your Campus Community Hub
              </h2>
              <p className="text-white text-lg mb-8">
                Connect with fellow students, discover events, find study groups,
                and explore job opportunities all in one place. Join our vibrant
                campus community today!
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/** Events Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">UPCOMING EVENTS</h2>
            <a
              href="/events"
              className="bg-black text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-800 transition whitespace-nowrap"
            >
              VIEW MORE
            </a>
          </div>
          <LatestEvents />
        </section>

        {/** Jobs Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">JOB OPPORTUNITIES</h2>
            <a
              href="/jobs"
              className="bg-black text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-800 transition whitespace-nowrap"
            >
              VIEW MORE
            </a>
          </div>
          <LatestJobs />
        </section>

        {/** Study Groups */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">STUDY GROUPS</h2>
            <a
              href="/study-groups"
              className="bg-black text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-800 transition whitespace-nowrap"
            >
              VIEW MORE
            </a>
          </div>
          <LatestStudyGroups />
        </section>

        {/** Articles */}
        <section id="home-articles" className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">LATEST ARTICLES</h2>
            <a
              href="/articles"
              className="bg-black text-white px-4 py-2 rounded-button text-sm font-medium hover:bg-gray-800 transition whitespace-nowrap"
            >
              VIEW MORE
            </a>
          </div>
          <LatestArticles />
        </section>
      </main>

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
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="ri-twitter-x-fill"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="ri-instagram-fill"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="ri-linkedin-fill"></i>
              </a>
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

export default HomePage;
