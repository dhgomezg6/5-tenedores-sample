import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native-elements";
import { styles } from "./ImageRestaurant.styles";

export function ImageRestaurant(props) {
  const { formik } = props;

  const primaryImage =
    formik.values.images.length > 0
      ? {uri: formik.values.images[0]}
      : require("../../../../../assets/img/NoImageFound.png");

  return (
    <View style={styles.content}>
      <Image source={primaryImage} style={styles.image} />
    </View>
  );
}
