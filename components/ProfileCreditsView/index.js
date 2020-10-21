import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default class ProfileCreditsView extends React.PureComponent {
  render() {
    return (
      <View style={styles.Wrapper}>
        <View style={styles.Base}>
          <Text style={styles.CreditAmountText}>
            {`$${30}\n`}
            <Text style={styles.CreditSubtitle}>{"Available Credits"}</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  Base: {
    marginBottom: hp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  CreditAmountText: {
    fontFamily: "roboto-regular",
    fontWeight: "bold",
    fontSize: wp(7),
    color: "#00E096",
    paddingLeft: wp(2),
    textAlign: "center",
    letterSpacing: 0.3,
    lineHeight: wp(7),
  },
  CreditSubtitle: {
    fontSize: wp(4),
    fontWeight: "normal",
  },
});
