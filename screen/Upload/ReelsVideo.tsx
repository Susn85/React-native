// import { Alert, FlatList, Linking, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image, Dimensions } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { CameraRoll } from '@react-native-camera-roll/camera-roll';
// import { navigate } from '../../navigator/NavigationUtil';
// import { createThumbnail } from 'react-native-create-thumbnail';
// import { useNavigation } from '@react-navigation/native';

// interface AssetProp {
//   uri: string;
//   playableDuration: number | null;
//   type: string;
// }

// const ReelsVideo = ({ pageSize = 30 }) => {
//   const navigation = useNavigation();

//   const [assets, setAssets] = useState<AssetProp[]>([]);
//   const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
//   const [permissionDenied, setPermissionDenied] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasNextPage, setHasNextPage] = useState(true);
//   const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);

//   const hasAndroidPermission = async (): Promise<boolean> => {
//     if (Number(Platform.Version) >= 33) {
//       const statuses = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//         PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//       ]);
//       return (
//         statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
//           PermissionsAndroid.RESULTS.GRANTED &&
//         statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
//           PermissionsAndroid.RESULTS.GRANTED
//       );
//     } else {
//       const status = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
//       );
//       return status === PermissionsAndroid.RESULTS.GRANTED;
//     }
//   };

//   const loadAssets = async (): Promise<void> => {
//     if (!hasNextPage) return;
//     setIsLoadingNextPage(true);
//     try {
//       const { edges, page_info } = await CameraRoll.getPhotos({
//         first: pageSize,
//         after: nextCursor,
//         assetType: 'All',
//         include: ['playableDuration', 'filename', 'fileSize', 'imageSize'],
//       });

//       const assetList = edges.map(({ node }: { node: any }) => ({
//         uri: node.image.uri,
//         playableDuration: node.type === 'video' ? node.image.playableDuration : null,
//         type: node.type,
//       }));

//       setAssets((prev) => [...prev, ...assetList]);
//       setNextCursor(page_info.end_cursor);
//       setHasNextPage(page_info.has_next_page);
//     } catch (error) {
//       console.error('Error loading assets:', error);
//       Alert.alert('Error', 'An error occurred while fetching assets. Please try again later.');
//     } finally {
//       setIsLoadingNextPage(false);
//     }
//   };

//   const initializeGallery = async () => {
//     if (Platform.OS === 'android') {
//       const hasPermission = await hasAndroidPermission();
//       if (!hasPermission) {
//         setPermissionDenied(true);
//         return;
//       }
//     }
//     setIsLoading(true);
//     await loadAssets();
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     initializeGallery();
//   }, []);

//   const formatDuration = (seconds: number | null) => {
//     if (!seconds) return '0:00';
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const handleVideoSelect = async (data: any) => {
//     const { uri } = data;
//     if (Platform.OS === 'android') {
//       createThumbnail({
//         url: uri || '',
//         timeStamp: 100,
//       }).then((response: { path: string }) => {
//         console.log(response);
//         navigate('PostScreen', {
//           thumb_uri: response.path,
//           file_uri: uri,
//         } as { thumb_uri: string; file_uri: string }).catch((err: Error) => {
//           console.log('Thumbnail Generation error', err);
//         });
//       });
//       return;
//     }

//     const fileData = await CameraRoll.iosGetImageDataById(uri).catch(err => {
//       console.error('Error fetching image data:', err);
//       Alert.alert('Error', 'Failed to fetch image data.');
//       return null;
//     });

//     createThumbnail({
//       url: fileData?.node?.image?.filepath || '',
//       timeStamp: 100,
//     })
//     .then(Response => {
//       console.log(Response);
//       navigate('PostScreen', {
//         thumb_uri: Response.path,
//         file_uri: uri,
//       } as { thumb_uri: string; file_uri: string });
//     })
//     .catch(err => {
//       console.log('Thumbnail Generation error', err);
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Recent</Text>
//         <Icon name="chevron-down" size={30} color="black" />
//       </View>
//       {permissionDenied ? (
//         <Text>Permission denied. Please enable gallery access in settings.</Text>
//       ) : isLoading ? (
//         <ActivityIndicator size="large" color="grey" />
//       ) : (
//         <FlatList
//           data={assets}
//           renderItem={({ item }) => (
//             <TouchableOpacity style={styles.assetItem} onPress={() => { [navigation.navigate('PostScreen'), handleVideoSelect(item)] }}>
//               <Image source={{ uri: item.uri }} style={styles.thumbnail} />
//               {item.type.includes('video') && (
//                 <View style={styles.videoIcon}>
//                   <Icon name="play-circle-outline" size={30} color="black" />
//                   <Text style={styles.durationText}>{formatDuration(item.playableDuration)}</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//           numColumns={3}
//           onEndReached={loadAssets}
//           onEndReachedThreshold={0.5}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 20,
//   },
//   thumbnail: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//   },
//   assetItem: {
//     width: '33%',
//     height: Dimensions.get('window').height * 0.26,
//     overflow: 'hidden',
//     margin: 0.5,
//   },
//   videoIcon: {
//     position: 'absolute',
//     bottom: 3,
//     right: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 2,
//   },
//   durationText: {
//     color: 'black',
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
// });

// export default ReelsVideo;

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { navigate } from "../../navigator/NavigationUtil";
import { createThumbnail } from "react-native-create-thumbnail";
import { useNavigation } from "@react-navigation/native";

interface AssetProp {
  uri: string;
  playableDuration: number | null;
  type: string;
}

const ReelsVideo = ({ pageSize = 30 }) => {
  const navigation = useNavigation();

  const [assets, setAssets] = useState<AssetProp[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);

  const hasAndroidPermission = async (): Promise<boolean> => {
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

  const loadAssets = async (): Promise<void> => {
    if (!hasNextPage) return;
    setIsLoadingNextPage(true);
    try {
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: pageSize,
        after: nextCursor,
        assetType: "All",
        include: ["playableDuration"],
      });

      const assetList = edges.map(({ node }: { node: any }) => ({
        uri: node.image.uri,
        playableDuration: node.type === "video" ? node.image.playableDuration : null,
        type: node.type,
      }));

      setAssets((prev) => [...prev, ...assetList]);
      setNextCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.error("Error loading assets:", error);
      Alert.alert("Error", "Failed to fetch assets.");
    } finally {
      setIsLoadingNextPage(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleVideoSelect = async (data: any) => {
    const { uri } = data;

    createThumbnail({
      url: uri,
      timeStamp: 100,
    })
      .then((response) => {
        console.log("Thumbnail Path:", response.path);
        navigate("PostScreen", {
          thumb_uri: response.path,
          file_uri: uri,
        });
      })
      .catch((err) => console.log("Thumbnail Generation error", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent</Text>
        <Icon name="chevron-down" size={30} color="black" />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="grey" />
      ) : (
        <FlatList
          data={assets}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.assetItem}
              onPress={() =>  [navigation.navigate('PostScreen'),handleVideoSelect(item)]}
            >
              <Image source={{ uri: item.uri }} style={styles.thumbnail} />
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
  container: {  padding: 1 },
  header: { flexDirection: "row", marginBottom: 16 },
  title: { fontSize: 20 },
  thumbnail: { width: "100%", height: 200, resizeMode: "cover" },
  assetItem: {  width: '33%',
        height: Dimensions.get('window').height * 0.26,
        overflow: 'hidden',
        margin: 0.5, },
});

export default ReelsVideo;
