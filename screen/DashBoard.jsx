// import React, { useEffect, useState } from "react";
// import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
// import Video from "react-native-video";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";

// const DashBoard = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get("http://10.0.2.2:3000/posts");
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isVideo = item.file_url.endsWith(".mp4") || item.file_url.endsWith(".mov");

//     return (
//       <View style={styles.postContainer}>
//         {isVideo ? (
//           <Video
//             source={{ uri: item.file_url }}
//             style={styles.media}
//             resizeMode="cover"
//             controls
//           />
//         ) : (
//           <Image source={{ uri: item.file_url }} style={styles.media} />
//         )}
        
//         <View style={styles.postInfo}>
//           <Text style={styles.caption}>{item.caption}</Text>
//           <View style={styles.actions}>
//             <TouchableOpacity>
//               <Icon name="heart-outline" size={24} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate("CommentsScreen", { postId: item._id })}>
//               <Icon name="comment-outline" size={24} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#fff" style={styles.loader} />;
//   }

//   return (
//     <FlatList
//       data={posts}
//       renderItem={renderItem}
//       keyExtractor={(item) => item._id}
//       showsVerticalScrollIndicator={false}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   postContainer: {
//     marginBottom: 20,
//   },
//   media: {
//     width: "100%",
//     height: 300,
//   },
//   postInfo: {
//     padding: 10,
//   },
//   caption: {
//     color: "white",
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//   },
// });

// export default DashBoard;

import { View, Text } from 'react-native'
import React from 'react'

const DashBoard = () => {
  return (
    <View>
      <Text>DashBoard</Text>
    </View>
  )
}

export default DashBoard
