import ADB from 'adbjs'
import semafor from 'semafor'
import inquirer from 'inquirer'

function devices() {
  let adb = new ADB();
  
  let devices = adb.devices();
  let ip_devices = [];
  let non_ip_devices = [];
  for(let i=0; i<devices.length;i++) {
    let device = devices[i]
    if(device.id.indexOf(":5555") != -1) ip_devices.push(device)
    else non_ip_devices.push(device)
  }
  return [non_ip_devices, ip_devices];
}

function disconnectUI(cb) {
  let [non_ip_devices, ip_devices] = devices();
  if(ip_devices.length == 0) {
    return cb(new Error("No devices available to disconnect"))
  }
  let choices = []
  let choices_id = {}
  for(let i=0; i<ip_devices.length;i++) {
    let device = ip_devices[i]
    let desc = [device.model, device.id].join(" - ");
    choices.push(desc)
    choices_id[desc] = device;
  }
  let device_prompt = {
    type : 'list', 
    name : "device",
    message: "Select device to disconnect:",
    choices: choices
  }
  inquirer.prompt(device_prompt, (response) => {
    let device = response.device
    let did = choices_id[device]
    let err = disconnect(did.id)
    cb(err);
  })
}


function connectUI(cb) {
  let [non_ip_devices, ip_devices] = devices();
  if(non_ip_devices.length == 0) {
    return cb(new Error("No devices available to connect"))
  }
  let choices = []
  let choices_id = {}
  for(let i=0; i<non_ip_devices.length;i++) {
    let device = non_ip_devices[i]
    let desc = [device.model, device.id].join(" - ");
    choices.push(desc)
    choices_id[desc] = device;
  }
  let device_prompt = {
    type : 'list', 
    name : "device",
    message: "Select device to connect:",
    choices: choices
  }
  inquirer.prompt(device_prompt, (response) => {
    let device = response.device
    let did = choices_id[device]
    let [err, conn] = connect(did)
    cb(err, conn);
  })
}

function connect(id) {
  let adb = new ADB();
  try {
    adb.selectDevice(id)
    let conn = adb.tcpConnect()
    return [null, conn]
  }catch(e) {
    return [e, null]
  }
}

function disconnect(ip) {
  let adb = new ADB();
  try {
    adb.tcpDisconnect(ip)
    return null
  }catch(e) {
    return e
  }
}

export default {
  devices: devices,
  connectUI: connectUI,
  connect: connect,
  disconnect: disconnect,
  disconnectUI: disconnectUI
}
