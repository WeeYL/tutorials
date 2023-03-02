from ast import Continue
from time import sleep
import subprocess
import os
import shutil
from datetime import datetime
import sys
from Config.projectsPath import projectsPath
from APIFunctions import clearConsole

# set python import path
sys.path.append(projectsPath)

ERROR = '\33[91m'
SUCCESS = '\33[92m'
END = '\33[0m'
DEVICEBOOKED = '\33[41m'
DEVICEAVAILABLE = '\33[42m'
TIMESTART = '\33[44m'

def runManualScript():

    from Functions import writeBuildToFile, writeDeviceIdToFile, writeDeviceToFile, getDeviceId, getDeviceRegion, selectLocalScript, setRemotePath
    from APIFunctions import getDevices, bookDevice, releaseDevice, executeAppium, uploadBuild, deleteBuildAfterScript, getFirstBuild, getDevicesByVersion, executeADB
    from OutputData.Tokens.token_india import generatedToken_india
    token = generatedToken_india

    clearConsole()
    
    # Display start time
    time_now = datetime.now()
    start_time = time_now.strftime("%H:%M")
    print("Program started at: " + TIMESTART + " " + str(start_time) + " " + END + "\n")

    # Let user choose a build that is available on the pCloudy cloud
    uploadBuild(0)
    print(uploadBuild(0))
    # Get the first build on the cloud user just uploaded
    buildName = getFirstBuild()
    print(buildName)
    print("> Automation script will run on [" + SUCCESS + buildName + END + "]")
    writeBuildToFile(buildName)
    sleep(1)
    
    # Let user choose the local script to execute
    print("\n+--------------------------------------+")
    print("|      Please select one script        |")
    print("+--------------------------------------+")

    script_to_run = selectLocalScript()
    print("You have chosen to run: " + SUCCESS + script_to_run + END)

    # Let user choose one of the available devices to execute
    print("\n+---------------------------------------+")
    print("|      Please select one device         |")
    print("+---------------------------------------+")

    response = getDevices()
    deviceList = response[0]

    while True:
        while True:
            user_input_device_selection = input("\nYour selection: ")

            if int(user_input_device_selection) < 1 or int(user_input_device_selection) > int(len(deviceList)):
                print("Invalid selection. Please try again.")
            else:
                user_input_device_name = deviceList[int(user_input_device_selection) - 1]
                break
    
        deviceId = getDeviceId(user_input_device_name)                          # Retrieves the id of the device based on the build full name
        if deviceId != 0:
            device_region = getDeviceRegion(user_input_device_name)                 # Retrieves the region the phone build in
            device_region1 = setRemotePath(device_region, 0)                        # Based on the region of the device, the function will return the specific param for the API URL
            status = bookDevice(deviceId, device_region1, user_input_device_name)   # Books the device for execution

            # Error handling: When user is shown a list of devices and someone managed to book the device before the user can select
            if status[0] == "success":
                print("> [" + DEVICEAVAILABLE + " " + user_input_device_name + " " + END + "] is available and has been selected.")
                break
            elif status[0] == "failure":
                print("> [" + DEVICEBOOKED + " " + user_input_device_name + " " + END + "] is currently booked. Please try another device.")
                deviceList = getDevicesByVersion(response[1])
        else:
            print(ERROR + "Error. Please select another device." + END)

    rid = status[2]
    token = status[1]
    writeDeviceToFile(user_input_device_name)       # This is so that the robot script can reference the device full name
    print("> Reservation ID: " + str(status[2]))
    endpoint_url = executeAppium(token, buildName, device_region1)  # This is neccessary to execute the script on the booked device
    setRemotePath(endpoint_url, 1)                  # This is so that the robot script can point to the correct endpoint URL                               
    writeDeviceIdToFile(deviceId)                   # This is so that the robot script can reference the device ID
    executeADB(token, rid, device_region1)
    sleep(1)

    input("pause")
    print("> Executing script now...")

    # Script execution starts here
    # logFile = open('LOG_TXT.txt', 'w') 
    # startScript = f"pabot --verbose --argumentfile {projectsPath}/RobotDataFiles/arg.txt {projectsPath}/RobotDataFiles/" + script_to_run

    # startScript = startScript.split(" ")
    # result = subprocess.run(startScript, stdout=logFile)
    # result_string = str(result).split("returncode=")[1][:-1]    # Extract the number of errors

    startScript = f"robot {projectsPath}/RobotDataFiles/" + script_to_run
    subprocess.call(startScript, shell=True)
    # Calculate time the testing ends
    device_time = datetime.now()
    duration = device_time - time_now
    duration_in_seconds = duration.total_seconds()
    minutes, seconds = divmod(duration_in_seconds, 60)

    # Inform how many errors during the execution
    if result_string == "0":
        print("> [" + SUCCESS + "Test completed without any errors." + END + "]")
        state = "SUCCESS"
    else:
        print("> [" + ERROR + "There are " + result_string + " errors found. Please refer to the logs." + END + "]")
        state = "FAILURE"

    # Remove the unncessarry auto generated files
