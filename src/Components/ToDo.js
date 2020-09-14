import React from 'react';

class ToDo extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            item: this.props.task,
            newName: ""
        }
        this.setEditing = this.setEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleChange(e) {
    let item = {...this.state.item};
    item.taskName=e.target.value;
    this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        let item= this.state.item;
        const id= item.id;
        console.log(item);
    
        await fetch('http://localhost:8080/api/tasks/'+id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        });

        await this.props.fetchTasks();

        item.taskName="";
        this.setEditing(false);
      }

    setEditing(edit) {
        this.setState({
            isEditing: edit
        })
    }

    render() {
        const propTask = this.props.task;
        const editingTemplate = (
            <div className="d-inline-flex p-4 border">
            <form onSubmit={this.handleSubmit} >
                <div>
                    <label htmlFor={propTask.id}>
                        <h6>Editing Task: {propTask.taskName}</h6>
                    </label>
                    <div>
                    <input type="text" id={propTask.id} value={this.state.item.taskName} onChange={this.handleChange} />
                    </div>
                </div>
                <div>
                    <button className="btn btn-danger" type="button" onClick={() => this.setEditing(false)} >
                        Cancel
            </button>
                    <button className="btn btn-primary" type="submit">
                        Save
            </button>
                </div>
            </form>
            </div>
        );

        const viewTemplate = (
            <div>
                <li>
                    <div className="row input-group mb-3">
                        <div className="form-check col-4">
                            <input className="form-check-input" type="checkbox" checked={propTask.completed} onChange={() => this.props.toggleCompleted(propTask.id)} id={propTask.id} />
                            <label className="form-check-label" htmlFor={propTask.id}>
                                {propTask.taskName}
                            </label>
                        </div>

                        <div className="col">
                        <button className="btn btn-primary" type="button" onClick={() => this.setEditing(true)}>Edit</button>
                        <button className="btn btn-danger" type="button" onClick={() => this.props.remove(propTask.id)}>Delete</button>
                        </div>
                    </div>
                </li>
            </div>
        )

        return <div>{this.state.isEditing ? editingTemplate : viewTemplate}</div>;
    }
}

export default ToDo;
