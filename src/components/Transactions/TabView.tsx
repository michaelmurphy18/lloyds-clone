import { useCallback, useMemo, useState } from "react";
import { Route, TabView } from "react-native-tab-view";
import TransactionsTabBar from "./TabBar";
import TransactionTabContent from "./TabContent";

const TransactionTabView = ({ timeline }: { timeline: string[] }) => {
  const routes = useMemo<Route[]>(
    () => timeline.map((item) => ({ key: item, title: item })),
    [timeline],
  );

  const [index, setIndex] = useState(0);

  const handleIndexChange = useCallback((index: number) => {
    setIndex(index);
  }, []);

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
      renderScene={(props) => <TransactionTabContent {...props} />}
      renderTabBar={(props) => (
        <TransactionsTabBar
          {...props}
          //   style={tabBarStyle}
          //   onLayout={onTabBarLayout}
        />
      )}
      pagerStyle={{ transform: [{ scaleX: -1 }] }}
      commonOptions={{
        labelStyle: {
          color: "black",
        },
      }}
    />
  );
};

export default TransactionTabView;
