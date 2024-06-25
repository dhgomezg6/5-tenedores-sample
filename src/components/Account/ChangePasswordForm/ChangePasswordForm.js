import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { 
	getAuth, 
	updatePassword, 
	EmailAuthProvider, 
	reauthenticateWithCredential } from "firebase/auth";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./ChangePassword.data";
import { styles } from "./ChangePassword.styles";

export function ChangePasswordForm(props) {
  const { onClose, onReload } = props;
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const onShowOldPassword = () => setShowOldPassword((prevState) => !prevState);
  const onShowNewPassword = () => setShowNewPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { password, newPassword } = formValue;
        const currentUser = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(currentUser.email, password );
        reauthenticateWithCredential(currentUser, credentials);

		await updatePassword(currentUser, newPassword)

        //Actualizar el componente de usuario
        onReload();
        //Cerrar el modal
        onClose();
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el email",
        });
        onClose();
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Contraseña anterior"
        containerStyle={styles.input}
        secureTextEntry={!showOldPassword}
        rightIcon={{
          type: "material-community",
          name: showOldPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowOldPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Contraseña nueva"
        containerStyle={styles.input}
        secureTextEntry={!showNewPassword}
        rightIcon={{
          type: "material-community",
          name: showNewPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowNewPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
	  <Input
        placeholder="Repite Contraseña nueva"
        containerStyle={styles.input}
        secureTextEntry={!showNewPassword}
        rightIcon={{
          type: "material-community",
          name: showNewPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowNewPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("confirmNewPassword", text)}
        errorMessage={formik.errors.confirmNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
