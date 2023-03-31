import React, {  Component } from "react";//useState, useRef, useEffect,
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";


// function usePrevious(value) {  // gestione da tastiera
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];
const FILTER_MAP = {    //vari campi di Filtraggio e funzionalità
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);   //Array di filters name

class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    filter: 'All',
    tasks: props.tasks
  }
  this.listHeadingRef = React.createRef();

}

setFilter(filter) {
  this.setState({filter: filter})
}
setTasks(taskk) {
  this.setState({tasks: taskk})
} 
 deleteTask=(id)=> {   
  
    fetch(`http://localhost:3005/api/todo/del/${id}`, {
      method: 'DELETE'
    })
      .then(response => { 
        //visualizza task che non hanno un determinato id "eliminato"
    const remainingTasks = this.state.tasks.filter((task) => id !== task.id);
    this.setTasks(remainingTasks);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // handle success
      })
      .catch(error => {
        console.error('There was a problem with the DELETE request:', error);
        // handle error 
   
      });
  }


  
editTask=(id, newName)=> {
 
  fetch('http://localhost:3005/api/todo/edit/' + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName
    })
  }) 
 
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error)) 
    const editedTaskList = this.state.tasks.map((task) => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    this.setTasks(editedTaskList);
  
}
    
addTask=(idAdd,nameAdd)=> {                  //aggiunge task
    fetch('http://localhost:3005/api/todo/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: idAdd, 
    name: nameAdd
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))
 const newTask = { id: `todo-${nanoid()}`, nameAdd, completed: false };  // nano serve per gli id univoci
      this.setTasks([...this.state.tasks, newTask])

  }

  toggleTaskCompleted=(id,completed)=> {
    fetch('http://localhost:3005/api/todo/toggle/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed:!completed,
        id:id
      })
    }) 
   
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error)) 
    const updatedTasks = this.state.tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    this.setTasks(updatedTasks);
  }

  taskList = () => {
    //debugger
    const tastksState = this.state.tasks;
    return tastksState.filter(FILTER_MAP[this.state.filter]).map((task) => (  //mappo solo quelli che rispecchiano il filtro
              <Todo
              id={task.id}
              name={task.name}
              completed={task.completed}
              key={task.id}
              toggleTaskCompleted={this.toggleTaskCompleted}
              deleteTask={this.deleteTask}
              editTask={this.editTask}
            />
            ))
  };

 filterList = () => FILTER_NAMES.map((name) => (
  <FilterButton                           // invoco filterButton con i seguenti props
    key={name}
    name={name}
    isPressed={name === this.state.filter}  
    setFilter={() => this.setFilter(name)}
 /> 
 
));

 
  
visualizzaTodo = () => {//filtro
  // contesto della funzione dentro
  const uri='http://localhost:3005/api/todos'
  fetch(uri)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
}

componentDidMount() {
this.visualizzaTodo();
}

componentDidUpdate(prevProps, prevState, snapshot) {
  if (this.state.tasks.length !== prevState.tasks.length) {        //
    this.listHeadingRef.current.focus();
  }
}

// export const fetchPosts = () =&gt; async (dispatch) =&gt; {
//   try {
//   const response = await fetch(&apos;https://jsonplaceholder.typicode.com/posts&apos;);
//   const data = await response.json();
//   dispatch({ type: &apos;FETCH_POSTS&apos;, payload: data });
//   } catch (error) {
//   console.log(error);
//   }
//  };

  render =() => {
    const tasksNoun = this.taskList().length !== 1 ? 'tasks' : 'task';
    const headingText = `${this.taskList().length} ${tasksNoun} remaining`;

    return (
     
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={this.addTask} />
        <div className="filters btn-group stack-exception">
        {this.filterList()}
        </div>
        <h2 id="list-heading" tabIndex="-1" ref={this.listHeadingRef}>
          {headingText}
        </h2>
        <ul
          //role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {this.taskList()}
        </ul>
      </div>
    );}
  }

  App.defaultProps = {
    tasks: DATA
  }
 export default App;

