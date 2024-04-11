import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

function ToDoListPage() {
    const [location, setLocation] = useLocation();
    const [tasks, setTasks] = useState([
        { id: 1, text: "Fix phone screen", category: "Repairs", date: "2023-10-01", contractor: "John Doe", zip: "90001" },
        { id: 2, text: "Fix leaking ceiling", category: "Home", date: "2023-10-02", contractor: "Jane Smith", zip: "90002" }
    ]);
    const [newTask, setNewTask] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [contractor, setContractor] = useState('');
    const [zip, setZip] = useState('');
    const [contractors, setContractors] = useState([]);

    const categories = ["Home", "Work", "Repairs", "Miscellaneous"];

    useEffect(() => {
        async function fetchContractors() {
            const fetchedContractors = await new Promise(resolve => setTimeout(() => resolve(['John Doe', 'Jane Smith', 'Mike Johnson']), 1000));
            setContractors(fetchedContractors);
        }
        fetchContractors();
    }, []);

    const addTask = () => {
        const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
        if (newTask.trim() !== '' && category !== '' && date !== '' && contractor !== '' && zip.trim() !== '') {
            const newTaskDetail = { id: newId, text: newTask, category, date, contractor, zip };
            setTasks([...tasks, newTaskDetail]);
            setNewTask('');
            setCategory('');
            setDate('');
            setContractor('');
            setZip('');
            setLocation('/confirm', { state: { task: newTaskDetail } });
        }
    };

    const removeTask = id => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #224489 0%, #1E3C79 50%, #091123 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 0'
        }}>
            <h1 style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '48px',
                color: '#FFFFFF',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                Hello James!
            </h1>

            <p style={{
                fontFamily: 'Julius Sans One, sans-serif',
                fontSize: '24px',
                color: '#FFFFFF',
                marginBottom: '40px',
                textAlign: 'center'
            }}>
                What will you add to your to-do list today?
            </p>

            <div style={{
                width: '90%',
                maxWidth: '600px',
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '30px',
                boxSizing: 'border-box',
                boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '36px',
                    color: '#333',
                    marginBottom: '25px'
                }}>
                    Your To Do List
                </h2>

                {tasks.map((task) => (
                    <div key={task.id} style={{
                        background: '#E8E8E8',
                        borderRadius: '10px',
                        padding: '12px 20px',
                        margin: '8px 0',
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '18px',
                        color: '#333',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>{`${task.text} | ${task.category} | ${task.date} | ${task.contractor} | ${task.zip}`}</span>
                        <button onClick={() => removeTask(task.id)} style={{
                            marginLeft: '20px',
                            color: '#FF6347',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>
                            Remove
                        </button>
                    </div>
                ))}

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="New task description"
                        style={{
                            flex: 1,
                            minHeight: '40px',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            maxWidth: '260px'
                        }}
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            width: '150px',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value="">Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <select
                        value={contractor}
                        onChange={(e) => setContractor(e.target.value)}
                        style={{
                            width: '150px',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value="">Contractor</option>
                        {contractors.map((cont, index) => (
                            <option key={index} value={cont}>{cont}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="ZIP Code"
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            width: '150px'
                        }}
                    />
                    <button onClick={addTask} style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        color: '#fff',
                        background: '#4CAF50',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer'
                    }}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ToDoListPage;
