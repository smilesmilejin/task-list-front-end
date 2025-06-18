import axios from 'axios';
import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import NewTaskForm from './components/NewTaskForm.jsx';


// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const kBaseUrl = 'http://127.0.0.1:5000';

const postTaskApi = (newTaskData) => {
  return axios.post(`${kBaseUrl}/tasks`, newTaskData) // Send a HTTP POST request, newTaskData is the the request body of the POST
    .then (response => {
      console.log(response.data.task);
      return convertFromApi(response.data.task); // pass the reponse to the the function
    })
    .catch (error => {
      console.log(error);
    });
};


const getAllTasksApi = () => {
  return axios.get(`${kBaseUrl}/tasks`) // make a GET request
    .then(response => { // response from GET request will a list of tasks
      return response.data.map(convertFromApi); //  use .map() to create a new array of tasks, for each element in array call convertFromApi(element)
    })
    .catch (error => {
      console.log(error);
    });
};

const convertFromApi = (apiTask) => {
  const {id, title, is_complete, goal_id, description} = apiTask; // object destructuring to extract specific properties from the apiTask object.
  const newTask = {id, title, isComplete: is_complete, goal_id, description}; // id and title directly (same names and values). isComplete: is_complete
  return newTask;
};

const toggleTaskCompleteApi = (task) => {
  // if tasks is_complete, True, toggle = mark_incomplete
  // if tasks.is_complete is False, toggle = mark_complete

  //   response for patch method is:
  //   {
  //     "task": {
  //         "description": "Install the latest version of Python",
  //         "goal_id": 1,
  //         "id": 1,
  //         "is_complete": true,
  //         "title": "Install Python"
  //     }
  // }
  const toggle = task.isComplete ? 'mark_incomplete' : 'mark_complete';

  return axios.patch(`${kBaseUrl}/tasks/${task.id}/${toggle}`)
    .then(response => {
      return convertFromApi(response.data.task); // When the API responds, it extracts response.data.task and converts it using convertFromApi
    })
    .catch(error => {
      console.log(error);
    });
};

const removeTaskApi = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`) // make an HTTP DELETE request
    .catch(error => {
      console.log(error);
    });
};


const App = () => {
  // const [taskData, setTaskData] = useState(TASKS);
  const [taskData, setTaskData] = useState([]); // Initialize taskData as an empty array []

  // Get all tasks from the backend API database and update the React state with those tasks.
  // getAllTasksApi is an asynchronous function that sends a GET request to your backend API endpoint (/tasks).
  // we use the result of the getAllTasksApi function 'tasks' and call setTaskData(tasks) to update the state variable taskData
  const getAllTasks = () => {
    return getAllTasksApi()
      .then(tasks => setTaskData(tasks));
  };


  useEffect (()=> {
    getAllTasks(); // function that fetches all tasks (from calling an API)
  }, []); // Empty dependency array: run only once on component mount

  const toggleTaskComplete = (id) => {
    console.log('toggleTaskComplete called with id:', id);

    const task = taskData.find(t => t.id === id); // Searches the taskData array for a task whose id matches the given id.
    console.log('Found task:', task);

    return toggleTaskCompleteApi(task) // Calls an API function named toggleTaskCompleteApi, passing the found task.
      .then(taskResult => { // taskResult: the return value of the function toggleTaskCompleteApi
        console.log('API response:', taskResult);
        setTaskData (taskData => {
          // Creates a new array called updatedTasks by using .map() on taskData.
          // .map() loops through every task in the taskData array.
          // if the current task in the loop has the same ID as taskResult.id.
          // we replace the old task with the updated one from the API (taskResult)
          const updatedTasks = taskData.map (task => {
            if (task.id === taskResult.id) {
              return taskResult;
            } else {
              return task;
            }
          });
          console.log('Updated tasks:', updatedTasks);
          return updatedTasks;
        });
      })
      .catch(error => {
        console.error('Error toggling task:', error);
      });
  };

  const removeTask = id => {
    return removeTaskApi(id) // Calls an API function named removeTaskApi, passing the id. This returns a Promise, which allows chaining .then().
      .then(() => {
        setTaskData (taskData => taskData.filter(task => { //  taskData.filter(...): Creates a new array with all tasks except the one that matches the given id.
          return task.id !== id;
        }));
      });
  };

  // const toggleTaskComplete = (id) => {
  //   console.log('#### Task');
  //   setTaskData(taskData => {
  //     return taskData.map(task => {
  //       if (task.id === id) {
  //         // shallow copy, use spread operator
  //         return {...task, isComplete: !task.isComplete};
  //       } else {
  //         return task;
  //       }
  //     });
  //   });
  // };

  // const removeTask =(id) => {
  //   setTaskData(taskData => {
  //     return taskData.filter (task => {
  //       return task.id !== id;
  //     });
  //   });
  // };

  const postTask = (newTaskData) => {
    postTaskApi(newTaskData)
      .then(newTask => {
        setTaskData(prevTasks => [newTask, ...prevTasks]); // prevTasks is the current list of tasks before this update.[newTask, ...prevTasks] creates a new array that adds the new task to the top of the list.
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={taskData} onToggleTaskComplete={toggleTaskComplete} onRemoveTask={removeTask} />}</div>
        <NewTaskForm onPostTask={postTask}/>
      </main>
    </div>
  );
};

export default App;
