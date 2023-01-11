import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPerson } from "../reducers/personList";
import FormDialog from "./FormDialog";

interface CreatePersonProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePerson = ({ isDialogOpen, setIsDialogOpen }: CreatePersonProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values: any) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/persons/",
        values
      );
      dispatch(createPerson(data));
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <FormDialog
      header="Add a Person"
      onSubmit={onSubmit}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      onHide={() => setIsDialogOpen(false)}
    />
  );
};

export default CreatePerson;
