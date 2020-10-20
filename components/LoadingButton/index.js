import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Spinner } from "@ui-kitten/components";

export default class LoadingButton extends React.PureComponent {
  static defaultProps = {
    isLoading: false,
  };
  render() {
    return (
      <Button
        {...this.props}
        style={[styles.LoadingButton, this.props.style]}
        icon={
          this.props.isLoading
            ? () => (
                <View>
                  <Spinner size="small" status="primary" style={this.props.SpinnerStyle} />
                </View>
              )
            : null
        }>
        {this.props.children}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  LoadingButton: {
    flexDirection: "row-reverse",
  },
});
