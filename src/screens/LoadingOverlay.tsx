import { ActivityIndicator, View, Text, Modal } from "react-native";
import { BlurView } from "expo-blur";
import { useLoadingScreen } from "@/store";
import { FullWindowOverlay } from "react-native-screens";

export default function LoadingOverlay() {
  const { loading } = useLoadingScreen();

  if (!loading) {
    return null;
  }

  return (
    <FullWindowOverlay>
      <BlurView
        intensity={5}
        className="absolute inset-0 z-10 flex-1 justify-center"
        style={{
          backgroundColor: "hsla(0, 0%, 0%, 0.5)",
          paddingHorizontal: 20,
        }}
      >
        <View className="items-center justify-center rounded-xl bg-white py-5">
          <Text className="mb-10 text-lg font-semibold">Please wait</Text>
          <ActivityIndicator size="large" className="mb-5" color="#000" />
        </View>
      </BlurView>
    </FullWindowOverlay>
  );
}
