import { useState } from "react";
const TaskRow = (props) => {
  const modalInfo = props.modalInfo;
  const field = props.field;
  const create = props.create;
  const createDate = props.createDate;
  let placeholder = "";
  let fieldTitle = "";
  let isTitle = false;

  // if (create === false) {
    if (field === "title") {
      (!create) ? placeholder = modalInfo.event.title : placeholder = "";
      fieldTitle = "Title";
      (!create) ? isTitle = true: {};
    } else if (field === "description") {
      (!create) ? placeholder = modalInfo.event.extendedProps.description : placeholder = "";
      fieldTitle = "Description";
    } else if (field === "date") {
      (!create) ? placeholder = modalInfo.event.startStr : placeholder = "";
      fieldTitle = "Due Date";
        } else if (field === "contractor") {
      (!create) ? placeholder = modalInfo.event.extendedProps.contractor : placeholder = "";
      fieldTitle = "Contractor";
        } else if (field === "category") {
      (!create) ? placeholder = modalInfo.event.extendedProps.category : placeholder = "";
      fieldTitle = "Category";
        }
  // }

  function inputType() {
    if (field === "contractor") {
      return "number";
    } else if (field === "date") {
      return "date";
    }
    return "text";
  }

  function displayTitle() {
    if (((!isTitle || modalInfo.editing) && field !== "contractor") || create) {
      return fieldTitle;
    } else if (
      field === "contractor" &&
      modalInfo.editing &&
      modalInfo.event.extendedProps.contractor !== ""
    ) {
      return "Contractor()";
    } else if (field === "contractor" && !modalInfo.editing) {
      return "Contractor";
    } else {
      return null;
    }
  }

  function DisplayField() {
    if (isTitle) {
      return null;
    } else {
      return <p>{placeholder}</p>;
    }
  }

  function handleChange(e) {
    props.setTask({ ...props.task, [field]: e.target.value });
  }

  return (
    <div>
      <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
        {displayTitle()}
      </p>
      {modalInfo.editing || create ? (
        field === "category" ? (
          <select
            style={{
              width: "100%",
              height: "40px",
              fontSize: "15px",
              borderRadius: "5px",
              border: "1px solid white",
              padding: "5px",
              marginBottom: "20px",
            }}
            id="category"
            defaultValue={(placeholder) ? placeholder : "none"}
            onChange={handleChange}
          >
            <option value="none"></option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <input
            style={{
              width: "100%",
              height: "40px",
              fontSize: "15px",
              borderRadius: "5px",
              border: "1px solid white",
              padding: "5px",
              marginBottom: "20px",
            }}
            id={field}
            type={inputType()}
            min={field === "contractor" ? 0 : ""}
            defaultValue={(createDate) ? createDate : placeholder}
            onChange={handleChange}
          />
        )
      ) : (
        <DisplayField />
      )}
    </div>
  );
};

export default TaskRow;
