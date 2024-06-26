import * as Yup from "yup"

export function initialValues() {
    return {
        email: "",
        password: "",
    }
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string()
            .email("Email no es valido")
            .required("El email es obligatorio"),
        password: Yup.string().required("la contraseña es obligatoria")
    })
}