package com.company;

public class User {

    // field
    public String name;

    // constructor
    public User (String name) {
        this.name = name;
    }

    // methods
    public void sayHello(){
        System.out.println("Hello " + name);
    }

}
