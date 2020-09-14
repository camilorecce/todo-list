package com.todoapp.ToDoApp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Task {
    private @Id @GeneratedValue Long id;
    private String taskName;
    private boolean completed;

    private Task() {}

    public Task (String name, boolean completed) {
        this.taskName = name;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String name) {
        this.taskName = name;
    }

    public boolean getCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return "ToDoTask{"+
                "id=" + id + "\'" +
                ", taskName=" + taskName + "\'" +
                ", completed=" + completed + "\'" +
                "}";
    }
}