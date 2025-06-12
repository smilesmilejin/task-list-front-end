import TaskList from './components/TaskList.jsx';
import './App.css';
import {useState} from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const toggleTaskComplete = (id) => {
    console.log('#### Task');
    setTaskData(taskData => {
      return taskData.map(task => {
        if (task.id === id) {
          // shallow copy, use spread operator
          return {...task, isComplete: !task.isComplete};
        } else {
          return task;
        }
      });
    });
  };

  const removeTask =(id) => {
    setTaskData(taskData => {
      return taskData.filter (task => {
        return task.id !== id;
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={taskData} onToggleTaskComplete={toggleTaskComplete} onRemoveTask={removeTask} />}</div>
      </main>
    </div>
  );
};

export default App;
