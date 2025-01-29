import { Image } from "expo-image";
import * as ExpoSplashScreen from "expo-splash-screen";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/store";
import { Redirect } from "expo-router";
import { GetCurrentUser } from "@/api/users/me";
import { useQuery } from "@tanstack/react-query";
import { GetAllAccount } from "@/api/account/main";

export const SplashScreen = ({ imageUri }: { imageUri: string }) => {
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
  const { authenticated } = useAuth();

  const { data: user } = useQuery({
    queryKey: ["current-user"],
    queryFn: GetCurrentUser,
    staleTime: Infinity,
  });

  const userId = user?.id;

  const { isLoading } = useQuery({
    queryKey: ["accounts", userId],
    queryFn: GetAllAccount,
    enabled: !!userId,
  });

  const onImageLoaded = useCallback(async () => {
    try {
      await ExpoSplashScreen.hideAsync();

      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second

      // await Promise.all([]);

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
      {isAppReady &&
        !isLoading &&
        (authenticated ? (
          <Redirect href="/(root)/(tabs)" />
        ) : (
          <Redirect href="/(auth)" />
        ))}

      {/* {!isSplashAnimationComplete && ( */}
      <View className="flex-1 items-center justify-center gap-y-2 bg-[#12b77b]">
        <Image
          style={styles.image}
          source={imageUri}
          contentFit="contain"
          onLoad={onImageLoaded}
        />

        <View className="absolute bottom-1/4">
          <ActivityIndicator size="large" color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
