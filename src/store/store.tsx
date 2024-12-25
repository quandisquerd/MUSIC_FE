import albumApi from "../api/album";
import authApi from "../api/auth";
import musicApi from "../api/music";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import waveformApi from "../api/waveform";
import genreApi from "../api/genre";
import historyApi from "../api/history";
import playerReducer from "../slice/playerSlice"
import musicdetailApi from "../api/musicDetail";

const rootReducer = combineReducers({
  [musicApi.reducerPath]: musicApi.reducer,
  [albumApi.reducerPath]: albumApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [waveformApi.reducerPath]: waveformApi.reducer,
  [genreApi.reducerPath]: genreApi.reducer,
  [historyApi.reducerPath]: historyApi.reducer,
  [musicdetailApi.reducerPath]: musicdetailApi.reducer,
  player: playerReducer,
});
const middleReducer = [
  musicApi.middleware,
  albumApi.middleware,
  authApi.middleware,
  waveformApi.middleware,
  genreApi.middleware,
  historyApi.middleware,
  musicdetailApi.middleware
];
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({}).concat(...middleReducer),
});
