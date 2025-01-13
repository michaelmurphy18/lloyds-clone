import { cn } from "@/libs/utils";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, ScrollView, LayoutChangeEvent } from "react-native";

const TopBarItem = ({
  state,
  position,
  navigation,
  descriptors,
}: MaterialTopTabBarProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [tabWidths, setTabWidths] = useState<number[]>([]);

  useEffect(() => {
    // Scroll to the currently focused tab when the component renders
    if (tabWidths.length > 0) {
      scrollToFocusedTab(state.index);
    }
  }, [state.index, tabWidths]);

  const scrollToFocusedTab = (index: number) => {
    if (tabWidths.length === 0) return;

    // Calculate the offset for the focused tab
    const offset = tabWidths
      .slice(0, index)
      .reduce((acc, width) => acc + width, 0);

    scrollViewRef.current?.scrollTo({
      x: offset - 56 * 2, //* adjust the offset with padding and gap from scrollview
      animated: true,
    });
  };

  const handleTabLayout = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths((prev) => {
      const updatedWidths = [...prev];
      updatedWidths[index] = width;
      return updatedWidths;
    });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-grow-0"
      contentContainerClassName="gap-x-4 py-2 px-5"
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true } as any);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLayout={(event) => handleTabLayout(event, index)}
            className={cn(
              "border border-black rounded-2xl px-7 py-2",
              isFocused && "bg-black"
            )}
          >
            <Text
              className={cn(
                "text-lg capitalize font-semibold",
                isFocused && "text-white"
              )}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default TopBarItem;
