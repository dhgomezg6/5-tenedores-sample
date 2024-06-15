import React from 'react'
import { View } from 'react-native'
import { Avatar, Text } from "react-native-elements"
import { getAuth } from "firebase/auth"
import { styles } from "./InfoUser.styles"

export function InfoUser() {
  const {uid, photoUrl, displayName, email} = getAuth().currentUser;
  
  const changeAvatar = () => {
    console.log('Cambiar avatar')
  }

  return (
    <View style={styles.content}>
      <Avatar 
        size="large" 
        rounded 
        icon={{type: "material", name:"person"}}
        containerStyle={styles.avatar}
        source={{ uri: photoUrl }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anonimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  )
}
