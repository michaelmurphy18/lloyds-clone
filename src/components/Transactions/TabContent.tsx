import { View } from "react-native";
import { SceneRendererProps, Route } from "react-native-tab-view";
import TransactionList from "./List";
import { TransactionsFilterView } from ".";

type Props = SceneRendererProps & {
  route: Route;
};

const TransactionTabContent = ({ route, ...props }: Props) => {
  return (
    <View className="flex-1 -scale-x-100">
      <TransactionsFilterView filter={() => {}} />
      <TransactionList />
    </View>
  );
};

export default TransactionTabContent;
