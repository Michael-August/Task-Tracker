import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [ tasks, setTask ] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:4000/tasks')
      const data = await res.json
      console.log(data);
    }
    fetchTasks()
  }, [])

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTask([...tasks, newTask])
  }
  
  let deleteTask = (id) => {
    setTask(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTask(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  const toggleshowAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  return (
    <div className="container">
      <Header onAdd = {toggleshowAddForm} showAdd={showAddForm} />
      {showAddForm && <AddTask onAddTask={ addTask } />}
      {tasks.length > 0 ?<Tasks tasks={ tasks } ondelete={deleteTask} ondoubleclick={toggleReminder} /> : "No task to show"}
    </div>
  );
}

export default App;
