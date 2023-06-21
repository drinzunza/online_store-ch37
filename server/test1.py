### dictionaries
user = {
    "username":"Adrian",
    "last_name":"Rodriguez",
    "age":36
}
print (user)
print (type(user))
print (user["username"] + " " + user["last_name"] + " ")

#list = (array)
numbers = [1,2,3]
print (numbers)
#add
numbers.append(4)
print (numbers)

#length
print (len(numbers))#count of items 
print (len(user["username"]))#count the characters
print (len(user))#count the keys

##########
ages = [32, 74, 20, 69, 52, 26, 31, 77, 43, 73, 51, 57, 19, 79, 40, 34, 27, 23, 21, 44, 53, 55, 24, 36, 41, 47, 78, 46, 68, 75, 49, 83, 61, 60, 29, 56, 67, 17, 70, 81, 87, 38]

#print all ages or all numbers
#sum all the numbers (ages)
def exc1():
    #print all the ages
    total =  0
    for age in ages:
        total = total + age
        print(age)
    print(total)
exc1()
#print all the numbers greater or equal to than 21 and less than 40
#count and how many user are equal or greater than 21 and less than 40
def exc2():
    count = 0
    for age in ages:
        if age >= 21 and age <= 40: 
            print(age)
            count += 1
    print(count)
exc2()
    