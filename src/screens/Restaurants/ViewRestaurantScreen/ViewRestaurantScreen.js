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
import { Carousel, Loading, Map } from "../../../components/Shared"
import { Header, Info } from "../../../components/RestaurantDetail"
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

  if (!restaurant) return <Loading show text="Cargando detalles" />;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={restaurant.images} height={250} width={width} />

      <Header restaurant={restaurant} />
      <Info restaurant={restaurant} />
    </ScrollView>
  );
}
