<%-- 
    Document   : index
    Created on : Feb 13, 2018, 9:26:04 AM
    Author     : Felix Perez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Log-In</title>
    </head>
</html>
<h1>Welcome to Game of Codes!</h1>
<p>Please Log-In:</p>
<form action="loginprocess.jsp" method="post"> 
    <table>
    <tr>
        <td>Username:</td>
        <td><input type="text" name="username"/></td>
         
    </tr>
    <tr>
        <td>Password:</td>
        <td><input type="password" name="password"/></td>
         
    </tr>
    <tr>
        <td><input type="submit" value="Log-In"/></td>
         <td></td>
    </tr>   
    </table> 
</form>
    
<p>Not a user? Sign-Up or Play as a Guest:</p>
<a href="signup.jsp">Sign-Up</a> | <a href="main_menu.jsp">Play as Guest</a><br> 

