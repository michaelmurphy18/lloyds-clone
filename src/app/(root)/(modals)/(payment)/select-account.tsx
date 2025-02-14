import { GetAllAccount } from "@/api/account/main";
import { getCurrentUser } from "@/api/users/me";
import { SkeletonLoader } from "@/components/ui";
import { AccountQueryKey, UserQueryKey } from "@/libs/query-keys";
import { formatCurrency } from "@/libs/utils";
import { usePaymentActions } from "@/store";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Suspense, useCallback } from "react";
import { Pressable, Text, View } from "react-native";

export default function Page() {
  const { data: userId } = useQuery({
    queryKey: UserQueryKey.currentUser,
    queryFn: getCurrentUser,
    select: (res) => res.id,
  });

  useQuery({
    queryKey: AccountQueryKey.userAccounts(userId!),
    queryFn: GetAllAccount,
    enabled: !!userId,
  });

  return (
    <View className="flex-1 gap-y-4 px-4 pt-5">
      <Suspense fallback={<CardSkeleton />}>
        <Card id={userId!} />
      </Suspense>
    </View>
  );
}

const Card = ({ id }: { id: string }) => {
  const router = useRouter();
  const { setAccount } = usePaymentActions();

  const { data: accounts } = useSuspenseQuery({
    queryKey: ["accounts", id],
    queryFn: GetAllAccount,
  });

  const getSelectedAccount = useCallback(
    (index: number) => {
      setAccount(accounts[index]);

      router.back();
    },

    [accounts, router, setAccount],
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
            {sortCode} / {accountNumber}
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
