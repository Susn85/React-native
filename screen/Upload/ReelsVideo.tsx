import {Alert,Linking,PermissionsAndroid,Platform,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraRoll from '@react-native-camera-roll/camera-roll';

interface VideoProp {
  uri: string;
  playableDuration: number;
}

const useGallery = ({ pageSize = 30 }) => {
  const [videos, setVideos] = useState<VideoProp[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);

  const hasAndroidPermission = async () => {
    if (Number(Platform.Version) >= 33) {
      const statuses = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGE,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);
      return (
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGE] === PermissionsAndroid.RESULTS.GRANTED &&
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  const loadVideos = async () => {
    if (!hasNextPage) return;
    setIsLoadingNextPage(true);
    try {
      const { edges, page_info } = await CameraRoll.getAssets({
        first: pageSize,
        after: nextCursor,
        assetType: 'Videos',
        include: ['playableDuration', 'filename', 'fileSize', 'imageSize'],
      });
      console.log('Full Response:', JSON.stringify({ edges, page_info }, null, 2));
   
    
      const videoList = edges.map(({ node }: { node: any }) => ({
        uri: node.image.uri,
        playableDuration: node.image.playableDuration,
      }));
      setVideos((prev) => [...prev, ...videoList]);
      setNextCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.error('Error loading videos:', error);
      Alert.alert('Error', 'An error occurred while fetching videos.');
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
    await loadVideos();
    setIsLoading(false);
  };

  useEffect(() => {
    initializeGallery();
  }, []);

  return {
    videos,
    loadVideos,
    isLoading,
    permissionDenied,
    hasNextPage,
    isLoadingNextPage,
  };
};

const ReelsVideo = () => {
  const {
    videos,
    isLoading,
    permissionDenied,
    hasNextPage,
    isLoadingNextPage,
    loadVideos,
  } = useGallery({ pageSize: 30 });

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent</Text>
        <Icon name="chevron-down" size={30} color="black" />
      </View>
      {!permissionDenied ? (
        <View style={styles.permissionDeniedContainer}>
          <Text style={styles.permissionText}>We need permission to access your gallery. Grant and reopen the app.</Text>
          <TouchableOpacity style={styles.openSettingsButton} onPress={handleOpenSettings}>
            <Text style={styles.openSettingsText}>Open Settings</Text>
          </TouchableOpacity>
        </View>
      ) : isLoading ? (
        <Text style={styles.loadingText}>Loading videos...</Text>
      ) : (
        <View>
          {videos.map((video, index) => (
            <Text key={index} style={styles.videoItem}>{`Video: ${video.uri}`}</Text>
          ))}
          {isLoadingNextPage && <Text style={styles.loadingText}>Loading more...</Text>}
          {hasNextPage && (
            <TouchableOpacity style={styles.loadMoreButton} onPress={loadVideos}>
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 17,
  },
  permissionDeniedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  openSettingsButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  openSettingsText: {
    color: '#FFFFFF',
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 16,
  },
  videoItem: {
    marginBottom: 8,
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  loadMoreText: {
    color: '#FFFFFF',
  },
});

export default ReelsVideo;