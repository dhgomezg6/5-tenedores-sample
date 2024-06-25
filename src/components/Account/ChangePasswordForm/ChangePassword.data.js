import * as Yup from "yup"

export function initialValues() {
    return {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    }
}

export function validationSchema(){
    return Yup.object({
        password: Yup.string().required("la contraseña es obligatoria"),
        newPassword: Yup.string().required("la contraseña es obligatoria"),
        confirmNewPassword: Yup.string()
        .required("la contraseña es obligatoria")
        .oneOf([Yup.ref("newPassword")], "Las contraseñas tienen que ser iguales")
    })
}