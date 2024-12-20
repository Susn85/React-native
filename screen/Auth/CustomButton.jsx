import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'


const CustomButton = ({buttontitle , onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>

      </TouchableOpacity>
    </View>
  )
}

export default CustomButton