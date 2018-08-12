import random
def main():
    problem67()
    return

    problem14()
    return

    problem9(1000)
    return

    problem4()
    return
    
    problem3(600851475143)
    return
    problem2()
    return
    x = 10
    while x <= 10**9:
        problem1(x)
        x *= 10
    return

def problem67():
    file = open("triangle.txt", "r")
    content = file.read()
    lines = content.split("\n")
    triangle = []
    for line in lines:
        line = line.split(" ")
        newline = []
        for strs in line:
            #print(str)
            #print(0)
            newline.append(int(strs))
        triangle.append(newline)
    AnimalNum = 100;
    Gen = createNewGeneration(AnimalNum)
    #print(Gen)
    for GenerationNum in range(20001):
        if GenerationNum % 1000 == 0:
            print("Generation: " + str(GenerationNum))

        testGen(Gen,triangle,GenerationNum)

        fillGen(Gen,AnimalNum)
        if GenerationNum % 1000 == 0:
            print("")
            #x = random.randint(0,1)


def fillGen(Gen,AnimalNum):
    while len(Gen) < AnimalNum:
        parent1 = Gen[random.randint(0,len(Gen) - 1)]
        parent2 = Gen[random.randint(0,len(Gen) - 1)]
      
        Gen.append(createOffspring(parent1,parent2))
        


def createOffspring(parent1,parent2):
    newchild = []
    i = 0
    while i < len(parent1):
        if random.randint(0,5) == 0:
            if random.randint(0,10) == 0:
                if parent1[i] == 1:
                    newchild.append(0)
                else:
                    newchild.append(1)
            else:
                newchild.append(parent1[i])
        else:
            if random.randint(0,30) == 0:
                if parent2[i] == 1:
                    newchild.append(0)
                else:
                    newchild.append(1)
            else:
                newchild.append(parent2[i])
        i += 1
    return newchild


def testGen(Gen,triangle, GenerationNum):
    #test each animals' fitness
    max = 0
    min = 8000
    sum = 0
    i = 0
    while i < len(Gen):
        F = fitness(Gen[i],triangle)
        sum += F
        if F >= max:
            max = F
            if GenerationNum % 1000 == 0:
                maxf = i
        if F <= min:
            min = F
        i += 1
    if GenerationNum % 1000 == 0:
        print("Max: " + str(max))
        print("Min: " + str(min))
    if GenerationNum % 1000 == 0:
        print(Gen[maxf])
    i += 1
    average = sum / (i - 1)
    if GenerationNum % 1000 == 0:
        print("Average: " + str(average))
    i = 0
    while i < len(Gen):
        #print(fitness(Gen[i],triangle))
        if fitness(Gen[i],triangle) < average:
            Gen.pop(i)
            #print("pop")
        if average == max:
            for x in range(99):
                Gen.pop
        i += 1


def createNewGeneration(n):
    Gen = [] #7122#[[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]]
    #[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
    #[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    #[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
    for i in range(n - 1):
        newAnimal = []
        for j in range(100):
            newAnimal.append(random.randint(0,1))
        Gen.append(newAnimal)
    return Gen
    

def fitness(animal,triangle):
    pointer = 0
    i = 0
    sum = 0
    while i < len(triangle) - 1:
        sum += triangle[i][pointer]
    
        if animal[i] == 1:
            if triangle[i + 1][pointer] < triangle[i + 1][pointer + 1]:
                pointer += 1
        else:
            if triangle[i + 1][pointer] >= triangle[i + 1][pointer + 1]:
                pointer += 1
        i += 1
    return sum




    
def problem14():
    x = 1
    max = 0
    
    while x <= 1000000:
        chain = 0
        xold = x
        while not x == 1:
            if x % 2 == 0:
                x /= 2
            else:
                x = 3*x + 1
            chain += 1
        if chain >= max:
            max = chain
            print(xold)
            print("chain: ", chain)
        x = xold + 1

def problem9(x):
    a = 0
    b = 0
    while(b + a < x):
        if (a * a + b * b) ** .5 % 1 == 0:
            if a + b + (a * a + b * b) ** .5 == x:
                print(a,b,(int) ((a * a + b * b) ** .5))
                return
        if b == a:
            b = 0
            a += 1
        else:
            b += 1
        #print(a,b)



def problem4():
    x = 100
    y = 100
    max = 0
    while x <= 999:
        while y <= 999:
            if palindrome(x * y) and max < x * y:
                max = x * y
            y += 1
        x += 1
        y = x
    
    print(max)

def palindrome(x):
    strx = str(x)
    i = 0
    while i < len(strx)//2:
        if not strx[i] == strx[len(strx) - 1 - i]:
            return False
        i += 1
    return True


    
def problem3(x):
    primes = [2]
    i = 0
    while not x == 1 or x > primes[len(primes) - 1]:
        
        i = len(primes) - 1
        while x % primes[i] == 0:
            print(primes[i])
            x /= primes[i]
        
        j = primes[len(primes) - 1]
        jIsNotPrime = True
        while(jIsNotPrime):
            j += 1
            jIsNotPrime = False
            for prime in primes:
                if j % prime == 0:
                    jIsNotPrime = True
                    break
        #print(primes)
        primes.append(j)
        i += 1


def problem2():
    x = 1
    y = 1
    sum = 0
    while(x <= 1000000):
        #print(x)
        if x % 2 == 0:
            sum += x
            print(sum)
        y += x
        #print(y)
        if y % 2 == 0:
            sum += y
            print(sum)
        x += y



    
def problem1(x):
    i = 0
    sum = 0
    while i < x:
        if i % 3 == 0 or i % 5 == 0:
            #print(i)
            sum += i
        i += 1
    print("sum: ",sum)



if __name__ == "__main__":
    main()
