// src/App.tsx
import React from "react";
import TripForm from "./components/TripForm";
import MapWithRoute from "./components/MapWithRoute";
// import ELDLogs from './components/ELDLogs';

const App: React.FC = () => {
  return (
    <div>
      <h1>Trip Planner</h1>
      <TripForm />
      <MapWithRoute />
      {/* <ELDLogs /> */}
    </div>
  );
};

export default App;
