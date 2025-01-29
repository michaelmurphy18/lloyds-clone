import { GetAccount } from "@/api/account/main";
import {
  TransactionsAccountSummary,
  TransactionsFilterView,
  TransactionsTabBar,
  TransactionsViewPager,
} from "@/components/Transactions";
import { AnimatedHeader, Header } from "@/components/headers";
import { useAnimatedAccountScreen, useTransactions } from "@/hooks";
import { LoadingScreen } from "@/screens/LoadingScreen";
import { useLoadingScreen } from "@/store";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: account, isLoading } = useQuery({
    queryKey: ["account", id],
    queryFn: () => GetAccount(id),
    // staleTime: 0,
  });

  const { timeline, filterTransactions, sections } = useTransactions(id);

  const {
    onLayout,
    layout,
    onContainerLayout,
    offset,
    vPPosition,
    vPSelectedPage,
    animatedContainerStyle,
    activePage,
    animatedSummaryStyle,
    setActivePage,
  } = useAnimatedAccountScreen();

  if (isLoading || !account) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Classic",
            header: (props) => <Header {...props} showBack />,
          }}
        />
        <LoadingScreen />
      </>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Classic",
          header: (props) => (
            <AnimatedHeader
              scrollOffset={offset}
              height={layout?.height}
              {...props}
            />
          ),
        }}
      />
      {/* Summary */}
      <TransactionsAccountSummary
        onLayout={onLayout}
        id={id}
        style={animatedSummaryStyle}
        availableBalance={account.balance}
        overdraftLimit={account.overDraftLimit}
      />

      <Animated.View
        onLayout={onContainerLayout}
        style={[{ flex: 1 }, animatedContainerStyle]}
      >
        <TransactionsTabBar
          timeline={timeline}
          position={vPPosition}
          selectedPage={vPSelectedPage}
          setActivePage={setActivePage}
        />

        {/* Filter */}
        <TransactionsFilterView filter={filterTransactions} />

        {layout && (
          <TransactionsViewPager
            timeline={timeline}
            sections={sections}
            threshold={layout.height} //need to change
            offset={offset}
            selectedPage={vPSelectedPage.set}
            position={vPPosition.set}
            activePage={activePage}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default Page;
