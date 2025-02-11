// // // // // // import React, { useState } from "react";
// // // // // // import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
// // // // // // import { launchImageLibrary } from "react-native-image-picker";

// // // // // // const PostScreen = () => {
// // // // // //   const [image, setImage] = useState(null);
// // // // // //   const [uploading, setUploading] = useState(false);

// // // // // //   const pickImage = () => {
// // // // // //     launchImageLibrary({ mediaType: "photo" }, (response) => {
// // // // // //       if (response.didCancel) return;
// // // // // //       if (response.errorMessage) {
// // // // // //         Alert.alert("Error", response.errorMessage);
// // // // // //       } else {
// // // // // //         setImage(response.assets[0]);
// // // // // //       }
// // // // // //     });
// // // // // //   };

// // // // // //   // Function to upload the image
// // // // // //   const uploadImage = async () => {
// // // // // //     if (!image) {
// // // // // //       Alert.alert("Please select an image first");
// // // // // //       return;
// // // // // //     }

// // // // // //     setUploading(true);
// // // // // //     const formData = new FormData();
// // // // // //     formData.append("file", {
// // // // // //       uri: image.uri,
// // // // // //       type: image.type,
// // // // // //       name: image.fileName,
// // // // // //     });

// // // // // //     try {
// // // // // //       const response = await fetch("https://Susan.com/upload", {
// // // // // //         method: "POST",
// // // // // //         body: formData,
// // // // // //         headers: { "Content-Type": "multipart/form-data" },
// // // // // //       });

// // // // // //       const result = await response.json();
// // // // // //       Alert.alert("Success", "Image uploaded successfully!");
// // // // // //     } catch (error) {
// // // // // //       Alert.alert("Upload failed", error.message);
// // // // // //     } finally {
// // // // // //       setUploading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// // // // // //       <Text style={{ fontSize: 20, marginBottom: 20 }}>Upload an Image</Text>

// // // // // //       {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, marginBottom: 10 }} />}

// // // // // //       <TouchableOpacity onPress={pickImage} style={styles.button}>
// // // // // //         <Text style={styles.buttonText}>Pick Image</Text>
// // // // // //       </TouchableOpacity>

// // // // // //       <TouchableOpacity onPress={uploadImage} style={styles.button}>
// // // // // //         {uploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Upload Image</Text>}
// // // // // //       </TouchableOpacity>
// // // // // //     </View>
// // // // // //   );
// // // // // // };

// // // // // // const styles = {
// // // // // //   button: {
// // // // // //     backgroundColor: "#007BFF",
// // // // // //     padding: 12,
// // // // // //     borderRadius: 8,
// // // // // //     marginTop: 10,
// // // // // //   },
// // // // // //   buttonText: {
// // // // // //     color: "#FFF",
// // // // // //     fontSize: 16,
// // // // // //   },
// // // // // // };

// // // // // // export default PostScreen;

// // // // // import React, { useState } from "react";
// // // // // import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
// // // // // import { launchImageLibrary } from "react-native-image-picker";
// // // // // import Video from "react-native-video";

// // // // // const PostScreen = () => {
// // // // //   const [media, setMedia] = useState(null);
// // // // //   const [uploading, setUploading] = useState(false);

// // // // //   // Function to pick an image or video
// // // // //   const pickMedia = () => {
// // // // //     launchImageLibrary({ mediaType: "mixed" }, (response) => {
// // // // //       if (response.didCancel) return;
// // // // //       if (response.errorMessage) {
// // // // //         Alert.alert("Error", response.errorMessage);
// // // // //       } else {
// // // // //         setMedia(response.assets[0]); // Save the selected media
// // // // //       }
// // // // //     });
// // // // //   };

// // // // //   // Function to upload the media (image or video)
// // // // //   const uploadMedia = async () => {
// // // // //     if (!media) {
// // // // //       Alert.alert("Please select an image or video first");
// // // // //       return;
// // // // //     }

// // // // //     setUploading(true);
// // // // //     const formData = new FormData();
// // // // //     formData.append("file", {
// // // // //       uri: media.uri,
// // // // //       type: media.type, // "image/jpeg" or "video/mp4"
// // // // //       name: media.fileName || `upload.${media.type.split("/")[1]}`, // Ensure correct extension
// // // // //     });

// // // // //     try {
// // // // //       const response = await fetch("https://your-api.com/upload", {
// // // // //         method: "POST",
// // // // //         body: formData,
// // // // //         headers: { "Content-Type": "multipart/form-data" },
// // // // //       });

// // // // //       const result = await response.json();
// // // // //       Alert.alert("Success", "Media uploaded successfully!");
// // // // //     } catch (error) {
// // // // //       Alert.alert("Upload failed", error.message);
// // // // //     } finally {
// // // // //       setUploading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// // // // //       <Text style={{ fontSize: 20, marginBottom: 20 }}>Upload Image/Video</Text>

