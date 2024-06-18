import React, {useState} from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { InfoUser } from "../../../components/Account"
import { LoadingModal } from "./../../../components/Shared"
import { styles } from "./UserLoggedScreen.styles"
import { getAuth, signOut } from "firebase/auth"

export function UserLoggedScreen() {

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  }

  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <Button 
        title="Cerrar sesion" 
        buttonStyle={styles.btnStyles} 
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      ></Button>

      <LoadingModal show={loading} text={loadingText} />
    </View>
  )
}