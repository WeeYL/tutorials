from time import sleep
import requests
import os
from Devices.deviceDB import dictionary
from Config.projectsPath import projectsPath

import sys
ERROR = '\33[91m'
SUCCESS = '\33[92m'
END = '\33[0m'
clearConsole = lambda: print('\n' * 50)

def getDeviceId(device_fullname):
    return dictionary[device_fullname][0]

def getDeviceRegion(device_fullname):
    return dictionary[device_fullname][1]

# This function stores all devices available on 4 different endpoints from pcloudy cloud into a dictionary
def storeDevices(): 
    sys.path.append(projectsPath)
    from Tokens.token_india import generatedToken_india
    from Tokens.token_india_west import generatedToken_india_west
    from Tokens.token_singapore import generatedToken_singapore
    from Tokens.token_us import generatedToken_us
    from Config.androidOSList import androidVersionList as androidOSVersion

    # API_URL stored in a list, such that it will loop through each endpoint
    # The four different token are stored in a list for each different endpoint
    # /region is used to print out which device is in which region
    # reponse list is used to store the 4 different response from the 4 different endpoints
    API_URL_LIST = ["https://device.pcloudy.com/api/devices", "https://ind-west.pcloudy.com/api/devices", "https://sg.pcloudy.com/api/devices", "https://us.pcloudy.com/api/devices"]
    token_list = [generatedToken_india, generatedToken_india_west, generatedToken_singapore, generatedToken_us]
    region = ["india", "india-west", "singapore", "us"]
    response = []

    # Used to store the number of devices for each endpoint
    numOfDevices = []

    # Sets the starting codes for the file
    with open(f'{projectsPath}/OutputData/Devices/deviceDB.py', "w") as file:
        file.write("dictionary = { ")
        file.close()

    # Here it will start to check the devices from one ENDPOINT URL at a time
    for i in range(len(API_URL_LIST)):
        headers = {
            'Content-Type': 'application/json',
        }

        json_data = {
            'token': token_list[i],
            'duration': 10,
            'platform': 'android',
            'available_now': False
        }

        # Returns the .json and check how many devices are on this enpoint
        response = requests.post(API_URL_LIST[i], headers=headers, json=json_data)
        numOfDevices = len(response.json()["result"]["models"])

        # Loops through each devices, and extract the full name and id
        for x in range(numOfDevices):

            device_fullName = response.json()["result"]["models"][x]['full_name']
            device_id = response.json()["result"]["models"][x]['id']

            # Now it checks if each device, matches any of the android version specified in the androidOSVersion list
            for n in range (len(androidOSVersion)):

                # If it matches, it will store into the deviceDB.py
                if (response.json()["result"]["models"][x]['version']) == androidOSVersion[n]:
                    with open(f'{projectsPath}/OutputData/Devices/deviceDB.py', "a") as file:
                        file.write('"' + str(device_fullName) + '": [' + str(device_id) + ', "' + region[i] + '", "' + androidOSVersion[n] + '"], ')
                        file.close()

    # Removes the last two character and replace with a } to close the dictionary
    with open(f'{projectsPath}/OutputData/Devices/deviceDB.py', "a") as file:
        file.seek(file.tell() - 2, os.SEEK_SET)
        file.truncate()
        file.write(" }")
        file.close()

# This is used to convert the data in deviceDB to multiple list according to the required android versions
def storeDevicesIntoQueue(): 
    from Config.androidOSList import androidVersionList as androidOSVersion
    from Config.androidOSList import fileName as fileName

    # Program will check all devices against the versions in the androidOSVersion list
    for i in range(len(androidOSVersion)):

        # Using i as an index, it will check for android version 7.0.0, and create seven_queue.py first
        # Writes the starting codes in each py files
        with open(f'{projectsPath}/Config/Queues/' + fileName[i], "w") as file:
                file.write("queue = [ ")
                file.close()

        # As the devices are stored in a dictionary format in deviceDB.py, we can access the key (device full name)
        # and value (id, region, version)
        # We iterate all the key value pair, and if any matches the android version we looking for, we write to the file
        for key, value in dictionary.items():
            # For example, value[2]==7.0.0 matches androidOSVersion[0]==7.0.0
            if value[2] == androidOSVersion[i]:
                with open(f'{projectsPath}/Config/Queues' + '/' +fileName[i], "a") as file:
                            file.write('"' + str(key) + '", \n')
                            file.close()

        # Remove the last 2 character in the py file, and replace with ] to close the list
        with open(f'{projectsPath}/Config/Queues' + '/' +fileName[i], "a") as file:
            file.seek(file.tell() - 3, os.SEEK_SET)
            file.truncate()
            file.write(" ]")
        file.close()

# This is used as a checker, to ensure the names are correct in the list
# This is used to check against the deviceDB
def verifyQueue():
    clearConsole()
    from Config.Queues.eight_queue import queue as eight_queue
    from Config.Queues.nine_queue import queue as nine_queue
    from Config.Queues.ten_queue import queue as ten_queue
    from Config.Queues.eleven_queue import queue as eleven_queue
    from Config.Queues.twelve_queue import queue as twelve_queue
    from Config.androidOSList import fileName as test_queue_result

    test_queue = [eight_queue, nine_queue, ten_queue, eleven_queue, twelve_queue]
    indicator = 0

    try:
        for i in range(len(test_queue)):
            for x in range(len(test_queue[i])):
                queue_name = test_queue[i]
                device_fullname = queue_name[x]

                getDeviceId(device_fullname)
                getDeviceRegion(device_fullname)
            indicator += 1
            print(SUCCESS + "No errors in " + test_queue_result[i].split(".")[0] + "." + END)
            sleep(1)
    except KeyError:
        print(ERROR + "Errors in " + test_queue_result[indicator].split(".")[0] + ": " + device_fullname + END +"\n")
    except:
        print("Error")
    
# storeDevices()
# verifyQueue()
# storeDevicesIntoQueue()