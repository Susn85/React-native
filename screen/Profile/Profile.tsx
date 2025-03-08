

// // import React, { useEffect } from 'react';
// // import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
// // import { useDispatch, useSelector } from 'react-redux';
// // import fetchProfile from '../../redux/reducers/userSlice';
// // import { RootState } from '../../redux/store'; 

// // const Profile = () => {
// //     const dispatch = useDispatch();
// //     const { user, loading, error } = useSelector((state: RootState) => state.user);

// //     useEffect(() => {
// //         dispatch(fetchProfile("your-user-id"));  
// //     }, [dispatch]);

// //     if (loading) {
// //         return <ActivityIndicator size="large" color="#007bff" />;
// //     }

// //     if (error) {
// //         return <Text>Error: {error}</Text>;
// //     }

// //     return (
// //         <View style={styles.container}>
// //             {user && (
// //                 <>
// //                     <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
// //                     <Text style={styles.name}>{user.username}</Text>
// //                     <Text style={styles.bio}>{user.bio}</Text>

// //                     <View style={styles.statsContainer}>
// //                         <View style={styles.stat}>
// //                             <Text style={styles.statNumber}>{user?.posts?.length || 0}</Text>
// //                             <Text style={styles.statLabel}>Posts</Text>
// //                         </View>
// //                         <View style={styles.stat}>
// //                             <Text style={styles.statNumber}>{user.followers}</Text>
// //                             <Text style={styles.statLabel}>Followers</Text>
// //                         </View>
// //                         <View style={styles.stat}>
// //                             <Text style={styles.statNumber}>{user.following}</Text>
// //                             <Text style={styles.statLabel}>Following</Text>
// //                         </View>
// //                     </View>

// //                     <TouchableOpacity style={styles.button}>
// //                         <Text style={styles.buttonText}>Message</Text>
// //                     </TouchableOpacity>
// //                 </>
// //             )}
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //          flex: 1, 
// //          alignItems: 'center', 
// //          justifyContent: 'center', 
// //          backgroundColor: '#fff'
// //       },
// //     profileImage: {
// //          width: 100, 
// //          height: 100, 
// //          borderRadius: 50, 
// //          marginBottom: 10
// //       },
// //     name: {
// //          fontSize: 22, 
// //          fontWeight: 'bold'
// //       },
// //     bio: {
// //          fontSize: 16, 
// //          color: 'gray', 
// //          marginBottom: 20
// //       },
// //     statsContainer: {
// //          flexDirection: 'row', 
// //          justifyContent: 'space-around', 
// //          width: '80%', 
// //          marginBottom: 20
// //          },
// //     stat: {
// //          alignItems: 'center'
// //      },
// //     statNumber: {
// //          fontSize: 18, 
// //          fontWeight: 'bold'
// //      },
// //     statLabel: { 
// //         fontSize: 14, 
// //         color: 'gray'
// //      },
// //     button: {
// //          backgroundColor: '#007bff', 
// //          padding: 10, 
// //          borderRadius: 5, 
// //          marginBottom: 10, 
// //          width: '80%', 
// //          alignItems: 'center'
// //       },
// //     buttonText: {
// //          color: '#fff', 
// //          fontSize: 16, 
// //          fontWeight: 'bold'
// //       }
// // });

// // export default Profile;

// import React, { useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import fetchProfile from '../../redux/reducers/userSlice';
// import { RootState } from '../../redux/store'; 

// const Profile = () => {
//     const dispatch = useDispatch();
//     const { user, loading, error } = useSelector((state: RootState) => state.user);

//     useEffect(() => {
//         dispatch(fetchProfile("your-user-id"));  
//     }, [dispatch]);

//     // Debugging: Log user data to check API response
//     console.log("User data:", user);

//     if (loading) {
//         return <ActivityIndicator size="large" color="#007bff" />;
//     }

//     if (error) {
//         return <Text>Error: {error}</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             {user && (
//                 <>
//                     <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
//                     <Text style={styles.name}>{user.username}</Text>
//                     <Text style={styles.bio}>{user.bio}</Text>

//                     <View style={styles.statsContainer}>
//                         <View style={styles.stat}>
//                             <Text style={styles.statNumber}>{user?.posts?.length || 0}</Text>
//                             <Text style={styles.statLabel}>Posts</Text>
//                         </View>
//                         <View style={styles.stat}>
//                             <Text style={styles.statNumber}>{user?.followers || 0}</Text>
//                             <Text style={styles.statLabel}>Followers</Text>
//                         </View>
//                         <View style={styles.stat}>
//                             <Text style={styles.statNumber}>{user?.following || 0}</Text>
//                             <Text style={styles.statLabel}>Following</Text>
//                         </View>
//                     </View>

//                     <TouchableOpacity style={styles.button}>
//                         <Text style={styles.buttonText}>Message</Text>
//                     </TouchableOpacity>
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//          flex: 1, 
//          alignItems: 'center', 
//          justifyContent: 'center', 
//          backgroundColor: '#fff'
//     },
//     profileImage: {
//          width: 100, 
//          height: 100, 
//          borderRadius: 50, 
//          marginBottom: 10
//     },
//     name: {
//          fontSize: 22, 
//          fontWeight: 'bold'
//     },
//     bio: {
//          fontSize: 16, 
//          color: 'gray', 
//          marginBottom: 20
//     },
//     statsContainer: {
//          flexDirection: 'row', 
//          justifyContent: 'space-around', 
//          width: '80%', 
//          marginBottom: 20
//     },
//     stat: {
//          alignItems: 'center'
//     },
//     statNumber: {
//          fontSize: 18, 
//          fontWeight: 'bold'
//     },
//     statLabel: { 
//         fontSize: 14, 
//         color: 'gray'
//     },
//     button: {
//          backgroundColor: '#007bff', 
//          padding: 10, 
//          borderRadius: 5, 
//          marginBottom: 10, 
//          width: '80%', 
//          alignItems: 'center'
//     },
//     buttonText: {
//          color: '#fff', 
//          fontSize: 16, 
//          fontWeight: 'bold'
//     }
// });

// export default Profile;

