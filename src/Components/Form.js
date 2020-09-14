import React from 'react';

class Form extends React.Component {

    emptyItem = {
        taskName:'',
        completed:false
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            input: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        let item = this.state.item;
        if (!item.taskName.trim()) {
            return;
          }
    
        await fetch('http://localhost:8080/api/tasks', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
        });
        
        await this.props.fetchTasks();

        item.taskName="";
        this.setState({ item });
        
      }

    handleChange(e) {
        let item = {...this.state.item};
        item.taskName=e.target.value;
        this.setState({ item });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="new-todo">
                <h6>Add new Task: </h6>
                </label>
                <div className="row">
                    <input className="form-control col-4" id="new-todo" type="text" value={this.state.item.taskName} onChange={this.handleChange} />
                    <button className="btn btn-primary col-2" type="submit">Add Task</button>
                </div>
            </form>
        );
    }
}

export default Form;