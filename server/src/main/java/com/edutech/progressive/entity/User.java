package com.edutech.progressive.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
    @Column(name = "full_name")
    private String fullName;
    @Column(name="username")
    private String username;
    private String password;
    private String email;
    private String role;
    public User() {
    }
    public User(int userId, String fullNamee, String username, String password, String email, String role) {
        this.userId = userId;
        this.fullName = fullNamee;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }
    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
    public String getFullNamee() {
        return fullName;
    }
    public void setFullNamee(String fullNamee) {
        this.fullName = fullNamee;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    
}