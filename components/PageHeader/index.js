import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Platform } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Icon } from "@ui-kitten/components";
import NavigationService from "../../NavigationService";

//page header with full control on icons, defaults to back on top left

export default class PageHeader extends React.PureComponent {
  static defaultProps = {
    ShowRightIcon: true,
    LeftIconName: "arrow-ios-back-outline",
    RightIconName: "more-vertical-outline",
    LeftIconColor: "#aaa",
    OnRightIconPress: () => {},
    RightIconSize: wp(7),
    RightIconColor: "#B4B4B4",
    WrapperStyle: {},
    OnBackButtonPress: () => NavigationService.goBack(),
    renderRightIcon: null,
  };

  render() {
    return (
      <View style={[styles.Wrapper, this.props.WrapperStyle]}>
        <TouchableWithoutFeedback onPress={this.props.OnBackButtonPress}>
          <Icon name={this.props.LeftIconName} fill={this.props.LeftIconColor} width={wp(8)} height={wp(8)} />
        </TouchableWithoutFeedback>
        {this.props.Title && <Text style={styles.Title}>{this.props.Title}</Text>}
        {this.props.renderRightIcon != null && this.props.renderRightIcon()}
        {this.props.ShowRightIcon && this.props.renderRightIcon == null && (
          <Icon
            name={this.props.RightIconName}
            fill={this.props.RightIconColor}
            size={this.props.RightIconSize}
            width={this.props.RightIconSize}
            height={this.props.RightIconSize}
            {...this.props.RightIconName}
            onPress={() => this.props.OnRightIconPress()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    width: "100%",
    paddingHorizontal: wp(1),
    paddingTop: Platform.OS == "android" ? hp(1) : 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Title: {
    fontSize: wp(4.5),
  },
});
