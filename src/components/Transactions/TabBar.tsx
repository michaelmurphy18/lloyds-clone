import { cn } from "@/libs/utils";
import { TransactionTimeline } from "@/types";
import { Dimensions, FlatList, Pressable, Text } from "react-native";

const screenWidth = Dimensions.get("screen").width;

type TransactionsTabBarProps = { timeline: TransactionTimeline };

const TransactionsTabBar = ({ timeline }: TransactionsTabBarProps) => {
  return (
    <FlatList
      horizontal
      inverted
      className="flex-grow-0 border-t border-gray-300"
      decelerationRate="fast"
      snapToAlignment="end"
      scrollEventThrottle={16}
      snapToInterval={screenWidth / 3}
      overScrollMode="never"
      showsHorizontalScrollIndicator={false}
      data={timeline}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <Pressable
          className={cn(
            "active:bg-black/5",
            "items-center justify-center border-b-2 border-transparent py-5",
            index === 0 && "border-black",
          )}
          style={{
            width: screenWidth / 3,
            marginRight: index === 0 ? screenWidth / 3 : 0, // screenWidth/ 2 - screenWidth / 3
            marginLeft: index === timeline.length - 1 ? screenWidth / 3 : 0,
          }}
        >
          <Text className="capitalize">{item}</Text>
        </Pressable>
      )}
    />
  );
};

export default TransactionsTabBar;
