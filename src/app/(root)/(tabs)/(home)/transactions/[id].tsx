import {
  TransactionsAccountSummary,
  TransactionsFilterView,
  TransactionsTabBar,
  TransactionsViewPager,
} from "@/components/Transactions";
import { AnimatedHeader } from "@/components/headers";
import { useDimensions, useTransactions } from "@/hooks";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { timeline, filterTransactions, sections } = useTransactions(id);

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

    // console.log(scrollEnabled.value);

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

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Classic",
          header: (props) => (
            <AnimatedHeader
              scrollOffset={offset}
              height={layout?.height}
              {...props}
            />
          ),
        }}
      />
      {/* Summary */}
      <TransactionsAccountSummary
        onLayout={onLayout}
        style={animatedSummaryStyle}
        availableBalance={100}
        overdraftLimit={0}
      />

      <Animated.View
        onLayout={onContainerLayout}
        style={[{ flex: 1 }, animatedContainerStyle]}
      >
        <TransactionsTabBar
          timeline={timeline}
          position={vPPosition}
          selectedPage={vPSelectedPage}
          setActivePage={setActivePage}
        />

        {/* Filter */}
        <TransactionsFilterView filter={filterTransactions} />

        {layout && (
          <TransactionsViewPager
            timeline={timeline}
            sections={sections}
            threshold={layout.height} //need to change
            offset={offset}
            selectedPage={vPSelectedPage.set}
            position={vPPosition.set}
            activePage={activePage}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default Page;
