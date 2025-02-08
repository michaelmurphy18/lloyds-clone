import PagerView from "react-native-pager-view";
import TransactionsSectionList from "./SectionList";
import { Transaction, TransactionSection } from "@/types";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedRef,
} from "react-native-reanimated";
import { SectionList } from "react-native";
import { useEffect, useRef } from "react";
import {
  useAnimatedPagerScrollHandler,
  useAnimatedPagerSelectedPageHandler,
} from "@/hooks";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

type TransactionsViewPagerProps = {
  timeline: string[];
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

  return (
    <AnimatedPagerView
      onPageScroll={pageScrollHandler}
      onPageSelected={pageSelectedHandler}
      ref={viewPagerRef}
      style={{
        flex: 1,
        flexGrow: 1,
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
          bounces={false}
          ref={listRef}
          // onScroll={scrollHandler}
        />
      ))}
    </AnimatedPagerView>
  );
};

export default TransactionsViewPager;
