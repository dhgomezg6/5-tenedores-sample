import React, {useState} from 'react'
import { View } from 'react-native'
import { useFormik } from 'formik'
import { getAuth , signInWithEmailAndPassword } from "firebase/auth"
import Toast from "react-native-toast-message"
import { useNavigation } from "@react-navigation/native"
import { Input, Icon, Button } from "react-native-elements"
import { screen } from "../../../utils"
import { initialValues, validationSchema } from './LoginForm.data'
import { styles } from "./LoginForm.styles"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try{
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
        navigation.navigate(screen.account.account)
      } catch (error){
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Usuario o contraseña incorrectos"
        })
        console.log(error)
      }
    }
  })

  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Input 
        containerStyle={styles.input} 
        placeholder="Correo electronico" 
        rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon}/>}
        onChangeText = {text => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input 
        containerStyle={styles.input} 
        placeholder="Contraseña" 
        secureTextEntry={showPassword? false:true}
        rightIcon={<Icon type="material-community" name={showPassword? "eye-off-outline":"eye-outline"} iconStyle={styles.icon} onPress={showHiddenPassword}/>}
        onChangeText = {text => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button 
        title="Iniciar sesion" 
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}