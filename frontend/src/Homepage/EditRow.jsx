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
      return <p>{defaultVal}</p>;
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

  return (
    <div>
      <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
        {displayTitle()}
      </p>
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
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Other">Other</option>
          </select>
        ) : field !== "contractor" ? (
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
        ) : (
          <>
            <p style={{ fontWeight: "500" }}>
              name:{" "}
              {!create
                ? extProps.contractor.company_name
                : selectedContractor.company_name}
            </p>
            <p style={{ fontWeight: "500" }}>
              email:{" "}
              {!create ? extProps.contractor.email : selectedContractor.email}
            </p>
            <p style={{ fontWeight: "500" }}>
              phone:{" "}
              {!create
                ? extProps.contractor.phone_number
                : selectedContractor.phone_number}
            </p>
            <p style={{ fontWeight: "500" }}>
              distance:{" "}
              {!create
                ? extProps.contractor.distance
                : selectedContractor.distance}
            </p>
            <p style={{ fontWeight: "500" }}>
              rating:{" "}
              {!create ? extProps.contractor.rating : selectedContractor.rating}
            </p>
            {(create || modalInfo.editing) && (
              <>
                <p style={{ fontWeight: "500" }}>
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
                    Submit
                  </button>
                </div>
                {props.contractors === null ? (
                  <></>
                ) : props.contractors.length === 0 ? (
                  <p style={{ fontWeight: "500" }}>No contractors found</p>
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
                                <p>name: {contractor.company_name}</p>
                                <p>email: {contractor.email}</p>
                                <p>phone: {contractor.phone_number}</p>
                                <p>
                                  distance:{" "}
                                  {contractor.distance !== ""
                                    ? contractor.distance + " miles"
                                    : ""}
                                </p>
                                <p>
                                  rating:{" "}
                                  {contractor.rating !== ""
                                    ? contractor.rating + "/5.0"
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
        )
      ) : (
        <DisplayField />
      )}
    </div>
  );
};

export default TaskRow;
