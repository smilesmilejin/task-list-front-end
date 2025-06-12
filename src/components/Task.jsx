import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, ToggleTaskComplete, removeTask}) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => ToggleTaskComplete(id)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={() => removeTask(id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  ToggleTaskComplete: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default Task;
