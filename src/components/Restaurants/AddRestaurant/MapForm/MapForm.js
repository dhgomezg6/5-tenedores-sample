import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as Location from "expo-location";
import { styles } from "./MapForm.styles";
import { Modal } from "../../../Shared";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-toast-message";
import { Button } from "react-native-elements";

export function MapForm(props) {
  const { show, close, formik } = props;
  const [location, setLocation] = useState({
    latitude: 0.01,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    //Funcion autoejecutable
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Tienes que ir a ajustes de la app y activar la localizacion",
        });
        return;
      }

      const locationTemporal = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: locationTemporal.coords.latitude,
        longitude: locationTemporal.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
      console.log(location);
    })();
  }, []);

  const saveLocation = () => {
    formik.setFieldValue("location", location)
    close();
  }

  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showsUserLocation={true}
        style={styles.mapStyle}
        onRegionChange={(locationTemp) => setLocation(locationTemp)}
      >
        <Marker coordinate={location} />
      </MapView>
      <View style={styles.mapActions}>
        <Button
          title="Guardar"
          containerStyle={styles.btnMapContainerSave}
          buttonStyle={styles.btnMapSave}
          onPress={saveLocation}
        />
        <Button 
            title="Cerrar"
            containerStyle={styles.btnMapContainerCancel}
            buttonStyle={styles.btnMapCancel}
            onPress={close}
        />
      </View>
    </Modal>
  );
}
