from time import sleep
import sys

sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
from APIFunctions import clearConsole
from APIFunctions import *
from Functions import *
from Scripts.AutomatedScript import runAutomationScript
from Scripts.ManualScript import runManualScript

START = '\33[104m'
END = '\33[0m'

def run():
    clearConsole()
    try:
        while True:
            from Config.credentials import emailId
            print("\n\n" + START + "[Logged into: " + emailId + "]" + END)
            user_input = input("\npCloudy API MENU\n1. Builds Menu\n2. Devices Menu\n3. Run Automation\n4. Account & Settings\n0. Exit\nYour choice: ")
            clearConsole()
            if user_input == '1':
                user_selection = input("Build Menu\n1. View all builds\n2. Delete build\n3. Upload build\n4. Search build\n0. Back\nYour choice: ")
                if user_selection == '1':
                    viewBuild(0)
                elif user_selection == '2':
                    deleteBuild()
                elif user_selection == '3':
                    uploadBuild(0)
                elif user_selection == '4':
                    viewBuild(1)
                elif user_selection == '0':
                    break
            elif user_input == '2':
                user_selection = input("Device Menu\n1. View devices\n0. Back\nYour choice: ")
                if user_selection == '1':
                    getDevices()
                elif user_selection == '0':
                    break
            elif user_input == '3':
                user_selection = input("Run Automation Menu\n1. Manual Run\n2. Auto Run\n0. Exit\nYour choice: ")
                if user_selection == '1':
                    runManualScript()
                elif user_selection == '2':
                    runAutomationScript()
                elif user_selection == '0':
                    break
            elif user_input == '4':
                user_selection = input("Account & Settings\n1. Request new token\n0. Exit\nYour choice: ")
                if user_selection == '1':
                    requestNewToken()          # 1 means manual request
                elif user_selection == '0':
                    break
            elif user_input == '0':
                break
            else:
                print("\nIncorrect input.\nSelect another option.")

    except KeyboardInterrupt:
        print("\n\n+--------------------+")
        print("| Program exiting... |")
        print("+--------------------+")
        sleep(1)

run()