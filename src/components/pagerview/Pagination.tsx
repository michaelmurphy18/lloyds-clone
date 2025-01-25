import { cn } from "@/libs/utils";
import { View, ViewProps } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type PaginationElementProps = {
  position: SharedValue<number>;
  slideIndex: number;
};
const PaginationElement = ({
  position,
  slideIndex,
}: PaginationElementProps) => {
  const inputRange = [slideIndex - 1, slideIndex, slideIndex + 1];

  const dotAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      position.value,
      inputRange,
      [0.4, 1, 0.4],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      position.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.CLAMP,
    );

    return { opacity, transform: [{ scale }] };
  });

  return (
    <Animated.View
      className="h-3 w-3 rounded-full bg-black"
      style={dotAnimatedStyle}
    />
  );
};

type PaginationProps = {
  numberOfPages: number;
  position: SharedValue<number>;
} & ViewProps;
const Pagination = ({
  numberOfPages,
  position,
  className,
  ...props
}: PaginationProps) => {
  return (
    <View className={cn("flex-row items-center gap-x-2", className)} {...props}>
      {Array(numberOfPages)
        .fill(0)
        .map((_, index) => (
          <PaginationElement
            key={index}
            position={position}
            slideIndex={index}
          />
        ))}
    </View>
  );
};

export default Pagination;
