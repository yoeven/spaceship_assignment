import { LogBox } from "react-native";

//https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes

LogBox.ignoreLogs(["Setting a timer"]);
const _console = { ...console };
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
