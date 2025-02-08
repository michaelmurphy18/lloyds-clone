import { cn } from "@/libs/utils";
import { TransactionTimeline } from "@/types";
import { useCallback } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import {
  Route,
  SceneRendererProps,
  TabBar,
  TabDescriptor,
  NavigationState,
} from "react-native-tab-view";

const screenWidth = Dimensions.get("screen").width;

type TransactionsTabBarProps = {
  timeline: string[];
  selectedPage: SharedValue<number>;
  position: SharedValue<number>;
  setActivePage: (value: number) => void;
};

// const TransactionsTabBar = ({
//   timeline,
//   selectedPage,
//   position,
//   setActivePage,
// }: TransactionsTabBarProps) => {
//   const animatedRef = useAnimatedRef<FlatList<TransactionTimeline>>();

//   const offset = useSharedValue(0);

//   const selectedIndex = useSharedValue(0);

//   // useAnimatedReaction(
//   //   () => selectedPage.value,
//   //   (cur, prev) => {
//   //     if (cur !== prev) {
//   //       selectedIndex.value = cur;
//   //     }
//   //   },
//   // );

//   useAnimatedReaction(
//     () => position.value,
//     (cur, prev) => {
//       if (cur !== prev) {
//         // console.log("Current PositionValue", cur);

//         offset.value = Math.max(0, cur * (screenWidth / 3));
//       }
//     },
//     [position],
//   );

//   const handlePress = useCallback(
//     (index: number) => {
//       setActivePage(index);
//       offset.set(Math.max(0, index * (screenWidth / 3)));
//     },
//     [offset, setActivePage],
//   );

//   const animatedProps = useAnimatedProps(() => ({
//     contentOffset: {
//       x: withSpring(offset.value, {
//         overshootClamping: true,
//         damping: 20,
//         stiffness: 100,
//         mass: 0.5,
//       }),
//       y: 0,
//     },
//   }));

//   return (
//     <View className="relative">
//       <Animated.FlatList
//         // style={style}
//         ref={animatedRef}
//         animatedProps={animatedProps}
//         horizontal
//         inverted
//         className="flex-grow-0 border-t border-gray-300"
//         decelerationRate="fast"
//         snapToAlignment="end"
//         scrollEventThrottle={16}
//         snapToInterval={screenWidth / 3}
//         overScrollMode="never"
//         showsHorizontalScrollIndicator={false}
//         data={timeline}
//         keyExtractor={(item) => item}
//         renderItem={({ item, index }) => (
//           <Pressable
//             onPress={() => handlePress(index)}
//             className={cn(
//               "active:bg-black/5",
//               "items-center justify-center border-b-2 border-transparent py-5",
//               // index === selectedIndex && "border-black",
//             )}
//             style={{
//               width: screenWidth / 3,
//               marginRight: index === 0 ? screenWidth / 3 : 0, // screenWidth/ 2 - screenWidth / 3
//               marginLeft: index === timeline.length - 1 ? screenWidth / 3 : 0,
//             }}
//           >
//             <Text className="capitalize">{item}</Text>
//           </Pressable>
//         )}
//       />
//       <Animated.View
//         style={{
//           width: screenWidth / 3,
//         }}
//         className="absolute bottom-0 h-px self-center rounded-xl bg-black"
//       />
//     </View>
//   );
// };

type State = NavigationState<Route>;

const TransactionsTabBar = (
  props: SceneRendererProps & {
    navigationState: State;
    options?: Record<string, TabDescriptor<Route>>;
  } & {
    style?: StyleProp<ViewStyle>;
    onLayout?: ViewProps["onLayout"];
  },
) => {
  const length = props.navigationState.routes.length;

  return (
    <Animated.View
      className="absolute z-50 w-full bg-white"
      style={[props.style]}
      onLayout={props.onLayout}
    >
      <TabBar
        {...props}
        android_ripple={{ color: "transparent" }}
        scrollEnabled
        tabStyle={{
          transform: [{ scaleX: -1 }],
          width: screenWidth / 3,
          elevation: 0,
        }}
        style={{
          elevation: 0,
          backgroundColor: "#ffffff",
          transform: [{ scaleX: -1 }],
          marginRight: props.navigationState.index === 0 ? screenWidth / 3 : 0,
          marginLeft:
            props.navigationState.index === length - 1 ? screenWidth / 3 : 0, //length - 1
        }}
        indicatorStyle={{
          backgroundColor: "black",
        }}
      />
    </Animated.View>
  );
};

export default TransactionsTabBar;
