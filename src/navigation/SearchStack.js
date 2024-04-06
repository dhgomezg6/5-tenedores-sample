import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SearchScreen } from "../screens/SearchScreen"
import { screen } from "../utils/screenName"

const Stack = createNativeStackNavigator();

export function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={screen.ranking.ranking} 
                component={SearchScreen}
                options={{title: "Search"}}
            />
        </Stack.Navigator>
    )
}