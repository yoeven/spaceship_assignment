import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon, Spinner } from "@ui-kitten/components";

export default class ActivateLocationButton extends React.PureComponent {
  static defaultProps = {
    onLocationPress: () => {},
    locationLoading: false,
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onLocationPress()}>
        <View style={styles.Wrapper}>
          <View style={styles.TextDetailsWrapper}>
            <Text style={styles.TitleText}>Location Service</Text>
            <Text style={styles.DescText}>Turning on your location service will provide accommodations near you.</Text>
          </View>
          <View style={styles.RightSideWrapper}>
            {this.props.locationLoading ? (
              <View style={styles.SpinnerWrapper}>
                <Spinner size="large" />
              </View>
            ) : (
              <Icon name="pin-outline" width={wp(10)} height={wp(10)} fill={styles.DescText.color} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    backgroundColor: "#FFF1F1",
    marginHorizontal: wp(5),
    marginTop: hp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  TextDetailsWrapper: {
    flex: 1,
    paddingRight: wp(2),
  },
  TitleText: {
    fontFamily: "roboto-bold",
    color: "#f34e5c",
  },
  DescText: {
    fontFamily: "roboto-regular",
    color: "#f34e5c",
  },
  RightSideWrapper: {
    paddingRight: wp(2),
  },
  SpinnerWrapper: {
    marginLeft: wp(5),
  },
});
