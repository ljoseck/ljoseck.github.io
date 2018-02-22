<%-- 
    Document   : signup
    Created on : Feb 21, 2018, 6:56:35 PM
    Author     : Felix Perez
--%>

<%@ include file= "index.jsp"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sign Up</title>
    </head>
</html>
<form action="signupprocess.jsp" method="post"> 
    <table>
    <tr>
        <td>Please enter a Username:</td>
         <td><input type="text" name="username"/></td>
    </tr>
    <tr>
        <td>Please enter your Password:</td>
         <td><input type="password" name="password"/></td>
    </tr>
    <tr>
        <td>Please enter your First Name:</td>
        <td><input type="text" name="firstname"/></td>
    </tr>
    <tr>
        <td>Please enter your Last Name:</td>
        <td><input type="text" name="lastname"/></td>
    </tr>
    <tr>
        <td>Please enter a Class Number (Optional):</td>
        <td><input type="text" name="classno"/></td>
    </tr>
    <tr>
        <td>I am:</td>
        <td><input type="radio" id="acct1" name="type" value="0"/><label for="acct1">A Student</label></td>
        <td><input type="radio" id="acct2" name="type" value="1"/><label for="acct2">An Educator</label></td>
    </tr>
        <td><input type="submit" value="Sign Up"/></td>
         <td></td>
    </tr>
    
    </table>
</form>
    