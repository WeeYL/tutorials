*** Settings ***

Library         AppiumLibrary
Library         BuiltIn
Library         OperatingSystem
Library         Collections
Library         String
Library         Dialogs
Variables       data.py

Variables       ../Config/device.py
Variables       ../Config/build.py
Variables       ../Config/credentials.py
Variables       ../Config/remotePath.py
Variables       ../Config/deviceId.py

*** Test Cases ***

Open Test Application
    # Open Application    ${remotePath}   pCloudy_Username=${emailId}     pCloudy_ApiKey=${apiKey}    platformName=android	  deviceName=${deviceId}       pCloudy_ApplicationName=${buildfullname}       pCloudy_DeviceFullName=${devicefullname}     newCommandTimeout=6000   launchTimeout=90000  appPackage=com.pcloudy.appiumdemo  	appActivity=com.ba.mobile.LaunchActivity    automationName=UiAutomator2
    
    Open Application    ${remotePath}   pCloudy_Username=${emailId}     pCloudy_ApiKey=${apiKey}   platformName=android	 pCloudy_ApplicationName=pCloudyAppiumDemo.apk   pCloudy_DeviceManafacturer=Samsung   appPackage=com.pcloudy.appiumdemo  	appActivity=com.ba.mobile.LaunchActivity    automationName=uiAutomator2

Book A Flight

    Click Element	id=com.pcloudy.appiumdemo:id/accept 
    Log To Console	Accept Button is clicked

    Click Element	id=com.pcloudy.appiumdemo:id/flightButton
    Log To Console	Book a flight button clicked

    Click Element	id=com.pcloudy.appiumdemo:id/spinnerfrom
    Log To Console	From location drop down is clicked

    Click Element	//*[@id='android:id/text1' or @text='Bangalore, India (BLR)']
    Log To Console	From Location is selected
Close All Apps
	
	Close All Applications



