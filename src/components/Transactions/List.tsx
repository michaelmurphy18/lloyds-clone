import { FlashList } from "@shopify/flash-list";
import BaseListItem from "./BaseListItem";
import { sampleTransactionSectionList } from "@/constants";

const TransactionList = () => {
  return (
    <FlashList
      contentContainerStyle={{ paddingTop: 100 }}
      data={sampleTransactionSectionList[0].data}
      renderItem={({ item, index, target }) => (
        <BaseListItem transaction={item} />
      )}
    />
  );
};

export default TransactionList;
