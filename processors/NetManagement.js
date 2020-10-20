import NetInfo from "@react-native-community/netinfo";
import NavigationService from "../NavigationService";

var DisplayNoNetPage = false;

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
