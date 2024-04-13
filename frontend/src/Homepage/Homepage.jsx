import React, { useEffect, useState } from "react";
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

  async function reformatTasks(t) {
    setTasks(
      t.map((task) => ({
        ...task,
        title: task.name,
        start: task.date,
      }))
    );
  }

  if (!token) {
    navigate("/");
  }
  const [modalInfo, setModalInfo] = useState({
    show: false,
    event: {},
    editing: false,
  });

  const [createTaskInfo, setCreateTaskInfo] = useState({show: false, date: null});

  const [task, setTask] = useState({});

  const handleBackClick = (e) => {
    console.log("on back click, task: " + JSON.stringify(task));
    // hide create modal
    if (e.target.value === "true") {
      setCreateTaskInfo({show: false, date: null});
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
      
      console.log("creating task, task: " + JSON.stringify(task));
      // call create task api
      const result = await createTask();
      // check for an error
      if (result.error) {
        // change to real error message
        alert(result.error);
      } else {
        reformatTasks(result);
      }
      
    } else {
      if (modalInfo.editing) {
        // call update task api
        console.log("updating task, task: " + JSON.stringify(task));
        const result = await updateTask();
        if (result.error) {
          alert(result.error);
        } else {
          reformatTasks(result);
        }
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

  useEffect(() => {
    if (modalInfo.show) {
      setModalInfo({ show: false, event: {}, editing: false });
    } else if (createTaskInfo.show) {
      setCreateTaskInfo({show: false, date: null});
    }
  }, [tasks]);

  useEffect(() => {
    if (!modalInfo.show && !createTaskInfo.show) {
      setTask({});
    }
  }, [modalInfo.show, createTaskInfo.show]);

  const updateTask = async () => {
    if (!task.category) {
      return { error: "Please fill in all fields" };
    }
    const response = await fetch("/api/update-task", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        "task_id": modalInfo.event.id,
        "description": task.description,
        "date": task.date,
        "name": task.title,
        // add contractor after search contractor api call implementation
        "category": task.category,
        "is_completed": task.is_completed,
      }),
    });
    const result = await response.json();
    // console.log(result);
    return result;
  };

  const createTask = async () => {
    
    // save task on frontend
    const response = await fetch("/api/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        "description": task.description,
        "date": createTaskInfo.date,
        "task_name": task.title,
        // add contractor after search contractor api call implementation
        "category": task.category,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  }

  function handleDateSelect(selectInfo) {
    // console.log("from function: " + selectInfo.dateStr);
    setCreateTaskInfo({show: true, date: selectInfo.dateStr});
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
  }

  const handleDeleteClick = async () => {
    // alert for confirmation
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (confirm) {
      // call delete task api
      const result = await handleDelete();
      if (result.error) {
        alert(result.error);
      } else {
        reformatTasks(result);
      }
    }
  };

  const handleDelete = async () => {
    const response = await fetch("/api/delete-task", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        "task_id": modalInfo.event.id,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  };



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
        {createTaskInfo.show && (
          <Modal
            modalInfo={modalInfo}
            task={task}
            setTask={setTask}
            handleBackClick={handleBackClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={null}
            create={true}
            createDate={createTaskInfo.date}
          />
        )}
        {modalInfo.show && (
          <Modal
            modalInfo={modalInfo}
            task={task}
            setTask={setTask}
            handleBackClick={handleBackClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            create={false}
            createDate={null}
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
