import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SplashScreen as LCSplashScreen } from "@/components/ui";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppLoader from "@/components/AppLoader";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppLoader>
      <GestureHandlerRootView>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </AppLoader>
  );
}

function RootLayoutNav() {
  return <Slot />;
}
