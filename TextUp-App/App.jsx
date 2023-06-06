import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

class App extends Component {
  render() {
    return (
      <WebView source={{ uri: 'https://text-up.netlify.app/' }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
