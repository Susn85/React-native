import {
  Alert,
  FlatList,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraRoll from '@react-native-camera-roll/camera-roll';

interface AssetProp {
  uri: string;
  playableDuration: number | null;
  type: string;
}

const useGallery = ({ pageSize = 30 }) => {
  const [assets, setAssets] = useState<AssetProp[]>([]);
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
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGE] ===
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
      const { edges, page_info } = await CameraRoll.getAssets({
        first: pageSize,
        after: nextCursor,
        assetType: 'All', // Fetch both videos and photos
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

  return {
    assets,
    loadAssets,
    isLoading,
    permissionDenied,
    hasNextPage,
    isLoadingNextPage,
  };
};

const ReelsVideo = () => {
  const {
    assets,
    isLoading,
    permissionDenied,
    hasNextPage,
    isLoadingNextPage,
    loadAssets,
  } = useGallery({ pageSize: 30 });

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  const renderItem = ({ item }: { item: AssetProp }) => {
    return (
      <TouchableOpacity style={styles.assetItem} onPress={() => {}}>
        <Image source={{ uri: item.uri }} style={styles.thumbnail} />
        {item.type === 'video' && (
          <View style={styles.videoIcon}>
            <Icon name="play-circle-outline" size={20} color="white" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!isLoadingNextPage) return null;
    return <ActivityIndicator size="small" color="blue" />;
  };

  const loadNextPageAssets = ({ distanceFromEnd }: { distanceFromEnd: number }) => {
    if (!isLoadingNextPage && hasNextPage) {
      loadAssets();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent</Text>
        <Icon name="chevron-down" size={30} color="black" />
      </View>
      {permissionDenied ? (
        <View style={styles.permissionDeniedContainer}>
          <Text style={styles.permissionText}>
            We need permission to access your gallery. Grant and reopen the app.
          </Text>
          <TouchableOpacity style={styles.openSettingsButton} onPress={handleOpenSettings}>
            <Text style={styles.openSettingsText}>Open Settings</Text>
          </TouchableOpacity>
        </View>
      ) : isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={assets}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
          onEndReached={loadNextPageAssets}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
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
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  assetItem: {
    width: '25%',
    height: Dimensions.get('window').height * 0.28,
    overflow: 'hidden',
    margin: 2,
  },
  videoIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
});

export default ReelsVideo;
