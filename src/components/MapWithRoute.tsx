import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

// Add your Mapbox access token here
const mapboxAccessToken =
  "pk.eyJ1IjoicmF5bW9uZC1nYWt3YXlhIiwiYSI6ImNtOG90czMybzAzeWUyeHNmM3VnZ2RicHQifQ.8OOzBeLOLm8ex_3DFxfVCg";

const MapWithRoute: React.FC = () => {
  const trip = useSelector((state: RootState) => state.trip);
  const { currentLocation, pickupLocation, dropoffLocation, route } = trip;

  // Map reference
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainer.current) {
      // Initialize Mapbox map
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // Map style
        center: [-122.4194, 37.7749], // Default center (San Francisco)
        zoom: 8,
        accessToken: mapboxAccessToken,
      });

      // Add markers for current, pickup, and dropoff locations
      new mapboxgl.Marker().setLngLat([-122.4194, 37.7749]).addTo(map); // Current Location
      new mapboxgl.Marker().setLngLat([-122.2711, 37.8044]).addTo(map); // Pickup Location
      new mapboxgl.Marker().setLngLat([-122.4194, 37.7749]).addTo(map); // Dropoff Location

      // Add route (if available)
      if (route) {
        // Add your route drawing logic here (e.g., using a LineLayer or similar)
        map.addSource("route", {
          type: "geojson",
          data: route, // Assuming the route is provided as a GeoJSON object
        });

        map.addLayer({
          id: "routeLayer",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#007cbf",
            "line-width": 4,
          },
        });
      }

      return () => {
        // Cleanup the map when the component is unmounted
        map.remove();
      };
    }
  }, [route]);

  return (
    <div ref={mapContainer} style={{ height: "500px", width: "100%" }}></div>
  );
};

export default MapWithRoute;
