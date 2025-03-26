import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TripState = {
  currentLocation: string;
  pickupLocation: string;
  dropoffLocation: string;
  cycleUsed: number;
  route: any;
};

const initialState: TripState = {
  currentLocation: "",
  pickupLocation: "",
  dropoffLocation: "",
  cycleUsed: 0,
  route: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTripDetails: (
      state,
      action: PayloadAction<Omit<TripState, "route">>
    ) => {
      state.currentLocation = action.payload.currentLocation;
      state.pickupLocation = action.payload.pickupLocation;
      state.dropoffLocation = action.payload.dropoffLocation;
      state.cycleUsed = action.payload.cycleUsed;
    },
    setRoute: (state, action: PayloadAction<any>) => {
      state.route = action.payload;
    },
  },
});

export const { setTripDetails, setRoute } = tripSlice.actions;
export default tripSlice.reducer;
