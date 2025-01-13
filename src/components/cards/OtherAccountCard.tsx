import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { CurrencyView } from "@/components";
import { Image } from "expo-image";

const OtherAccountCard = () => {
  return (
    <View className="bg-white rounded-xl">
      <View className="p-4 flex-row justify-between">
        <View>
          <Text className="font-semibold ">Classic</Text>
          <Text className="text-sm font-light">00-00-00 / 00000000</Text>
          <CurrencyView amount={100} className="mt-2" />
        </View>
        <View className="flex-col items-end justify-between">
          <Feather name="more-horizontal" size={24} color="black" />
          <Image
            source={require("../../../assets/images/icon.png")}
            style={styles.bankImage}
          />
        </View>
      </View>
    </View>
  );
};

export default OtherAccountCard;

const styles = StyleSheet.create({
  bankImage: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
});
