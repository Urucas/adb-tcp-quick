ALREADY_CONNECTED=$(adb devices | egrep -o ':5555')
if [ ! -z $ALREADY_CONNECTED ]; then
  echo "Already connected"
  exit 0
fi
IP=$(adb shell ip -f inet addr show wlan0 | egrep -o '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' | head -n1)
$(adb tcpip 5555)
$(adb connect "${IP}":5555)
