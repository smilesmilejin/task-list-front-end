import { useState } from 'react'; // Imports React’s useState hook to manage local state inside the component (in this case, the task title).
import './NewTaskForm.css';

const kDefaultFormState = {
  title: '',
  description: '',
};

// NewTaskFrom takes a prop called onPostTask, which is a function passed from App.jsx to handle adding a new task.
const NewTaskForm = ({onPostTask}) => {
  // const [title, setTitle] = useState(''); // Declares a state variable title (initially an empty string)
  // const [description, setDescription] = useState('');
  const [formData, setFormData] = useState(kDefaultFormState);


  const handleSubmit = (event) => {
    console.log('submitted!');

    event.preventDefault(); // Prevents the page from reloading on form submission (default browser behavior).

    if(!formData.title.trim()){ // if the title is empty or only whitespace, alert the user
      console.log('Title can NOT be empty!');
      alert('Title cannot be empty!');
      return;
    };

    // const newTask = {
    //   title, // title: title
    //   // description:'',
    //   description,
    // };

    // console.log('####### New Task is', newTask);

    // onPostTask(newTask);

    onPostTask(formData);

    // setTitle(''); // reset the form to emptry string after submitted
    // setDescription('');
    setFormData(kDefaultFormState);
  };

  const handleChange = (event) => {
    const inputName = event.target.name; // Extracts the name attribute from the input element that triggered the event.
    const inputValue = event.target.value; // Extracts the current value from the input element.

    setFormData(formData => {
      return { ...formData, [inputName]: inputValue }; // copy all existing fields (...formData) and overwriting the field corresponding to inputName with the new inputValue
    });
  };


  const makeControlledInput = (inputName) => {
    return <input
      onChange={handleChange} // calls handleChange whenever the input changes.
      type='text' // input is a text field.
      id={`input-${inputName}`} // sets a unique id based on the input name, e.g. "input-title"
      name={inputName} //  input’s name attribute corresponds to the field it controls.
      value={formData[inputName]} // the input’s displayed value comes from the React state, When the user types or changes the input, the state is updated accordingly, keeping them in sync.
    />;
  };

  // const handleTitle = (event) => {
  //   setTitle(event.target.value);
  // };

  // const handleDescription = (event) => {
  //   setDescription(event.target.value);
  // };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <div className="form-field">
        <label htmlFor='input-title'>Task Title: </label> {/* This label belongs to the input with id="input-name" */}
        {/* <input
          className="form-input"
          // onChange={handleChange}
          onChange={handleTitle}
          type='text'
          id='input-title'
          name='title'
          // Keeps input and state in sync
          value={title} // The input’s current text is stored in the React state variable title. // The text inside this input should always match the value of the title state.
        /> */}
        {makeControlledInput('title')}
      </div>
      <div className = 'form-field'>
        <label htmlFor='input-description'>Description (Optional): </label> {/* This label belongs to the input with id="input-name" */}
        {/* <input
          className="form-input"
          // onChange={handleChange}
          onChange={handleDescription}
          type='text'
          id='input-description'
          name='description'
          // Keeps input and state in sync
          value={description} // The input’s current text is stored in the React state variable title. // The text inside this input should always match the value of the title state.
        /> */}
        {makeControlledInput('description')}
      </div>
      <div className="button-wrapper">
        <button className="form-button">Add Task</button>
      </div>
    </form>
  );
};

export default NewTaskForm;