import { StyleSheet, Text, TouchableOpacity, Alert, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { launchCamera } from 'react-native-image-picker';
import { createThumbnail } from 'react-native-create-thumbnail';
import { useNavigation } from '@react-navigation/native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const UploadReels = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const handleCamera = async () => {
    try {
      const response = await launchCamera({
        mediaType: 'video',
        saveToPhotos: true,
      });

      if (response.assets && response.assets.length > 0) {
        const videoUri = response.assets[0].uri;
        
        await CameraRoll.save(videoUri, { type: 'video' });

        const thumbnail = await createThumbnail({
          url: videoUri,
          timeStamp: 100,
        });

        navigation.navigate('ReelsVideo', {
          thumb_uri: thumbnail.path, 
          file_uri: videoUri,
        });
      }
    } catch (error) {
      console.error('Error recording video:', error);
    }
  };

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
