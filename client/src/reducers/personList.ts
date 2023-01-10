import { createSlice } from "@reduxjs/toolkit";

export interface IPerson {
  _id: string;
  name: string;
  surname: string;
  createdDate?: Date;
  city?: string;
  address?: string;
  phone?: string;
}

export interface IPersonListState {
  data: IPerson[];
  loading: boolean;
}

const initialState: IPersonListState = {
  data: [],
  loading: false,
};

const personListSlice = createSlice({
  name: "personList",
  initialState,
  reducers: {
    onFetchStart(state) {
      state.loading = true;
    },
    onFetchSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    createPerson(state, action) {
      state.data = [...state.data, action.payload];
    },
    updatePerson(state, action) {
      state.data = state.data.map((person) =>
        person._id === action.payload.id ? action.payload : person
      );
    },
    removePerson(state, action) {
      state.data = state.data.filter((person) => person._id !== action.payload);
    },
  },
});

export const {
  onFetchStart,
  onFetchSuccess,
  createPerson,
  updatePerson,
  removePerson,
} = personListSlice.actions;

export default personListSlice.reducer;
