<%-- 
    Document   : signup
    Created on : Feb 21, 2018, 6:56:35 PM
    Author     : Felix Perez
--%>

<%-- <%@ include file= "index.jsp"%> --%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="style.css">

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sign Up</title>
    </head>

    <body>
        <audio loop autoplay>
            <source src="8 Bit Space Groove Chill Pretty Game Music by HeatleyBros.mp3" type="audio/mpeg">
            <!--Music from: https://www.youtube.com/watch?v=Bok8nLviThg&index=9&list=PLobY7vO0pgVKn4FRDgwXk5FUSiGS8_jA8 -->
        </audio>
        
        <div class='row'>
            <div class='col-lg-12 text-center'>
                <img src="GoC-Logo2.png" alt="Logo" width="300px" height="200px">
            </div>
        </div>

        <%-- Form --%>
        <div class="container">

            <div class="row">
                <div class="col-md-6 col-md-offset-3 sign-up">
                    <form action="signupprocess.jsp" method="post">

                        <div class="row">

                            <div class="col-md-12">

                                <div class="row">
                                    <div class="col-lg-12">
                                        <h2 align="center" style="padding-bottom:3%">Sign-Up!</h2>    
                                    </div>
                                </div>

                                <%-- UserName --%>
                                <div class="form-group">
                                    <div class="row">
                                        <label for="username" class="col-md-5">Enter username: </label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control" name="username">
                                        </div>
                                    </div>
                                </div>

                                <%-- Password --%>
                                <div class="form-group">
                                    <div class="row">
                                        <label for="password" class="col-md-5">Choose a password:</label>
                                        <div class="col-md-7">
                                            <input type="password" class="form-control" name="password">
                                        </div>
                                    </div>
                                </div>

                                <%-- First-Name --%>
                                <div class="form-group">
                                    <div class="row">
                                        <label for="firstname" class="col-md-5">Enter first name:</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control"name="firstname">
                                        </div>
                                    </div>
                                </div>

                                <%-- Last-Name --%>
                                <div class="form-group">
                                    <div class="row">
                                        <label for="lastname" class="col-md-5">Enter last name:</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control"name="lastname">
                                        </div>
                                    </div>
                                </div>
                                
                                <%-- Class-code --%>
                                <div class="form-group">
                                    <div class="row">
                                        <label for="classcode" class="col-md-5">Enter class code (optional):</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control"name="classno">
                                        </div>
                                    </div>
                                </div>
                                
                                <%-- Role --%>
                                <div class="form-group">
                                    <div class="row">
                                        <label for="role" class="col-md-5">I am a:</label>
                                        <div class="col-md-3">
                                            <input type="radio" id="acct1" name="type" value="0" checked/> <label for="acct1">A Student</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="radio" id="acct2" name="type" value="1"/> <label for="acct2">An Educator</label>
                                        </div>
                                    </div>
                                </div>

                                <%-- Submit Button --%>
                                <div class="row">
                                    <button type="submit" class="btn btn-primary col-md-2 col-md-offset-9">Sign-Up</button>
                                </div>

                            </div>        

                        </div>



                    </form>
                </div>
            </div>
        
        <%--Container--%>
        </div>

    </body>
</html>

    