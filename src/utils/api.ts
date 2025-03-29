import axios from "axios";

const geocodingApiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const directionsApiUrl = "https://api.mapbox.com/directions/v5/mapbox/driving/";

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const geocodeLocation = async (location: string) => {
  try {
    const response = await axios.get(
      `${geocodingApiUrl}${encodeURIComponent(location)}.json`,
      {
        params: {
          access_token: mapboxToken,
          limit: 1,
        },
      }
    );
    return response.data.features[0]?.center || null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

export const fetchRoute = async (locations: any) => {
  if (
    !locations?.currentLocation ||
    !locations?.pickupLocation ||
    !locations?.dropoffLocation
  )
    return null;

  const [startLng, startLat] = locations.currentLocation;
  const [waypointLng, waypointLat] = locations.pickupLocation;
  const [endLng, endLat] = locations.dropoffLocation;

  const url = `${directionsApiUrl}${startLng},${startLat};${waypointLng},${waypointLat};${endLng},${endLat}?geometries=geojson&access_token=${mapboxToken}`;

  try {
    const response = await axios.get(url);
    return {
      type: "Feature",
      properties: {},
      geometry: response.data.routes[0].geometry,
    };
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
