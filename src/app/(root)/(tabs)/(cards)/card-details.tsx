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
    <View className="flex-1 p-4">
      <LCPagerViewWithPagination
        numberOfPages={bankCards.length}
        onPageSelected={setSelectedPage}
        onPageScrollStateChanged={(state) => {
          console.log(state, flip[selectedPage]);

          state === "dragging" &&
            flip[selectedPage] &&
            toggleFlip(selectedPage);
        }}
        className="aspect-card w-full items-center justify-center"
      >
        {bankCards.map((card, index) => (
          <BankCardWithFlip key={index} {...card} flip={flip[index]} />
        ))}
      </LCPagerViewWithPagination>
      <View className="flex-1" />
      <Pressable
        // onPress={() => setFlip(!flip)}
        onPress={() => toggleFlip(selectedPage)}
        className="items-center self-stretch rounded-xl bg-black py-4 active:bg-gray-800 disabled:bg-gray-500"
      >
        <Text className="text-xl font-semibold tracking-wider text-white">
          {flip[selectedPage] ? "Hide details" : "Show details"}
        </Text>
      </Pressable>
    </View>
  );
};

export default CardDetailsPage;
