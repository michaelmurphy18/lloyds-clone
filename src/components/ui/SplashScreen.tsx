import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import * as ExpoSplashScreen from "expo-splash-screen";

import { PropsWithChildren, useCallback, useState } from "react";

export const SplashScreen = ({ children }: PropsWithChildren) => {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  const onImageLoaded = useCallback(async () => {
    try {
      await ExpoSplashScreen.hideAsync();

      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second

      await Promise.all([]);

      setAnimationComplete(true);
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View className="flex-1">
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <View className="flex-1 items-center justify-center gap-y-2 bg-[#12b77b]">
          <Image
            style={styles.image}
            source={require("@assets/images/splash-icon.png")}
            contentFit="contain"
            onLoad={onImageLoaded}
          />

          <View className="absolute bottom-1/4">
            <ActivityIndicator size="large" color="black" />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
