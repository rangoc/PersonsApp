import { configureStore } from "@reduxjs/toolkit";

import personListReducer from "./reducers/personList";

const store = configureStore({
  reducer: {
    personList: personListReducer,
  },
});

export default store;
