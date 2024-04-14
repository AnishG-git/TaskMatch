import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import TaskRow from "./EditRow";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import Navbarp from "../Navbarpo";
import "../MainPage/index.css";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo } = location.state || {};
  const token = userInfo.token;
  const [user, setUser] = useState({
    name: userInfo.name,
    email: userInfo.email,
    zip: userInfo.zip_code,
    phone: userInfo.phone_number,
  });

  // tasks is an array of objects that contain the information for each task (title, start date, etc.)
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

  // modalInfo contains the event that was clicked on (information here is saved in the database)
  const [modalInfo, setModalInfo] = useState({
    show: false,
    event: {},
    editing: false,
  });

  const [createTaskInfo, setCreateTaskInfo] = useState({
    show: false,
    date: null,
  });

  // task is the task that is being edited (contains information that has not been saved yet)
  const [task, setTask] = useState({});

  const [radius, setRadius] = useState(10);

  const [contractors, setContractors] = useState([]);

  const handleBackClick = (e) => {
    console.log(
      "on back click, modalInfo: " +
        JSON.stringify(modalInfo.event.extendedProps)
    );
    // hide create modal
    if (e.target.value === "true") {
      setCreateTaskInfo({ show: false, date: null });
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
        // console.log("updating task, task: " + JSON.stringify(task));
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
    // console.log(tasks);
    if (modalInfo.show) {
      setModalInfo({ show: false, event: {}, editing: false });
    } else if (createTaskInfo.show) {
      setCreateTaskInfo({ show: false, date: null });
    } else {
      console.log("setting contractors to empty");
      setContractors([]);
    }
  }, [tasks]);

  useEffect(() => {
    if (!modalInfo.show && !createTaskInfo.show) {
      setTask({});
    }
  }, [modalInfo.show, createTaskInfo.show]);

  const updateTask = async () => {
    console.log(task.category);
    if (!task.category) {
      return { error: "Please fill in all fields" };
    }
    const contractorArg =
      task.contractor.id === -1 ? "unlink" : task.contractor.email;
    const response = await fetch("/api/update-task", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        task_id: modalInfo.event.id,
        description: task.description,
        date: task.date,
        name: task.title,
        contractor_email: contractorArg,
        // add contractor after search contractor api call implementation
        category: task.category,
        is_completed: task.is_completed,
      }),
    });
    const result = await response.json();
    if (result.error) {
      alert(result.error);
      return;
    }
    return result;
  };

  const createTask = async () => {
    // console.log("create task: " + JSON.stringify(task));
    // save task on frontend
    const response = await fetch("/api/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        description: task.description,
        date: createTaskInfo.date,
        task_name: task.title,
        contractor_email: task.contractor.email,
        // add contractor after search contractor api call implementation
        category: task.category,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  };

  function handleDateSelect(selectInfo) {
    // console.log("from function: " + selectInfo.dateStr);
    setCreateTaskInfo({ show: true, date: selectInfo.dateStr });
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
  }

  const handleDeleteClick = async () => {
    // alert for confirmation
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
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
        task_id: modalInfo.event.id,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  };

  const searchContractor = async () => {
    console.log("radius: " + radius);
    const response = await fetch(
      "/api/search-contractors?category=" +
        task.category +
        "&distance=" +
        radius,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const result = await response.json();
    console.log(result);
    setContractors(result);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Navbarp userInfo={{ token: token, tasks: tasks }} />{" "}
      {/* Include the Navbarp component here */}
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
            setRadius={setRadius}
            contractors={contractors}
            searchContractor={searchContractor}
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
            setRadius={setRadius}
            contractors={contractors}
            searchContractor={searchContractor}
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
