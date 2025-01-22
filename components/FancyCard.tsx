import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

function FancyCard() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../src/assets/Susan3.png')}
      />
      <Text style={styles.text}>Trending Places</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
  
    width:600,
    height: 870,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FancyCard;