// // // // //       {media && (
// // // // //         media.type.startsWith("image") ? (
// // // // //           <Image source={{ uri: media.uri }} style={{ width: 200, height: 200, marginBottom: 10 }} />
// // // // //         ) : (
// // // // //           <Video
// // // // //             source={{ uri: media.uri }}
// // // // //             style={{ width: 200, height: 200 }}
// // // // //             controls
// // // // //             resizeMode="contain"
// // // // //           />
// // // // //         )
// // // // //       )}

// // // // //       <TouchableOpacity onPress={pickMedia} style={styles.button}>
// // // // //         <Text style={styles.buttonText}>Pick Image/Video</Text>
// // // // //       </TouchableOpacity>

// // // // //       <TouchableOpacity onPress={uploadMedia} style={styles.button}>
// // // // //         {uploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Upload</Text>}
// // // // //       </TouchableOpacity>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // const styles = {
// // // // //   button: {
// // // // //     backgroundColor: "#007BFF",
// // // // //     padding: 12,
// // // // //     borderRadius: 8,
// // // // //     marginTop: 10,
// // // // //   },
// // // // //   buttonText: {
// // // // //     color: "#FFF",
// // // // //     fontSize: 16,
// // // // //   },
// // // // // };

// // // // // export default PostScreen;


// // // // import { View,TouchableOpacity,Button,StyleSheet,Text,Alert,TextInput,Image} from 'react-native'
// // // // import React, {useState} from 'react';
// // // // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import {useRoute} from '@react-navigation/native';
// // // // // import {useUpload} from '../../components/uploadservice/UploadContext';

// // // //   interface uriData {
// // // //     thumb_uri: string;
// // // //     file_uri: string;
// // // //   }



// // // // const PostScreen = () => {
// // // //   const navigation = useNavigation();
// // // //   const goBack = () => {
// // // //     navigation.goBack();
// // // //   };
// // // //     const data = useRoute();
// // // //     const item = data?.params as uriData;
// // // //     const [caption, setCaption] = useState<string>('');
// // // //     // const {startUpload} = useUpload();


// // // //   return (
// // // //      <View>
// // // //         <View style={styles.header}>
// // // //             <TouchableOpacity onPress={goBack}>
// // // //               <Icon name="keyboard-backspace" size={30} color="black" />
// // // //             </TouchableOpacity>
// // // //             <Text style={styles.title}>Upload</Text>
// // // //             <TouchableOpacity onPress={() => Alert.alert('More Information')}>
// // // //               <Icon name="information-outline" size={30} color="black" />
// // // //             </TouchableOpacity>
// // // //         </View>
// // // //         <View style={styles.flexDirectionRow}>
// // // //           <Image source={{uri: item?.thumb_uri}} style={styles.img} />
// // // //           <TextInput
// // // //             style={[styles.input, styles.textArea]}
// // // //             value={caption}
// // // //             placeholderTextColor='#484C56'
// // // //             onChangeText={setCaption}
// // // //             placeholder="Enter your caption here..."
// // // //             multiline={true}
// // // //             numberOfLines={5}
// // // //           />
// // // //         </View>
// // // //         <Button
// // // //           title="Post"
// // // //           onPress={() => {
// // // //             Alert.alert('Upload successfull')
// // // //             goBack();
// // // //             // startUpload(item?.thumb_uri, item?.file_uri, caption);
// // // //           }}
// // // //         />
// // // //     </View>
// // // //   )
// // // // }
// // // // const styles = StyleSheet.create({
// // // //     header: {
// // // //       flexDirection: 'row',
// // // //       justifyContent: 'space-between',
// // // //       margin: 10,
// // // //       alignItems: 'center',
// // // //     },
// // // //     title: {
// // // //       fontSize: 20,
// // // //       fontWeight: 'bold',
// // // //     },
// // // //     flexDirectionRow: {
// // // //       flexDirection: 'row',
// // // //       alignItems: 'center',
// // // //       gap: 20,
// // // //     },
// // // //     input: {
// // // //       height: 150,
// // // //       borderColor: 'gray',
// // // //       borderWidth: 1,
// // // //       color: 'black',
// // // //       borderRadius: 5,
// // // //       fontFamily:'medium',
// // // //       padding: 10,
// // // //       marginVertical: 10,
// // // //       width: '68%',
// // // //     },
// // // //     img: {
// // // //       width: '33%',
// // // //       height: 150,
// // // //       resizeMode: 'cover',
// // // //       borderRadius: 10,
// // // //     },
// // // //     textArea: {
// // // //       height: 150,
// // // //       textAlignVertical: 'top',
// // // //     },
// // // // })
// // // // export default PostScreen;


