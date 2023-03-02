import os
import sys
import shutil
from Config.projectsPath import projectsPath

ERROR = '\33[91m'
SUCCESS = '\33[92m'
END = '\33[0m'
DEVICEBOOKED = '\33[41m'
DEVICEAVAILABLE = '\33[42m'
from Config.projectsPath import projectsPath

# set python import path
sys.path.append(projectsPath)

#writeDeviceToFile, writeDeviceIdToFile and writeBuildToFile is required for the robot script capabilities to run without errors 
def writeDeviceToFile(device):
    f = open(f"{projectsPath}/Config/device.py", "w")
    f.write('devicefullname = "' + device + '"')
    f.close()
    deleteGeneratedFiles()

def writeDeviceIdToFile(deviceId):
    if deviceId == "empty":
        f = open(f"{projectsPath}/Config/deviceId.py", "w")
        f.write('deviceId = ""')
        f.close()
        deleteGeneratedFiles()
    else:
        f = open(f"{projectsPath}/Config/deviceId.py", "w")
        f.write('deviceId = "' + str(deviceId) + '"')
        f.close()
        deleteGeneratedFiles()
    
def writeBuildToFile(build):
    f = open(f"{projectsPath}/Config/build.py", "w")
    f.write('buildfullname = "' + build + '"')
    f.close()
    deleteGeneratedFiles()

# Confirmation page to confirm user wish to generate new tokens
def requestNewToken():
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
    folderPath = f"{projectsPath}/RobotDataFiles"
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
<<<<<<< HEAD:pCloudy-Automation/Projects/Functions.py
=======
    sys.path.append('.f/{projectsPath}')
>>>>>>> b6d3c76345127e9c22bee96a45effe489d7feb3e:SPA/Robot-files/pCloudy-Automation/Projects/Functions.py
    from OutputData.Devices.deviceDB import dictionary
    try:
        deviceId = dictionary[device_fullname][0] 
        return deviceId  
    except KeyError:
        return 0
    
# Returns the device region based on the dictionary in deviceDB
def getDeviceRegion(device_fullname):
<<<<<<< HEAD:pCloudy-Automation/Projects/Functions.py
=======
    sys.path.append('.f/{projectsPath}')
>>>>>>> b6d3c76345127e9c22bee96a45effe489d7feb3e:SPA/Robot-files/pCloudy-Automation/Projects/Functions.py
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
        with open(f"{projectsPath}/Config/remotePath.py", "w") as file:
            file.write('remotePath = "https://' + region_to_writtten + '.pcloudy.com/appiumcloud/wd/hub"')
        deleteGeneratedFiles()
        return region_to_writtten
    elif choice == 1:
        with open(f"{projectsPath}/Config/remotePath.py", "w") as file:
            file.write('remotePath = "' + region + '"')
            deleteGeneratedFiles()
            file.close()

def deleteGeneratedFiles():
    directory_to_be_removed = ["pabot_results", f"{projectsPath}/__pycache__", f"{projectsPath}/Config/Queues/__pycache__", f"{projectsPath}/Config/__pycache__", f"{projectsPath}/OutputData/__pycache__", f"{projectsPath}/OutputData/Devices/__pycache__", f"{projectsPath}/OutputData/Tokens/__pycache__", f"{projectsPath}/RobotDataFiles/__pycache__", f"{projectsPath}/Scripts/__pycache__"]
    for i in range(len(directory_to_be_removed)):
        shutil.rmtree(directory_to_be_removed[i], ignore_errors=True)

