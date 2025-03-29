import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTripDetails } from "@/features/trip/tripSlice";

const TripForm: React.FC = () => {
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [cycleUsed, setCycleUsed] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only dispatch if all locations are provided and cycleUsed is a valid number
    if (currentLocation && pickupLocation && dropoffLocation && cycleUsed > 0) {
      // Dispatch the trip details to the Redux store
      dispatch(
        setTripDetails({
          currentLocation,
          pickupLocation,
          dropoffLocation,
          cycleUsed,
        })
      );
    } else {
      alert(
        "Please fill in all fields and ensure cycle hours used is greater than 0."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Trip Details</h2>
      <div>
        <label htmlFor="currentLocation">Current Location:</label>
        <input
          type="text"
          id="currentLocation"
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pickupLocation">Pickup Location:</label>
        <input
          type="text"
          id="pickupLocation"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dropoffLocation">Dropoff Location:</label>
        <input
          type="text"
          id="dropoffLocation"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cycleUsed">Cycle Hours Used:</label>
        <input
          type="number"
          id="cycleUsed"
          value={cycleUsed}
          onChange={(e) => setCycleUsed(Number(e.target.value))}
        />
      </div>
      <button type="submit">Save Trip Details</button>
    </form>
  );
};

export default TripForm;
