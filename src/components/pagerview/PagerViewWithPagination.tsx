import { useAnimatedPagerScrollHandler } from "@/hooks";
import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import PagerView from "react-native-pager-view";
import Animated, { useSharedValue } from "react-native-reanimated";
import Pagination from "./Pagination";
import { cn } from "@/libs/utils";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

type LCPagerViewWithPaginationProps = {
  numberOfPages: number;
  pagination?: boolean;
  pagerStyle?: StyleProp<ViewStyle>;
  className?: string;
  paginationClassName?: string;
  onPageSelected?: (position: number) => void;
  onPageScrollStateChanged?: (state: "idle" | "dragging" | "settling") => void;
};

const LCPagerViewWithPagination = ({
  children,
  pagination = true,
  numberOfPages,
  pagerStyle,
  className,
  paginationClassName,
  onPageSelected,
  onPageScrollStateChanged,
}: PropsWithChildren<LCPagerViewWithPaginationProps>) => {
  const scrollPostion = useSharedValue(0);

  const scrollHandler = useAnimatedPagerScrollHandler({
    onPageScroll: (e) => {
      "worklet";
      scrollPostion.value = e.offset + e.position;
    },
  });

  return (
    <View className={cn(className)}>
      <AnimatedPagerView
        initialPage={0}
        onPageScroll={scrollHandler}
        onPageScrollStateChanged={(e) => {
          onPageScrollStateChanged?.(e.nativeEvent.pageScrollState);
        }}
        onPageSelected={(e) => {
          onPageSelected?.(e.nativeEvent.position);
        }}
        orientation="horizontal"
        style={StyleSheet.flatten([{ flex: 1, width: "100%" }, pagerStyle])}
      >
        {children}
      </AnimatedPagerView>
      {pagination && (
        <Pagination
          position={scrollPostion}
          numberOfPages={numberOfPages}
          className={paginationClassName}
        />
      )}
    </View>
  );
};

export default LCPagerViewWithPagination;
