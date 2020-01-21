import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  INSTRUCTIONS:
  Create a "todo" app with the following criteria.
    1. The user can add new todo items
    2. The user can remove todo items
*/

const Todo = () => {
  const [todos, setTodos] = useState([
    {
      id: 'this',
      value: 'this'
    },
    {
      id: 'that',
      value: 'that'
    },
    {
      id: 'something',
      value: 'something'
    }
  ])
  const [value, setValue] = useState('')

  const handleChange = event => setValue(event.target.value)
  const handleSubmit = event => {
    event.preventDefault()
    setTodos([...todos, {id: Date.now(), value}])
    setValue('')
  }
  return (
    <React.Fragment>
      <ul>
        {
          todos.map(todo => {
            return (
              <React.Fragment>
                <li
                  key={`${todos[todos.indexOf(todo)]}${todo.value}`}
                >
                  {todo.value}
                </li>
                <button
                  onClick={() => {
                    let id = todo.id
                    let filteredArray = todos.filter(todo => id !== todo.id)
                    setTodos(filteredArray)
                  }}
                >remove
                </button>
              </React.Fragment>
            )
          })
        }
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='enter todo'
          value={value}
          onChange={handleChange}
        />
        <input type='submit' value='add todo' />
      </form>
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Todo />, rootElement);

/**
 * solution by Tyler McGinnis
 */
const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState ('')

  const handleSubmit = () => {
    setTodos(todos => todos.concat({
      text: input,
      id: generateId()
    }))

    setInput('')
  }

  const removeTodo = id => setTodos(todos => todos.filter(t => t.id !== id))

  return (
    <div>
      <input
        type='text'
        value={input}
        placeholder='New Todo'
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>submit</button>

      <ul>
        {
          todos.map(({ text, id }) => (
            <li key={id}>
              <span>{text}</span>
              <button onClick={() => removeTodo(id)}>x</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
