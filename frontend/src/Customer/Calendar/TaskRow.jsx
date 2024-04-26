import { useEffect, useState } from "react";
const TaskRow = (props) => {
  const modalInfo = props.modalInfo;
  const field = props.field;
  const create = props.create;
  const createDate = props.createDate;
  let defaultVal = "";
  let fieldTitle = "";
  let isTitle = false;
  const [selectedContractor, setSelectedContractor] = useState(() => {
    // in edit mode, there can be initial value for contractor
    if (!create) {
      return modalInfo.event.extendedProps.contractor;
    }
    return {
      id: -1,
      company_name: "",
      email: "",
      phone_number: "",
      distance: "",
      rating: "",
    };
  });
  const [completed, setCompleted] = useState(() => {
    if (!create) {
      return modalInfo.event.extendedProps.is_completed;
    }
    return false;
  });

  let extProps = {};
  if (!create) {
    extProps = modalInfo.event.extendedProps;
  }

  // notes for tmr
  // put search contractor in homepage or something and just pass props
  //
  // console.log("contractors: ", props.contractors);

  if (field === "title") {
    !create ? (defaultVal = modalInfo.event.title) : (defaultVal = "");
    fieldTitle = "Title";
    !create ? (isTitle = true) : {};
  } else if (field === "description") {
    !create ? (defaultVal = extProps.description) : (defaultVal = "");
    fieldTitle = "Description";
  } else if (field === "date") {
    !create ? (defaultVal = modalInfo.event.startStr) : (defaultVal = "");
    fieldTitle = "Due Date";
  } else if (field === "contractor") {
    fieldTitle = "Contractor";
  } else if (field === "category") {
    !create ? (defaultVal = extProps.category) : (defaultVal = "");
    fieldTitle = "Category";
  } else if (field === "completed") {
    fieldTitle = "Completed?";
  }

  useEffect(() => {
    if (modalInfo.editing) {
      props.setTask((prevTask) => ({ ...prevTask, [field]: defaultVal }));
    }
  }, [modalInfo.editing]);

  function inputType() {
    if (field === "contractor") {
      return "number";
    } else if (field === "date") {
      return "date";
    }
    return "text";
  }

  function displayTitle() {
    if (!isTitle || modalInfo.editing || create) {
      return fieldTitle;
    } else {
      return null;
    }
  }

  function DisplayField() {
    if (isTitle) {
      return null;
    } else {
      return <p style={{ color: "white" }}>{defaultVal}</p>;
    }
  }

  function handleChange(e) {
    props.setTask({ ...props.task, [field]: e.target.value });
  }

  useEffect(() => {
    if (selectedContractor.id !== -1) {
      props.setTask({ ...props.task, contractor: selectedContractor });
    } else {
      props.setTask({
        ...props.task,
        contractor: {
          id: -1,
          company_name: "",
          email: "",
          phone_number: "",
          distance: "",
          rating: "",
        },
      });
    }
  }, [selectedContractor]);

  function checked() {
    if (selectedContractor) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    props.setTask({ ...props.task, completed: completed });
  }, [completed]);

  return (
    <div>
      {field !== "completed" && (
        <p style={{ fontWeight: "bold", marginBottom: "5px", color: "white" }}>
          {displayTitle()}
        </p>
      )}
      {field === "completed" && modalInfo.show && !modalInfo.editing && (
        <>
          <p
            style={{ fontWeight: "bold", marginBottom: "5px", color: "white" }}
          >
            {fieldTitle}
          </p>
          <p style={{ fontWeight: "500", color: "white" }}>
            {completed ? "Yes" : "No"}
          </p>
        </>
      )}
      {modalInfo.editing || create || field === "contractor" ? (
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
            defaultValue={defaultVal ? defaultVal : "none"}
            onChange={handleChange}
          >
            <option value="none"></option>
            <option value="HVAC">HVAC</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Construction">Construction</option>
            <option value="Landscaping">Landscaping</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        ) : field !== "contractor" && field != "completed" ? (
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
            min={""}
            defaultValue={createDate ? createDate : defaultVal}
            onChange={(e) =>
              props.setTask({ ...props.task, [field]: e.target.value })
            }
          />
        ) : field === "contractor" ? (
          <>
            <p style={{ fontWeight: "500", color: "white" }}>
              name:{" "}
              {selectedContractor.distance !== ""
                ? selectedContractor.company_name
                : ""}
            </p>
            <p style={{ fontWeight: "500", color: "white" }}>
              email:{" "}
              {selectedContractor.distance !== ""
                ? selectedContractor.email
                : ""}
            </p>
            <p style={{ fontWeight: "500", color: "white" }}>
              phone:{" "}
              {selectedContractor.distance !== ""
                ? selectedContractor.phone_number
                : ""}
            </p>
            <p style={{ fontWeight: "500", color: "white" }}>
              distance:{" "}
              {selectedContractor.distance !== ""
                ? selectedContractor.distance + " miles"
                : ""}
            </p>
            <p style={{ fontWeight: "500", color: "white" }}>
              rating:{" "}
              {selectedContractor.distance !== "" ? " no ratings yet" : ""}
              {/* {!create ? extProps.contractor.rating : selectedContractor.rating} */}
            </p>
            {(create || modalInfo.editing) && (
              <>
                <p style={{ fontWeight: "500", color: "white" }}>
                  {"Search by radius (miles):"}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    style={{
                      width: "80%",
                      height: "40px",
                      fontSize: "15px",
                      borderRadius: "5px",
                      border: "1px solid white",
                      padding: "5px",
                    }}
                    id={field}
                    type={inputType()}
                    min={0.1}
                    defaultValue={10}
                    onChange={(e) => props.setRadius(e.target.value)}
                  />
                  <button
                    className="back-btn"
                    style={{ marginRight: "10%" }}
                    onClick={props.searchContractor}
                  >
                    Search
                  </button>
                </div>
                {props.contractors === null ? (
                  <></>
                ) : props.contractors.length === 0 ? (
                  <p style={{ fontWeight: "500", color: "white" }}>
                    No contractors found
                  </p>
                ) : (
                  <>
                    <ul style={{ listStyleType: "none", marginTop: "3%" }}>
                      {props.contractors.map((contractor, index) => {
                        return (
                          <>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <li key={index} style={{ fontWeight: "500" }}>
                                <p style={{ color: "white" }}>
                                  name: {contractor.company_name}
                                </p>
                                <p style={{ color: "white" }}>
                                  email: {contractor.email}
                                </p>
                                <p style={{ color: "white" }}>
                                  phone: {contractor.phone_number}
                                </p>
                                <p style={{ color: "white" }}>
                                  distance:{" "}
                                  {contractor.distance !== ""
                                    ? contractor.distance + " miles"
                                    : ""}
                                </p>
                                <p style={{ color: "white" }}>
                                  rating:{" "}
                                  {contractor.rating !== ""
                                    ? " no ratings yet"
                                    : ""}
                                </p>
                              </li>
                              <input
                                type="checkbox"
                                name="contractor"
                                checked={
                                  selectedContractor.id === contractor.id
                                }
                                value={contractor}
                                onChange={() => {
                                  if (selectedContractor.id === contractor.id) {
                                    // If the contractor is already selected, print deselecting
                                    console.log("deselecting");
                                    console.log(
                                      "selected contractor: ",
                                      JSON.stringify(selectedContractor) +
                                        "\n contractor: ",
                                      contractor
                                    );
                                    // deselecting in edit/create mode
                                    setSelectedContractor({
                                      id: -1,
                                      company_name: "",
                                      email: "",
                                      phone_number: "",
                                      distance: "",
                                      rating: "",
                                    });
                                  } else {
                                    console.log("selecting");
                                    // Otherwise, select the contractor
                                    setSelectedContractor(contractor);
                                  }
                                }}
                              />
                            </div>
                            <hr style={{ border: "1px solid white" }} />
                          </>
                        );
                      })}
                    </ul>
                  </>
                )}
              </>
            )}
          </>
        ) : modalInfo.editing ? (
          <div
            style={{
              display: "flex",
              alignContent: "end",
              justifyContent: "space-around",
              width: "15%",
              marginTop: "5%",
            }}
          >
            <p
              style={{ fontWeight: "700", marginBottom: "4px", color: "white" }}
            >
              Completed?
            </p>
            <input
              type="checkbox"
              // value={completed}
              defaultChecked={modalInfo.event.extendedProps.is_completed}
              checked={completed}
              onChange={(e) => {
                console.log(e.target.checked);
                setCompleted(e.target.checked);
              }}
            />
          </div>
        ) : (
          <></>
        )
      ) : (
        <DisplayField />
      )}
    </div>
  );
};

export default TaskRow;
