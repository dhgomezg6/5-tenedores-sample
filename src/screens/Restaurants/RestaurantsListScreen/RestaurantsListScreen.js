import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { ListRestaurant } from "../../../components/Restaurants";
import { screen, db } from "../../../utils";
import { styles } from "./RestaurantsListScreen.styles";

export function RestaurantsListScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "restaurans"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.addRestaurant,
    });
  };

  return (
    <View style={styles.content}>
      <Text>Estamos en la screen RestaurantsScreen</Text>
      {!restaurants ? 
        <LoadingModal text="Cargando" /> 
        : <ListRestaurant restaurants={restaurants} />}

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  );
}
