import { PaymentAccount } from "@/components/cards";
import { usePaymentAccount } from "@/store";
import { FontAwesome } from "@expo/vector-icons";

import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Page() {
  const paymentAccount = usePaymentAccount();

  return (
    <View className="flex-1 px-4 pt-5">
      <View className="gap-y-5">
        <Text className="text-sm font-semibold">From:</Text>
        {/* {accountsQuery.isPending || accountsQuery.isError ? ( */}
        {!paymentAccount ? (
          <PaymentAccount.Skeleton />
        ) : (
          <PaymentAccount.Card account={paymentAccount} />
        )}
        <Text className="text-sm font-semibold">To:</Text>
        <Link href={`/select-payee`} asChild>
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
