import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import TaskRow from "./EditRow";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo } = location.state || {};
  const token = userInfo.token;
  const [tasks, setTasks] = useState(
    userInfo.tasks.map((task) => ({
      ...task,
      title: task.name,
      start: task.date,
    }))
  );

  if (!token) {
    navigate("/");
  }
  const [modalInfo, setModalInfo] = useState({
    show: false,
    event: {},
    editing: false,
  });

  const [showAddTask, setShowAddTask] = useState(false);

  const [task, setTask] = useState({});

  const handleBackClick = (e) => {
    // hide create modal
    if (e.target.value === "true") {
      setShowAddTask(false);
    // turn off edit mode
    } else if (modalInfo.editing) {
      setModalInfo({ show: true, event: modalInfo.event, editing: false });
    // hide edit modal
    } else {
      setModalInfo({ show: false, event: {}, editing: false });
    }
  };

  // show modal when event is clicked
  function handleEventClick(arg) {
    setModalInfo({ show: true, event: arg.event });
  }

  const handleEditClick = async (e) => {
    if (e.target.value === "true") {
      // call create task api
      console.log("creating task");
    } else {
      if (modalInfo.editing) {
        // call update task api
        console.log("saving changes");
      } else {
        // turn on edit mode
        setModalInfo({
          show: true,
          event: modalInfo.event,
          editing: !modalInfo.editing,
        });
      }
    }
  };

  const editTask = async () => {
    const response = await fetch("/api/update-task", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(task),
    });
    const result = await response.json();
    console.log(result);
  };

  function handleSaveTask() {
    // save task on frontend
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == modalInfo.event.id) {
        tasks[i] = task;
        setTasks(tasks);
        break;
      }
    }
  }

  function handleDateSelect(selectInfo) {
    setShowAddTask(true);
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    console.log(selectInfo);
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
        {showAddTask && (
          <Modal
            modalInfo={modalInfo}
            task={task}
            setTask={setTask}
            handleBackClick={handleBackClick}
            handleEditClick={handleEditClick}
            create={true}
          />
        )}
        {modalInfo.show && (
          <Modal
            modalInfo={modalInfo}
            task={task}
            setTask={setTask}
            handleBackClick={handleBackClick}
            handleEditClick={handleEditClick}
            create={false}
          />
        )}
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "title",
            end: "dayGridMonth,dayGridWeek,dayGridDay today prev,next",
          }}
          events={tasks}
          eventColor="#378006"
          eventTextColor="#fff"
          aspectRatio={2}
          selectable={true}
          dateClick={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default HomePage;
