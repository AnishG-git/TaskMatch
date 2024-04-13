import styled from 'styled-components';
import React, { useState, useEffect } from "react"; // Import useEffect here
import Navbarp from './Navbarpo';  // Assuming Navbarp is correctly implemented
import "./MainPage/index.css";

const PageContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  background-color: #0077CC;
  color: white;
  padding: 10px 20px;
  text-align: center;
`;

const TaskList = styled.div`
  margin-top: 20px;
`;

const TaskItem = styled.div`
  background-color: #F9F9F9;
  border-left: 5px solid #0077CC;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TaskDetail = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #DDD;
  padding: 10px;
  margin-top: 5px;
`;

const ContractorHomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            // Simulated fetch request
            const tasksData = [
                { id: 1, title: "Kitchen Renovation", description: "Full kitchen makeover required" },
                { id: 2, title: "Bathroom Plumbing", description: "Fix leaky sink and install new bathtub" },
                { id: 3, title: "Outdoor Deck", description: "Build a 12x12 wooden deck" },
            ];
            setTasks(tasksData);
        };
        fetchTasks();
    }, []);

    const handleSelectTask = (task) => {
        setSelectedTask(task);
    };

    return (
        <PageContainer>
            <Navbarp /> {/* Including Navbar component */}
            <Header>
                <h1>Contractor Task Dashboard</h1>
            </Header>
            <TaskList>
                {tasks.map(task => (
                    <TaskItem key={task.id} onClick={() => handleSelectTask(task)}>
                        <strong>{task.title}</strong>
                    </TaskItem>
                ))}
            </TaskList>
            {selectedTask && (
                <TaskDetail>
                    <h2>Details for: {selectedTask.title}</h2>
                    <p>{selectedTask.description}</p>
                </TaskDetail>
            )}
        </PageContainer>
    );
};

export default ContractorHomePage;
