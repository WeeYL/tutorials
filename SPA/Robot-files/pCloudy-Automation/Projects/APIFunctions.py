from ast import Continue
from time import sleep
import requests
import sys
from Config.projectsPath import projectsPath

ERROR = '\33[91m'
SUCCESS = '\33[92m'
END = '\33[0m'

# This python file is use to handle all API calls. The tokens are retrieved under Output folders. There are 4 different endpoints, and 
# each endpoints has different phones hosted on it. The 4 endpoints are India, India-West, Singapore and US.

# This is used to clear the console for improved readability
clearConsole = lambda: print('\n' * 50)

# set python import path
sys.path.append(projectsPath)

# This function is used to upload any build to the pCloudy cloud. User must specify the path of the build he/she would like to upload.
def uploadBuild(choice):
    if choice == 0:
        API_URL = 'https://device.pcloudy.com/api/upload_file'
        from Functions import deleteGeneratedFiles
        from OutputData.Tokens.token_india import generatedToken_india
        from APIFunctions import clearConsole

        # clearConsole()

        token = generatedToken_india
        while True:
            while True:
                # filePath = input("Enter the path of the file you wish to upload: ")
                filePath = f"{projectsPath}\\Builds\\app-singpass-stg-release-protected.apk"
                # filePath=r"C:\Users\User\Desktop\tutorials\pCloudy-Automation\Projects\Builds\app-singpass-stg-release-protected.apk"
                try:
                    open(filePath)
                    break
                except IOError:
                    print(ERROR + "Invalid file path." + END)
                except:
                    print(ERROR + "Invalid file path." + END)

            data = {
                'file': open(filePath, 'rb'),
                'source_type': (None, 'raw'),
                'token': (None, token),
                'filter': (None, 'all'),
            }

            response = requests.post(API_URL, files=data)

            if response.json()["result"]["code"] == 200:        # 200 = success call
                print("> [" + SUCCESS + filePath.split("/")[-1] + END + "] has been uploaded successfully.")
                deleteGeneratedFiles()
                break
            else:
                print("> " + ERROR + "Upload unsucessful." + END)

    if choice == 1:
        API_URL = 'https://device.pcloudy.com/api/upload_file'
        from Functions import deleteGeneratedFiles
        from OutputData.Tokens.token_india import generatedToken_india
        token = generatedToken_india
        from Config.filePath import filePath

        while True:

            filePath = f"{projectsPath}/Builds/app-singpass-stg-release-protected.apk"
            data = {
                'file': open(filePath, 'rb'),
                'source_type': (None, 'raw'),
                'token': (None, token),
                'filter': (None, 'all'),
            }

            response = requests.post(API_URL, files=data)

            if response.json()["result"]["code"] == 200:                                     # 200 = success
                print("[" + SUCCESS + filePath.split("/")[-1] + END + "] has been uploaded successfully.")    # Print out the build name
                break
            else:
                print("> " + ERROR + "Upload unsucessful." + END)
                sleep(5)

# This funciton is used to ask user to select either an android/iOS build and display all the build available on the cloud
def viewBuild(build):
    from Functions import deleteGeneratedFiles
    from OutputData.Tokens.token_india import generatedToken_india
    token = generatedToken_india
    
    API_URL = 'https://device.pcloudy.com/api/drive'
    filesList = []                  # Creates a list to store all the available files in pCloudy

    if build == 1:          # Build == 1 means enquiring for a build
        user_input = input("\nEnter the name of you build: ")
    else:                   # By default, user will need to choose which build to view
        user_input = input("\nWhat build type would you like to view?\n1 - apk\n2 - ipa\nAny key - all\nYour selection: ")
    if user_input == "1":           # Check which type of build user select and parse it in under json_data
        filter = "apk"
    elif user_input == "2":
        filter = "ipa"
    else:
        filter = "all"

    headers = {
        'Content-Type': 'application/json',
    }
    
    json_data = {
        'token': token,
        'limit': 100,
        'filter': filter,
    }

    response = requests.post(API_URL, headers=headers, json=json_data)
    numOfFiles = len(response.json()["result"]["files"])                    # Get the number of builds returned in json

    print("\n======== Available applications ========")
    num = 1
    for i in range (numOfFiles): 

        if build == 1:
            if user_input in response.json()["result"]["files"][i]['file']:     # Checks if the user input matches any of the build
                print(str(num) + ". " + response.json()["result"]["files"][i]['file'] + " found")
                num+=1
        else:
            print(i+1, ":", response.json()["result"]["files"][i]['file'])      # Prints all builds based on input factors
            filesList.append(response.json()["result"]["files"][i]['file'])     # Stores these builds into a list
    
    print("========================================")
    deleteGeneratedFiles()
    return filesList                                                        # Return the files list to the function that calls this

