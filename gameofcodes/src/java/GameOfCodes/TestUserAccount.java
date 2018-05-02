/*
 */
package GameOfCodes;

import org.junit.*;



/**
 *
 * @author Felix Perez
 */
public class TestUserAccount {
    @Test
    public void testReadAccountInfoFailure(){
        System.out.println("Test Read Account Info - Failure: Started");
        UserAccount test = new UserAccount();
        test.setClassNumber("1337");
        test.setEducatorFlag(1);
//        test.setFirstName("John");
//        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("anotheruser");
        
        test.deleteAccount(test.getUsername(), test.getPassword());
        
        Assert.assertFalse("Test Read Account Info - Failure", test.readAccountInfo(test.getUsername(), test.getPassword(), test));
        
        System.out.println("Test Read Account Info - Failure: Completed");

    }
    @Test
    public void testCreateAccountSuccess(){
        System.out.println("Test Create Account - Success: Started");
        UserAccount test = new UserAccount();
        test.setClassNumber("1337");
        test.setEducatorFlag(1);
//        test.setFirstName("John");
//        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("anotheruser");
        
        Assert.assertTrue("Test Create Account - Success",test.createAccount(test.getUsername(),test.getPassword(), 
                /*test.getFirstName(), test.getLastName(),*/ test.getClassNumber(), test.getEducatorFlag()));
        
        test.deleteAccount(test.getUsername(), test.getPassword());
        System.out.println("Test Create Account - Success: Completed");
    }
    @Test
    public void testCreateAccountFailure(){
        System.out.println("Test Create Account - Failure: Started");
        UserAccount test = new UserAccount();
        test.setClassNumber("1337");
        test.setEducatorFlag(1);
//        test.setFirstName("John");
//        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("anotheruser");
        
        test.createAccount(test.getUsername(),test.getPassword(), 
                /*test.getFirstName(), test.getLastName(),*/ test.getClassNumber(), test.getEducatorFlag());
        
        Assert.assertFalse("Test Create Account - Failure",test.createAccount(test.getUsername(),test.getPassword(), 
                /*test.getFirstName(), test.getLastName(),*/ test.getClassNumber(), test.getEducatorFlag()));
        
        test.deleteAccount(test.getUsername(), test.getPassword());
        System.out.println("Test Create Account - Failure: Completed");
    }
    @Test
    public void testReadAccountInfoSuccess(){
        System.out.println("Test Read Account Info - Success: Started");
        UserAccount test = new UserAccount();
        test.setClassNumber("1337");
        test.setEducatorFlag(1);
//        test.setFirstName("John");
//        test.setLastName("Doe");
        test.setLevelsCompleted(0);
        test.setPassword("password");
        test.setUsername("anotheruser");
        
        test.createAccount(test.getUsername(), test.getPassword(), /*test.getFirstName(), test.getLastName(),*/ test.getClassNumber(), test.getEducatorFlag());
        
        Assert.assertTrue("Test Read Account Info - Success",test.readAccountInfo(test.getUsername(), test.getPassword(), test));
        
        test.deleteAccount(test.getUsername(), test.getPassword());
        System.out.println("Test Read Account Info - Success: Completed");
    }   
}
