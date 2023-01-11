import { configureStore } from "@reduxjs/toolkit";

import personListReducer from "./reducers/personList";

const store = configureStore({
  reducer: {
    data: personListReducer,
  },
});

export default store;
