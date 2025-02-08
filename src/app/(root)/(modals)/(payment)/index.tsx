import { Header } from "@/components/headers";
import { SkeletonLoader } from "@/components/ui";
import { useAccountsQuery } from "@/hooks";
import { formatCurrency, sortCodeFormatter } from "@/libs/utils";
import { Account } from "@/schema";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Page() {
  const params = useLocalSearchParams<{ query: string }>();

  const {
    userQuery: { user },
  } = useAccountsQuery({
    accounts: {
      enabled: !params.query,
    },
  });

  if (!user) {
    // TODO: Add error toast message or loading state
    return <Redirect href="/(auth)" />;
  }

  const userId = user.id;

  return (
    <View className="flex-1 px-4 pt-5">
      <Stack.Screen
        options={{
          title: "Pay & Transfer",
          header: (props) => (
            <Header useSafeArea={false} {...props} showClose />
          ),
        }}
      />

      <View className="gap-y-5">
        <Text className="text-sm font-semibold">From:</Text>
        <Card id={userId} params={params} />
        <Text className="text-sm font-semibold">To:</Text>
        <Link href="/select-recipient" asChild>
          <Pressable className="min-h-[120] flex-row items-center gap-x-4 rounded-xl bg-white px-4">
            <FontAwesome name="user-o" size={30} color="black" />
            <View className="gap-y-1">
              <Text>Choose who to pay</Text>
              <Text className="text-sm text-gray-600">or pay someone new</Text>
            </View>
            <View className="flex-1" />
            <FontAwesome name="angle-right" size={24} color="black" />
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const Card = ({ id, params }: { id: string; params: { query: string } }) => {
  const {
    accountsQuery: { accounts, isLoading },
  } = useAccountsQuery({
    id: id,
    accounts: { enabled: !params.query },
  });

  if (!accounts || isLoading) {
    return <CardSkeleton />;
  }

  let query:
    | Pick<
        Account,
        "accountName" | "accountNumber" | "balance" | "id" | "sortCode"
      >
    | undefined;

  if (params.query) {
    query = JSON.parse(params.query);
  }

  const accountNumber = query ? query.accountNumber : accounts[0].accountNumber;
  const sortCode = sortCodeFormatter(
    query ? query.sortCode : accounts[0].sortCode,
  );
  const accountName = query ? query.accountName : accounts[0].accountName;
  const balance = formatCurrency(query ? query.balance : accounts[0].balance);

  return (
    <Link asChild href="/select-account">
      <Pressable className="flex-row items-center gap-x-4 rounded-xl bg-white px-4 py-5">
        <MaterialCommunityIcons
          name="account-box-outline"
          size={30}
          color="black"
        />
        <View className="gap-y-1">
          <Text>{accountName}</Text>
          <Text className="text-sm text-gray-600">
            {sortCode} / {accountNumber}
          </Text>
          <Text className="font-semibold">{balance}</Text>
        </View>
        <View className="flex-1" />
        <FontAwesome name="angle-right" size={24} color="black" />
      </Pressable>
    </Link>
  );
};

const CardSkeleton = () => {
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
