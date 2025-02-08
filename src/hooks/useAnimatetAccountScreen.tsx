import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useLayout } from "./useLayout.reanimated";

const useAnimatedAccountScreen = () => {
  const scrollOffset = useSharedValue(0);

  const { onLayout: onSummaryLayout, height: summaryHeight } = useLayout();
  const { onLayout: onTabBarLayout, height: tabBarHeight } = useLayout();
  const { onLayout: onFilterLayout, height: filterHeight } = useLayout();

  const threshold = useDerivedValue(() => {
    return summaryHeight.value;
  });

  const animatedTabBarStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollOffset.value,
      [0, threshold.value],
      [threshold.value, 0],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  const animatedFlatlistStyle = useAnimatedStyle(() => {
    return {
      paddingTop: summaryHeight.value + tabBarHeight.value + filterHeight.value,
    };
  });

  const animatedFilterStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollOffset.value,
      [0, threshold.value],
      [summaryHeight.value + tabBarHeight.value, tabBarHeight.value],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return {
    animatedFlatlistStyle,
    animatedTabBarStyle,
    animatedFilterStyle,
    scrollOffset,
    threshold,
    onTabBarLayout,
    onSummaryLayout,
    onFilterLayout,
  };
};

export default useAnimatedAccountScreen;
