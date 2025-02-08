import { GetAllAccount } from "@/api/account/main";
import { GetCurrentUser } from "@/api/users/me";
import { Header } from "@/components/headers";
import { SkeletonLoader } from "@/components/ui";
import { AccountQueryKey, UserQueryKey } from "@/libs/query-keys";
import { formatCurrency, sortCodeFormatter } from "@/libs/utils";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Href, Link, Stack, useNavigation, useRouter } from "expo-router";
import { Suspense, useCallback } from "react";
import { Pressable, Text, View } from "react-native";

export default function Page() {
  const { data: userId } = useQuery({
    queryKey: UserQueryKey.currentUser,
    queryFn: GetCurrentUser,
    select: (res) => res.id,
  });

  useQuery({
    queryKey: AccountQueryKey.userAccounts(userId!),
    queryFn: GetAllAccount,
    enabled: !!userId,
  });

  return (
    <View className="flex-1 gap-y-4 px-4 pt-5">
      <Stack.Screen
        options={{
          title: "Send money from",
          header: (props) => (
            <Header
              {...props}
              dismissTo="/(root)/(tabs)/(home)/(tabs)"
              useSafeArea={false}
              showBack
              showClose
            />
          ),
        }}
      />
      <Suspense fallback={<CardSkeleton />}>
        <Card id={userId!} />
      </Suspense>
    </View>
  );
}

const Card = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: accounts, isLoading } = useSuspenseQuery({
    queryKey: ["accounts", id],
    queryFn: GetAllAccount,
  });

  const getSelectedAccount = useCallback(
    (index: number) => {
      const { id, balance, accountName, sortCode, accountNumber } =
        accounts[index];

      const query = JSON.stringify({
        id,
        balance,
        accountName,
        sortCode,
        accountNumber,
      });

      router.back();
      router.setParams({ query });
    },

    [accounts, router],
  );

  return accounts.map(
    ({ id, accountName, sortCode, accountNumber, balance }, index) => (
      <Pressable
        key={id}
        className="flex-row items-center gap-x-4 rounded-xl bg-white px-4 py-5"
        onPress={getSelectedAccount.bind(null, index)}
      >
        <MaterialCommunityIcons
          name="account-box-outline"
          size={30}
          color="black"
        />
        <View className="gap-y-1">
          <Text>{accountName}</Text>
          <Text className="text-sm text-gray-600">
            {sortCodeFormatter(sortCode)} / {accountNumber}
          </Text>
          <Text className="font-semibold">{formatCurrency(balance)}</Text>
        </View>
        <View className="flex-1" />
        <FontAwesome name="angle-right" size={24} color="black" />
      </Pressable>
    ),
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
