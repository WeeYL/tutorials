import os
import sys
import shutil

ERROR = '\33[91m'
SUCCESS = '\33[92m'
END = '\33[0m'
DEVICEBOOKED = '\33[41m'
DEVICEAVAILABLE = '\33[42m'

#writeDeviceToFile, writeDeviceIdToFile and writeBuildToFile is required for the robot script capabilities to run without errors 
def writeDeviceToFile(device):
    f = open("SPA/Robot-files/pCloudy-Automation/Projects/Config/device.py", "w")
    f.write('devicefullname = "' + device + '"')
    f.close()
    deleteGeneratedFiles()

def writeDeviceIdToFile(deviceId):
    if deviceId == "empty":
        f = open("SPA/Robot-files/pCloudy-Automation/Projects/Config/deviceId.py", "w")
        f.write('deviceId = ""')
        f.close()
        deleteGeneratedFiles()
    else:
        f = open("SPA/Robot-files/pCloudy-Automation/Projects/Config/deviceId.py", "w")
        f.write('deviceId = "' + str(deviceId) + '"')
        f.close()
        deleteGeneratedFiles()
    
def writeBuildToFile(build):
    f = open("SPA/Robot-files/pCloudy-Automation/Projects/Config/build.py", "w")
    f.write('buildfullname = "' + build + '"')
    f.close()
    deleteGeneratedFiles()

# Confirmation page to confirm user wish to generate new tokens
def requestNewToken():
    sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
    from generateToken import generateNewToken
    from APIFunctions import clearConsole
    
    clearConsole()
    user_input = input("Are you sure to confirm a new token?? (Y/N): ")
    if user_input.upper() == "Y":
        generateNewToken()
        deleteGeneratedFiles()
    else:
        clearConsole()
        return 0

# Allow user to select which script they would like to execute
def selectLocalScript():
    folderPath = "SPA/Robot-files/pCloudy-Automation/Projects/RobotDataFiles"
    filesList = []

    # Filter and store only robot scripts into the list
    for fileName in os.listdir(folderPath):
        if ".robot" in fileName:
            filesList.append(fileName)

    print("\n=========== Local Scripts ==============")
    for i in range(len(filesList)):
        print(str(i+1) + "." + filesList[i])
    print("=======================================")

    user_input = input("Please select one script that you would like to run: ")
    deleteGeneratedFiles()
    return(filesList[int(user_input)-1])

# Returns the device ID based on the dictionary in deviceDB
def getDeviceId(device_fullname):
    sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
    from OutputData.Devices.deviceDB import dictionary
    try:
        deviceId = dictionary[device_fullname][0] 
        return deviceId  
    except KeyError:
        return 0
    
# Returns the device region based on the dictionary in deviceDB
def getDeviceRegion(device_fullname):
    sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
    from OutputData.Devices.deviceDB import dictionary
    return dictionary[device_fullname][1]

# Sets the path for the robot script to execute
def setRemotePath(region, choice):
    region_to_writtten = ""
    if choice == 0:
        if region == "india":
            region_to_writtten = "device"
        elif region == "india-west":
            region_to_writtten = "ind-west"
        elif region == "singapore":
            region_to_writtten = "sg"
        elif region == "us":
            region_to_writtten = "us"
        with open("SPA/Robot-files/pCloudy-Automation/Projects/Config/remotePath.py", "w") as file:
            file.write('remotePath = "https://' + region_to_writtten + '.pcloudy.com/appiumcloud/wd/hub"')
        deleteGeneratedFiles()
        return region_to_writtten
    elif choice == 1:
        with open("SPA/Robot-files/pCloudy-Automation/Projects/Config/remotePath.py", "w") as file:
            file.write('remotePath = "' + region + '"')
            deleteGeneratedFiles()
            file.close()

def deleteGeneratedFiles():
    directory_to_be_removed = ["pabot_results", "SPA/Robot-files/pCloudy-Automation/Projects/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/Config/Queues/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/Config/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/OutputData/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/OutputData/Devices/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/OutputData/Tokens/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/RobotDataFiles/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/Scripts/__pycache__"]
    for i in range(len(directory_to_be_removed)):
        shutil.rmtree(directory_to_be_removed[i], ignore_errors=True)

# deleteGeneratedFiles()