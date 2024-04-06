import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen"
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen"
import { screen } from "../utils/screenName"

const Stack = createNativeStackNavigator();

export function RestaurantStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={screen.restaurant.restaurant} 
                component={RestaurantsScreen}
                options={{title: "Restaurants "}}
            />

            <Stack.Screen 
                name={screen.restaurant.addRestaurant} 
                component={AddRestaurantScreen}
                options={{title: "Restaurants "}}
            />
        </Stack.Navigator>
    )
}