<<<<<<< HEAD:pCloudy-Automation/Projects/Scripts/ManualScript.py
    # os.remove(".pabotsuitenames")

=======
    try:
        os.remove(".pabotsuitenames")
    except:
        pass
>>>>>>> b6d3c76345127e9c22bee96a45effe489d7feb3e:SPA/Robot-files/pCloudy-Automation/Projects/Scripts/ManualScript.py
    # Create the values for storing the generated files (log, output, report)
    currentDate = datetime.today().strftime('%Y-%m-%d')
    currentTime = datetime.today().strftime('%H%M')
    parent_directory = f"{projectsPath}/Logs"

    # Checks if the directory exists
    # This is used to create a folder for the log extracted according to the current date
    if os.path.isdir(f"{projectsPath}/Logs/" + currentDate):
        Continue
    else:
        path = os.path.join(parent_directory, currentDate)
        os.makedirs(path)

    # Creates a directory to check if sub folder has been crated, if not it will create a subfolder
    # SUCCESS AND FAILURE according to the state
    if os.path.isdir(f"{projectsPath}/Logs/" + currentDate + "/" + state):
        Continue
    else:
        newPath = parent_directory + "/" + currentDate    
        path1 = os.path.join(newPath, state)
        os.makedirs(path1)

    # Store the txtlog file into the created directory
    shutil.move('LOG_TXT.txt',  f'{projectsPath}/Logs/' + currentDate + "/" + state + "/TXT_LOG_" + user_input_device_name + "_" + currentTime + '.txt')

    # Store each output into the created directory
    outputList = ['log.html', 'report.html', 'output.xml']
    for i in range(len(outputList)):
        shutil.move(outputList[i], f'{projectsPath}/Logs/' + currentDate + "/" + state + "/" + outputList[i].split(".")[0].upper() + '_' + user_input_device_name + "_" + currentTime + '.' + outputList[i].split(".")[1])

    # Relase the device
    print("> Releasing the device now...")
    releaseDevice(rid, token, device_region1)
    print("> Device released")

    # Relase the device
    print("> Deleting the build now...")
    deleteBuildAfterScript(buildName)

    if (f'{minutes:0.0f}'.format(minutes)) == "0":
        print('> Total time taken: ' + TIMESTART + ' ' + f'{seconds:0.0f} sec ' + END.format(seconds))
    else:
        print('> Total time taken: ' + TIMESTART + ' ' + f'{minutes:0.0f} min {seconds:0.0f} sec ' + END.format(minutes, seconds))

    # Remove the unncessarry auto generated files
    directory_to_be_removed = ["pabot_results", f"{projectsPath}/Logs/Projects/RobotDataFiles/__pycache__", f"{projectsPath}/Logs/Projects/__pycache__", f"{projectsPath}/Logs/Projects/Config/Queues/__pycache__", f"{projectsPath}/Logs/Projects/Config/__pycache__", f"{projectsPath}/Logs/Projects/Output/Devices/__pycache__", f"{projectsPath}/Logs/Projects/Output/Tokens/__pycache__", f"{projectsPath}/Logs/Projects/Scripts/__pycache__"]
    for i in range(len(directory_to_be_removed)):
        shutil.rmtree(directory_to_be_removed[i], ignore_errors=True)