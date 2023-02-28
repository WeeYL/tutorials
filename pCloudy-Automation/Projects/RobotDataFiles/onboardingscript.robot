**Settings**
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

Resource        functions.robot
Library         ../../../../Resources/PageLibrary/PageObject/_Common/ComponentElementLocator.py
Library         ../../../../Resources/Libraries/universal_swipe.py
Resource        ../../../../Resources/PageLibrary/PageObject/Onboarding/2FAWebViewPage.robot

Suite Setup       Run Keywords      Set Suite Variable    ${SUITE_NAME}             Onboarding
...               AND               Set Suite Variable    ${TEST_ID}                setup
...               AND               Set Suite Variable    ${screenshotDest}          ${EXECDIR}/../../../Output/${SUITE_NAME}/
...               AND               Register Keyword to Run On Failure    ScreenVerify.Screenshot

Suite Teardown    Run Keywords      Set Suite Variable	${SUITE_NAME}	${EMPTY}
...               AND               Close All Applications

**Variables**
${localhost}=                   http://localhost:4723/wd/hub
${singpassIDLocator}=           //*[@resource-id="SpLoginIdPw-singpass-id"]
${passwordLocator}=             //*[@resource-id="SpLoginIdPw-password"]
${loginBtn}=                    //*[@resource-id="SpLoginIdPw-login-button"]
${btn}=                         sg.ndi.sp:id/213136257     # EDIT
${popup_button}=                sg.ndi.sp:id/2131362582     # EDIT    
${onShip}=                      true

*** Test Cases ***
Open Test Application
    Open Application    ${remotePath}   pCloudy_Username=${emailId}     pCloudy_ApiKey=${apiKey}    platformName=android	  deviceName=${deviceId}       pCloudy_ApplicationName=${buildfullname}       pCloudy_DeviceFullName=${devicefullname}     newCommandTimeout=6000   launchTimeout=90000  appPackage=sg.ndi.sp  appActivity=sg.ndi.activity.DashBoardActivity    automationName=UiAutomator2
    # Open Application    ${localhost}     platformName=Android  platformVersion=9  deviceName=Galaxy  udid=3357534132583398     automationName=${automationName}   app=/Users/zi.hao.ng/ndispcp-auto-testing-pom/SPA/Robot-files/pCloudy-Automation/Projects/Builds/app-singpass-stg-release-protected-126.apk  appPackage=sg.ndi.sp  appActivity=sg.ndi.activity.DashBoardActivity

Close popups
    Wait Until Page Contains    	${text1}      90
    Click Element                   ${popup_button}    
    Wait Until Page Contains    	${text2}      90
    Click Element                   ${popup_button}     

Navigate to login page
    Wait Until Page Contains        ${text11}     90
    FOR     ${index}        IN RANGE        1       4
        Sleep                       1
        Click Element               sg.ndi.sp:id/2131362086   # EDIT
    END

Input Singpass credentials - 1FA
    Wait Until Page Contains        ${text3}      90
    Input Text                      ${singpassIDLocator}    ${USERNAME}
    Input Text                      ${passwordLocator}      ${PASSWORD}
    Sleep                           1
    Click Element                   ${loginBtn}

Click on SMS OTP and ENTER SMS OTP - 2FA
    Wait Until Page Contains        ${text4}      90
    Click Element                   //*[@resource-id="button-1"]
    Wait Until Page Contains        ${text12}     50
    Swipe Preset
    Input and submit SMS OTP
    
Check all checkboxes and continue 
    Wait Until Page Contains        ${text5}      90
    Swipe Preset
    FOR     ${index}    IN RANGE    6   9
        Click Element               ${btn}${index}
    END
    Click Element       	        sg.ndi.sp:id/2131362089   # EDIT

Click next page to set up passcode  
    Wait Until Page Contains        ${text6}      50
    Sleep                           3
    Click Element                   //*[@class="android.widget.Button"]

Passcode page
    Wait Until Page Contains        ${text7}     90

    FOR     ${index}    IN RANGE    2
        Enter Passcode
        Sleep   1
        IF     ${index} == 0
            Page Should Contain Text     ${text16}
        END
    END

Click to next page 
    Wait Until Page Contains        ${text8}      90
    Click Element                   //*[@class="android.widget.Button"]

Check to next page
    Wait Until Page Contains        ${text9}      90
    Swipe to the end
    Click Element                   //*[@class="android.widget.Button"]

Enter Main Page
    Wait Until Page Contains        ${text10}     90
    Wait Until Page Contains        ${text13}     90
    Wait Until Page Contains        ${text14}     90
    Wait Until Page Contains        ${text15}     90