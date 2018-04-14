<%-- 
    Document   : index
    Created on : Feb 13, 2018, 9:26:04 AM
    Author     : Felix Perez
--%>

<%@page import="GameOfCodes.TestRunner"%>  

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Log In</title>
    </head>

    <body>
        
        <div class='row'>
            <div class='col-lg-12' align='center'>
                <img src="GoC-Logo2.png" alt="Logo" width="500px" length="400px">
            </div>
        </div>

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
        <a href="signup.jsp">Sign-Up</a> | <a href="main_menu.html">Play as Guest</a><br> 
        
    </body>
</html>
        <%          
        /* Comment out the lines below to remove JUnit Test reporting functionality. */
        TestRunner RunTests = new TestRunner();
        RunTests.runTests();
         %>