import React, { useState } from 'react'
import './App.css'
import Emoji from 'a11y-react-emoji'

function Todo({ todo, index, selectTodo, unPin }) {
  const getStyle = () => {
    return {
      userSelect: 'none',
      fontSize: '1.5em',
      fontWeight: '380',
      padding: '5px',
      color: todo.isSelected ? '#ffffff' : '#41494a',
      backgroundColor: index % 2 ? '#e1ead0' : '#bcc6b0'
    }
  }
  if (todo.isPinned) {
    return (
      <div className="todo" style={getStyle()}>
        <label onClick={() => selectTodo(index)}>
          <Emoji
            symbol="📌"
            onClick={() => unPin(index)}
            label="pushpin"
            style={{
              fontSize: '1em',
              padding: '.4rem',
              cursor: 'pointer'
            }}
          />
          {todo.text}
        </label>
      </div>
    )
  } else {
    return (
      <div className="todo" style={getStyle()}>
        <label onClick={() => selectTodo(index)}>{todo.text}</label>
      </div>
    )
  }
}

function CompletedTodo({ todo, index }) {
  const getStyle = () => {
    return {
      padding: '0 5px',
      userSelect: 'none',
      fontSize: '.95em',
      fontWeight: '380'
    }
  }

  return (
    <div className="todo" style={getStyle()}>
      <label>{todo.text}</label>
    </div>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form style={{ padding: '1em' }} onSubmit={handleSubmit}>
      <input
        style={{
          borderRadius: '.4rem',
          backgroundColor: '#eeeeee',
          padding: '.2rem',
          fontSize: '1.5em',
          width: '80vw'
        }}
        type="text"
        placeholder="➕ Add a Task"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

function App() {
  const [todos, setTodos] = useState([
    { text: 'Build todo app', isSelected: false, isPinned: true },
    { text: 'Add/remove function', isSelected: false, isPinned: false },
    { text: 'Pomodoro session', isSelected: false, isPinned: false },
    { text: 'Add persistence layer', isSelected: false, isPinned: false },
    { text: 'Add to portfolio', isSelected: false, isPinned: false },
    { text: 'Style todo app', isSelected: false, isPinned: false },
    { text: 'Learn Hooks', isSelected: false, isPinned: false },
    {
      text:
        'Here we find out what happens when a text becomes longer than intended',
      isSelected: false,
      isPinned: false
    }
  ])

  const [completedTodos, setCompletedTodos] = useState([])

  const addTodo = text => {
    const newTodos = [...todos, { text }]
    setTodos(newTodos)
  }

  const completeTodos = () => {
    let newCompletedTodos = completedTodos
    const newTodos = todos.filter(todo => {
      if (todo.isSelected) {
        todo.isSelected = false
        completedTodos.push(todo)
        return false
      } else return true
    })
    setCompletedTodos(newCompletedTodos)
    setTodos(newTodos)
  }

  const pinTodos = () => {
    const selectedTodos = todos
      .filter(todo => todo.isSelected)
      .map(todo => {
        return Object.assign({}, todo, {
          isSelected: false,
          isPinned: true
        })
      })
    const unselectedTodos = todos.filter(todo => !todo.isSelected)
    const newTodos = selectedTodos.concat(unselectedTodos)
    setTodos(newTodos)
  }

  const selectTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isSelected
      ? (newTodos[index].isSelected = false)
      : (newTodos[index].isSelected = true)
    setTodos(newTodos)
  }

  const trashCompletedTodos = () => {
    setCompletedTodos([])
  }

  const unPin = index => {
    const newTodos = [...todos]
    newTodos[index].isPinned = false
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <div className="Container">
        <div className="todo-list">
          <Emoji
            onClick={() => completeTodos()}
            symbol="🏁"
            label="done"
            style={{
              fontSize: '1.5em',
              float: 'right',
              padding: '.4rem',
              cursor: 'pointer'
            }}
          />
          <Emoji
            symbol="⏱️"
            label="stopwatch"
            style={{
              fontSize: '1.5em',
              padding: '.4rem',
              float: 'right',
              cursor: 'pointer'
            }}
          />
          <Emoji
            symbol="📌"
            label="pushpin"
            onClick={() => pinTodos()}
            style={{
              fontSize: '1.5em',
              padding: '.4rem',
              float: 'right',
              cursor: 'pointer'
            }}
          />
          <h1 style={{ color: '#6d7b73' }}>{todos.length} Tasks</h1>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              selectTodo={selectTodo}
              unPin={unPin}
            />
          ))}
          <div>
            <Emoji
              onClick={() => trashCompletedTodos()}
              symbol="🗑️"
              label="trash"
              style={{
                fontSize: '1.5em',
                float: 'right',
                padding: '.4rem',
                cursor: 'pointer'
              }}
            />
            <h1 style={{ color: '#6d7b73' }}>
              {completedTodos.length} Completed
            </h1>
            {completedTodos.map((todo, index) => (
              <CompletedTodo key={index} index={index} todo={todo} />
            ))}
          </div>
        </div>
      </div>
      <div className="completed-list">
        <div style={{ display: 'inline', padding: '1em' }}>
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
    </div>
  )
}

export default App
