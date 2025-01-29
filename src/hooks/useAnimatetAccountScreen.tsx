import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useDimensions } from "./useDimensions";
import { useState } from "react";

const useAnimatedAccountScreen = () => {
  const { layout, onLayout } = useDimensions();
  const { layout: containerLayout, onLayout: onContainerLayout } =
    useDimensions();

  const offset = useSharedValue(0);
  const vPPosition = useSharedValue(0);
  const vPSelectedPage = useSharedValue(0);
  const [activePage, setActivePage] = useState(0);

  const animatedSummaryStyle = useAnimatedStyle(() => {
    if (!layout) return {};

    const inputRange = [0, layout.height];
    const outRange = [0, -layout.height];

    const translateY = interpolate(
      -offset.value,
      inputRange,
      outRange,
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      -offset.value,
      [0, layout.height / 2],
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateY: -translateY }],
      opacity,
    };
  }, [layout, offset]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    if (!layout || !containerLayout) return {};

    const inputRange = [0, layout.height];

    const translateY = interpolate(
      -offset.value,
      inputRange,
      [0, -layout.height],
      Extrapolation.CLAMP,
    );

    const height = interpolate(
      -offset.value,
      inputRange,
      // [528, 675],
      [containerLayout.height, containerLayout.height + layout.height],
      Extrapolation.CLAMP,
    );

    return {
      flex: 0,
      transform: [{ translateY }],
      height: height,
    };
  }, [layout]);

  return {
    animatedSummaryStyle,
    animatedContainerStyle,
    offset,
    vPPosition,
    vPSelectedPage,
    activePage,
    setActivePage,
    layout,
    onLayout,
    containerLayout,
    onContainerLayout,
  };
};

export default useAnimatedAccountScreen;
