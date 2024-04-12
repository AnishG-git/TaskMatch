import { useState } from "react";
const TaskRow = (props) => {
  const modalInfo = props.modalInfo;
  const field = props.field;
  let placeholder = "";
  let fieldTitle = "";
  let isTitle = false;

  if (field === "title") {
    placeholder = modalInfo.event.title;
    fieldTitle = "Title";
    isTitle = true;
  } else if (field === "description") {
    placeholder = modalInfo.event.extendedProps.description;
    fieldTitle = "Description";
  } else if (field === "date") {
    placeholder = modalInfo.event.startStr;
    fieldTitle = "Due Date";
  } else if (field === "contractor") {
    placeholder = modalInfo.event.extendedProps.contractor;
    fieldTitle = "Contractor";
  }

  function inputType() {
    if (field === "contractor") {
      return "number";
    } else if (field === "date") {
      return "date";
    }
    return "text";
  }

  function displayTitle() {
    if ((!isTitle || modalInfo.editing) && field != "contractor") {
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

  return (
    <div>
      <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
        {displayTitle()}
      </p>
      {modalInfo.editing ? (
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
          type={inputType()}
          min={field === "contractor" ? 0 : ""}
          defaultValue={placeholder}
          onChange={() => setTask({ ...task, field: e.target.value })}
        />
      ) : (
        <DisplayField />
      )}
    </div>
  );
};

export default TaskRow;
