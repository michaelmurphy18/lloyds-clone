import MaskedView from "@react-native-masked-view/masked-view";
import { ReactElement, useCallback, useEffect, useState } from "react";
import {
  ColorValue,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useLayout } from "@/hooks/useLayout.reanimated";

type SkeletonProps = {
  backgroundColor?: ColorValue;
  highlight?: string;
  children: ReactElement;
  width?: number;
  height?: number;
};

const SkeletonLoader = ({
  backgroundColor = "#dbdbdb",
  highlight = "#FFFFFF",
  children,
  width: customWidth,
  height: customHeight,
}: SkeletonProps) => {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const shared = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shared.value,
      [0, 1],
      [
        customWidth ?? (layout ? -layout.width : 0),
        customWidth ?? (layout ? layout.width : 0),
      ],
    );
    return {
      transform: [{ translateX }],
    };
  });

  useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: 1000 }), Infinity);
  }, [shared]);

  //   if (customHeight || customWidth) {
  //     width.value = customWidth || width.value;
  //     height.value = customHeight || height.value;
  //   }

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  }, []);

  if (!layout) {
    return <View onLayout={onLayout}>{children}</View>;
  }
  return (
    <MaskedView
      maskElement={children}
      style={{ height: customHeight ?? layout.height, width: layout.width }}
    >
      <View
        className="flex-grow overflow-hidden"
        style={{ backgroundColor: backgroundColor }}
      />
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
              colors={["transparent", "black", "transparent"]}
            />
          }
        >
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: highlight }]}
          />
        </MaskedView>
      </Animated.View>
    </MaskedView>
  );
};

export { SkeletonLoader };
