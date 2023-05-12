# *** Settings ***
# Library         AppiumLibrary
# Variables       ../Config/device.py
# Variables       ../Config/build.py
# Variables       ../Config/credentials.py
# Variables       ../Config/remotePath.py
# Variables       ../Config/deviceId.py
# Library         Dialogs

# *** Test Cases ***
# Open Test Application
#     Open Application    ${remotePath}   pCloudy_Username=${emailId}     pCloudy_ApiKey=${apiKey}    platformName=android	  deviceName=${deviceId}       pCloudy_ApplicationName=${buildfullname}       pCloudy_DeviceFullName=${devicefullname}     newCommandTimeout=600    appPackage=io.appium.android.apis    	appActivity=io.appium.android.apis.ApiDemos    automationName=UiAutomator2

# Click into Animation
#     Sleep           5
#     Click Element	//android.widget.TextView[@content-desc="Animation"]