import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { InfoUser } from "../../../components/Account"
import { styles } from "./UserLoggedScreen.styles"
import { getAuth, signOut } from "firebase/auth"

export function UserLoggedScreen() {

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  }

  return (
    <View>
      <InfoUser />
      <Button 
        title="Cerrar sesion" 
        buttonStyle={styles.btnStyles} 
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      ></Button>
    </View>
  )
}