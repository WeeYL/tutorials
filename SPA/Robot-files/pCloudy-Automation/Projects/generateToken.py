import requests
import sys
from Config.projectsPath import projectsPath

# Generate 4 new tokens all at once
def generateNewToken():
    print()
    sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
    from APIFunctions import clearConsole
    clearConsole()
    from Config.credentials import emailId, apiKey

    API_URL_REGION = ["https://device.pcloudy.com/api/access", "https://ind-west.pcloudy.com/api/access", "https://sg.pcloudy.com/api/access", "https://us.pcloudy.com/api/access"]
    response = []
    tokensList = []
    fileName = ["token_india.py", "token_india_west.py", "token_singapore.py", "token_us.py"]
    tokens_name = ["generatedToken_india", "generatedToken_india_west", "generatedToken_singapore", "generatedToken_us"]

    for i in range(4):
        response.append(requests.get(API_URL_REGION[i], auth=(emailId, apiKey)))
        tokensList.append(response[i].json()["result"]["token"])
        with open(f'{projectsPath}/OutputData/Tokens/' + fileName[i], "w") as file:
            file.write(tokens_name[i] + ' ="' + tokensList[i] + '"')
            file.close()
            
    print("4 new tokens has been generated!")

# Generate a new India token
def generateNewIndiaToken():
    sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
    from Config.credentials import emailId, apiKey
    API_URL_REGION = "https://device.pcloudy.com/api/access"
    fileName = "token_india.py"
    tokens_name = "generatedToken_india"

    response = requests.get(API_URL_REGION, auth=(emailId, apiKey))
    token = response.json()["result"]["token"]
    with open(f'{projectsPath}/OutputData/Tokens/' + fileName, "w") as file:
        file.write(tokens_name + ' ="' + token + '"')
        file.close()    
    return token

# Generate a new India-West token
def generateNewIndiaWestToken():
    sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
    from Config.credentials import emailId, apiKey
    API_URL_REGION = "https://ind-west.pcloudy.com/api/access"
    fileName = "token_india_west.py"
    tokens_name = "generatedToken_india_west"

    response = requests.get(API_URL_REGION, auth=(emailId, apiKey))
    token = response.json()["result"]["token"]
    with open(f'{projectsPath}/OutputData/Tokens/' + fileName, "w") as file:
        file.write(tokens_name + ' ="' + token + '"')
        file.close()      
    return token

# Generate a new SG token
def generateNewSgToken():
    sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
    from Config.credentials import emailId, apiKey
    API_URL_REGION = "https://sg.pcloudy.com/api/access"
    fileName = "token_singapore.py"
    tokens_name = "generatedToken_singapore"

    response = requests.get(API_URL_REGION, auth=(emailId, apiKey))
    token = response.json()["result"]["token"]
    with open(f'{projectsPath}/OutputData/Tokens/' + fileName, "w") as file:
        file.write(tokens_name + ' ="' + token + '"')
        file.close()    
    return token

# Generate a new US token
def generateNewUsToken():
    sys.path.append('./SPA/Robot-files/pCloudy-Automation/Projects')
    from Config.credentials import emailId, apiKey
    API_URL_REGION = "https://us.pcloudy.com/api/access"
    fileName = "token_us.py"
    tokens_name = "generatedToken_us"

    response = requests.get(API_URL_REGION, auth=(emailId, apiKey))
    token = response.json()["result"]["token"]
    with open(f'{projectsPath}/OutputData/Tokens/' + fileName, "w") as file:
        file.write(tokens_name + ' ="' + token + '"')
        file.close()  
    return token

# generateNewToken()