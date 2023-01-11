import axios from "axios";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IPerson, updatePerson } from "../reducers/personList";
import { RootState } from "../reducers/types";

import FormDialog from "./FormDialog";

const UpdatePerson = () => {
  const personList = useSelector((state: RootState) => state.data.personList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("_id") || "";

  const { name, surname, address, city, phone } = useMemo<IPerson>(
    () => personList.find((person) => person._id === id) || ({} as IPerson),
    [personList, id]
  );

  const onHide = () => {
    if (id) {
      navigate("/");
      searchParams.delete("_id");
      setSearchParams(searchParams);
    }
  };

  const onSubmit = async (values: any) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/persons/${id}`,
        values
      );

      dispatch(updatePerson(data));
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormDialog
      header="Edit Person"
      onSubmit={onSubmit}
      queryParam={id}
      initialValues={{
        name,
        surname,
        city,
        address,
        phone,
      }}
      onHide={onHide}
    />
  );
};

export default UpdatePerson;
