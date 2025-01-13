import { View, Text, ViewProps, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { cn } from "@/libs/utils";
import { CardProviders, ProvidersWithIcon } from "@/types";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import * as Clipboard from "expo-clipboard";

const LCBankCardWithFlip = ({
  cardHolder,
  accountNumber,
  accountType,
  provider = "visa",
  cardType = "debit",
  flip = false,
  className,
  ...props
}: {
  flip?: boolean;
  cardHolder: string;
  accountType: string;
  accountNumber: string;
  provider: CardProviders;
  cardType: "debit" | "credit";
} & ViewProps) => {
  const rotation = useSharedValue(0);
  const [showBack, setShowBack] = useState(flip);

  useEffect(() => {
    if (flip) {
      rotation.value = withTiming(
        90,
        {
          duration: 500,
          easing: Easing.linear,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setShowBack)(true);
            rotation.value = withTiming(180, {
              duration: 500,
              easing: Easing.linear,
            });
          }
        }
      );
    } else if (rotation.value === 180) {
      rotation.value = withTiming(
        90,
        {
          duration: 500,
          easing: Easing.linear,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setShowBack)(false);

            rotation.value = withTiming(0, {
              duration: 500,
              easing: Easing.linear,
            });
          }
        }
      );
    }
  }, [flip]);

  const animatedStyle = useAnimatedStyle(() => {
    const scaleX = interpolate(rotation.value, [0, 180], [1, -1]);
    return {
      transform: [
        {
          rotateY: `${rotation.value}deg`,
        },
        {
          perspective: 1000,
        },
        {
          scaleX,
        },
      ],
    };
  });

  const handleCopyCardNumber = async () => {
    await Clipboard.setStringAsync("5170 9169 2260 7713");
  };

  const handleCopyCVV = async () => {
    await Clipboard.setStringAsync("000");
  };

  return (
    <View
      className={cn("flex-col items-center w-full h-full gap-y-3", className)}
      {...props}
    >
      <Animated.View
        style={animatedStyle}
        className="bg-green-500 relative w-[90%] aspect-card rounded-xl p-4 justify-between shadow shadow-gray-400"
      >
        <Text className="absolute right-4 top-4 capitalize font-semibold px-4 py-2 bg-black/80 text-white rounded-full">
          {accountType}
        </Text>
        <Text className="uppercase font-semibold text-lg">Lloyds bank</Text>

        <View className="flex-row items-end justify-between">
          {showBack ? (
            <View className="gap-y-3">
              <View className="gap-y-1">
                <Text className="text-sm text-gray-800">Card Number</Text>
                <View className="flex-row items-center gap-x-5">
                  <Text>{"5170 9169 2260 7713"}</Text>
                  <Pressable onPress={handleCopyCardNumber}>
                    <Feather name="copy" size={20} color="black" />
                  </Pressable>
                </View>
              </View>
              <View className="flex-row gap-x-5">
                <View className="gap-y-1">
                  <Text className="text-sm text-gray-800">Expires</Text>
                  <Text>01/25</Text>
                </View>
                <View className="gap-y-1">
                  <Text className="text-sm text-gray-800">CVV</Text>
                  <View className="flex-row gap-x-5">
                    <Text>000</Text>
                    <Pressable onPress={handleCopyCardNumber}>
                      <Feather name="copy" size={20} color="black" />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <Text className="uppercase font-light text-sm">
              {accountNumber}
            </Text>
          )}

          <FontAwesome
            name={ProvidersWithIcon.get(provider)}
            size={50}
            color="black"
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default LCBankCardWithFlip;
