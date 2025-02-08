import { useRef, useState } from "react";
import { LayoutChangeEvent, LayoutRectangle } from "react-native";

export const useLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const layoutRef = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const newLayout = event.nativeEvent.layout;

    setLayout(newLayout);
  };

  return {
    layout: layout || layoutRef.current,
    height: (layout ?? layoutRef.current).height,
    width: (layout ?? layoutRef.current).width,
    onLayout,
  };

  // return {
  //   layout,
  //   onLayout,
  // };
};
