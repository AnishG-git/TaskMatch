import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import TaskRow from "./EditRow";

const HomePage = () => {
  const [tasks, setTasks] = useState([
    {
      title: "Finish report",
      description: "Finish report description",
      start: "2024-04-09",
      backgroundColor: "#378006",
      contractor: "John Doe",
    },
    { title: "Attend meeting", start: "2024-04-10" },
    { title: "Grocery shopping", start: "2024-04-11" },
  ]);
  const [modalInfo, setModalInfo] = useState({
    show: false,
    event: {},
    editing: false,
  });

  const [task, setTask] = useState({});

  function handleBackClick() {
    console.log(task);
    if (modalInfo.editing) {
      setModalInfo({ show: true, event: modalInfo.event, editing: false });
    } else {
      setModalInfo({ show: false, event: {}, editing: false });
    }
  }

  function handleEventClick(arg) {
    setModalInfo({ show: true, event: arg.event });
  }

  function handleEditClick() {
    if (modalInfo.editing) {
      // save changes
      console.log("saving changes");
    } else {
      setModalInfo({
        show: true,
        event: modalInfo.event,
        editing: !modalInfo.editing,
      });
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          width: "100vw",
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>Your Tasks</h1>
      </div>
      <div style={{ width: "75vw" }}>
        {modalInfo.show && (
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
                psoition: "fixed"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "15px",
                  backgroundColor: "#085c8c"
                }}
              >
                <button
                  onClick={handleBackClick}
                  className="back-btn"
                  style={{ position: "absolute", top: "15%", left: "20%" }}
                >
                  {modalInfo.editing ? "CANCEL" : "BACK"}
                </button>
                <h1 style={{ color: "white" }}>{modalInfo.event.title}</h1>
                <button
                  onClick={handleEditClick}
                  className="back-btn"
                  style={{ position: "absolute", top: "15%", right: "20%" }}
                >
                  {modalInfo.editing ? "SAVE" : "EDIT"}
                </button>
              </div>
              <TaskRow modalInfo={modalInfo} task={task} setTask={setTask} field="title" />
              <TaskRow modalInfo={modalInfo} task={task} setTask={setTask} field="description" />
              <TaskRow modalInfo={modalInfo} task={task} setTask={setTask} field="date" />
              <TaskRow modalInfo={modalInfo} task={task} setTask={setTask} field="contractor" />
            </div>
          </div>
        )}
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "title",
            end: "dayGridMonth,dayGridWeek,dayGridDay today prev,next",
          }}
          events={tasks}
          eventColor="#378006"
          eventTextColor="#fff"
          aspectRatio={2}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default HomePage;
