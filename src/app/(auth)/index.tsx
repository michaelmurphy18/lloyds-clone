import { Button } from "@/components/ui/Button";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center">
        <View className="flex-1 items-center justify-center gap-y-5">
          <Image
            style={styles.image}
            source={require("@assets/images/logo.png")}
            contentFit="contain"
          />
          <Text className="text-3xl">Welcome</Text>
        </View>

        <View className="mt-10 gap-y-3 px-6">
          <Text className="text-lg font-semibold">Already a customer?</Text>
          <Link href="./login" asChild>
            <Button label="Lets's get you logged on" size="lg" />
          </Link>
        </View>

        <View className="mt-16 gap-y-3 px-6">
          <Text className="text-lg font-semibold">Become a customer</Text>
          <Link href="/(auth)/open-account" asChild>
            <Button
              label="Open a bank account with us"
              size="lg"
              variant="outline"
            />
          </Link>
        </View>

        <Link href="/" asChild>
          <Button
            className="mt-10"
            label="Legal information"
            size="lg"
            variant="link"
          />
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
