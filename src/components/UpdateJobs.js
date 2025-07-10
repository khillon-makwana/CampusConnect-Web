// src/components/UpdateJobs.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase";

const UpdateJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const jobCol = query(
        collection(db, "jobs"),
        orderBy("timestamp", "desc"),
        limit(4) // ✅ Only get the latest 4 jobs
      );
      const jobSnapshot = await getDocs(jobCol);
      const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    };

    loadJobs();
  }, []);

  return (
    <>
      {jobs.map((job) => (
        <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {job.type}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <i className="ri-map-pin-line mr-1"></i>
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <i className="ri-money-dollar-circle-line mr-1"></i>
              <span>{job.salary}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{job.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {job.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
            <a
              href={job.link}
              className="text-primary font-medium hover:underline"
              target="_blank" rel="noopener noreferrer"
            >
              Apply Now
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default UpdateJobs;
