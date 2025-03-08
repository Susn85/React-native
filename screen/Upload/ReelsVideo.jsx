import {Alert,FlatList,StyleSheet,Text,TouchableOpacity,View,ActivityIndicator,Image,Dimensions,Platform,PermissionsAndroid} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useNavigation } from "@react-navigation/native";

const ReelsVideo = ({ pageSize = 10 }) => {
  const navigation = useNavigation();
  const [assets, setAssets] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
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
    if (!hasNextPage || isLoadingNextPage) return;
    setIsLoadingNextPage(true);

    try {
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: pageSize,
        after: nextCursor,
        assetType: "All",
        include: ["playableDuration"],
      });

      const assetList = edges.map(({ node }) => ({
        uri: node.image.uri,
        playableDuration: node.image.playableDuration || 0,
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

  const initializeGallery = async () => {
    if (Platform.OS === "android") {
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

  const formatDuration = (seconds) => {
    if (!seconds || seconds === 0) return "";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVideoSelect = (data) => {
    const { uri ,type} = data;
    console.log("Selected Media URI:", uri);

    navigation.navigate("PostScreen", {
      file_uri: uri,
      thumb_uri: uri,
    });

    console.log("Navigating to PostScreen");
  };

  const renderItem = ({ item }) => {
    const isVideo = item.type.includes("video");

    return (
      <TouchableOpacity
        style={styles.assetItem}
        onPress={() => handleVideoSelect(item)}
      >
        <Image source={{ uri: item.uri }} style={styles.thumbnail} />
        {isVideo && item.playableDuration > 0 && (
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>{formatDuration(item.playableDuration)}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!isLoadingNextPage) return null;
    return <ActivityIndicator size="large" color="grey" />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent</Text>
        <Icon name="chevron-down" size={30} color="black" />
      </View>
      {permissionDenied ? (
        <Text>Permission denied. Please enable gallery access in settings.</Text>
      ) : isLoading ? (
        <ActivityIndicator size="large" color="grey" />
      ) : (
        <FlatList
          data={assets}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          onEndReached={loadAssets}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderFooter}
          windowSize={10}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  header: {
    flexDirection: "row",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  assetItem: {
    width: "33%",
    height: Dimensions.get("window").height * 0.26,
    overflow: "hidden",
    margin: 0.5,
  },
  durationContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

 export default ReelsVideo;
// import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image, Dimensions, Platform, PermissionsAndroid } from "react-native";
// import React, { useEffect, useState } from "react";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
// import { useNavigation } from "@react-navigation/native";

// const ReelsVideo = ({ pageSize = 20 }) => {
//   const navigation = useNavigation();
//   const [assets, setAssets] = useState([]);
//   const [nextCursor, setNextCursor] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [permissionDenied, setPermissionDenied] = useState(false);
//   const [hasNextPage, setHasNextPage] = useState(true);
//   const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);

//   // ✅ Request storage permissions (Android 13+ compatible)
//   const requestPermissions = async () => {
//     if (Platform.OS === "android") {
//       if (Number(Platform.Version) >= 33) {
//         const statuses = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//         ]);
//         return (
//           statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
//           statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
//         );
//       } else {
//         const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
//         return status === PermissionsAndroid.RESULTS.GRANTED;
//       }
//     }
//     return true; // iOS always has permission if added to Info.plist
//   };

//   // ✅ Fetch gallery assets (photos & videos)
//   const loadAssets = async () => {
//     if (!hasNextPage || isLoadingNextPage) return;
//     setIsLoadingNextPage(true);

//     try {
//       const { edges, page_info } = await CameraRoll.getPhotos({
//         first: pageSize,
//         after: nextCursor,
//         assetType: "All", // ✅ Fetches both videos & images
//         include: ["playableDuration", "filename"],
//       });

//       if (edges.length === 0) {
//         Alert.alert("No Media", "No photos or videos found in gallery.");
//         return;
//       }

//       const assetList = edges.map(({ node }) => ({
//         uri: node.image.uri, // ✅ Ensure correct image URI
//         playableDuration: node.image.playableDuration || 0,
//         type: node.type,
//       }));

//       setAssets((prev) => [...prev, ...assetList]);
//       setNextCursor(page_info.end_cursor);
//       setHasNextPage(page_info.has_next_page);
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       Alert.alert("Error", "Failed to fetch media.");
//     } finally {
//       setIsLoadingNextPage(false);
//     }
//   };

//   // ✅ Initialize gallery & check permissions
//   const initializeGallery = async () => {
//     const hasPermission = await requestPermissions();
//     if (!hasPermission) {
//       setPermissionDenied(true);
//       return;
//     }
//     setIsLoading(true);
//     await loadAssets();
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     initializeGallery();
//   }, []);

//   const handleMediaSelect = (data) => {
//     const { uri } = data;
//     console.log("Selected Media URI:", uri);
//     navigation.navigate("PostScreen", {
//        file_uri: uri,
//        thumb_uri: uri,

//        });
//   };

//   // ✅ Render gallery items
//   const renderItem = ({ item }) => {
//     const isVideo = item.type.includes("video");

//     return (
//       <TouchableOpacity style={styles.assetItem} onPress={() => handleMediaSelect(item)}>
//         <Image source={{ uri: item.uri }} style={styles.thumbnail} />
//         {isVideo && (
//           <View style={styles.durationContainer}>
//             <Text style={styles.durationText}>🎥</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {permissionDenied ? (
//         <Text>Permission denied. Enable gallery access in settings.</Text>
//       ) : isLoading ? (
//         <ActivityIndicator size="large" color="grey" />
//       ) : (
//         <FlatList
//           data={assets}
//           renderItem={renderItem}
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
//   container: { flex: 1, padding: 5 },
//   thumbnail: { width: "100%", height: "100%" },
//   assetItem: { width: "33%", height: Dimensions.get("window").height * 0.25, margin: 2 },
//   durationContainer: { position: "absolute", bottom: 5, right: 5, backgroundColor: "rgba(0, 0, 0, 0.6)", padding: 5, borderRadius: 5 },
//   durationText: { color: "white", fontSize: 14, fontWeight: "bold" },
// });

// export default ReelsVideo;
 
