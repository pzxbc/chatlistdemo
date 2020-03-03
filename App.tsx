import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ChatList from './ChatList';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
