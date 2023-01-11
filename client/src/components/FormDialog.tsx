import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Form } from "react-final-form";

import Field from "../utility/Field";

import "./FormDialog.scss";

interface IFormFields {
  name: string;
  surname: string;
  city?: string;
  address?: string;
  phone?: string;
}

interface IErrorFields {
  name?: string;
  surname?: string;
}

interface FormDialogProps {
  initialValues?: IFormFields;
  header: string;
  isDialogOpen?: boolean;
  queryParam?: string;
  onSubmit: (values: IFormFields) => void;
  setIsDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onHide: () => void;
}

const FormDialog = ({
  onSubmit,
  initialValues,
  header,
  isDialogOpen,
  setIsDialogOpen,
  queryParam = "",
  onHide,
}: FormDialogProps) => {
  const validate = (data: any) => {
    let errors: IErrorFields = {
      name: undefined,
      surname: undefined,
    };

    if (!data.name) {
      errors.name = "Name is required!";
    }
    if (!data.surname) {
      errors.surname = "Surname is required!";
    }

    return errors;
  };

  const isFormFieldValid = (meta: any) => !!(meta.touched && meta.error);

  const getFormErrorMessage = (meta: any) =>
    isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;

  return (
    <Dialog
      onHide={onHide}
      visible={isDialogOpen || !!queryParam}
      dismissableMask
      className="form-dialog__dialog"
    >
      <div className="form--wrapper">
        <Form
          onSubmit={(e) => {
            onSubmit(e);
            setIsDialogOpen && setIsDialogOpen(false);
          }}
          initialValues={initialValues}
          validate={validate}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <h1>{header}</h1>
              <Field
                name="name"
                render={({ input, meta }: { input: any; meta: any }) => (
                  <div className="field form-field--wrapper">
                    <span className="p-float-label">
                      <InputText
                        id="name"
                        {...input}
                        className={classNames({
                          "p-invalid": isFormFieldValid(meta),
                        })}
                      />
                      <label
                        htmlFor="name"
                        className={classNames({
                          "p-error": isFormFieldValid(meta),
                        })}
                      >
                        Name*
                      </label>
                    </span>
                    {getFormErrorMessage(meta)}
                  </div>
                )}
              />
              <Field
                name="surname"
                render={({ input, meta }: { input: any; meta: any }) => (
                  <div className="field form-field--wrapper">
                    <span className="p-float-label">
                      <InputText
                        id="surname"
                        {...input}
                        className={classNames({
                          "p-invalid": isFormFieldValid(meta),
                        })}
                      />
                      <label
                        htmlFor="surname"
                        className={classNames({
                          "p-error": isFormFieldValid(meta),
                        })}
                      >
                        Surname*
                      </label>
                    </span>
                    {getFormErrorMessage(meta)}
                  </div>
                )}
              />
              <Field
                name="city"
                render={({ input }: { input: any }) => (
                  <div className="field form-field--wrapper">
                    <span className="p-float-label">
                      <InputText id="city" {...input} />
                      <label htmlFor="city">City</label>
                    </span>
                  </div>
                )}
              />
              <Field
                name="address"
                render={({ input }: { input: any }) => (
                  <div className="field form-field--wrapper">
                    <span className="p-float-label">
                      <InputText id="address" {...input} />
                      <label htmlFor="address">Address</label>
                    </span>
                  </div>
                )}
              />
              <Field
                name="phone"
                render={({ input }: { input: any }) => (
                  <div className="field form-field--wrapper">
                    <span className="p-float-label">
                      <InputText id="phone" {...input} />
                      <label htmlFor="phone">Phone</label>
                    </span>
                  </div>
                )}
              />
              <Button
                type="submit"
                label="Submit"
                className="form-dialog__button"
                disabled={submitting}
              />
              <Button
                onClick={onHide}
                className="p-button-secondary form-dialog__button"
                label="Cancel"
                disabled={submitting}
              />
            </form>
          )}
        />
      </div>
    </Dialog>
  );
};

export default FormDialog;
