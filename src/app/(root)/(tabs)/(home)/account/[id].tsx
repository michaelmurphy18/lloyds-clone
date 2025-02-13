import { AccountSummary } from "@/components/Transactions";

import { AnimatedHeader } from "@/components/headers";
import {
  useAccountQuery,
  useAnimatedAccountScreen,
  useTransactions,
} from "@/hooks";
import { useLoadingScreen } from "@/store";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

const Page = () => {
  const { id, name: accountName } = useLocalSearchParams<{
    id: string;
    name: string;
  }>();

  const { setLoading } = useLoadingScreen();

  const { data, isLoading } = useAccountQuery(id);

  useEffect(() => {
    setLoading(isLoading || !data);
  }, [data, isLoading, setLoading]);

  const { filterTransactions, sections } = useTransactions(id);

  const { threshold, scrollOffset, onSummaryLayout } =
    useAnimatedAccountScreen();

  if (isLoading || !data) {
    return null;
  }

  const { account, timeline } = data;

  if (!account || !timeline) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: accountName,
          header: (props) => (
            <AnimatedHeader
              balance={account.balance}
              scrollOffset={scrollOffset}
              threshold={threshold}
              {...props}
            />
          ),
        }}
      />

      <Tabs.Container renderHeader={() => <AccountSummary {...account} />}>
        {timeline.map((month, index) => (
          <Tabs.Tab name={month} key={month} label={month}>
            <Tabs.FlashList
              estimatedItemSize={100}
              data={Array.from({ length: 20 }, (_, i) => i)}
              renderItem={({ item }) => (
                <View className="bg-white px-3 py-5">
                  <Text>
                    {timeline[index]} {item}
                  </Text>
                </View>
              )}
            />
          </Tabs.Tab>
        ))}
      </Tabs.Container>
    </View>
  );
};

export default Page;
