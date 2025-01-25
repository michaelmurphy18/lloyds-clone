import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

const CaughtUpIndicator = () => {
  return (
    <View className="flex-col items-center gap-y-2">
      <Image
        source={require("@assets/images/icon.png")}
        style={styles.caughtUpImage}
      />
      <Text className="text-center text-gray-600">All caught up</Text>
    </View>
  );
};

export default CaughtUpIndicator;

const styles = StyleSheet.create({
  caughtUpImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});
