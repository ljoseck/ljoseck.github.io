<%-- 
    Document   : signupprocess
    Created on : Feb 21, 2018, 6:56:44 PM
    Author     : Felix Perez
--%>
<%@page import="GameOfCodes.AccountValidation"%>
<jsp:useBean id="obj" class="GameOfCodes.UserAccount" scope = "session"/>
<jsp:setProperty property="*" name="obj"/>  
<%
    if (request.getParameter("username") != "" && request.getParameter("password") != "" && request.getParameter("firstname") != ""
            && request.getParameter("lastname") != "" && request.getParameter("type") != "") { //if all fields are filled in, then continue
        /*If class number flag is not filled in, then set a signifier stating that the user is not in a class */
        if (request.getParameter("classno") == "") {
            obj.setClassNumber("NOCLASS");
        } else {
            obj.setClassNumber(request.getParameter("classno"));
        }
        obj.setUsername(request.getParameter("username"));
        obj.setPassword(request.getParameter("password"));
        obj.setFirstName(request.getParameter("firstname"));
        obj.setLastName(request.getParameter("lastname"));
        obj.setEducatorFlag(Integer.parseInt(request.getParameter("type")));
        boolean status = AccountValidation.Validate(obj, true);/*True since it is a new account*/

        if (status) {
            out.println("Hello " + obj.getUsername() + ", you are successfully signed-up and logged in.");%>
<br>
<%
    session.setAttribute("session","TRUE");
    session.setAttribute("username", obj.getUsername());
    session.setAttribute("password", obj.getPassword());
    session.setAttribute("firstname", obj.getFirstName());
    session.setAttribute("lastname", obj.getLastName());
    session.setAttribute("lvlcomp", obj.getLevelsCompleted());
    session.setAttribute("classno", obj.getClassNumber());
    session.setAttribute("educator", obj.getEducatorFlag());
    /*NOTE: WE WILL NEED TO CHANGE gamelaunch.html TO A MAIN MENU PAGE BELOW!!!!*/
%>
<jsp:include page="gamelaunch.html"></jsp:include>  
<%
} else {
    //out.println("Sorry, the credentials you gave are invalid, or you are trying to sign up an existing account.");
%>
<jsp:include page="signup.jsp"></jsp:include>  
<font color="red">Sorry, the credentials you gave are invalid, or you are trying to sing up an existing account.</font> 
<%
    }
} else { //If one or more fields are not filled in, deny the new entry
    //out.println("One or more fields were not filled in. Try again.");

%>
<jsp:include page="signup.jsp"></jsp:include>  
<font color="red">One or more fields were not filled in. Try again.</font> 
<%    }
%>
