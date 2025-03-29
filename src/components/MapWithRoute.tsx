import React, { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setLocations, setRoute, setLoading } from "@/features/trip/tripSlice";
import { geocodeLocation, fetchRoute } from "@/utils/api";
import "mapbox-gl/dist/mapbox-gl.css";

const MapWithRoute: React.FC = () => {
  const dispatch = useDispatch();
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const {
    currentLocation,
    pickupLocation,
    dropoffLocation,
    locations,
    route,
    loading,
  } = useSelector((state: RootState) => state.trip);

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      dispatch(setLoading(true));

      const currentCoords = await geocodeLocation(currentLocation);
      const pickupCoords = await geocodeLocation(pickupLocation);
      const dropoffCoords = await geocodeLocation(dropoffLocation);

      if (currentCoords && pickupCoords && dropoffCoords) {
        dispatch(
          setLocations({
            currentLocation: currentCoords as [number, number],
            pickupLocation: pickupCoords as [number, number],
            dropoffLocation: dropoffCoords as [number, number],
          })
        );
      }

      dispatch(setLoading(false));
    };

    if (currentLocation && pickupLocation && dropoffLocation) {
      fetchCoordinates();
    }
  }, [currentLocation, pickupLocation, dropoffLocation, dispatch]);

  useEffect(() => {
    if (locations) {
      fetchRoute(locations).then((routeGeoJSON) => {
        if (routeGeoJSON) {
          dispatch(setRoute(routeGeoJSON));
        }
      });
    }
  }, [locations, dispatch]);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current && locations) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: locations.currentLocation as LngLatLike,
        zoom: 8,
        accessToken: mapboxToken,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");

      new mapboxgl.Marker({ color: "red" })
        .setLngLat(locations.currentLocation as LngLatLike)
        .addTo(mapRef.current);

      new mapboxgl.Marker({ color: "green" })
        .setLngLat(locations.pickupLocation as LngLatLike)
        .addTo(mapRef.current);

      new mapboxgl.Marker({ color: "blue" })
        .setLngLat(locations.dropoffLocation as LngLatLike)
        .addTo(mapRef.current);

      mapRef.current.on("load", () => {
        if (route) {
          mapRef.current?.addSource("route", {
            type: "geojson",
            data: route,
          });

          mapRef.current?.addLayer({
            id: "routeLayer",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#007cbf",
              "line-width": 4,
            },
          });
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations, route]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      <div ref={mapContainer} style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default MapWithRoute;
