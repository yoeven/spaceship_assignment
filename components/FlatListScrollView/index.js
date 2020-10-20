import React from "react";
import { FlatList } from "react-native";

export default class FlatListScrollView extends React.PureComponent {
  static defaultProps = {
    FlatListRef: () => {},
  };
  render() {
    return (
      <FlatList
        {...this.props}
        ref={ref => this.props.FlatListRef(ref)}
        data={this.props.children}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
      />
    );
  }
}
