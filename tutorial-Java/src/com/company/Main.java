package com.company;

import com.company.memento.Editor;
import com.company.memento.History;

public class Main {

    public static void main(String[] args) {

        // MEMENTO
//        var editor = new Editor();
//        var history = new History();
//
//            // set the content
//        editor.setContent("a");
//            // pass the content to EditorState
//        var state = editor.createState();
//            // retrieve the content from EditorState
//        editor.restore(state);
//            //
//        System.out.println(editor.getContent());

        // MEMENTO undo
            // set the content
//        editor.setContent("a");
//            // pass the content to EditorState > pass to history
//        history.push(editor.createState());
//        editor.setContent("b");
//        history.push(editor.createState());
//        editor.setContent("c");
//            // retrieve the content from EditorState > remove from state
//        editor.restore(history.pop());
//        editor.restore(history.pop());
//            // get content from editor
//        System.out.println(editor.getContent());

        // INTERFACE
//        TaxCal myCal = getCal(); // assign myCal to getCal
//        System.out.println(myCal.calTax());

        // ENCAPSULATE > Attributes and Functions
//        var account = new Account();
//        account.deposit(10);
//        account.deposit(10);
//        account.deposit(10);
//        account.withdraw(5);
//        System.out.println(account.getBalance());

        // ABSTRACTION > Private Functions
//        var mailService = new MailService();
//        mailService.sendEmail();

        // INHERITANCE > Extends
//        var textBox = new UITextbox();
//        System.out.println(textBox.enabled());

        // POLYMORPHISM IMPLEMENTS / ABSTRACT

        drawUIControl(new AbstUITextBox());

    }

        // INTERFACE > getCal of InterfaceTaxCal returns TaxCal2019()
//        public static TaxCal getCal(){
//            return new TaxCal2019();
//        }


        // POLYMORPHISM IMPLEMENTS / ABSTRACT

    public static void drawUIControl(AbstUIControl control){
        control.draw();
    }
}
//