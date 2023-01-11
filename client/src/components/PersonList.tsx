import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { RootState } from "../reducers/types";

import CreatePerson from "./CreatePerson";
import RemovePerson from "./RemovePerson";

import "./PersonList.scss";
import UpdatePerson from "./UpdatePerson";

const PersonList = () => {
  const personList = useSelector((state: RootState) => state.data.personList);
  const navigate = useNavigate();

  const [isCreatePersonDialogOpen, setIsCreatePersonDialogOpen] =
    useState(false);

  const [isRemovePersonDialogOpen, setIsRemovePersonDialogOpen] =
    useState(false);

  const removePersonRef = useRef("");

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
      body: ({ _id }: { _id: string }) => (
        <div className="action-buttons">
          <Button
            icon="pi pi-user-edit"
            onClick={() =>
              navigate({
                pathname: "/",
                search: createSearchParams({
                  _id,
                }).toString(),
              })
            }
          />
          <Button
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={() => {
              removePersonRef.current = _id;
              setIsRemovePersonDialogOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        value={personList}
        className="p-datatable-responsive"
        header="Person List"
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

      <Button
        onClick={() => setIsCreatePersonDialogOpen(true)}
        icon="pi pi-plus"
        iconPos="right"
        label="Add a Person"
      />

      {/* CreatePerson modal */}
      <CreatePerson
        isDialogOpen={isCreatePersonDialogOpen}
        setIsDialogOpen={setIsCreatePersonDialogOpen}
      />

      {/* RemovePerson modal */}
      <RemovePerson
        id={removePersonRef.current}
        personList={personList}
        isDialogOpen={isRemovePersonDialogOpen}
        setIsDialogOpen={setIsRemovePersonDialogOpen}
      />

      {/* UpdatePerson modal */}
      <UpdatePerson />
    </>
  );
};

export default PersonList;
