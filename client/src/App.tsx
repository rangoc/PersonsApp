import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onFetchStart, onFetchSuccess } from "./reducers/personList";

import PersonList from "./components/PersonList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onFetchStart());

    const fetchPersonList = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/persons/");
        dispatch(onFetchSuccess(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPersonList();
  }, [dispatch]);

  return (
    <div className="App">
      <PersonList />
    </div>
  );
};

export default App;
