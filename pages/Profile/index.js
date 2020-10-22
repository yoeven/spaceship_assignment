import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FlatListScrollView from "../../components/FlatListScrollView";
import NavigationService from "../../NavigationService";
import { Signout, GetCurrentUser } from "../../processors/FireBaseManger";
import SettingOptionCard from "../../components/SettingOptionCard";
import SafeAreaView from "react-native-safe-area-view";
import Constants from "expo-constants";
import AlertSVG from "../../assets/graphics/alert.svg";
import * as ImagePicker from "expo-image-picker";

export default class Profile extends React.PureComponent {
  state = {
    ProfilePicURI: "https://i.imgur.com/LSBUyhe.png",
  };

  //Firebase sign out and show sign out alert
  async Signout() {
    await Signout();
    NavigationService.ShowAlert({
      message: "You are signed out!",
      confirmButtonText: "Okay",
      showDeclineButton: false,
      svgImage: null,
      cancelable: false,
      onConfirm: () => NavigationService.navigate("Auth"),
    });
  }

  //show alert for each menu item click
  OnMenuClick(title) {
    NavigationService.ShowAlert({
      message: `You clicked ${title}!`,
      confirmButtonText: "Okay",
      showDeclineButton: false,
      svgImage: AlertSVG,
      cancelable: true,
    });
  }

  async UpdateProfilePicture() {
    try {
      //request user permission
      const permissionCameraRollResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionCameraRollResult.granted === false) {
        return;
      }

      //open image picker modal & get result
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        allowsMultipleSelection: false,
      });

      if (!pickerResult.cancelled) {
        this.setState({ ProfilePicURI: pickerResult.uri });
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error.message,
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatListScrollView>
          <View style={styles.HeaderWrapper}>
            <Text style={styles.PageTitle}>Profile</Text>
          </View>
          <View style={styles.InnerWrapper}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View
                style={{
                  marginBottom: hp(1),
                  paddingHorizontal: wp(3),
                  paddingVertical: hp(1),
                  borderRadius: 3,
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Text
                  style={{
                    fontFamily: "roboto-regular",
                    fontWeight: "bold",
                    fontSize: wp(7),
                    color: "#00E096",
                    paddingLeft: wp(2),
                    textAlign: "center",
                    letterSpacing: 0.3,
                    lineHeight: wp(7),
                  }}>
                  {`$${30}\n`}
                  <Text
                    style={{
                      fontSize: wp(4),
                      fontWeight: "normal",
                    }}>
                    {"Available Credits"}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.Section}>
              <SettingOptionCard
                onPress={() => this.UpdateProfilePicture()}
                ImageUrl={this.state.ProfilePicURI}
                Title={GetCurrentUser().displayName}
                Subtitle="Update profile"
              />
              <SettingOptionCard
                onPress={() => this.OnMenuClick("Saved")}
                IconName="bookmark-outline"
                Title={"Saved"}
                Subtitle="All saved items"
              />
            </View>
            <View style={styles.Section}>
              <SettingOptionCard
                onPress={() => this.OnMenuClick("Payment Methods")}
                IconName="credit-card-outline"
                Title={"Payment Methods"}
                Subtitle="Manage payment methods"
              />
              <SettingOptionCard
                onPress={() => this.OnMenuClick("Password")}
                IconName="lock-outline"
                Title={"Password"}
                Subtitle="Change password"
              />
              <SettingOptionCard
                onPress={() => this.OnMenuClick("Archived")}
                IconName="file-outline"
                Title={"Archived"}
                Subtitle="Check all your archived items"
              />
            </View>
            <View style={styles.Section}>
              <SettingOptionCard
                onPress={() => this.OnMenuClick("Feedback")}
                IconName="archive-outline"
                Title={"Feedback"}
                Subtitle="Tell us what we can do better"
              />
              <SettingOptionCard
                onPress={() => this.OnMenuClick("All Policies")}
                IconName="info-outline"
                Title={"All Policies"}
                Subtitle="Spaceship Privacy Policy & Terms and Conditions"
              />
            </View>
          </View>

          <TouchableWithoutFeedback onPress={() => this.Signout()}>
            <View>
              <Text style={styles.LogoutText}>Log out</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.VersionText}>v{Constants.manifest.version}</Text>
        </FlatListScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  HeaderWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  PageTitle: {
    fontFamily: "roboto-bold",
    fontSize: wp(8),
  },
  InnerWrapper: {
    paddingHorizontal: wp(5),
  },
  Section: {
    backgroundColor: "white",
    marginVertical: hp(2),
    borderRadius: 15,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  LogoutText: {
    textAlign: "center",
    fontFamily: "roboto-regular",
    fontSize: wp(4),
    color: "#32C5FF",
    paddingVertical: hp(3),
    letterSpacing: 0.5,
  },
  VersionText: {
    textAlign: "center",
    paddingTop: hp(2),
    paddingBottom: hp(1),
    color: "black",
    fontFamily: "roboto-regular",
    fontSize: wp(3),
  },
});
