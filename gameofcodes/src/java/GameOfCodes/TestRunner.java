/*
 */
package GameOfCodes;

import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;



/**
 *
 * @author Felix Perez
 */
public class TestRunner {
    
    public void runTests(){
        System.out.println("Begin JUnit Testing for Project Java Classes:");
        Result result = JUnitCore.runClasses(ProjectTesting.class);

        /**
         * Loop checks if there were any tests in the result structure that
         * did not complete correctly (not according to the defined assertions
         * in each test). No failures are printed otherwise (Correctness of code
         * proven with current defined tests).
         * */
        for (Failure failure : result.getFailures()) {
            System.out.println("Failure: " + failure.toString());
        }
		
        System.out.println("Were all the JUnit tests successful? ==> " + (result.wasSuccessful()?"Yes!":"No!"));
        System.out.println("JUnit Testing Complete.");
    }
    
}
