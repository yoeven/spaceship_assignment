import NetInfo from "@react-native-community/netinfo";
import NavigationService from "../NavigationService";

let DisplayNoNetPage = false;

//watches for network activity
//shows NoNetPage on disconnect of internet
export const unsubscribe = NetInfo.addEventListener(state => {
  if (!state.isConnected) {
    DisplayNoNetPage = true;
    NavigationService.navigate("NoNet");
  } else {
    if (DisplayNoNetPage) {
      DisplayNoNetPage = false;
      NavigationService.navigate("Auth");
    }
  }
});
