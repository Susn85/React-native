// import React, { useState, useEffect } from "react";
// import { View,Text, TouchableOpacity,Image,TextInput,Alert, StyleSheet } from "react-native";
// import Video from "react-native-video";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useUpload } from "../Upload/UploadContext";

// const PostScreen = ({ route, navigation }) => {
//   const item = route.params || {}; 
//   const { startUpload } = useUpload();
//   const [caption, setCaption] = useState("");
//   const [isVideo, setIsVideo] = useState(false); 
//   const { file_uri } = route.params; 
//   const { thumb_uri } = route.params;

//     useEffect(() => {
//     console.log("Received Data:", route.params);
//     if (item?.file_uri) {
//       const fileType = item.file_uri.split(".").pop().toLowerCase();
//       setIsVideo(["mp4", "mov", "avi", "mkv"].includes(fileType));
//     }
//   }, [route.params]);

//   if (!file_uri) {
//     return ( 
//      <View>
//         <Text>No media available</Text>
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Video
//         source={{ uri: file_uri }} 
//         style={styles.video}
//         resizeMode="contain"
//         repeat={true}
//         muted={false}
//         paused={false} 
//         onError={(e) => console.log("Video Error:", e)}
//        />
//      <View style={styles.header}>
//        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         <Icon name="keyboard-backspace" size={30} color="white" />
//        </TouchableOpacity>
//          <Text style={styles.title}>New Post</Text>
//            <TouchableOpacity onPress={() => Alert.alert("More Information")} style={styles.menuButton}>
//              <Icon name="dots-horizontal" size={30} color="white" />
//            </TouchableOpacity>
//        </View>

//        <TextInput
//         style={styles.captionInput}
//         placeholder="Write a caption..."
//         placeholderTextColor="#999"
//         value={caption}
//         onChangeText={setCaption}
//       />

//       <TouchableOpacity
//         style={styles.postButton}
//         onPress={() => {
//           console.log("Posting:", { file: item.file_uri, caption });
//           // Alert.alert("Upload", "Upload successful");
//           if (typeof startUpload === "function") {
//             startUpload(item.file_uri, item.thumb_uri, caption);
//           } else {
//             console.error("startUpload is not defined or not a function");
//           }
//           navigation.goBack();
//         }}
//       >
//         <Text style={styles.postText}>Post</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: "black", 
//     justifyContent: "center", 
//     alignItems: "center" },
//   video: { 
//     width: "100%", 
//     height: "100%"
//    },
//   header: {
//         position: "absolute",
//         top: 10,
//         left: 0,
//         right: 0,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingHorizontal: 15,
//         zIndex: 10,
//       },
//       backButton: {
//         padding: 10,
//       },
//       backText: {
//         color: "#fff",
//         fontSize: 20,
//       },
//       title: {
//         color: "#fff",
//         fontSize: 18,
//         fontWeight: "bold",
//       },
//       menuButton: {
//         padding: 10,
//       },
//       menuText: {
//         color: "#fff",
//         fontSize: 20,
//       },
//       captionInput: {
//         position: "absolute",
//         bottom: 20,
//         left: 10,
//         right: 90,
//         borderWidth: 1,
//         color: "#ddd",
//         fontSize: 15,
//         padding: 10,
//         borderRadius: 10,
//         zIndex: 10, 
//         borderTopWidth: 1,
//         borderTopColor: "#ddd",
//       },
//       postButton: {
//         position: "absolute",
//         bottom: 20,
//         right: 10,
//         backgroundColor: "#007AFF",
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 10,
//         zIndex: 10, 
//       },
//       postText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//       },
// });

// export default PostScreen;

import React, {useState,useEffect} from 'react';
import {Image, View, TextInput, StyleSheet,TouchableOpacity,Text,Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useUpload} from './UploadContext'
import Video from "react-native-video";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

type uriData = {
  thumb_uri: string;
  file_uri: string;
};

const PostScreen = () => {
  const data = useRoute();
  const item = data?.params as uriData;
  const [caption, setCaption] = useState('');
  const [isVideo, setIsVideo] = useState(false); 
  const {startUpload} = useUpload();
  const navigation = useNavigation();
  const { file_uri } = item; 
  const { thumb_uri } = item;

   useEffect(() => {
    console.log("Received Data:", data.params);
    if (item?.file_uri) {
      const fileType = item.file_uri.split(".").pop()?.toLowerCase();
      setIsVideo(["mp4", "mov", "avi", "mkv"].includes(fileType || ""));
    }
  }, [item]);

  if (!file_uri) {
    return ( 
     <View>
        <Text>No media available</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: file_uri }} 
        style={styles.video}
        resizeMode="contain"
        repeat={true}
        muted={false}
        paused={false} 
        onError={(e) => console.log("Video Error:", e)}
       />
       <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
             <Icon name="keyboard-backspace" size={30} color="white" />
            </TouchableOpacity>
              <Text style={styles.title}>New Post</Text>
                <TouchableOpacity onPress={() => Alert.alert("More Information")} style={styles.menuButton}>
                  <Icon name="dots-horizontal" size={30} color="white" />
                </TouchableOpacity>
            </View>
       
          <Image source={{uri: item?.thumb_uri}} style={styles.img} />
          <TextInput
           style={styles.captionInput}
           placeholder="Write a caption..."
           placeholderTextColor="#999"
           value={caption}
           onChangeText={setCaption}
          />
         
         <TouchableOpacity
        style={styles.postButton}
        onPress={() => {
          console.log("Posting:", { file: item.file_uri, caption });
          Alert.alert("Upload", "Upload successful");
          if (typeof startUpload === "function") {
            startUpload(item.file_uri, item.thumb_uri, caption);
          } else {
            console.error("startUpload is not defined or not a function");
          }
          navigation.goBack();
        }}
      >
        <Text style={styles.postText}>Post</Text>
      </TouchableOpacity>
   </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "black", 
    justifyContent: "center", 
    alignItems: "center"
  },
  captionInput: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 90,
    borderWidth: 1,
    color: "#ddd",
    fontSize: 15,
    padding: 10,
    borderRadius: 10,
    zIndex: 10, 
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  img: {
    width: '25%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  video: { 
    width: "100%", 
    height: "100%"
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  postButton: {
    position: "absolute",
    bottom: 20,
    right: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 10, 
  },
    postText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    zIndex: 10,
  },
    backButton: {
    padding: 10,
  },
    backText: {
    color: "#fff",
    fontSize: 20,
  },
    title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
    menuButton: {
    padding: 10,
  },
    menuText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default PostScreen;


