import React from "react";
import { StyleSheet, Text, View, StatusBar, BackHandler } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import NetLostPic from "../../assets/graphics/netlost.svg";

export default class NoNetPage extends React.PureComponent {
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
      StatusBar.setHidden(true);
    });

    this.hardwareBackPress = BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
    this.willFocusSubscription && this.willFocusSubscription.remove();
    this.hardwareBackPress && this.hardwareBackPress.remove();
  }

  render() {
    return (
      <>
        <View style={styles.Wrapper}>
          <View style={styles.TitleWrapper}>
            <Text style={styles.Title}>There seems to be an issue with your internet.</Text>
          </View>
          <View style={styles.GraphicWrapper}>
            <NetLostPic width={"100%"} height={hp(50)} />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: { paddingHorizontal: wp(3) },
  TitleWrapper: {
    paddingTop: hp(10),
    paddingBottom: hp(8),
  },
  Title: {
    fontFamily: "roboto-regular",
    fontSize: wp(6),
    textAlign: "center",
  },
  GraphicWrapper: {
    paddingHorizontal: wp(10),
  },
});
