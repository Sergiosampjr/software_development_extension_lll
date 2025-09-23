import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tela inicial já é login */}
      <Stack.Screen name="login" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
