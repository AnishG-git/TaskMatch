import TaskRow from "./TaskRow";

export default function Modal(props) {
  const {
    modalInfo,
    task,
    setTask,
    handleBackClick,
    handleEditClick,
    handleDeleteClick,
    create,
    createDate,
    setRadius,
    contractors,
    searchContractor,
  } = props;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          backgroundColor: "#085c8c",
          padding: "20px",
          height: "60%",
          width: "60%",
          borderRadius: "15px",
          border: "2px solid white",
          overflowY: "scroll",
          scrollbarWidth: "thin",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "15px",
            backgroundColor: "#085c8c",
          }}
        >
          <button
            value={create}
            onClick={handleBackClick}
            className="back-btn"
            style={{ position: "absolute", top: "15%", left: "20%" }}
          >
            {modalInfo.editing ? "CANCEL" : "DONE"}
          </button>
          {create ? (
            <h1 style={{ color: "white" }}>Add Task</h1>
          ) : (
            <h1 style={{ color: "white" }}>{modalInfo.event.title}</h1>
          )}
          <button
            value={create}
            onClick={handleEditClick}
            className="back-btn"
            style={{ position: "absolute", top: "15%", right: "20%" }}
          >
            {create ? "SAVE" : modalInfo.editing ? "SAVE" : "EDIT"}
          </button>
          {!create && (
            <button
              value={create}
              onClick={handleDeleteClick}
              className="back-btn"
              style={{
                position: "absolute",
                top: "15%",
                right: "25%",
                color: "red",
                borderColor: "red",
              }}
            >
              DELETE
            </button>
          )}
        </div>
        <TaskRow
          modalInfo={modalInfo}
          task={task}
          setTask={setTask}
          field="title"
          create={create}
          createDate={null}
        />
        <TaskRow
          modalInfo={modalInfo}
          task={task}
          setTask={setTask}
          field="description"
          create={create}
          createDate={null}
        />
        <TaskRow
          modalInfo={modalInfo}
          task={task}
          setTask={setTask}
          field="date"
          create={create}
          createDate={createDate}
        />
        <TaskRow
          modalInfo={modalInfo}
          task={task}
          setTask={setTask}
          field="category"
          create={create}
          createDate={null}
        />
        <TaskRow
          modalInfo={modalInfo}
          task={task}
          setTask={setTask}
          field="contractor"
          create={create}
          createDate={null}
          setRadius={setRadius}
          searchContractor={searchContractor}
          contractors={contractors}
        />
        <TaskRow
          modalInfo={modalInfo}
          task={task}
          setTask={setTask}
          field="completed"
          create={create}
          createDate={null}
        />
      </div>
    </div>
  );
}
