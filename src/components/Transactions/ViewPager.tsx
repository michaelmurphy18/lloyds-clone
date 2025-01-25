import { Gesture, GestureDetector } from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";
import TransactionsSectionList from "./SectionList";
import { Transaction, TransactionSection, TransactionTimeline } from "@/types";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedProps,
  useAnimatedRef,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SectionList } from "react-native";
import { useEffect, useRef } from "react";
import {
  useAnimatedPagerScrollHandler,
  useAnimatedPagerSelectedPageHandler,
} from "@/hooks";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

type TransactionsViewPagerProps = {
  timeline: TransactionTimeline;
  sections: TransactionSection[];
  threshold: number;
  offset: SharedValue<number>;
  selectedPage: (value: number) => void;
  activePage: number;
  position: (value: number) => void;
};

const TransactionsViewPager = ({
  timeline,
  sections,
  threshold,
  offset,
  selectedPage,
  position,
  activePage,
}: TransactionsViewPagerProps) => {
  const viewPagerRef = useRef<PagerView>(null);

  useEffect(() => {
    viewPagerRef.current?.setPage(activePage);
  }, [activePage]);

  const pageScrollHandler = useAnimatedPagerScrollHandler({
    onPageScroll: (e) => {
      "worklet";

      runOnJS(position)(e.offset + e.position);
    },
  });

  const pageSelectedHandler = useAnimatedPagerSelectedPageHandler({
    onPageSelected: (e) => {
      "worklet";

      runOnJS(selectedPage)(e.position);
    },
  });

  const listRef =
    useAnimatedRef<SectionList<Transaction, TransactionSection>>();

  const scrollOffset = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  // !Todo: Fix this, buggy and laggy
  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: offset.value };
    })
    .onUpdate((e) => {
      let newValue = context.value.y + e.translationY;

      if (newValue > 0) {
        newValue = 0;
      }

      if (newValue >= -threshold) {
        // We're still in the pan phase
        offset.value = newValue;
      } else {
        // Transition from panning to scrolling
        offset.value = -threshold;

        const exceededOffset = -(newValue + threshold);

        if (exceededOffset > 0) {
          scrollOffset.value = exceededOffset;
          context.value = { y: -threshold }; // Reset context to avoid jumps
        }
      }
    })
    .onEnd(() => {
      if (offset.value > -threshold / 2) {
        offset.value = withSpring(0, {
          damping: 20,
          stiffness: 90,
        });
      } else {
        offset.value = withSpring(-threshold, {
          damping: 20,
          stiffness: 90,
        });
      }
    })
    .requireExternalGestureToFail(viewPagerRef);

  const scrollGesture = Gesture.Native();

  const composed = Gesture.Race(panGesture, scrollGesture);

  const animatedProps = useAnimatedProps(() => {
    return {
      scrollEnabled: offset.value <= -threshold,
      contentOffset: { x: 0, y: scrollOffset.value },
    };
  });

  return (
    <GestureDetector gesture={composed}>
      <AnimatedPagerView
        onPageScroll={pageScrollHandler}
        onPageSelected={pageSelectedHandler}
        ref={viewPagerRef}
        style={{
          flex: 1,
          transform: [
            {
              scaleX: -1,
            },
          ],
        }}
      >
        {timeline.map((month, index) => (
          <TransactionsSectionList
            style={{ transform: [{ scaleX: -1 }] }}
            sections={sections}
            key={month}
            animatedProps={animatedProps}
            bounces={false}
            ref={listRef}
            // onScroll={scrollHandler}
          />
        ))}
      </AnimatedPagerView>
    </GestureDetector>
  );
};

export default TransactionsViewPager;
