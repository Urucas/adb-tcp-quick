# adb-tcp-quick
Quickly connect an android device to adb over wifi

#Install
```bash
$ git clone https://github.com/Urucas/adb-tcp-quick && cd adb-tcp-quick
$ echo $PWD
```
Now copy the current $PWD where you clone the repo in your .bashrc o .zshrc file with an alias;
```text
alias adb-tcp-quick='/Users/vruno/Urucas/bash/adb-tcp-quick-connect/adb-tcp-quick.sh'
```
Open a new terminal an run
```bash
adb-tcp-quick
```

**Note**
Your phone must be connected via usb, after the scripts finish you can unplugged the device and continue working over wifi. 
