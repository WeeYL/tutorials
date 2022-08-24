package com.company;

public class MailService {
    public void sendEmail(){
        connect();
        auth();
        disconnect();

    }

    private void connect(){
        System.out.println("connect");
    }
    private void disconnect(){
        System.out.println("disconnect");
    }
    private void auth(){
        System.out.println("authenticated");
    }
}
