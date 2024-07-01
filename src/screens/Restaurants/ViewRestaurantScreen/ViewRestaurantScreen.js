import React from 'react'
import { View, Text } from 'react-native'

export function ViewRestaurantScreen(props) {
    const {route} = props;
    console.log(route)
  return (
    <View>
      <Text>RestaurantViewScreen</Text>
    </View>
  )
}