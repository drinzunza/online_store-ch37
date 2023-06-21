users = [
    {
        'id': 1,
        'name': 'Alice',
        'gender': 'female',
        'age': 25,
        'preferred_color': 'blue'
    },
    {
        'id': 2,
        'name': 'Bob',
        'gender': 'male',
        'age': 35,
        'preferred_color': 'GREEN'
    },
    {
        'id': 3,
        'name': 'Charlie',
        'gender': 'male',
        'age': 45,
        'preferred_color': 'Red'
    },
    {
        'id': 4,
        'name': 'Danielle',
        'gender': 'female',
        'age': 30,
        'preferred_color': 'YelloW'
    },
    {
        'id': 5,
        'name': 'Evelyn',
        'gender': 'female',
        'age': 20,
        'preferred_color': 'PuRplE'
    },
    {
        'id': 6,
        'name': 'Frank',
        'gender': 'male',
        'age': 28,
        'preferred_color': 'purple'
    },
    {
        'id': 7,
        'name': 'Grace',
        'gender': 'female',
        'age': 31,
        'preferred_color': 'GREEN'
    },
    {
        'id': 8,
        'name': 'Henry',
        'gender': 'male',
        'age': 40,
        'preferred_color': 'BLUE'
    },
    {
        'id': 9,
        'name': 'Isabelle',
        'gender': 'female',
        'age': 27,
        'preferred_color': 'red'
    },
    {
        'id': 10,
        'name': 'Jack',
        'gender': 'male',
        'age': 24,
        'preferred_color': 'yellow'
    }
]

#logic

def exa1():
    #print all the names
    for user in users:
        print (user["name"])
exa1()

#count how many are males and how many are females
def exa2():
    females = 0
    male = 0
    for user in users:
        gender = user["gender"]
        if gender == "female":
            females += 1
        elif gender == "male":
            male += 1
    print ("there are " + str(females) + " females and " + str(male)+" males")
    print (f"there are {females} females and {male} males")
exa2()

def find_by_id(id): #create a function that returns a key using the id
    for user in users:
        if user["id"] == id:
            print (user)
    
    #string formatting
    
find_by_id(2)
find_by_id(4)