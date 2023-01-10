import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RootState } from "../reducers/types";

import "./personList.css";

const PersonList = () => {
  const personList = useSelector((state: RootState) => state.personList.data);

  const columns = [
    { field: "name", header: "Name" },
    { field: "surname", header: "Surname" },
    { field: "createdDate", header: "Created Date" },
    { field: "city", header: "City" },
    { field: "address", header: "Address" },
    { field: "phone", header: "Phone" },
    {
      field: "",
      header: "Actions",
      body: (rowData: any) => (
        <div className="action-buttons">
          <div className="p-col-6">
            <button
              className="p-button-raised p-button-success"
              onClick={() => console.log("edit")}
            >
              <i className="pi pi-user-edit" />
            </button>
          </div>
          <div className="p-col-6">
            <button
              className="p-button-raised p-button-danger"
              onClick={() => console.log("delete")}
            >
              <i className="pi pi-trash" />
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      value={personList}
      className="p-datatable-responsive"
      header="List of Persons"
      showGridlines
      responsiveLayout="scroll"
    >
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={col.body}
        />
      ))}
    </DataTable>
  );
};

export default PersonList;
