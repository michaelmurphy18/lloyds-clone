import { Gesture, GestureDetector } from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";
import TransactionsSectionList from "./SectionList";
import { Transaction, TransactionSection, TransactionTimeline } from "@/types";
import {
  SharedValue,
  useAnimatedProps,
  useAnimatedRef,
  useSharedValue,
  withSpring,
  scrollTo,
} from "react-native-reanimated";
import { SectionList } from "react-native";

type TransactionsViewPagerProps = {
  timeline: TransactionTimeline;
  sections: TransactionSection[];
  threshold: number;
  offset: SharedValue<number>;
};

const TransactionsViewPager = ({
  timeline,
  sections,
  threshold,
  offset,
}: TransactionsViewPagerProps) => {
  const listRef =
    useAnimatedRef<SectionList<Transaction, TransactionSection>>();

  const scrollOffset = useSharedValue(0);
  const isPanning = useSharedValue(true);
  const context = useSharedValue({ y: 0 });

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
        // We've passed the threshold, maintain threshold position
        offset.value = -threshold;

        // Calculate how much we should scroll
        const exceededOffset = -(newValue + threshold);

        if (exceededOffset > 0) {
          // Apply the excess movement to scroll
          console.log(scrollOffset.value, exceededOffset);

          scrollTo(listRef, 0, scrollOffset.value + exceededOffset, false);

          scrollOffset.value += exceededOffset;
        }
      }
    })
    .onEnd(() => {
      isPanning.value = false;

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
    });

  const scrollGesture = Gesture.Native();

  const composed = Gesture.Simultaneous(panGesture, scrollGesture);

  const animatedProps = useAnimatedProps(() => {
    return {
      scrollEnabled: true,
    };
  });

  return (
    <GestureDetector gesture={composed}>
      <PagerView
        layoutDirection="rtl"
        style={{
          flex: 1,
        }}
      >
        {timeline.map((month, index) => (
          <TransactionsSectionList
            sections={sections}
            key={month}
            animatedProps={animatedProps}
            bounces={false}
            ref={listRef}
            // onScroll={scrollHandler}
          />
        ))}
      </PagerView>
    </GestureDetector>
  );
};

export default TransactionsViewPager;