// // // import React, { useState } from "react";
// // // import {
// // //   View,
// // //   TouchableOpacity,
// // //   Button,
// // //   StyleSheet,
// // //   Text,
// // //   Alert,
// // //   TextInput,
// // //   Image,
// // // } from "react-native";
// // // import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { useRoute } from "@react-navigation/native";

// // // interface uriData {
// // //   thumb_uri: string;
// // //   file_uri: string;
// // // }

// // // const PostScreen = () => {
// // //   const navigation = useNavigation();
// // //   const goBack = () => {
// // //     navigation.goBack();
// // //   };

// // //   const route = useRoute();
// // //   const item: uriData | undefined = route?.params as uriData;
// // //   const [caption, setCaption] = useState<string>("");

// // //   // Debugging: Log route params and image URI
// // //   console.log("Route Params:", route.params);
// // //   console.log("Image URI:", item?.thumb_uri);

// // //   return (
// // //     <View style={styles.container}>
// // //       {/* Header Section */}
// // //       <View style={styles.header}>
// // //         <TouchableOpacity onPress={goBack}>
// // //           <Icon name="keyboard-backspace" size={30} color="black" />
// // //         </TouchableOpacity>
// // //         <Text style={styles.title}>Upload</Text>
// // //         <TouchableOpacity onPress={() => Alert.alert("More Information")}>
// // //           <Icon name="information-outline" size={30} color="black" />
// // //         </TouchableOpacity>
// // //       </View>

// // //       {/* Image and Caption Section */}
// // //       <View style={styles.flexDirectionRow}>
// // //         {item?.thumb_uri ? (
// // //           <Image
// // //             source={{ uri: item.thumb_uri }}
// // //             style={styles.img}
// // //             onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
// // //           />
// // //         ) : (
// // //           <Text>No Image Available</Text>
// // //         )}

// // //         <TextInput
// // //           style={[styles.input, styles.textArea]}
// // //           value={caption}
// // //           placeholderTextColor="#484C56"
// // //           onChangeText={setCaption}
// // //           placeholder="Enter your caption here..."
// // //           multiline={true}
// // //           numberOfLines={5}
// // //         />
// // //       </View>

// // //       {/* Post Button */}
// // //       <Button
// // //         title="Post"
// // //         onPress={() => {
// // //           Alert.alert("Upload successful");
// // //           goBack();
// // //         }}
// // //       />
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 10,
// // //     backgroundColor: "#fff",
// // //   },
// // //   header: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginBottom: 20,
// // //   },
// // //   title: {
// // //     fontSize: 20,
// // //     fontWeight: "bold",
// // //   },
// // //   flexDirectionRow: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     gap: 20,
// // //   },
// // //   input: {
// // //     height: 150,
// // //     borderColor: "gray",
// // //     borderWidth: 1,
// // //     color: "black",
// // //     borderRadius: 5,
// // //     fontFamily: "medium",
// // //     padding: 10,
// // //     marginVertical: 10,
// // //     width: "68%",
// // //   },
// // //   img: {
// // //     width: "33%",
// // //     height: 150,
// // //     resizeMode: "cover",
// // //     borderRadius: 10,
// // //   },
// // //   textArea: {
// // //     height: 150,
// // //     textAlignVertical: "top",
// // //   },
// // // });

// // // export default PostScreen;

// // import React, { useState } from "react";
// // import {
// //   View,
// //   TouchableOpacity,
// //   Button,
// //   StyleSheet,
// //   Text,
// //   Alert,
// //   TextInput,
// //   Image,
// // } from "react-native";
// // import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// // import { useNavigation } from "@react-navigation/native";
// // import { useRoute } from "@react-navigation/native";

// // interface uriData {
// //   thumb_uri: string;
// //   file_uri: string;
// // }

// // const PostScreen = () => {
// //   const navigation = useNavigation();
// //   const goBack = () => {
// //     navigation.goBack();
// //   };

// //   const route = useRoute();
// //   const item: uriData | undefined = route?.params as uriData;
// //   const [caption, setCaption] = useState<string>("");

// //   console.log("Route Params:", route.params);
// //   console.log("Image URI:", item?.thumb_uri);

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={goBack}>
// //           <Icon name="keyboard-backspace" size={30} color="black" />
// //         </TouchableOpacity>
// //         <Text style={styles.title}>New Post</Text>
// //         <TouchableOpacity onPress={() => Alert.alert("More Information")}>
// //           <Icon name="dots-horizontal" size={30} color="black" />
// //         </TouchableOpacity>
// //       </View>

