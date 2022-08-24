package com.company;

public class Account {
    private float balance;

    public void deposit (float amt){
        if (amt > 0) {
            this.balance += amt;
        }
    }
    public void withdraw (float amt){
        if (amt > 0) {
            this.balance -= amt;
        }
    }

    public void setBalance(float balance){
        if (this.balance > 0) {
            this.balance = balance;
        }
    }
    public float getBalance (){
        return this.balance;
    }
}
