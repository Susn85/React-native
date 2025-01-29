import {Alert,FlatList,Linking,PermissionsAndroid,Platform,StyleSheet,Text,TouchableOpacity,View,ActivityIndicator,Image,Dimensions,} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

interface AssetProp {
  uri: string;
  playableDuration: number | null;
  type: string;
}

const ReelsVideo = ({ pageSize = 30 }) => {
  const [assets, setAssets] = useState<AssetProp[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);

  const hasAndroidPermission = async () => {
    if (Number(Platform.Version) >= 33) {
      const statuses = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);
      return (
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  const loadAssets = async () => {
    if (!hasNextPage) return;
    setIsLoadingNextPage(true);
    try {
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: pageSize,
        after: nextCursor,
        assetType: 'All', 
        include: ['playableDuration', 'filename', 'fileSize', 'imageSize'],
      });

      const assetList = edges.map(({ node }: { node: any }) => ({
        uri: node.image.uri,
        playableDuration: node.type === 'video' ? node.image.playableDuration : null,
        type: node.type,
      }));

      setAssets((prev) => [...prev, ...assetList]);
      setNextCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.error('Error loading assets:', error);
      Alert.alert('Error', 'An error occurred while fetching assets.');
    } finally {
      setIsLoadingNextPage(false);
    }
  };

  const initializeGallery = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await hasAndroidPermission();
      if (!hasPermission) {
        setPermissionDenied(true);
        return;
      }
    }
    setIsLoading(true);
    await loadAssets();
    setIsLoading(false);
  };

  useEffect(() => {
    initializeGallery();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>Recent</Text>
      <Icon name="chevron-down" size={30} color="black" />
      </View>
      {permissionDenied ? (
        <Text>Permission denied. Please enable gallery access in settings.</Text>
      ) : isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={assets}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.assetItem}>
              <Image source={{ uri: item.uri }} style={styles.thumbnail} />
              {item.type === 'video' && (
                <View style={styles.videoIcon}>
                  <Icon name="play-circle-outline" size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          onEndReached={loadAssets}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 16
   },
   header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 16,
   },
  title: { 
    fontSize: 18, 
   },
  thumbnail: { 
    width: '100%', 
    height: 100, 
    resizeMode: 'cover'
   },
  assetItem: { 
    width: '30%', 
    margin: 5
   },
  videoIcon: { 
    position: 'absolute', 
    bottom: 5, 
    right: 5
   },
});

export default ReelsVideo;