# This function does not have any API calls, rather it just print out message and take user input on which file to delete
def getDeleteBuild():
    from Functions import deleteGeneratedFiles
    filesList = []
    filesList = viewBuild(0)                 # Stores the returned list in a list
    size = int(len(filesList))               # Get the number of builds in the list

    while True:
        userInput = input("\nWhich build would you like to delete? Choose the number 1 - " + str(size) + ": ")

        if int(userInput) > 0 and int(userInput) < size:

            fileName = str(filesList[int(userInput)-1])         # Store the chosen build into a variable
            userChoice = input("\nYou have choosen to delete: " + ERROR + fileName + END + "\n1 - Confirm\n2 - Select another file\n0 - Exit to menu\nYour selection: ")

            if userChoice == "1":
                deleteGeneratedFiles()
                return fileName
            elif userChoice == "2":
                deleteGeneratedFiles()
                Continue
            elif userChoice == "0":
                deleteGeneratedFiles()     
                return "0"              
            else:
                print("Invalid selection. Please choose another.")
            deleteGeneratedFiles()
        else:
            deleteGeneratedFiles()
            print("\nInvalid selection. Please choose another.")
            

# This function is used to execute the deletion of the build from the pCloudy server
def deleteBuild():
    from Functions import deleteGeneratedFiles
    from OutputData.Tokens.token_india import generatedToken_india
    token = generatedToken_india

    fileName = getDeleteBuild()         # Stores the return targetted build to be deleted into a variable

    if fileName != "0":                 # Checks if the user select 0 in the previous input        
        API_URL = 'https://device.pcloudy.com/api/delete_file'

        headers = {
        'Content-Type': 'application/json',
        }

        json_data = {
            'token': token,
            'filename': fileName,
            'dir': 'data',
            'filter': 'ALL',
        }

        response = requests.post(API_URL, headers=headers, json=json_data)

        if response.json()["result"]["code"] == 200:    # 200 = Successful call
            print("> [" + SUCCESS + fileName + END + "] has been successfully deleted.")
            deleteGeneratedFiles()
        else:
            print("> " + ERROR + "Delete unsuccessful." + END)

def getDevicesByVersion(android_version):
    # For retrieving the device list, there are 4 end points to retrieve the device. 
    from OutputData.Tokens.token_india import generatedToken_india
    from OutputData.Tokens.token_india_west import generatedToken_india_west
    from OutputData.Tokens.token_singapore import generatedToken_singapore
    from OutputData.Tokens.token_us import generatedToken_us
    
    from Functions import deleteGeneratedFiles

    # API_URL stored in a list, such that the for loop will loop through each endpoint
    # The four different token are stored in a list, such that the loop will use all token, for different endpoints
    # token_list_region is used to print out which device is in which region
    # reponse list is used to store the 4 different response from the 4 different endpoints
    API_URL_LIST = ["https://device.pcloudy.com/api/devices", "https://ind-west.pcloudy.com/api/devices", "https://sg.pcloudy.com/api/devices", "https://us.pcloudy.com/api/devices"]
    token_list = [generatedToken_india, generatedToken_india_west, generatedToken_singapore, generatedToken_us]
    token_list_region = ["India", "India-West", "Singapore", "US"]
    response = []

    # numOfDevices list is used to store the number of devices for each endpoint
    numOfDevices = []
    deviceList = []
    orderNum = 1

    # For loop will iterate thorugh each endpoint, and in each endpoint, loop through the response
    print("\n=========== Available devices ===========")
    for i in range(4):
        headers = {
            'Content-Type': 'application/json',
        }

        json_data = {
            'token': token_list[i],
            'duration': 10,
            'platform': 'android',      # Hardcoded as regression testing only requires android ATM
            'available_now': 'true'
        }

        response.append(requests.post(API_URL_LIST[i], headers=headers, json=json_data))
        numOfDevices.append(len(response[i].json()["result"]["models"]))
        
        for x in range(numOfDevices[i]):
            device_fullName = response[i].json()["result"]["models"][x]['full_name']
            if (response[i].json()["result"]["models"][x]['version']) == android_version:
                print(orderNum, ": (" + token_list_region[i] + ")", device_fullName)                  # Prints the available devices in order
                deviceList.append(device_fullName)                      # Adds the device to the list
                orderNum+=1                                             # Incrementing variable to let user choose
    print("=========================================")
    deleteGeneratedFiles()
    return deviceList

