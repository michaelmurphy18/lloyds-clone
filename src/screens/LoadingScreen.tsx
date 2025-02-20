import { ActivityIndicator, Dimensions, View, StyleSheet } from "react-native";
import { FullWindowOverlay } from "react-native-screens";

const height = Dimensions.get("screen").height;
export const LoadingScreen = () => {
  return (
    <FullWindowOverlay>
      <View
        className="z-10 flex-1 items-center justify-center"
        style={{
          backgroundColor: "#0000004e",
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    </FullWindowOverlay>
  );
};

export const NewPayeeLoadingScreen = () => {
  return (
    <FullWindowOverlay>
      <View></View>
    </FullWindowOverlay>
  );
};
