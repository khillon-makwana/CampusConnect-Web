import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

function LatestJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const q = query(collection(db, "jobs"), orderBy("timestamp", "desc"), limit(3));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(data);
      } catch (err) {
        console.error("Error loading jobs:", err);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {jobs.map(job => (
        <div
          key={job.id}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
              <p className="text-gray-600">{job.company || "Unknown Company"}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {job.type || "Job"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <i className="ri-map-pin-line mr-1"></i>
              <span>{job.location || "Unspecified"}</span>
            </div>
            <div className="flex items-center">
              <i className="ri-money-dollar-circle-line mr-1"></i>
              <span>{job.salary || "N/A"}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{job.description || ""}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {(job.skills || []).map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
            {job.link && (
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Apply Now
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LatestJobs;
