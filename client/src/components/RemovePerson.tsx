import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDispatch } from "react-redux";
import { IPerson, removePerson } from "../reducers/personList";

interface RemovePersonProps {
  id: string;
  personList: IPerson[];
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RemovePerson = ({
  id,
  personList,
  isDialogOpen,
  setIsDialogOpen,
}: RemovePersonProps) => {
  const dispatch = useDispatch();

  const handleRemovePerson = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/persons/${id}`);
      dispatch(removePerson(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      visible={isDialogOpen}
      onHide={() => setIsDialogOpen(false)}
      header="Confirmation"
      dismissableMask
      footer={
        <div>
          <Button
            className="p-button-primary"
            onClick={() => {
              handleRemovePerson(id);
              setIsDialogOpen(false);
            }}
          >
            Yes
          </Button>
          <Button
            className="p-button-secondary"
            onClick={() => setIsDialogOpen(false)}
          >
            No
          </Button>
        </div>
      }
    >
      Are you sure you want to delete person:{" "}
      {personList.find((person) => person._id === id)?.name}?
    </Dialog>
  );
};

export default RemovePerson;