# This function is used to display all the devices available on 4 different endpoints
def getDevices():
    # For retrieving the device list, there are 4 end points to retrieve the device. 
    from OutputData.Tokens.token_india import generatedToken_india
    from OutputData.Tokens.token_india_west import generatedToken_india_west
    from OutputData.Tokens.token_singapore import generatedToken_singapore
    from OutputData.Tokens.token_us import generatedToken_us
    from Config.androidOSList import androidVersionList
    from Functions import deleteGeneratedFiles

    # API_URL stored in a list, such that the for loop will loop through each endpoint
    # The four different token are stored in a list, such that the loop will use all token, for different endpoints
    # token_list_region is used to print out which device is in which region
    # reponse list is used to store the 4 different response from the 4 different endpoints
    API_URL_LIST = ["https://device.pcloudy.com/api/devices", "https://ind-west.pcloudy.com/api/devices", "https://sg.pcloudy.com/api/devices", "https://us.pcloudy.com/api/devices"]
    token_list = [generatedToken_india, generatedToken_india_west, generatedToken_singapore, generatedToken_us]
    token_list_region = ["India", "India-West", "Singapore", "US"]
    response = []

    # numOfDevices list is used to store the number of devices for each endpoint
    numOfDevices = []
    deviceList = []
    orderNum = 1

    while True:
        msg_string = "\nPlease input the OS version you would like to view:"
        for i in range(len(androidVersionList)):
            msg_string += "\n" + str(i+1) + ": " + androidVersionList[i]
        msg_string += "\nYour choice: "

        user_input = input(msg_string)
        
        if int(user_input) < 1 or int(user_input) > 6:                      # Validation
            print("\nInvalid input!\n")
        else:
            selectedOSVersion = androidVersionList[int(user_input)-1]       # Store the selected OS version into a variable
            print("You have selected: " + SUCCESS + selectedOSVersion + END) 
            break
    
    # For loop will iterate thorugh each endpoint, and in each endpoint, loop through the response
    print("\n=========== Available devices ===========")
    for i in range(4):
        headers = {
            'Content-Type': 'application/json',
        }

        json_data = {
            "token": token_list[i],
            "duration": 10,
            "platform": "android",      # Hardcoded as regression testing only requires android ATM
            "available_now": "true"
        }

        response.append(requests.post(API_URL_LIST[i], headers=headers, json=json_data))
        numOfDevices.append(len(response[i].json()["result"]["models"]))
        
        for x in range(numOfDevices[i]):
            device_fullName = response[i].json()["result"]["models"][x]['full_name']
            if (response[i].json()["result"]["models"][x]['version']) == selectedOSVersion:
                print(orderNum, ": (" + token_list_region[i] + ")", device_fullName)                  # Prints the available devices in order
                deviceList.append(device_fullName)                      # Adds the device to the list
                orderNum+=1                                             # Incrementing variable to let user choose
    print("=========================================")
    deleteGeneratedFiles()
    return deviceList, selectedOSVersion

# This function is used to delete a script immediately after script execution
def deleteBuildAfterScript(build_name):
    from Functions import deleteGeneratedFiles
    from OutputData.Tokens.token_india import generatedToken_india
    token = generatedToken_india

    API_URL = 'https://device.pcloudy.com/api/delete_file'

    headers = {
    'Content-Type': 'application/json',
    }

    json_data = {
        'token': token,
        'filename': build_name,
        'dir': 'data',
        'filter': 'ALL',
    }

    response = requests.post(API_URL, headers=headers, json=json_data)

    if response.json()["result"]["code"] == 200:    # 200 = Successful call
        print("> [" + SUCCESS + build_name + END + "] has been successfully deleted.")
    else:
        print("> " + ERROR + "Delete unsuccessful." + END)
    deleteGeneratedFiles()

