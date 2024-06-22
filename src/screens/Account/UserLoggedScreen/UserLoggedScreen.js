import React, {useState} from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { InfoUser, AccountOptions } from "../../../components/Account"
import { LoadingModal } from "./../../../components/Shared"
import { styles } from "./UserLoggedScreen.styles"
import { getAuth, signOut } from "firebase/auth"

export function UserLoggedScreen() {

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")
  const [_, setReload] = useState(false)

  const onReload = () => setReload((prevState) => !prevState)
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  }

  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      <AccountOptions onReload={onReload} />  

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