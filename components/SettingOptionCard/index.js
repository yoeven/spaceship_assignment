import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "@ui-kitten/components";

//setting menu card view
export default class SettingOptionCard extends React.PureComponent {
  static defaultProps = {
    Title: "title",
    Subtitle: "sub title",
    IconName: "star",
    onPress: () => {},
    ImageUrl: null,
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.ElementBox}>
          <View style={styles.ElementBoxLeftWrapper}>
            {this.props.ImageUrl != null ? (
              <Image source={{ uri: this.props.ImageUrl }} style={styles.ImageWrapper} />
            ) : (
              <View style={styles.IconWrapper}>
                <Icon name={this.props.IconName} width={wp(6)} height={wp(6)} fill={"white"} />
              </View>
            )}

            <View style={styles.ElementBoxTextWrapper}>
              <Text style={styles.TitleText}>{this.props.Title}</Text>
              <Text numberOfLines={1} style={styles.Subtitle}>
                {this.props.Subtitle}
              </Text>
            </View>
          </View>
          <Icon name={"chevron-right-outline"} width={wp(10)} height={wp(10)} fill={"grey"} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  ElementBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    flex: 1,
  },
  ElementBoxLeftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  ElementBoxTextWrapper: {
    paddingLeft: wp(3),
  },
  TitleText: {
    fontFamily: "roboto-bold",
    fontSize: wp(5),
    letterSpacing: 0.3,
  },
  Subtitle: {
    fontFamily: "roboto-regular",
    fontSize: wp(4),
    color: "grey",
    width: wp(55),
    letterSpacing: 0.3,
  },
  IconWrapper: {
    backgroundColor: "#32C5FF",
    borderRadius: 360,
    paddingHorizontal: wp(2.5),
    paddingVertical: wp(2.5),
  },
  ImageWrapper: {
    width: wp(11),
    height: wp(11),
    resizeMode: "cover",
    borderRadius: 360,
  },
});
