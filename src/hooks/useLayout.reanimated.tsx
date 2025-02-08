import { useCallback } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export function useLayout() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const customLayout = useSharedValue<LayoutRectangle | undefined>(undefined);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const {
        nativeEvent: { layout },
      } = event;

      customLayout.value = layout;
      x.value = layout.x;
      y.value = layout.y;
      height.value = layout.height;
      width.value = layout.width;
    },
    [customLayout, height, width, x, y],
  );

  return {
    x,
    y,
    height,
    width,
    onLayout,
    layout: customLayout,
  };
}
