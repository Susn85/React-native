import { Alert, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import CameraRoll from "@react-native-community/cameraroll";

interface VideoProp{
  uri:string;
  playableDuration: Number;
}
const useGallery = ({ pageSize = 30 }) => {
  const [video,setVideo]=useState<VideoProp[]>([]);
  const [nextCursor,setNextCursor]=useState<string|undefined>(undefined);
  const [permissionNotGranted,setPermissionGranted]=useState<Boolean>(false)
  const [isLoading,setIsLoading]=useState(false)
  const [hasNextPage,setHasNextPage]=useState(true)
  const [isLoadingNextPage,setIsLoadingNextPage]=useState(false)

  const LoadingNextPagePictures = async () => {
    if (!hasNextPage) return;
    setIsLoadingNextPage(true)
    try {
      setIsLoadingNextPage(true)
      const {videoData} = await CameraRoll.getPhotos({
        first:pageSize,
        after: nextCursor,
        assetType: 'Videos',
        include: [
         'playableDuration',
         'filename',
         'fileSize',
         'fileExtension',
         'imageSize',
        ],
      });
      const videoExtracted = videoData.edges?.map(({ edge }: { edge: any }) => ({
      uri:edge.node.image.uri,
      playableDuration:edge.node.image.playableDuration,
      filename:edge.node.image.filename,
      filePath:edge.node.image.filePath,
      extension:edge.node.image.extension,
      }));      
      setVideo (prev=> [...prev,...videoExtracted]);
      setNextCursor(videoData.page_info.end_cursor);
      setHasNextPage(videoData.page_info.has_next_page);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while fetching videos');
    } finally {
      setIsLoadingNextPage(false)
    }
  };

const hasAndroidPermission = async () => {
  if(Platform.Version as number >=33){
  const statuses = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGE,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  ]);
  return (
    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGE] === PermissionsAndroid.RESULTS.GRANTED &&
    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
  );
  }else{
    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    return status ===PermissionsAndroid.RESULTS.GRANTED;
  }
};


  const fetchVideo = async () => {
    const hasPermissiion = await hasAndroidPermission();
    if(!hasPermissiion){
      setPermissionGranted(true);
    } else {
      setIsLoading(true);
      await LoadingNextPagePictures();
      setIsLoading(false)
    }
  };
  useEffect(() => {
 if(Platform.OS=='ios'){
  fetchVideo();
 } else{
  fetchInitial();
 }
  }, []);
};
const ReelsVideo = () => {
  return (
    <View style={styles.Container}>
      <Text style={{fontSize:17}}>Recent</Text>
      <Icon
       name="chevron-down" 
       size={30} 
       color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  Container:{
    gap:4,
    margin:10,
    alignItems:'center',
    flexDirection:'row'
  }    
})
export default ReelsVideo

function fetchInitial() {
  throw new Error('Function not implemented.');
}
