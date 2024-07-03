import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { ListRestaurant } from "../../../components/Restaurants";
import { screen, db } from "../../../utils";
import { styles } from "./ListRestaurantsScreen.styles";

export function ListRestaurantsScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [error, setError] = useState(null);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if(currentUser){
      const q = query(collection(db, "restaurans"), orderBy("createdAt", "desc"));
      setLoadingRestaurants(true);
      onSnapshot(q, (snapshot) => {
        setLoadingRestaurants(false);
        setRestaurants(snapshot.docs);
      }, (error) => {
        console.log(error);
      });
    } else {
      setRestaurants(null);
    }
  }, [props, isFocused]);

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.addRestaurant,
    });
  };

  return (
    <View style={styles.content}>
      <Text>Estamos en la screen RestaurantsScreen2</Text>
      {loadingRestaurants ? 
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
