import { configureStore } from "@reduxjs/toolkit";
import TokenReducer from "./TokenReducer";
const store = configureStore({
  reducer: {
   TokenReducer
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;