package com.company.tutorial02;

import com.sun.net.httpserver.Headers;

public class ClassAndFunctions {
    public static void main(String[] args) {

        header("methods");
        myMethod("hello ", 10);
        // overloading
        int overloadNum1 = overloadMethod(2,3);
        System.out.println(overloadNum1);
        double overloadNum2 =overloadMethod(2.0,3.0);
        System.out.println(overloadNum2);

        // recursion
        int result = sum(10);
        System.out.println(result);
    }

    static void myMethod(String s, int n) {
        System.out.println(s + n);
    }

    static int overloadMethod (int x, int y ){
        return x/y;
    }
    static double overloadMethod (double x, double y ){
        return x/y;
    }

    public static int sum(int k) {
        if (k > 0) {
            return k + sum(k - 1); // int k = k - 1 decrement is done here
        } else {
            return 0;
        }
    }

    static void header(String header) {
        System.out.println("------------" + header.toUpperCase());
    }

}
