import { Pressable, View, ViewProps, Text } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";
import { CurrencyView } from "@/components";
import { formatCurrency } from "@/libs/utils";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";

type TransactionAccountSummaryProps = {
  availableBalance: number;
  overdraftLimit: number;
} & AnimatedProps<ViewProps>;

const TransactionAccountSummary = ({
  availableBalance,
  overdraftLimit,
  ...props
}: TransactionAccountSummaryProps) => {
  return (
    <Animated.View
      // onLayout={onLayout}
      // style={animatedSummaryStyle}
      {...props}
      className="gap-y-5 py-2"
    >
      <View className="items-center gap-y-1">
        <CurrencyView
          integerSize="text-2xl"
          decimalSize="text-lg"
          amount={availableBalance}
        />
        <Text>Available balance</Text>
      </View>

      <View className="flex-row items-center justify-evenly">
        <View className="items-center gap-y-3 p-2">
          <Text className="text-lg font-semibold leading-tight">
            {formatCurrency(overdraftLimit)}
          </Text>
          <Text className="text-sm">Overdraft limit</Text>
        </View>

        <Link asChild href={"/"}>
          <Pressable className="items-center gap-y-3 rounded-lg p-2 active:bg-black/10">
            <FontAwesome5 name="plane-departure" size={20} color="black" />
            <Text className="text-sm">Send abroad</Text>
          </Pressable>
        </Link>

        <Link
          asChild
          href={{
            pathname: "/(modals)/details/[accountId]",
            params: { accountId: "001" },
          }}
        >
          <Pressable className="items-center gap-y-3 rounded-lg p-2 active:bg-black/10">
            <FontAwesome6 name="building-columns" size={20} color="black" />
            <Text className="text-sm">Account details</Text>
          </Pressable>
        </Link>
      </View>
    </Animated.View>
  );
};

export default TransactionAccountSummary;
