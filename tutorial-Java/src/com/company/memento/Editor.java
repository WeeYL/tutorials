package com.company.memento;

public class Editor {

    private String content = "";

    public String getContent() {
        return content;
    }

    // create an EditorState object > pass content to EditorState
    public EditorState createState() {
        return new EditorState(content);
    }


    //
    public void restore(EditorState state) {
        content = state.getContent();
    }

    public void setContent(String content) {
        this.content += content + " ";
    }


}
