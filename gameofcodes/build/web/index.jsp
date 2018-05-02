<%-- 
    Document   : index
    Created on : Feb 13, 2018, 9:26:04 AM
    Author     : Felix Perez
--%>

<%@page import="GameOfCodes.TestRunner"%>  

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="style.css">

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Log-In</title>
    </head>

    <body>
        <audio loop autoplay>
            <source src="8 Bit Space Groove Chill Pretty Game Music by HeatleyBros.mp3" type="audio/mpeg">
            <!--Music from: https://www.youtube.com/watch?v=Bok8nLviThg&index=9&list=PLobY7vO0pgVKn4FRDgwXk5FUSiGS8_jA8 -->
        </audio>
        
        <div class='row'>
            <div class='col-lg-12 text-center'>
                <img src="GoC-Logo2.png" alt="Logo" width="450px" height="300px">
            </div>
        </div>


        <div class="form-group card-background" align="center">
            <h3 align="center">Log In</h3>
                    <form action="loginprocess.jsp" method="post" align="center"> 

                            <div class="form-card">
                                <label for="username">Username:</label>
                                <input type="text" name="username"/>
                            </div>
                            <div class="form-card">
                                <label for="password">Password:</label>
                                <input type="password" name="password">
                            </div>
                        
                            <button type="submit" class="btn btn-primary" align="center">Log-In</button>

                    </form>

                <div align="center">
                    <p>Not a user? You can <a href="signup.jsp">Sign-Up</a> or <a href="main_menu.html">play as a guest</a>
                </div>
            </div>
        </div>
        
    </body>
</html>
        <%          
        /* Comment out the lines below to remove JUnit Test reporting functionality. */
//        TestRunner RunTests = new TestRunner();
//        RunTests.runTests();
         %>