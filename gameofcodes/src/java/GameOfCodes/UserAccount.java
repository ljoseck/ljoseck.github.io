/*
 */
package GameOfCodes;

/**
 *
 * @author Felix Perez
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.Arrays;

public class UserAccount {
    private String username;
    private String password;
    //private String firstName;
    //private String lastName;
    private int levelsCompleted;
    private String classNumber;
    private int isEducator;
    
    public String getUsername(){
        return this.username;
    }
    public void setUsername(String usr){
        this.username = usr;
    }
    public String getPassword(){
        return this.password;
    }
    public void setPassword(String pass){
        this.password = pass;
    }
//    public String getFirstName(){
//        return this.firstName;
//    }
//    public void setFirstName(String fname){
//        this.firstName = fname;
//    }
//    public String getLastName(){
//        return this.lastName;
//    }
//    public void setLastName(String lname){
//        this.lastName = lname;
//    }
    public int getLevelsCompleted(){
        return this.levelsCompleted;
    }
    public void setLevelsCompleted(int lcomp){
        this.levelsCompleted = lcomp;
    }
    public String getClassNumber(){
        return this.classNumber;
    }
    public void setClassNumber(String cnum){
        this.classNumber = cnum;
    }
    public int getEducatorFlag(){
        return this.isEducator;
    }
    public void setEducatorFlag(int i){
        if(i != 0){
            this.isEducator = 1;
        }
        else{
            this.isEducator = 0;
        }
    }
    public boolean readAccountInfo(String username, String password, UserAccount currentUser){
        boolean result = false;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/gameofcodes?autoReconnect=true&useSSL=false","root","password");
            PreparedStatement ps = con.prepareStatement(
               "select * from accounts where Username=? and Password=?");
            ps.setString(1, username);
            ps.setString(2, password);
            
            ResultSet rs = ps.executeQuery();
            result = rs.next();
            //gather rest of account information: credit card number and email address
//            currentUser.setFirstName(rs.getString(3));
//            currentUser.setLastName(rs.getString(4));
            currentUser.setLevelsCompleted(rs.getInt(5));
            currentUser.setClassNumber(rs.getString(6));
            currentUser.setEducatorFlag(rs.getInt(7));
        }
        catch(Exception e){}
        return result;
    }
    
    public boolean createAccount(String username, String password, /*String firstname, String lastname,*/ String ClassNum, int isEducator){
        
        try{
            
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/gameofcodes?autoReconnect=true&useSSL=false","root","password");
            /*
            * TODO: Add Password requirements to account creation;
            * ex. at least 1 special character, Use Capital and lowercase alphabetical characters, and numbers
            */
            
            boolean check; //used to see if the given credentials already exist in the table by searching for the ID and Pass
            PreparedStatement ps = con.prepareStatement(
               "select * from accounts where Username=? and Password=? and Educator=?");
            ps.setString(1, username);
            ps.setString(2, password);
            ps.setInt(3, isEducator);
            
            ResultSet rs = ps.executeQuery();
            check = rs.next();
            if(check){
                //System.out.println("Given credentials already exist in table.");
                return false; //found a match in the table to the given "new" credentials, hence deny new entry
            }
            if(isEducator == 1){
                if(ClassNum.equals("NOCLASS")){
                    return false; //cannot have the default string for specifying accounts without a class.
                }
                ps = con.prepareStatement(
                "select * from accounts where ClassNo=? and Educator=?");
                ps.setString(1, ClassNum);
                ps.setInt(2, isEducator);
                
                rs = ps.executeQuery();
                check = rs.next();
                if(check){
                    //System.out.println("An educator account already exists for the given class number.");
                    return false;
                }
                
            }
           
                
            //PAST THIS POINT, THE GIVEN CREDENTIALS ARE CONSIDERED VALID
            //NOW, ADD CREDENTIALS INTO TABLE
            int lvlComp = 0;
            if(isEducator != 0) //If the user specifies that the account will be used for education, all levels will be considered complete
                lvlComp = 5; //5 IS THE CURRENT LEVEL COUNT. WILL EXPAND WHEN THE TIME COMES
                
            ps = con.prepareStatement(
            "INSERT INTO accounts (Username,Password,FirstName,LastName,LevelsCompleted,ClassNo,Educator) VALUES (?,?,?,?,?,?,?)");
            ps.setString(1,username);
            ps.setString(2,password);
//            ps.setString(3,firstname);
//            ps.setString(4,lastname);
            ps.setString(3,"");
            ps.setString(4,"");
            ps.setInt(5,lvlComp);
            ps.setString(6,ClassNum);
            ps.setInt(7,isEducator);
            ps.executeUpdate();
            
        }catch(Exception e){}
        return true;        
    }
    
    public void deleteAccount(String username, String password){
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/gameofcodes?autoReconnect=true&useSSL=false","root","password");
            PreparedStatement ps = con.prepareStatement(
               "DELETE FROM accounts WHERE Username=? and Password=?");
            ps.setString(1, username);
            ps.setString(2, password);
            ps.executeUpdate();
        }
        catch(Exception e){}   
    }
    
    public ArrayList<UserAccount> getStudents(){
        ArrayList<UserAccount> students = new ArrayList<>();
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/gameofcodes?autoReconnect=true&useSSL=false","root","password");
            PreparedStatement ps = con.prepareStatement(
               "select * from accounts where ClassNo=?");
            
            ps.setString(1, this.getClassNumber());
            ResultSet rs = ps.executeQuery();
            while(rs.next() != false){
                if(rs.getInt(5) != 0) continue;
                UserAccount student = new UserAccount();
                student.setUsername(rs.getString(1));
//                student.setFirstName(rs.getString(3));
//                student.setLastName(rs.getString(4));
                student.setLevelsCompleted(rs.getInt(5));
                students.add(student);
            }
        }catch(Exception e){} 
        
        return students;
    }
}
