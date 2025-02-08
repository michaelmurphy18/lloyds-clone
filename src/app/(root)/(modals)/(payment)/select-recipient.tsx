import { Header } from "@/components/headers";
import { Button } from "@/components/ui";
import { sortCodeFormatter } from "@/libs/utils";
import { EvilIcons, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";

type Payee = {
  name: string;
  id: string;
  sortCode: string;
  accountNumber: string;
};

const payee: (string | Payee)[] = [
  "J",
  {
    name: "John Doe",
    id: "123",
    sortCode: "123456",
    accountNumber: "12345678",
  },
  "M",
  {
    name: "Mathew Doe",
    id: "456",
    sortCode: "765431",
    accountNumber: "98765432",
  },
  {
    name: "Maria Dianne",
    id: "789",
    sortCode: "325678",
    accountNumber: "23498176",
  },
];

export default function Page() {
  return (
    <View className="flex-1 gap-y-2 pt-5">
      <Stack.Screen
        options={{
          title: "Send money to",
          header: (props) => (
            <Header
              {...props}
              useSafeArea={false}
              showBack
              showClose
              dismissTo="/(root)/(tabs)/(home)/(tabs)"
            />
          ),
        }}
      />
      <View className="border-b-hairline gap-y-5 px-4 pb-5">
        <View className="relative justify-center rounded-lg border border-black bg-white">
          <TextInput
            className="px-12 py-4"
            placeholder="Search account or payee name"
            placeholderClassName="text-gray-400"
            placeholderTextColor="#838383"
          />

          <EvilIcons
            name="search"
            size={24}
            color="black"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
        </View>

        <Pressable className="flex-row items-center gap-x-3">
          <Feather
            name="user-plus"
            size={24}
            color="black"
            className="rounded-full bg-green-500 p-3"
          />
          <Text className="text-sm">Pay someone new</Text>
        </Pressable>
      </View>

      <FlashList
        estimatedItemSize={50}
        data={payee}
        renderItem={({ item }) => {
          if (typeof item === "string") {
            return <Text className="px-4 py-4 font-semibold">{item}</Text>;
          } else {
            return (
              <View className="elevation flex-row items-center gap-x-4 bg-white px-4 py-5 shadow-sm shadow-black/20">
                <Feather name="user" size={28} color="#1b1b1b" />
                <View className="flex-1 flex-col gap-y-1">
                  <Text className="font-semibold uppercase">{item.name}</Text>
                  <Text className="text-sm text-gray-600">
                    {sortCodeFormatter(item.sortCode)} / {item.accountNumber}
                  </Text>
                </View>
                <Button variant="ghost" size="icon" className="mr-3">
                  <Feather name="more-horizontal" size={28} color="black" />
                </Button>
              </View>
            );
          }
        }}
        getItemType={(item) => {
          return typeof item === "string" ? "sectionHeader" : "row";
        }}
      />
    </View>
  );
}
