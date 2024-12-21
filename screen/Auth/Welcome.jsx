import { StyleSheet, Image, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timeout); 
  }, [navigation]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Image
        style={styles.image}
        source={require('../../src/assets/Susan.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    margin: 4,
    width: 400,
    height: 200,
  },
});

export default Welcome;
