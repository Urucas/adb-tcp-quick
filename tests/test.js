import adbConnect from "../lib/"
console.log(adbConnect)

describe("tcp quick connect tests", () => {
 
  it("should return devices", (done) => {
    let [devices, ip_devices] = adbConnect.devices()
    if(!(devices instanceof Array)) 
      throw new Error("Error getting devices list")

    if(!(ip_devices instanceof Array))
      throw new Error("Error getting ip devices list")
    
    done();
  })

  it("should connect & disconnect a device", (done) => {
    
    let devices = adb.devices();
    for(let i=0; i<devices.length;i++) {
      let device = devices[i];
      if(device.id.indexOf(":5555") != -1)
        adb.tcpDisconnect(device.id)
    }
    // update devices list
    devices = adb.devices();

    adbConnect.connectUI( (err, conn) => {
      if(err != null) {
        if(!(err instanceof Error)) {
          console.log(err)
          throw new Error("error result not instance of error");
          return;
        }
      }
      if(conn != null) {
        if(!/\d+\.\d+\.\d+\.\d+\:\d+/ig.test(conn)) {
          throw new Error("connection result has invalid value; "+conn);
          return;
        }
      }
      adbConnect.disconnectUI( (err) => {
        
      });
    });
  });
  
})
