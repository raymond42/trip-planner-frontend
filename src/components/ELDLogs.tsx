// src/components/ELDLogs.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const ELDLogs: React.FC = () => {
  const { currentLocation, pickupLocation, dropoffLocation, cycleUsed } =
    useSelector((state: RootState) => state.trip);

  const generateLogs = () => {
    // Logic to generate log sheets based on cycle used and trip details
    const logs = [];
    let days = Math.ceil(cycleUsed / 10); // Assuming 10 hours per day, adjust as needed

    for (let i = 0; i < days; i++) {
      logs.push(
        <div key={i} className="log-day">
          <h3>Day {i + 1} Log Sheet</h3>
          <p>Current Location: {currentLocation}</p>
          <p>Pickup Location: {pickupLocation}</p>
          <p>Dropoff Location: {dropoffLocation}</p>
          <p>Cycle Hours Used: {cycleUsed}</p>
        </div>
      );
    }

    return logs;
  };

  return (
    <div>
      <h2>ELD Log Sheets</h2>
      {generateLogs()}
    </div>
  );
};

export default ELDLogs;
