<%-- 
    Document   : loginprocess
    Created on : Feb 21, 2018, 6:35:05 PM
    Author     : Felix Perez
--%>

<%@page import="GameOfCodes.AccountValidation"%>  
<jsp:useBean id="obj" class="GameOfCodes.UserAccount" scope = "session"/>
<jsp:setProperty property="*" name="obj"/>  

<% 
if(request.getParameter("username")!="" && request.getParameter("password")!="" ){
obj.setUsername(request.getParameter("username"));
obj.setPassword(request.getParameter("password"));
AccountValidation accountValidator = new AccountValidation();
boolean status = accountValidator.Validate(obj, false);  /*False since it is not a new account*/
if(status){  
out.println("Hello " + obj.getUsername() + ", you are successfully logged in.");%>
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
<jsp:include page="main_menu.html"></jsp:include>  
<%
}
else  
{  
%>  
<jsp:include page="index.jsp"></jsp:include>
<font color="red">Login credentials incorrect!</font> 
<%  
}
}else{
//out.println("One or more fields were not filled in. Try again.");
%>
<jsp:include page="index.jsp"></jsp:include> 
<font color="red">One or more fields were not filled in. Try again.</font>     
<%
}
%> 