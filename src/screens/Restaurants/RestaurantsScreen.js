import React from "react";
import {View, Text} from "react-native";
import {Button} from "react-native-elements"

import {screen} from "../../utils/screenName"

export function RestaurantsScreen(props) {
    const {navigation} = props;

    const goToAddRestaurant = () => {
        navigation.navigate(screen.restaurant.addRestaurant)
    }

    return (
        <View>
            <Text>Estamos en la screen RestaurantsScreen</Text>
            <Button title="Crear Restaurante!" onPress={goToAddRestaurant}></Button>
        </View>
    )
}