import { getPayees } from "@/api/users/payee";
import { PayeeList, PayeeEmptyView } from "@/components";
import { GetPayees } from "@/schema";
import { usePaymentActions } from "@/store";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDebouncedCallback } from "use-debounce";

export default function Page() {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["payees"],
    queryFn: ({ pageParam }) => getPayees(pageParam?.name, pageParam?.id, 10),
    initialPageParam: null as GetPayees["nextCursor"],
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (isError) {
    console.log(isError, error);
  }

  return (
    <View className="flex-1 gap-y-2 pt-5">
      <View className="border-b-hairline gap-y-2">
        <DebouncedSearchBar />

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

      {isPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : isError ? (
        <PayeeEmptyView />
      ) : (
        <PayeeList
          payees={data.pages.flatMap((page) => page.payees)}
          onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
          refreshing={isFetching}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
        />
      )}
    </View>
  );
}

const DebouncedSearchBar = () => {
  const { setSearchText } = usePaymentActions();

  const debouncedText = useDebouncedCallback((text: string) => {
    setSearchText(text);
  }, 500);
  return (
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
  );
};
