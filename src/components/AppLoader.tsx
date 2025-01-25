import { PropsWithChildren, useEffect } from "react";
import { SplashScreen } from "./ui";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

export default function AppLoader({ children }: PropsWithChildren) {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <SplashScreen>{children}</SplashScreen>;
}
