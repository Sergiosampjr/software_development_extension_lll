// frontend/app/home/map.tsx
import React from "react";
import { View, Platform, Text } from "react-native";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function MapScreen() {
  const apiKey = "AIzaSyBC_8YzbEeus7upOWl0pEbhY7_eqi0H6VU";

  // Se estiver no mobile, mostrar aviso (pois só funciona na web)
  if (Platform.OS !== "web") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, padding: 20, textAlign: "center" }}>
          O Google Maps desta forma só funciona na versão Web do Expo.
        </Text>
      </View>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: -3.7445, lng: -38.5370 }} // Fortaleza
        defaultZoom={12}
        gestureHandling="greedy"
        disableDefaultUI={false}
      />
    </APIProvider>
  );
}
