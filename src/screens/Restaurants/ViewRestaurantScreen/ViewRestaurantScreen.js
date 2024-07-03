import React, { useState, useEffect } from "react";
import { ScrollView, Text, Dimensions } from "react-native";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
//import { Carousel } from "../../../components/Shared"
import { db } from "../../../utils";
import { styles } from "./ViewRestaurantScreen.styles";

const { width } = Dimensions.get("window");

export function ViewRestaurantScreen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restaurans", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);


  console.log(restaurant)
  if (!restaurant) return null;

  return (
    <ScrollView style={styles.content}>
      <Text>smth</Text>
      {/* <Carousel arrayImages={restaurant.images} height={250} width={width} /> */}
    </ScrollView>
  );
}
