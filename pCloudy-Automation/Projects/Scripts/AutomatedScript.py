from ast import Continue
from time import sleep
import subprocess
import os
from os import listdir
from os.path import isfile, join
import shutil
from datetime import datetime
import sys

sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
from APIFunctions import clearConsole

ERROR = '\33[91m'
SUCCESS = '\33[92m'
END = '\33[0m'
DEVICEBOOKED = '\33[41m'
DEVICEAVAILABLE = '\33[42m'
TIMESTART = '\33[44m'

def runAutomationScript():
    clearConsole()
    import APIFunctions
    sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
    from APIFunctions import uploadBuild, deleteBuildAfterScript, executeAppium, executeADB, getFirstBuild, bookDevice
    
    # Add queues here if needed
    from Config.Queues.eight_queue import queue as eight_queue
    from Config.Queues.seven_queue import queue as seven_queue
    from Config.Queues.nine_queue import queue as nine_queue
    from Config.Queues.ten_queue import queue as ten_queue
    from Config.Queues.eleven_queue import queue as eleven_queue
    from Config.Queues.twelve_queue import queue as twelve_queue

    from Config.androidOSList import androidVersionList as queue_order_name
    from Functions import writeBuildToFile, writeDeviceIdToFile, writeDeviceToFile, getDeviceId, getDeviceRegion, setRemotePath

    queue_order = [seven_queue, eight_queue, nine_queue, ten_queue, eleven_queue, twelve_queue]

    # Force new tokens to be generated
    # Tokens needs to be force generated as booking a device requires a fresh token
    import generateToken
    if __name__ == '__main__':
        generateToken.generateNewToken()

    # Display start time
    time_now = datetime.now()
    time_now_2 = time_now
    start_time = time_now.strftime("%H:%M")
    print("Program started at: " + TIMESTART + " " + str(start_time) + " " + END + "\n")

    # Upload build based on the filePath.py
    print("Uploading build now...")
    uploadBuild(1)

    # Get the first build (most recent):
    buildName = getFirstBuild()
    sleep(1)

    # Write build name to build.py for robot script to reference
    print("> Build name has been saved in Projects/Config/build.py\n")
    writeBuildToFile(buildName)
    sleep(1)

    # Counter to check how many devices have been executed successfully/with errors
    numOfSuccessRuns = 0
    numOfFailureRuns = 0
    len_of_android_version = len(queue_order_name)

    # There will be 6 loops to run the script on 6 different android versions
    for android_version in range(len_of_android_version):
        print("========= (" + str(android_version+1) + "/" + str(len_of_android_version) + ") =========")
        # Handling one queue at a time
        individual_queues = queue_order[android_version]
        print("> Selecting a device for android version: " + queue_order_name[android_version])
        
        # Book the device
        for i in range(len(individual_queues)):

            from OutputData.Tokens.token_india import generatedToken_india
            token = generatedToken_india

            deviceFullName = individual_queues[i]                       # Retrieves the full name of the device
            deviceId = getDeviceId(deviceFullName)                      # Retrieves the id of the device based on the build full name
            
            if deviceId != 0:
                device_region = getDeviceRegion(deviceFullName)             # Retrieves the region the phone build in
                device_region1 = setRemotePath(device_region, 0)               # Writes to Config.remotePath.py and returns the API URL code
                status = bookDevice(deviceId, device_region1, deviceFullName)  # Book the device, returning the status as well as the RID
                
                # If device is available, it will proceed to write the device details to the files for robot script to reference
                if status[0] == "success":
                    print("> [" + DEVICEAVAILABLE + " " + deviceFullName + " " + END+ "] is available and has been selected.")
                    rid = status[2]
                    token = status[1]
                    writeDeviceToFile(deviceFullName)
                    print("> Reservation ID: " + str(status[2]))
                    endpoint_url = executeAppium(token, buildName, device_region1)     # Neccessary for the flow of execution
                    setRemotePath(endpoint_url, 1)
                    writeDeviceIdToFile(deviceId)
                    executeADB(token, rid, device_region1)
                    sleep(1)
                    break

                elif status[0] == "failure" and deviceFullName == individual_queues[-1]:
                    print(ERROR + "All devices booked. Moving on to the next android OS vesion." + END + "\n")
                    status[0] = "queueFull"
                    break

                # If device is not available then it will inform user the device is not available
                elif status[0] == "failure":
                    print("> [" + DEVICEBOOKED + " " + deviceFullName + " " + END +"] is currently booked. Trying another device.")
            else:
                print(ERROR + "> Error with queue" + END)
        
        if status[0] != "queueFull":
           
            # Edit this variable here to point the program to execute the script
            script_to_run = "onboardingscript.robot"

            print("> [" + SUCCESS + script_to_run + END + "] will run on [" + SUCCESS + buildName + END + "]")
            print("> Executing script now...")
            
            # Set the starting time
            time_now = datetime.now()

            # Script execution begins here
            logFile = open('LOG_TXT.txt', 'w') 
            startScript = "pabot --verbose --argumentfile SPA/Robot-files/pCloudy-Automation/Projects/RobotDataFiles/arg.txt SPA/Robot-files/pCloudy-Automation/Projects/RobotDataFiles/" + script_to_run
            startScript = startScript.split(" ")
            result = subprocess.run(startScript, stdout=logFile)
            result_string = str(result).split("returncode=")[1][:-1]    # Extract the number of errors

            # Gets the time
            minutes, seconds = divmod((datetime.now() - time_now).total_seconds(),60)

            # Inform how many errors during the execution
            if result_string == "0":
                print("> [" + SUCCESS + "Test completed without any errors." + END + "]")
                numOfSuccessRuns += 1
                state = "SUCCESS"
            else:
                print("> [" + ERROR + "There are " + result_string + " errors found. Please refer to the logs." + END + "]")
                numOfFailureRuns += 1
                state = "FAILURE"
            
            # Remove the unncessarry auto generated files
            os.remove(".pabotsuitenames")

            # Checks if destination folder exists
            currentDate = datetime.today().strftime('%Y-%m-%d')
            currentTime = datetime.today().strftime('%H%M')
            parent_directory = "SPA/Robot-files/pCloudy-Automation/Projects/Logs"

            # Checks if the directory exists
            # This is used to create a folder for the log extracted according to the current date
            if os.path.isdir("SPA/Robot-files/pCloudy-Automation/Projects/Logs/" + currentDate):
                Continue
            else:
                path = os.path.join(parent_directory, currentDate)
                os.makedirs(path)

            # Creates a directory to check if sub folder has been crated, if not it will create a subfolder
            # SUCCESS AND FAILURE according to the state
            if os.path.isdir("SPA/Robot-files/pCloudy-Automation/Projects/Logs/" + currentDate + "/" + state):
                Continue
            else:
                newPath = parent_directory + "/" + currentDate    
                path1 = os.path.join(newPath, state)
                os.makedirs(path1)

            # Store the txtlog file into the created directory
            shutil.move('LOG_TXT.txt',  'SPA/Robot-files/pCloudy-Automation/Projects/Logs/' + currentDate + "/" + state + "/TXT_LOG_" + deviceFullName + "_" + currentTime + '.txt')

            # Store each output into the created directory
            outputList = ['log.html', 'report.html', 'output.xml']
            for i in range(len(outputList)):
                shutil.move(outputList[i], 'SPA/Robot-files/pCloudy-Automation/Projects/Logs/' + currentDate + "/" + state + "/" + outputList[i].split(".")[0].upper() + '_' + deviceFullName + "_" + currentTime + '.' + outputList[i].split(".")[1])

            # Release the device
            print("> Releasing the device now...")
            APIFunctions.releaseDevice(rid, token, device_region1)
            print("> Device released\n")

            if (f'{minutes:0.0f}'.format(minutes)) == "0":
                print('> Total time taken: ' + TIMESTART + ' ' + f'{seconds:0.0f} sec ' + END.format(seconds))
            else:
                print('> Total time taken: ' + TIMESTART + ' ' + f'{minutes:0.0f} min {seconds:0.0f} sec ' + END.format(minutes, seconds))
            print("")
            
            if android_version == len_of_android_version-1:
                print("=========================\n")
                break

    # Remove the unncessarry auto generated files
    directory_to_be_removed = ["pabot_results", "SPA/Robot-files/pCloudy-Automation/Projects/Logs/Projects/RobotDataFiles/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/Logs/Projects/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/Logs/Projects/Config/Queues/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/Logs/Projects/Config/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/Logs/Projects/Output/Devices/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/Logs/Projects/Output/Tokens/__pycache__", "SPA/Robot-files/pCloudy-Automation/Projects/Logs/Projects/Scripts/__pycache__"]
    for i in range(len(directory_to_be_removed)):
        shutil.rmtree(directory_to_be_removed[i], ignore_errors=True)
        
    # Delete the build
    print("> Deleting the build now...")
    deleteBuildAfterScript(buildName)

    time_then = datetime.now()
    duration = time_then - time_now_2
    duration_in_seconds = duration.total_seconds()
    minutes, seconds = divmod(duration_in_seconds, 60)

    print("\n+------------------------+")
    print("|        SUMMARY         |")
    print("+------------------------+")
    print("| " + SUCCESS + "Success runs: "+str(numOfSuccessRuns) + END + "        |")
    print("| " + ERROR + "Failed runs: "+str(numOfFailureRuns) + END + "         |")
    print("+------------------------+")

    end_time = time_then.strftime("%H:%M")
    print("Program ended at: " + TIMESTART + " " + str(end_time) + " " + END)

    minutes, seconds = divmod((time_then-time_now_2).total_seconds(),60)
    print('Total time taken: ' + TIMESTART + ' ' + f'{minutes:0.0f} min {seconds:0.0f} sec ' + END.format(minutes, seconds))