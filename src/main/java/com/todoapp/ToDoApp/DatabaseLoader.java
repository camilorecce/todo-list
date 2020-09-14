package com.todoapp.ToDoApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader  implements CommandLineRunner {
    
    private final TaskRepository repository;

    @Autowired
    public DatabaseLoader(TaskRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public void run(String ...strings) throws Exception {
        this.repository.save(new Task("Eat", false));
        this.repository.save(new Task("Sleep", true));
    }
}