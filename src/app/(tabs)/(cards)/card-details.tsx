import { BankCardWithFlip } from "@/components/cards";
import { LCPagerViewWithPagination } from "@/components/pagerview";
import { sampleBankCards } from "@/constants";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const bankCards = sampleBankCards;

const CardDetailsPage = () => {
  const [flip, setFlip] = useState<boolean[]>([]);
  const [selectedPage, setSelectedPage] = useState(0);

  useEffect(() => {
    setFlip(new Array(bankCards.length).fill(false));
  }, []);

  const toggleFlip = (index: number) => {
    setFlip((prev) => prev.map((flip, i) => (i === index ? !flip : flip)));
  };

  return (
    <View className="p-4 flex-1">
      <LCPagerViewWithPagination
        numberOfPages={bankCards.length}
        onPageSelected={setSelectedPage}
        onPageScrollStateChanged={(state) => {
          console.log(state, flip[selectedPage]);

          state === "dragging" &&
            flip[selectedPage] &&
            toggleFlip(selectedPage);
        }}
        className="w-full items-center justify-center aspect-card"
      >
        {bankCards.map((card, index) => (
          <BankCardWithFlip key={index} {...card} flip={flip[index]} />
        ))}
      </LCPagerViewWithPagination>
      <View className="flex-1" />
      <Pressable
        // onPress={() => setFlip(!flip)}
        onPress={() => toggleFlip(selectedPage)}
        className="disabled:bg-gray-500 active:bg-gray-800  bg-black items-center self-stretch py-4 rounded-xl"
      >
        <Text className="text-white text-xl font-semibold tracking-wider">
          {flip[selectedPage] ? "Hide details" : "Show details"}
        </Text>
      </Pressable>
    </View>
  );
};

export default CardDetailsPage;
