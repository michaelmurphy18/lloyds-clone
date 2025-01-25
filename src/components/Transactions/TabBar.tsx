import { cn } from "@/libs/utils";
import { TransactionTimeline } from "@/types";
import { useCallback } from "react";
import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const screenWidth = Dimensions.get("screen").width;

type TransactionsTabBarProps = {
  timeline: TransactionTimeline;
  selectedPage: SharedValue<number>;
  position: SharedValue<number>;
  setActivePage: (value: number) => void;
};

const TransactionsTabBar = ({
  timeline,
  selectedPage,
  position,
  setActivePage,
}: TransactionsTabBarProps) => {
  const animatedRef = useAnimatedRef<FlatList<TransactionTimeline>>();

  const offset = useSharedValue(0);

  const selectedIndex = useSharedValue(0);

  // useAnimatedReaction(
  //   () => selectedPage.value,
  //   (cur, prev) => {
  //     if (cur !== prev) {
  //       selectedIndex.value = cur;
  //     }
  //   },
  // );

  useAnimatedReaction(
    () => position.value,
    (cur, prev) => {
      if (cur !== prev) {
        // console.log("Current PositionValue", cur);

        offset.value = Math.max(0, cur * (screenWidth / 3));
      }
    },
    [position],
  );

  const handlePress = useCallback(
    (index: number) => {
      setActivePage(index);
      offset.set(Math.max(0, index * (screenWidth / 3)));
    },
    [offset, setActivePage],
  );

  const animatedProps = useAnimatedProps(() => ({
    contentOffset: {
      x: withSpring(offset.value, {
        overshootClamping: true,
        damping: 20,
        stiffness: 100,
        mass: 0.5,
      }),
      y: 0,
    },
  }));

  // const borderStyle = useAnimatedStyle(() => {
  //   return {};
  // });

  return (
    <View className="relative">
      <Animated.FlatList
        // style={style}
        ref={animatedRef}
        animatedProps={animatedProps}
        horizontal
        inverted
        className="flex-grow-0 border-t border-gray-300"
        decelerationRate="fast"
        snapToAlignment="end"
        scrollEventThrottle={16}
        snapToInterval={screenWidth / 3}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        data={timeline}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => handlePress(index)}
            className={cn(
              "active:bg-black/5",
              "items-center justify-center border-b-2 border-transparent py-5",
              // index === selectedIndex && "border-black",
            )}
            style={{
              width: screenWidth / 3,
              marginRight: index === 0 ? screenWidth / 3 : 0, // screenWidth/ 2 - screenWidth / 3
              marginLeft: index === timeline.length - 1 ? screenWidth / 3 : 0,
            }}
          >
            <Text className="capitalize">{item}</Text>
          </Pressable>
        )}
      />
      <Animated.View
        // style={borderStyle}
        style={{
          width: screenWidth / 3,
        }}
        className="absolute bottom-0 h-px self-center rounded-xl bg-black"
      />
    </View>
  );
};

export default TransactionsTabBar;
