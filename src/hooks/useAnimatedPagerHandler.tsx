import {
  PagerViewOnPageScrollEvent,
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { ReanimatedEvent, useEvent, useHandler } from "react-native-reanimated";

export function useAnimatedPagerScrollHandler<
  TContext extends Record<string, unknown>,
>(
  handlers: {
    onPageScroll: (
      e: ReanimatedEvent<PagerViewOnPageScrollEvent>,
      context: TContext,
    ) => void;
  },
  dependencies?: unknown[],
): (e: PagerViewOnPageScrollEvent) => void {
  const { context, doDependenciesDiffer } = useHandler<
    PagerViewOnPageScrollEvent,
    TContext
  >(handlers, dependencies);

  return useEvent<PagerViewOnPageScrollEvent>(
    (event) => {
      "worklet";
      const { onPageScroll } = handlers;

      if (onPageScroll && event.eventName.endsWith("onPageScroll")) {
        onPageScroll(event, context);
      }
    },
    ["onPageScroll"],
    doDependenciesDiffer,
  );
}

export function useAnimatedPagerSelectedPageHandler<
  TContext extends Record<string, unknown>,
>(
  handlers: {
    onPageSelected: (
      e: ReanimatedEvent<PagerViewOnPageSelectedEvent>,
      context: TContext,
    ) => void;
  },
  dependencies?: unknown[],
): (e: PagerViewOnPageSelectedEvent) => void {
  const { context, doDependenciesDiffer } = useHandler<
    PagerViewOnPageSelectedEvent,
    TContext
  >(handlers, dependencies);

  return useEvent<PagerViewOnPageSelectedEvent>(
    (event) => {
      "worklet";
      const { onPageSelected } = handlers;

      if (onPageSelected && event.eventName.endsWith("onPageSelected")) {
        onPageSelected(event, context);
      }
    },
    ["onPageSelected"],
    doDependenciesDiffer,
  );
}
