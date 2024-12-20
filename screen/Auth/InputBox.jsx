import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InputBox = ({
    placeholder,
    onBlur,
    onChangeText,
    Value,
    touched,
    secureTextEntry,
    keyboardType,
    maxLength,
    errors,
}) => {
  return (
    <View>
      style={styles.textInput}
      placeholder={placeholder}
      onchangeText={onChangeText}
      onBlur={onBlur}
      Value={Value}
      touched={touched}
      secureTextEntry{secureTextEntry}
      keyboardType={keyboardType}
      maxLength={maxLength}
      errors={errors} 
    </View>
  )
}

export default InputBox

const styles = StyleSheet.create({})