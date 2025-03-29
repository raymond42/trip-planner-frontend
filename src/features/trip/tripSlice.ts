// // src/features/trip/tripSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface TripState {
//   currentLocation: string;
//   pickupLocation: string;
//   dropoffLocation: string;
//   cycleUsed: number;
// }

// const initialState: TripState = {
//   currentLocation: "",
//   pickupLocation: "",
//   dropoffLocation: "",
//   cycleUsed: 0,
// };

// const tripSlice = createSlice({
//   name: "trip",
//   initialState,
//   reducers: {
//     setTripDetails: (state, action: PayloadAction<TripState>) => {
//       // Update the state with the provided trip details
//       state.currentLocation = action.payload.currentLocation;
//       state.pickupLocation = action.payload.pickupLocation;
//       state.dropoffLocation = action.payload.dropoffLocation;
//       state.cycleUsed = action.payload.cycleUsed;
//     },
//   },
// });

// export const { setTripDetails } = tripSlice.actions;

// export default tripSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TripState {
  currentLocation: string;
  pickupLocation: string;
  dropoffLocation: string;
  locations: { [key: string]: number[] } | null;
  route: any | null;
  loading: boolean;
  cycleUsed: number;
}

const initialState: TripState = {
  currentLocation: "",
  pickupLocation: "",
  dropoffLocation: "",
  locations: null,
  route: null,
  loading: false,
  cycleUsed: 0,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setLocations: (
      state,
      action: PayloadAction<{ [key: string]: number[] }>
    ) => {
      state.locations = action.payload;
    },
    setRoute: (state, action: PayloadAction<any>) => {
      state.route = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCyleUsed: (state, action: PayloadAction<number>) => {
      state.cycleUsed = action.payload;
    },
    setTripDetails: (
      state,
      action: PayloadAction<{
        currentLocation: string;
        pickupLocation: string;
        dropoffLocation: string;
        cycleUsed: number;
      }>
    ) => {
      state.currentLocation = action.payload.currentLocation;
      state.pickupLocation = action.payload.pickupLocation;
      state.dropoffLocation = action.payload.dropoffLocation;
      state.cycleUsed = action.payload.cycleUsed;
    },
  },
});

export const { setLocations, setRoute, setLoading, setTripDetails } =
  tripSlice.actions;

export default tripSlice.reducer;
