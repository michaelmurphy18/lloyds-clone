import { ActivityIndicator, Dimensions, View } from "react-native";

const height = Dimensions.get("screen").height;
export const LoadingScreen = () => {
  return (
    <View
      className="absolute inset-0 z-10 flex-1 items-center justify-center"
      style={{ backgroundColor: "#0000004e" }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};
