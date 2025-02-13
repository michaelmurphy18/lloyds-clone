import { Button } from "@/components/ui";
import { usePayeeSearch, usePaymentActions } from "@/store";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { Link } from "expo-router";
import { memo, useMemo } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

type Payee = {
  name: string;
  id: string;
  sortCode: string;
  accountNumber: string;
};

type PayeeWithLabel = Payee | string;

type ResponseType = Record<string, Payee[]>;

const response: ResponseType = {
  J: [
    {
      name: "John Doe",
      id: "123",
      sortCode: "123456",
      accountNumber: "12345678",
    },
  ],
  M: [
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
  ],
  N: [
    {
      name: "Noel Red",
      id: "456",
      sortCode: "765431",
      accountNumber: "98765432",
    },
  ],
};

export default function Page() {
  const { setSearchText } = usePaymentActions();

  const debouncedText = useDebouncedCallback((text: string) => {
    setSearchText(text);
  }, 500);

  return (
    <View className="flex-1 gap-y-2 pt-5">
      <View className="border-b-hairline gap-y-2">
        <View className="relative mx-4 justify-center rounded-lg border border-black bg-white">
          <TextInput
            className="px-12 py-4"
            placeholder="Search account or payee name"
            placeholderClassName="text-gray-400"
            placeholderTextColor="#838383"
            onChangeText={debouncedText}
          />

          <EvilIcons
            name="search"
            size={24}
            color="black"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
        </View>

        <Link href="/add-payee" asChild>
          <Pressable className="flex-row items-center gap-x-3 px-4 py-3 active:bg-black/10">
            <Feather
              name="user-plus"
              size={24}
              color="black"
              className="rounded-full bg-green-500 p-3"
            />
            <Text className="text-sm">Pay someone new</Text>
          </Pressable>
        </Link>
      </View>

      <PayeeList />
    </View>
  );
}

const PayeeList = () => {
  const searchText = usePayeeSearch();
  const filteredPayee = useMemo(
    () =>
      Object.entries(response).reduce<PayeeWithLabel[]>((acc, [key, value]) => {
        if (searchText.length < 0) {
          acc.push(key);
          acc.push(...value);
        }

        const filtered = value.filter((payee) =>
          payee.name.toLowerCase().includes(searchText),
        );

        if (filtered.length > 0) {
          acc.push(key);
          acc.push(...filtered);
        }

        return acc;
      }, []),
    [searchText],
  );

  return (
    <FlashList
      estimatedItemSize={59} //Median of both of the element's height
      data={filteredPayee}
      renderItem={(props) => <PayeeListItem {...props} />}
      getItemType={(item) => {
        return typeof item === "string" ? "sectionHeader" : "row";
      }}
    />
  );
};

const PayeeListItem = memo(({ item }: ListRenderItemInfo<PayeeWithLabel>) => {
  const searchText = usePayeeSearch();

  if (typeof item === "string") {
    return <Text className="px-4 py-4 font-semibold">{item}</Text>;
  } else {
    let indx = -1;
    let length = 0;

    if (searchText.length > 0) {
      indx = item.name.toLowerCase().indexOf(searchText);
      length = searchText.length;
    }

    return (
      <Link href={`/(root)/(modals)/(payment)/payment-details`} asChild>
        <Pressable className="elevation-sm flex-row items-center gap-x-4 bg-white px-4 py-5 shadow-sm shadow-slate-700/10">
          <Feather name="user" size={28} color="#1b1b1b" />
          <View className="flex-1 flex-col gap-y-1">
            {indx < 0 ? (
              <Text className="font-semibold">{item.name}</Text>
            ) : (
              <Text className="font-semibold uppercase">
                {item.name.substring(0, indx)}
                <Text className="text-green-500">
                  {item.name.substring(indx, indx + length)}
                </Text>
                {item.name.substring(indx + length)}
              </Text>
            )}

            <Text className="text-sm text-gray-600">
              {item.sortCode} / {item.accountNumber}
            </Text>
          </View>
          <Button variant="ghost" size="icon" className="mr-3">
            <Feather name="more-horizontal" size={28} color="black" />
          </Button>
        </Pressable>
      </Link>
    );
  }
});

PayeeListItem.displayName = "PayeeListItem";
