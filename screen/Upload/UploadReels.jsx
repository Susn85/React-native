import { StyleSheet, Text, TouchableOpacity, Alert, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { launchCamera } from 'react-native-image-picker';
import { createThumbnail } from 'react-native-create-thumbnail';
import { useNavigation } from '@react-navigation/native';

const UploadReels = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleCamera =async () => {
    await launchCamera({
      mediaType: 'video',
      formatAsMp4: true,
      saveToPhotos: true,
      includeExtra: true, 
    })
    .then(response => {
      console.log(response);
      createThumbnail({
        url: res.assets[0].uri ||'',
        timeStamp: 100,
      })
      .then((response) => {
        if(res.assets && res.assets[0].uri) {
         navigation('PostScreen',{

            thumb_uri: response.path,
            file_uri: res.assets && res.assets[0].uri,
          });
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
    })
    .catch(err => {
      console.log("Video Record", err); 
    });
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="keyboard-backspace" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Upload Reels</Text>
        <TouchableOpacity onPress={() => Alert.alert('More Information')}>
          <Icon name="information-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => handleCamera()}>
          <Icon name="camera-outline" size={40} color="black" />
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Icon2 name="my-library-add" size={40} color="black" />
          <Text style={styles.buttonText}>Drafts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Icon2 name="auto-fix-high" size={40} color="black" />
          <Text style={styles.buttonText}>Templates</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'grey',
    width: '31%',
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    color: '#fff',
  },
});

export default UploadReels;
