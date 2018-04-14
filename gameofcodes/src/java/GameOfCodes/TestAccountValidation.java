/*
 */
package GameOfCodes;

import org.junit.*;

/**
 *
 * @author Felix Perez
 */
public class TestAccountValidation {
    
    @Test
    public void testSuccessfulValidationNewAccount(){
        System.out.println("Test Successful Validation - New Account: Started");
        UserAccount test;
        test = new UserAccount();
        test.setClassNumber("1336");
        test.setEducatorFlag(1);
        test.setFirstName("Jane");
        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("user");
        
        test.deleteAccount(test.getUsername(), test.getPassword());
        
        Assert.assertTrue("Test Successful Validation - New Account",test.createAccount(test.getUsername(), 
                test.getPassword(), test.getFirstName(), test.getLastName(), test.getClassNumber(), test.getEducatorFlag()));
        
        test.deleteAccount(test.getUsername(), test.getPassword());
        System.out.println("Test Successful Validation - New Account: Completed");
    }
    @Test
    public void testSuccessfulValidationExistingAccount(){
        System.out.println("Test Successful Validation - Existing Account: Started");
        UserAccount test;
        test = new UserAccount();
        test.setClassNumber("1336");
        test.setEducatorFlag(1);
        test.setFirstName("Jane");
        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("user");
        
        test.createAccount(test.getUsername(), test.getPassword(), 
                test.getFirstName(), test.getLastName(),
                test.getClassNumber(), test.getEducatorFlag());
        
        Assert.assertTrue("Test Successful Validation - Existing Account",test.readAccountInfo(test.getUsername(), test.getPassword(), test));
        
        test.deleteAccount(test.getUsername(), test.getPassword());
        System.out.println("Test Successful Validation - Existing Account: Completed");
    }
    @Test
    public void testUnsuccessfulValidation(){
        System.out.println("Test Unsuccessful Validation: Started");
        UserAccount test;
        test = new UserAccount();
        test.setClassNumber("1336");
        test.setEducatorFlag(1);
        test.setFirstName("Jane");
        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("user");
        
        test.createAccount(test.getUsername(), test.getPassword(), 
                test.getFirstName(), test.getLastName(),
                test.getClassNumber(), test.getEducatorFlag());
        
        test.setPassword("incorrectpassword");
        
        
        Assert.assertFalse("Test Unsuccessful Validation",test.readAccountInfo(test.getUsername(), test.getPassword(), test));
        
        test.deleteAccount(test.getUsername(), test.getPassword());
        System.out.println("Test Unsuccessful Validation: Completed");
    }
}
