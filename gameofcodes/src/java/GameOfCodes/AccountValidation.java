/*
 */
package GameOfCodes;
import org.junit.*;
import static org.junit.Assert.*;

/**
 *
 * @author Felix Perez
 */
public class AccountValidation {
    public static boolean Validate(UserAccount user, boolean isNewAccount){
        boolean result = false;
        if(isNewAccount){
            /*Note: User's number of levels completed is set in createAccount.*/
            result = user.createAccount(user.getUsername(), user.getPassword(),
                    user.getFirstName(), user.getLastName(),
                    user.getClassNumber(), user.getEducatorFlag());
        }else{
            /*Other account data is filled into the UserAccount class if readAccountInfo is successful*/
            result = user.readAccountInfo(user.getUsername(), user.getPassword(), user);
        }
        return result;
    }
    
    @Test
    public void testNoUsername(){
        UserAccount test = new UserAccount();
        test.setClassNumber("1336");
        test.setEducatorFlag(1);
        test.setFirstName("Jane");
        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername(null);
        
        assertFalse(test.createAccount(test.getUsername(), test.getPassword(), 
                test.getFirstName(), test.getLastName(),
                test.getClassNumber(), test.getEducatorFlag()));
        
    }
    
    @Test
    public void testNoPassword(){
        UserAccount test = new UserAccount();
        test.setClassNumber("1336");
        test.setEducatorFlag(1);
        test.setFirstName("Jane");
        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword(null);
        test.setUsername("user");
        
        assertFalse(test.createAccount(test.getUsername(), test.getPassword(), 
                test.getFirstName(), test.getLastName(),
                test.getClassNumber(), test.getEducatorFlag()));
    }
    
    @Test
    public void testNoFirstName(){
        UserAccount test = new UserAccount();
        test.setClassNumber("1336");
        test.setEducatorFlag(1);
        test.setFirstName(null);
        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("user");
        
        assertFalse(test.createAccount(test.getUsername(), test.getPassword(), 
                test.getFirstName(), test.getLastName(),
                test.getClassNumber(), test.getEducatorFlag()));
    }
    
    @Test
    public void testNoLastName(){
        UserAccount test = new UserAccount();
        test.setClassNumber("1336");
        test.setEducatorFlag(1);
        test.setFirstName("Jane");
        test.setLastName(null);
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("user");
        
        assertFalse(test.createAccount(test.getUsername(), test.getPassword(), 
                test.getFirstName(), test.getLastName(),
                test.getClassNumber(), test.getEducatorFlag()));
    }
    
    /**
     * Note: for the two tests below, it is assumed that the user Jane Doe 
     * with the specified account details below does not exist in the database.
     * If such an account exists, delete the account information an rerun the
     * JUnit Test.
     * */
    @Before
    public void testSuccessfulValidation(){
        UserAccount test = new UserAccount();
        test.setClassNumber("1336");
        test.setEducatorFlag(1);
        test.setFirstName("Jane");
        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("user");
        
        assertTrue(test.createAccount(test.getUsername(), test.getPassword(), 
                test.getFirstName(), test.getLastName(),
                test.getClassNumber(), test.getEducatorFlag()));
    }
    
    @After
    public void testUnsuccessfulValidation(){
        UserAccount test = new UserAccount();
        test.setClassNumber("1336");
        test.setEducatorFlag(1);
        test.setFirstName("Jane");
        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("user");
        
        assertFalse(test.createAccount(test.getUsername(), test.getPassword(), 
                test.getFirstName(), test.getLastName(),
                test.getClassNumber(), test.getEducatorFlag()));
    }
    

}
