import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import CurrencyView from "@/components/CurrencyView";

type HeaderProps = {
  scrollOffset: SharedValue<number>;
  height?: number;
} & NativeStackHeaderProps;

const AnimatedCurrencyView = Animated.createAnimatedComponent(CurrencyView);

const AnimatedHeader = ({
  scrollOffset,
  height,
  options,
  route,
  ...props
}: HeaderProps) => {
  const { top } = useSafeAreaInsets();

  const routeName = route.name;

  let title = options.title || routeName;

  const animatedAmountStyle = useAnimatedStyle(() => {
    if (!height) return {};

    const translateY = interpolate(
      -scrollOffset.value,
      [0, height / 2],
      [-50, 0],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      -scrollOffset.value,
      [0, height / 2],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateY: `${translateY}%` }],
      opacity,
    };
  }, [height, scrollOffset]);

  return (
    <View
      className="flex-row items-center gap-x-5 px-2 pb-2"
      style={{ paddingTop: top }}
    >
      <Link href=".." asChild>
        {renderIcon({
          icon: Ionicons,
          name: "arrow-back",
        })}
      </Link>

      <Text className="text-lg font-bold">{title}</Text>

      <AnimatedCurrencyView
        amount={100}
        style={animatedAmountStyle}
        className="-translate-y-1/2 text-lg opacity-0"
      />

      <View className="flex-1" />

      <Link href="/support" asChild>
        {renderIcon({
          icon: AntDesign,
          name: "questioncircleo",
        })}
      </Link>
    </View>
  );
};

export default AnimatedHeader;

const renderIcon = ({
  icon: IconComponent,
  name,
  size = 22,
  action,
}: {
  icon: any;
  name: string;
  size?: number;
  action?: () => void;
}) => (
  <Pressable onPress={action} className="rounded-full p-2 active:bg-black/10">
    <IconComponent name={name} size={size} color="black" />
  </Pressable>
);
