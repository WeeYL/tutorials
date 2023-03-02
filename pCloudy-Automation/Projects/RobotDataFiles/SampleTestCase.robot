*** Settings ***
Library         AppiumLibrary
Variables       ../Config/device.py
Variables       ../Config/build.py
Variables       ../Config/credentials.py
Variables       ../Config/remotePath.py
Variables       ../Config/deviceId.py
Library         Dialogs

*** Test Cases ***
Open Test Application
    Log to Console      ${apiKey}
    Open Application    ${remotePath}   pCloudy_Username=${emailId}     pCloudy_ApiKey=${apiKey}    platformName=android	  deviceName=${deviceId}       pCloudy_ApplicationName=${buildfullname}       pCloudy_DeviceFullName=${devicefullname}     newCommandTimeout=600    appPackage=com.example.android.testing.unittesting.BasicSample  appActivity=com.example.android.testing.unittesting.BasicSample.MainActivity    automationName=UiAutomator2
#   Open Application    http://localh÷ost:4756/wd/hub     platformName=Android  platformVersion=10  deviceName=emulator-5554  udid=emulator-5554  automationName=Uiautomator2  app=%{PWD}/temp/artifact/app-debug.apk  appPackage=com.example.android.testing.unittesting.BasicSample  appActivity=com.example.android.testing.unittesting.BasicSample.MainActivity

# Click into Animation
#     Sleep           5
#     Click Element	//android.widget.TextView[@content-desc="Animation"]

DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability("pCloudy_Username", "Enter your email-id");
capabilities.setCapability("pCloudy_ApiKey", "Enter your APIKey");
capabilities.setCapability("pCloudy_DurationInMinutes", 5);
capabilities.setCapability("pCloudy_DeviceManafacturer", "Samsung");
capabilities.setBrowserName("Chrome");
driver = new AndroidDriver(new URL("https://device.pcloudy.com/appiumcloud/wd/hub"), capabilities);