// //       <View style={styles.postContainer}>
// //         {item?.thumb_uri ? (
// //           <Image
// //             source={{ uri: item.thumb_uri }}
// //             style={styles.img}
// //             onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
// //           />
// //         ) : (
// //           <Text>No Image Available</Text>
// //         )}

// //         <TextInput
// //           style={styles.captionInput}
// //           value={caption}
// //           placeholderTextColor="#999"
// //           onChangeText={setCaption}
// //           placeholder="Write a caption..."
// //           multiline={true}
// //         />
// //       </View>

// //       <TouchableOpacity style={styles.postButton} onPress={() => {
// //           Alert.alert("Upload successful");
// //           goBack();
// //         }}>
// //         <Text style={styles.postButtonText}>Post</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //   },
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     padding: 15,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ddd",
// //   },
// //   title: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   postContainer: {
// //     flexDirection: "row",
// //     alignItems: "flex-start",
// //     padding: 15,
// //   },
// //   img: {
// //     width: 100,
// //     height: 100,
// //     resizeMode: "cover",
// //     borderRadius: 10,
// //     marginRight: 15,
// //   },
// //   captionInput: {
// //     flex: 1,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ddd",
// //     fontSize: 16,
// //     color: "black",
// //   },
// //   postButton: {
// //     backgroundColor: "#0095F6",
// //     paddingVertical: 10,
// //     margin: 15,
// //     borderRadius: 5,
// //     alignItems: "center",
// //   },
// //   postButtonText: {
// //     color: "white",
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// // });

// // export default PostScreen;


// import React, { useState } from "react";
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   Text,
//   Alert,
//   TextInput,
//   Image,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useNavigation } from "@react-navigation/native";
// import { useRoute } from "@react-navigation/native";

// interface uriData {
//   thumb_uri: string;
//   file_uri: string;
// }

// const PostScreen = () => {
//   const navigation = useNavigation();
//   const goBack = () => {
//     navigation.goBack();
//   };

//   const route = useRoute();
//   const item: uriData | undefined = route?.params as uriData;
//   const [caption, setCaption] = useState<string>("");

//   console.log("Route Params:", route.params);
//   console.log("Image URI:", item?.thumb_uri);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={goBack}>
//           <Icon name="keyboard-backspace" size={30} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.title}>New Post</Text>
//         <TouchableOpacity onPress={() => Alert.alert("More Information")}>
//           <Icon name="dots-horizontal" size={30} color="black" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.imageContainer}>
//         {item?.thumb_uri ? (
//           <Image
//             source={{ uri: item.thumb_uri }}
//             style={styles.img}
//             onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
//           />
//         ) : (
//           <Text>No Image Available</Text>
//         )}
//       </View>

//       <TextInput
//         style={styles.captionInput}
//         value={caption}
//         placeholderTextColor="#999"
//         onChangeText={setCaption}
//         placeholder="Write a caption..."
//         multiline={true}
//       />

//       <TouchableOpacity style={styles.postButton} onPress={() => {
//           Alert.alert("Upload successful");
//           goBack();
//         }}>
//         <Text style={styles.postButtonText}>Post</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   imageContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   img: {
//     width: "100%",
//     height: "60%",
//     resizeMode: "cover",
//   },
//   captionInput: {
//     padding: 15,
//     fontSize: 16,
//     color: "black",
//     borderTopWidth: 1,
//     borderTopColor: "#ddd",
//   },
//   postButton: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     backgroundColor: "#0095F6",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     alignItems: "center",
//   },
//   postButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default PostScreen;

import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

interface uriData {
  thumb_uri: string;
  file_uri: string;
}

const PostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item: uriData | undefined = route?.params as uriData;
  const [caption, setCaption] = useState<string>("");

  // Debugging
  console.log("Route Params:", route.params);
  console.log("Image URI:", item?.thumb_uri);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="keyboard-backspace" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>New Post</Text>
        <TouchableOpacity onPress={() => Alert.alert("More Information")}>
          <Icon name="dots-horizontal" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {item?.thumb_uri ? (
          <Image
            source={{ uri: item.thumb_uri }}
            style={styles.img}
            onError={(e) =>
              console.log("Image Load Error:", e.nativeEvent.error)
            }
          />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>

      <TextInput
        style={styles.captionInput}
        value={caption}
        placeholderTextColor="#999"
        onChangeText={setCaption}
        placeholder="Write a caption..."
        multiline={true}
      />

      <TouchableOpacity
        style={styles.postButton}
        onPress={() => {
          Alert.alert("Upload successful");
          navigation.goBack();
        }}
      >
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
  },
  captionInput: {
    padding: 15,
    fontSize: 16,
    color: "black",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  postButton: {
    position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#0095F6",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: "center",
  },
  postButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PostScreen;
