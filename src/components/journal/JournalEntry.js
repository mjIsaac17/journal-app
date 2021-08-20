import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://www.innovationnewsnetwork.com/wp-content/uploads/2020/12/space-junk-696x392.jpg)",
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">New day</p>
        <p className="journal__entry-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>26</h4>
      </div>
    </div>
  );
};
