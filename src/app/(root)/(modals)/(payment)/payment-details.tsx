import { PaymentAccount } from "@/components/cards";
import { Button } from "@/components/ui";
import { usePaymentAccount } from "@/store";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const payee = {
  name: "John Doe",
  id: "123",
  sortCode: "123456",
  accountNumber: "12345678",
};

export default function Page() {
  const account = usePaymentAccount();
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
      <Link asChild href="/select-account">
        <Pressable className="flex-row items-center gap-x-4 rounded-xl bg-white px-4 py-5">
          <MaterialCommunityIcons
            name="account-box-outline"
            size={30}
            color="black"
          />
          <View className="gap-y-1">
            <Text className="font-semibold uppercase">{payee.name}</Text>
            <Text className="text-sm text-gray-600">
              {payee.sortCode} / {payee.accountNumber}
            </Text>
          </View>
          <View className="flex-1" />
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
      </Link>

      <View className="gap-y-4 rounded-xl bg-white px-4 py-5">
        <View>
          <View className="relative rounded-xl border">
            <TextInput
              placeholder=""
              className="ml-16 p-4"
              numberOfLines={1}
              keyboardType="numeric"
            />
            <Text className="absolute left-3 top-1/2 -translate-y-1/2">
              Amount:
            </Text>
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
        <View className="relative rounded-xl border">
          <TextInput className="ml-8 p-4" numberOfLines={1} />
          <Text className="absolute left-3 top-1/2 -translate-y-1/2">Ref:</Text>
        </View>
      </View>

      <View className="flex-1" />

      <Button label="Continue" size="lg" />
    </View>
  );
}
