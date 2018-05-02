package GameOfCodes;


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
                    /*user.getFirstName(), user.getLastName(),*/
                    user.getClassNumber(), user.getEducatorFlag());
        }else{
            /*Other account data is filled into the UserAccount class if readAccountInfo is successful*/
            result = user.readAccountInfo(user.getUsername(), user.getPassword(), user);
        }
        return result;
    }
    
}
