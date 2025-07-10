import React from "react";
import { Link } from "react-router-dom";

const StudyGroupCard = ({ group, showJoinButton = true }) => {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-200">
              <img
                src={group.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold">{group.title}</h3>
              <p className="text-sm text-gray-500">Led by {group.leader}</p>
            </div>
          </div>
          {/*  Conditionally show JOIN button */}
          {showJoinButton && (
            <Link
              to={`/join-study-group?groupId=${group.id}`}
              className="bg-black text-white px-3 py-1 text-xs rounded-button font-medium hover:bg-gray-800 transition whitespace-nowrap"
            >
              JOIN
            </Link>
          )}
        </div>
        <p className="text-gray-600 mb-4">{group.description}</p>
        <div className="flex items-center text-sm text-gray-500 justify-between">
          <div className="flex items-center">
            <i className="ri-map-pin-line mr-1"></i>
            <span>{group.location}</span>
          </div>
          <div className="flex items-center">
            <i className="ri-calendar-line mr-1"></i>
            <span>{group.time}</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-700 font-medium">
          Members: {group.memberCount}
        </div>
      </div>
    </div>
  );
};

export default StudyGroupCard;
