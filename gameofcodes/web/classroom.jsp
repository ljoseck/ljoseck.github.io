<%-- 
    Document   : classroom
    Created on : Apr 29, 2017, 5:32:39 PM
    Author     : Felix Perez
--%>

<%@page import="java.util.ArrayList"%>
<%@page import="GameOfCodes.UserAccount"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:useBean id="obj" class="GameOfCodes.UserAccount" scope = "session"/>
<jsp:setProperty property="*" name="obj"/>  
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%--<%@ page import="java.util.*"%>--%>
        
        <title>View/Update Items</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
            crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ"
            crossorigin="anonymous"></script>
    </head>
    
    <body>
        
        <style>
            table, th, td {
                border: 1px solid black;
                padding: 10px;
            }
        </style>
        <h2>Students in your classroom (<%out.print(obj.getClassNumber());%>)</h2>
        <table>
        <%
            //Get all items from the inventory
        %>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Levels Completed</th>
            </tr>
        <%
            ArrayList<UserAccount> students = obj.getStudents();
            
            
            //Display every item in items and display it on a new row
            for(UserAccount student : students){
                if(student.getEducatorFlag() == 1) continue;

                out.print("<tr>");
                //name, barcode, and price can be changed by the Manager
                out.print("<td>" + student.getFirstName() + "</td>");
                out.print("<td>" + student.getLastName() + "</td>");
                out.print("<td>" + student.getUsername() + "</td>");
                out.print("<td>" + Integer.toString(student.getLevelsCompleted()) + "</td>");
                //out.print("<td>"); out.print(i.getQty()); 
                out.print("</td>");
                out.print("</tr>");
              
            }
                
        %>  
        
        </table>
        <form action="main_menu.jsp" method="post"> 
        <td style="border:1px solid white"><input type="submit" name="back" value="Back"></td>
        </form>

    </body>
</html>

