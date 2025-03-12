import albumApi from "../api/album";
import authApi from "../api/auth";
import musicApi from "../api/music";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import waveformApi from "../api/waveform";
import genreApi from "../api/genre";
import historyApi from "../api/history";
import playerReducer from "../slice/playerSlice"
import musicdetailApi from "../api/musicDetail";
import { cloudinaryApi } from "../api/uploadFile";
import bannerApi from "../api/banner";

const rootReducer = combineReducers({
  [musicApi.reducerPath]: musicApi.reducer,
  [albumApi.reducerPath]: albumApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [waveformApi.reducerPath]: waveformApi.reducer,
  [genreApi.reducerPath]: genreApi.reducer,
  [historyApi.reducerPath]: historyApi.reducer,
  [musicdetailApi.reducerPath]: musicdetailApi.reducer,
  [cloudinaryApi.reducerPath] : cloudinaryApi.reducer,
  [bannerApi.reducerPath]:bannerApi.reducer,
  player: playerReducer,
});
const middleReducer = [
  musicApi.middleware,
  albumApi.middleware,
  authApi.middleware,
  waveformApi.middleware,
  genreApi.middleware,
  historyApi.middleware,
  musicdetailApi.middleware,
  cloudinaryApi.middleware,
  bannerApi.middleware
];
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({}).concat(...middleReducer),
});