# This method is used to book the device on the pcloudy server. 
def bookDevice(id, region, deviceFullName):

    from Functions import deleteGeneratedFiles
    from generateToken import generateNewIndiaToken, generateNewIndiaWestToken, generateNewSgToken, generateNewUsToken

    if region == "device":
        token = generateNewIndiaToken()
    elif region == "ind-west":
        token = generateNewIndiaWestToken()
    elif region == "sg":
        token = generateNewSgToken()
    elif region == "us":
        token = generateNewUsToken()

    headers = {
        'Content-Type': 'application/json',
    }

    json_data = {
        'token': token,
        'duration': '15',
        'platform': 'android',
        'devices': [id],
        'session': deviceFullName + "automation",
        'overwrite_location': 'true',
    }

    response = requests.post('https://'+ region +'.pcloudy.com/api/appium/init', headers=headers, json=json_data)

    # Error handling when the selected device is booked before user books it
    if "code" in response.json()['result'] and response.json()['result']["device_ids"]:
        rid = response.json()["result"]["device_ids"][0]["rid"]
        deleteGeneratedFiles()
        return ["success", token, rid]
    elif "error" in response.json()['result']:
        deleteGeneratedFiles()
        return ["failure", 404]
    else:
        deleteGeneratedFiles()
        return ["failure", 404]

# This method is used to "remove" the booked device
def releaseDevice(rid, token, region):
    from Functions import deleteGeneratedFiles
    headers = {
        'Content-Type': 'application/json',
    }

    json_data = {
        'token': token,
        'rid': rid,
        'release_after': '0',
    }

    requests.post('https://'+region+'.pcloudy.com/api/appium/update_session', headers=headers, json=json_data)
    deleteGeneratedFiles()

# For automation script. This is so that no user selection is required
def getFirstBuild():
    
    from Functions import deleteGeneratedFiles
    from OutputData.Tokens.token_india import generatedToken_india
    token = generatedToken_india

    API_URL = 'https://device.pcloudy.com/api/drive'

    headers = {
        'Content-Type': 'application/json',
    }
    
    json_data = {
        'token': token,
        'limit': 100,
        'filter': 'apk',
    }
    
    response = requests.post(API_URL, headers=headers, json=json_data)
    buildName = response.json()["result"]["files"][0]['file']
    print("> Build name: " + buildName)
    deleteGeneratedFiles()
    return buildName     

# This API is required after booking
def executeAppium(token, app, region):
    
    from Functions import deleteGeneratedFiles

    headers = {
        'Content-Type': 'application/json',
    }

    json_data = {
        'token': token,
        'app': app,
    }

    while True:

               # get endpoint
        headers = {
        'Content-Type': 'application/json',
        }

        json_data = {
            'token': token,
        }
        getNewEndPt = requests.post('https://device.pcloudy.com/api/appium/endpoint', headers=headers, json=json_data)

        print("appium/endpoint", getNewEndPt.json()['result'])

        response = requests.post('https://'+region+'.pcloudy.com/api/appium/execute', headers=headers, json=json_data)
        print('/appium/execute',response.json())
        if "endpoint" in response.json()["result"]:
            endpoint = response.json()["result"]["endpoint"]
            break
        else:
            sleep(10)

 
    # The json file returns URL link with \\, hence code will correct the json errors and return the new end point
    string_replaced = endpoint.replace('\\','')
    string_to_be_appended = '/wd/hub'
    new_endpoint = string_replaced + string_to_be_appended
    deleteGeneratedFiles()
    return new_endpoint

# Disable the "Keep Android Acitivities options"
def executeADB(token, rid, region):

    APIURL = 'https://'+region+'.pcloudy.com/api/execute_adb'

    headers = {
    'Content-Type': 'application/json',
    }

    json_data = {
        'token': token,
        'rid': rid,
        'adbCommand': 'adb shell settings put global always_finish_activities 0',
    }

    requests.post(APIURL, headers=headers, json=json_data)