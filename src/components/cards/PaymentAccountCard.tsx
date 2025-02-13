import { AccountBase } from "@/schema";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import CurrencyView from "../CurrencyView";
import { SkeletonLoader } from "../ui/SketeltonLoader";

const Card = ({
  account,
  params,
}: {
  account: AccountBase;
  params?: { query: string };
}) => {
  let query: AccountBase | undefined;

  if (params && params.query) {
    query = JSON.parse(params.query);
  }

  return (
    <Link asChild href="/select-account">
      <Pressable className="flex-row items-center gap-x-4 rounded-xl bg-white px-4 py-5">
        <MaterialCommunityIcons
          name="account-box-outline"
          size={30}
          color="black"
        />
        <View className="gap-y-1">
          <Text>{query ? query.accountName : account.accountName}</Text>
          <Text className="text-sm text-gray-600">
            {query ? query.sortCode : account.sortCode} /{" "}
            {query ? query.accountNumber : account.accountNumber}
          </Text>
          <CurrencyView
            integerSize="text-base"
            amount={query ? query.balance : account.balance}
          />
        </View>
        <View className="flex-1" />
        <FontAwesome name="angle-right" size={24} color="black" />
      </Pressable>
    </Link>
  );
};

const Skeleton = () => {
  return (
    <View className="rounded-xl bg-white px-4 py-5">
      <SkeletonLoader>
        <View className="flex-row items-center justify-between gap-x-4">
          <View className="h-7 w-7 rounded-lg bg-white" />
          <View className="flex-1 flex-col gap-y-1">
            <View className="h-4 w-1/6 rounded-full bg-white" />
            <View className="h-3 w-1/3 rounded-full bg-white" />
            <View className="h-5 w-1/4 rounded-full bg-white" />
          </View>
        </View>
      </SkeletonLoader>
    </View>
  );
};

export default { Card, Skeleton };
