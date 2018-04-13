<%-- 
    Document   : index
    Created on : Feb 13, 2018, 9:26:04 AM
    Author     : Felix Perez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
    </head>

    <body>
        
        <div class='container'>
            
            <div class='row'>
                <div class='text-center'>
                    <img src="GoC-Logo2.png" alt="Game-Of-Codes" width='400' height='300'>
                </div>
            </div>

            <div class='row'>
                <div class='col-lg-12' align='center' style="padding-bottom:20px">
                    <h2>Login</h2>
                </div>
            </div>

            <div class="row mt-5">
                <form action="loginprocess.jsp" method="post"> 
                    <div class="row" align="center">
                        <div class='form-group'>
                            <label for="exampleInputEmail1">Username</label>
                            <input type="text" id="exampleInputEmail1" name="username" placeholder="Enter Username">
                        </div>
                    </div>
                    <div class="row" align="center">
                        <div class='form-group'>
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" name="password" placeholder="Enter Password">
                        </div>
                    </div>
                    <div class='row' align="center">
                        <div class='col-xl-1'>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>


            <div class='row'>
                <div class='col-lg-12' align='center'>
                    <p>Not a user? Sign-Up or Play as a Guest:</p>
                    <a href="signup.jsp">Sign-Up</a> | <a href="main_menu.html">Play as Guest</a><br> 
                </div>
            </div>

        </div>

    </body>
</html>
