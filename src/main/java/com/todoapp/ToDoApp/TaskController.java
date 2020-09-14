package com.todoapp.ToDoApp;

import java.util.Collection;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
class TaskController {

    private final Logger log = LoggerFactory.getLogger(TaskController.class);
    private TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/tasks")
    public Collection<Task> tasks() {
        return taskRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/tasks/{id}")
    public Task getTask(@PathVariable Long id) {
        return taskRepository.findById(id)
        .orElseThrow(()-> new RuntimeException());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/tasks")
    public Task createTask(@Validated @RequestBody Task task) {
        return taskRepository.save(task);   
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/tasks/{id}")
     public Task updateTask(@Validated @RequestBody Task newTask, @PathVariable Long id) {
        return taskRepository.findById(id)
        .map(e -> {
            e.setTaskName(newTask.getTaskName());
            e.setCompleted(newTask.getCompleted());
            return taskRepository.save(e);
        })
        .orElseGet(() -> {
            newTask.setId(id);
            return taskRepository.save(newTask);
        });
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/tasks/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}