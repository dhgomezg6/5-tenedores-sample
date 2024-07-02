import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ListRestaurantsScreen } from "../screens/Restaurants/ListRestaurantsScreen"
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen"
import { ViewRestaurantScreen } from "../screens/Restaurants/ViewRestaurantScreen"
import { screen } from "../utils/screenName"

const Stack = createNativeStackNavigator();

export function RestaurantStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={screen.restaurant.restaurant} 
                component={ListRestaurantsScreen}
                options={{title: "Restaurants "}}
            />

            <Stack.Screen 
                name={screen.restaurant.addRestaurant} 
                component={AddRestaurantScreen}
                options={{title: "Restaurants "}}
            />

            <Stack.Screen 
                name={screen.restaurant.viewRestaurant} 
                component={ViewRestaurantScreen}
                options={{title: "Restaurant "}}
            />

        </Stack.Navigator>
    )
}