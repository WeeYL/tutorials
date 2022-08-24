package com.company.tutorial01;


import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.security.*;


public class LearnJava {

    // In order to run a java program, it must have a main method as an entry point.
    public static void main(String[] args)  {
        System.out.println("Hello");
        System.out.println("integer: " + 10 + "\n" + "boolean: " + true);
        System.out.printf("pi = %.5f \n", Math.PI);

        // Variable
        header("Variable");
        int num;
        num = 1;
        System.out.println("num: " + num);
        float floatNum = 0.5555f;
        floatNum = 0.6666f;
        System.out.println("floatNum: " + floatNum);
        final float finalNum = 0.5555f;
        System.out.println("finalNum: " + finalNum);

        // string
        header("string");
        StringBuilder builderConcatenated = new StringBuilder();
        builderConcatenated.append("You ");
        builderConcatenated.append("can use ");
        builderConcatenated.append("the StringBuilder class.");
        System.out.println(builderConcatenated.toString()); // only now is the string

        System.out.println(String.format("%s meet %s", "hello", "World"));

        //Array
        // <datatype>[] <var name> = new <datatype>[<array size>];
        // <datatype> <var name>[] = new <datatype>[<array size>];
        int[] intArray = new int[10]; // array size of 10
        String[] stringArray = new String[1];
        boolean[] booleanArray = new boolean[100];

        header("ARRAY");
        // access
        int[] intArray02 = {100, 20, 33};
        System.out.println(intArray02[0]); // index
        intArray02[0] = 100 - 99;
        System.out.println(intArray02[0]); // assign


        // operator
        header("OPERATOR");
        System.out.println(11 % 3); // modular
        System.out.println("3 == 2? " + (3 == 2));  // comparison

        // Increment operators
        int incremental = 0;
        System.out.println(incremental++); // pre
        System.out.println(incremental); // post
        System.out.println(++incremental); // post

        header("LOOP CONDITIONAL");
        // conditional
        int cond1 = 1;
        if (cond1 == 10) {
            System.out.println("equal 10");
        } else if (cond1 > 10) {
            System.out.println("more than 10");
        } else {
            System.out.println("none");
        }

        // ternary

        header("TERNARY");
        int ternaryInt = 5 + 2;
        Boolean ternaryIntRes = ternaryInt == 71 ? true : false;
        System.out.println(ternaryIntRes);

        header("LOOP BREAK");
        outer:
        for (int n = 0; n < 5; n++) {
            for (int m = 0; m < 5; m++) {
                if (n == 5 && m == 5) {
                    System.out.println(n + m);
                    break outer;
                }
            }
        }

        header("LOOP CONTINUE");
        for (int i =0; i<4; i++) {
            if(i == 2){
                continue; // skip i=2
            }
            System.out.println(i);
        }

        // for each
        header("LOOP FOR EACH");
        int forEachInt[] = {1, 2,};
        for (int n : forEachInt) {
            System.out.println(n);
        }



        // switch
        header("SWITCH");
        int switchInt = 3;
        switch (switchInt) {
            case 1:
                System.out.println("found: " + 1);
                break;
            case 2:
                System.out.println("found: " + 2);
                break;
            case 3:
                System.out.println("found: " + 3);
                break;
            default:
                System.out.println("found none");
        }

        // try catch file OS
        header("TRY-CATCH");

        try (BufferedReader br = new BufferedReader(new FileReader("foo.txt"))) {
            System.out.println(br.readLine());

        } catch (Exception e) {
            System.out.println("readLine() failed.");
        }






        // end
    }



    static void header(String header) {
        System.out.println("------------" + header.toUpperCase());
    }


}







