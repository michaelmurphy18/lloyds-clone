import { CurrencyView } from "@/components";
import { formatCurrency } from "@/libs/utils";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Line } from "react-native-svg";

const ACCOUNT_IMAGE_SIZE = 70;

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View className="flex-1">
      {/* Map */}
      <View className="h-[13%] bg-black"></View>

      {/* Summary */}
      <View className="relative gap-y-3 bg-white px-4 pb-4">
        <View className="rounded-full shadow-sm shadow-black/50">
          <Image
            source={"https://picsum.photos/200"}
            style={styles.accountImage}
          />
        </View>
        <View className="flex-row items-baseline justify-between">
          <View className="gap-y-1">
            <Text className="text-lg">Name of Account holder</Text>
            <Text className="text-xs">Sat, 04 Jan 2023</Text>
          </View>
          <View className="items-end">
            <CurrencyView amount={-100} />
            <Text className="text-xs">Contactless purchase</Text>
          </View>
        </View>
      </View>

      {/* Details */}
      <View className="mt-8 gap-y-2 px-4">
        <Text className="text-sm font-semibold">Transaction details</Text>
        <View className="rounded-sm bg-white">
          <DetailsItems
            label="Transaction cleared date"
            value={"Mon 06 January 2023"}
            type="text"
          />

          <DetailsItems
            label="Retailer location"
            value={"London"}
            type="text"
          />

          <DetailsItems
            label="Business Type"
            value={"Grocery store, Supermarkets"}
            type="text"
          />
          <DetailsItems label="Card ending" value={"0000"} type="text" />

          <DetailsItems
            label="Balance after transaction"
            value={100}
            type="currency"
            border={false}
          />

          <Link asChild href="/">
            <Pressable className="flex-row items-center justify-between border-t border-t-gray-300 px-4 py-5">
              <Text className="text-sm font-semibold">
                {"See all transactions with this account"}
              </Text>
              <FontAwesome name="angle-right" size={24} color="black" />
            </Pressable>
          </Link>
        </View>
      </View>

      <View className="flex-1" />
      <Pressable className="mx-5 mb-5 items-center self-stretch rounded-lg border border-black px-4 py-2 py-3">
        <Text className="font-semibold">Help with this transaction</Text>
      </Pressable>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  accountImage: {
    marginTop: -ACCOUNT_IMAGE_SIZE / 2,
    width: ACCOUNT_IMAGE_SIZE,
    height: ACCOUNT_IMAGE_SIZE,
    borderRadius: 100,
  },
});

type DetailsItemsProps = {
  label: string;
  border?: boolean;
} & (
  | {
      type: "currency";
      value: number;
    }
  | { type: "text"; value: string }
);
const DetailsItems = ({
  label,
  value,
  type,
  border = true,
}: DetailsItemsProps) => (
  <View className="mx-4">
    <View className="flex-row items-center justify-between py-5">
      <Text className="text-sm">{label}</Text>
      <Text>{type === "currency" ? formatCurrency(value) : value}</Text>
    </View>

    {border && (
      <Svg // Error in Border styling using Stylesheet
        height="2"
        width="100%"
      >
        <Line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#00000083"
          strokeWidth="2"
          strokeDasharray="4,4" // Adjust dash and gap sizes
        />
      </Svg>
    )}
  </View>
);
