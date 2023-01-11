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
  personList: IPerson[];
  loading: boolean;
}

const initialState: IPersonListState = {
  personList: [],
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
      state.personList = action.payload;
      state.loading = false;
    },
    createPerson(state, action) {
      state.personList = [...state.personList, action.payload];
    },
    updatePerson(state, action) {
      state.personList = state.personList.map((person) =>
        person._id === action.payload._id ? action.payload : person
      );
    },
    removePerson(state, action) {
      state.personList = state.personList.filter(
        (person) => person._id !== action.payload
      );
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
