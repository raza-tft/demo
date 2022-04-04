import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
  },

  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const reducers = combineReducers({
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer);

export default store;

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export const persistor = persistStore(store);
