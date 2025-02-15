import { PaymentAccount } from "@/components/cards";
import { Button } from "@/components/ui";
import { usePayee, usePaymentAccount } from "@/store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const account = usePaymentAccount();
  const payee = usePayee();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="flex-1 gap-y-5 px-4 pt-5"
      style={{ paddingBottom: bottom }}
    >
      <Text className="text-sm font-semibold">From:</Text>
      {!account ? (
        <PaymentAccount.Skeleton />
      ) : (
        <PaymentAccount.Card account={account} />
      )}

      <Text className="text-sm font-semibold">To:</Text>

      {
        // TODO: Use skeleton
      }
      <Link asChild href="/select-payee">
        <Pressable className="flex-row items-center gap-x-4 rounded-xl bg-white px-4 py-5">
          <Feather name="user" size={28} color="#1b1b1b" />

          <View className="gap-y-1">
            <Text className="font-semibold uppercase">{payee?.name}</Text>
            <Text className="text-sm text-gray-600">
              {payee?.sortCode} / {payee?.accountNumber}
            </Text>
          </View>
          <View className="flex-1" />
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
      </Link>

      <View className="gap-y-4 rounded-xl bg-white px-4 py-5">
        <View>
          <View className="flex-row items-center gap-x-3 rounded-xl border px-4">
            <Text>Amount:</Text>
            <TextInput
              className="flex-1 py-4"
              numberOfLines={1}
              keyboardType="numeric"
            />
          </View>
          <Link href="/" asChild>
            <Button
              label="View payment limits"
              variant="link"
              size="sm"
              className="m-0 self-start p-0 underline"
              textClassName="font-light"
            />
          </Link>
        </View>
        <View className="flex-row items-center gap-x-3 rounded-xl border px-4">
          <Text>Ref:</Text>
          <TextInput className="flex-1 py-4" numberOfLines={1} maxLength={10} />
        </View>
      </View>

      <View className="flex-1" />

      <Button label="Continue" size="lg" />
    </View>
  );
}
