import React from 'react';
import ToDo from './Components/ToDo.js';
import Form from './Components/Form.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      tasks: []
    }

    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.remove = this.remove.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
  }

  fetchTasks() {
    fetch('http://localhost:8080/api/tasks')
    .then(response => response.json())
    .then( data => {
      this.setState({tasks: data});
    });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  async toggleCompleted(id) {

const updatedTasks = this.state.tasks.map(t => {
  if (id === t.id) {
    return { ...t, completed: !t.completed };
  }
  return t;
});
    const updateTask = updatedTasks.filter(t => t.id===id)[0];
    console.log(updatedTasks);
    console.log(updateTask);
    console.log(id);
    await fetch('http://localhost:8080/api/tasks/'+id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    });
    await this.fetchTasks();
  }

  async remove(id) {
    await fetch('http://localhost:8080/api/tasks/'+id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedTasks = [...this.state.tasks].filter(i => i.id !== id);
      this.setState({tasks: updatedTasks});
    });
  }

  render() {
    const taskList = this.state.tasks.map(t =>
      (<ToDo key={t.id} task={t} toggleCompleted={this.toggleCompleted} remove={this.remove} fetchTasks={this.fetchTasks} />)
    );

    return (
      <div className="container">
        <h4>To-Do List</h4>
        <ul>
          {taskList}
        </ul>
        <Form fetchTasks={this.fetchTasks}/>
      </div>
    );
  }
}
export default App;
