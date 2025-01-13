import { useState } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";

export const useDimensions = () => {
  const [layout, setLayout] = useState<LayoutRectangle | null>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  return { layout, height: layout?.height, width: layout?.width, onLayout };
};
