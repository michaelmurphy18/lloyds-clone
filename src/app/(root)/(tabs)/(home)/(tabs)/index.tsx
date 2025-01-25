import { CurrencyView } from "@/components";
import {
  AccountMainCard,
  RedirectBanner,
  HorizontalCard,
  OtherAccountCard,
} from "@/components/cards";
import { Href, Link } from "expo-router";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";

const EverydayScreen = () => {
  return (
    <ScrollView
      automaticallyAdjustContentInsets
      contentContainerClassName="gap-y-4 p-5"
    >
      <Text className="font-semibold text-lg">Current accounts</Text>
      <AccountMainCard />
      {/* add other accounts */}
      <OtherAccountCard />

      <RedirectBanner
        title="Check your credit scrore"
        description="Congratulations - you've been registerd for Your Credit Score for a year"
        icon={require("../../../../../assets/images/icon.png")}
        action="Check your Score"
      />

      <HorizontalCard
        badge
        title="Everyday offers"
        caption="Activate your offers to earn cashback"
        href="/_sitemap" // TODO: Add link
      />
      <HorizontalCard
        title="Manage cards"
        caption="View PIN, freeze card and more."
        href="/(tabs)/(cards)"
      />
      <Text className="font-semibold text-lg">More for you</Text>
      {/* 2 * 2 Grid */}
      <View className="gap-y-4 flex-wrap">
        <View className="flex-row gap-x-4">
          <GridItem
            label="Add account"
            caption="View your account with other banks"
            icon={require("../../../../../assets/images/icon.png")}
            href="/"
          />

          <GridItem
            label="Your credit score"
            caption="Check your credit score and track your progress"
            icon={require("../../../../../assets/images/icon.png")}
            href="/"
          />
        </View>

        <View className="flex-row gap-x-4">
          <GridItem
            label="Travel hub"
            caption="Going abroad? Take advantage of all the travel services we offer"
            icon={require("../../../../../assets/images/icon.png")}
            href="/"
          />

          <GridItem
            label="Prevent fraud"
            caption="Find out how to stay safe from scams"
            icon={require("../../../../../assets/images/icon.png")}
            href="/"
          />
        </View>
      </View>

      {/* Benefits */}
      <RedirectBanner
        title="Benefits to lighten the load"
        description={`£23 billion of government support is unclaimed each year. \nUse our benifits calculator to check if you're missing out.`}
        icon={require("../../../../../assets/images/icon.png")}
        action="Check your eligibility"
        className="bg-white"
      />

      {/* Share feedback */}
      <Text className="text-center mt-5 text-sm">
        Like the new Everday space?
      </Text>
      <Pressable className="bg-black items-center py-5 rounded-xl">
        <Text className="text-white font-bold">Share feedback</Text>
      </Pressable>

      {/* All caught up */}
    </ScrollView>
  );
};

export default EverydayScreen;

type GridItemProps = {
  label: string;
  caption: string;
  icon: any;
  href: Href;
};

const GridItem = ({ label, caption, icon, href }: GridItemProps) => {
  return (
    <Link href={href} asChild>
      <Pressable className="rounded-xl px-4 py-5 bg-white flex-1 gap-y-3 active:bg-gray-50">
        <Image source={icon} style={{ width: 32, height: 32 }} />
        <Text className="text-gray-500 text-sm flex-1">{caption}</Text>
        <Text className="font-semibold text-sm">{label}</Text>
      </Pressable>
    </Link>
  );
};
