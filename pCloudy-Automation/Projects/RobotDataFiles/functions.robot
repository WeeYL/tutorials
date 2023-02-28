*** Keywords ***
Swipe Preset
    Sleep                           1   
    Swipe by percent                50   70   50   30   1000

Enter Passcode
    Click Element               //*[@class="android.widget.TextView"][@text="5"]
    Click Element               //*[@class="android.widget.TextView"][@text="8"]
    Click Element               //*[@class="android.widget.TextView"][@text="5"]
    Click Element               //*[@class="android.widget.TextView"][@text="8"]
    Click Element               //*[@class="android.widget.TextView"][@text="8"]
    Click Element               //*[@class="android.widget.TextView"][@text="5"]

Swipe to the end
    Swipe Preset
    Swipe Preset
    Swipe Preset
    Swipe Preset
    Swipe Preset