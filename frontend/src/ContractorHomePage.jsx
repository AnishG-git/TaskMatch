import styled from "styled-components";
import React, { useState, useEffect } from "react"; // Import useEffect here
import { useNavigate, useLocation } from "react-router-dom";
import Navbarp from "./Navbarpo"; // Assuming Navbarp is correctly implemented
import "./MainPage/index.css";

const PageContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background-color: #0077cc;
  color: white;
  padding: 10px 20px;
  text-align: center;
`;

const TaskList = styled.div`
  margin-top: 20px;
`;

const TaskItem = styled.div`
  background-color: #f9f9f9;
  border-left: 5px solid #0077cc;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TaskDetail = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 5px;
`;

const ContractorHomePage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const userInfo = useLocation().state.userInfo;
  const [tasks, setTasks] = useState(userInfo.tasks);
  console.log(userInfo)

  // useEffect(() => {
  //     const fetchTasks = async () => {
  //         // Simulated fetch request
  //         const tasksData = [
  //             { id: 1, title: "Kitchen Renovation", description: "Full kitchen makeover required" },
  //             { id: 2, title: "Bathroom Plumbing", description: "Fix leaky sink and install new bathtub" },
  //             { id: 3, title: "Outdoor Deck", description: "Build a 12x12 wooden deck" },
  //         ];
  //         setTasks(tasksData);
  //     };
  //     fetchTasks();
  // }, []);

  return (
    <PageContainer>
      <Navbarp userInfo={userInfo}/> {/* Including Navbar component */}
      <Header>
        <h1>Contractor Task Dashboard</h1>
      </Header>
      {tasks.length === 0 && (
        <p
          style={{
            position: "absolute",
            top: "50%",
            right: "30%",
            color: "white",
            fontSize: "30px",
          }}
        >
          {"No customer requests... yet. Keep ya head up and get ya bread up :)"}
        </p>
      )}
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id} onClick={() => setSelectedTask(task)}>
            <strong>{task.name}</strong>
          </TaskItem>
        ))}
      </TaskList>
      {selectedTask && (
        <TaskDetail>
          <h2>Details for: {selectedTask.name}</h2>
          <p>Description: {selectedTask.description}</p>
          <p>Date: {selectedTask.date}</p>
          <p>Completed: {(selectedTask.is_completed == true) ? "Yes" : "No"}</p>
        </TaskDetail>
      )}
    </PageContainer>
  );
};

export default ContractorHomePage;
