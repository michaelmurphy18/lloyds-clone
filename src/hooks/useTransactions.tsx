import {
  sampleTransactionSectionList,
  sampleTransactionTimeline,
} from "@/constants";
import { TransactionSection, TransactionType } from "@/types";
import { useMemo, useState } from "react";

const useTransactions = (accountId: string) => {
  const timeline = useMemo(() => sampleTransactionTimeline, []);
  const sections = useMemo(() => sampleTransactionSectionList, []);
  const [filter, setFilter] = useState<TransactionType | null>(null);

  const filterSections = useMemo(() => {
    if (!filter) return sections;
    return filterTransactionSectionsByType(sections, filter);
  }, [filter, sections]);

  const filterTransactions = (type: TransactionType | null) => {
    setFilter(type);
  };

  return { timeline, sections: filterSections, filterTransactions };
};

export default useTransactions;

function filterTransactionSectionsByType(
  sections: TransactionSection[],
  type: TransactionType,
): TransactionSection[] {
  return sections
    .map((section) => {
      const filteredData = section.data.filter(
        (transaction) => transaction.type === type,
      );
      return { date: section.date, data: filteredData };
    })
    .filter((section) => section.data.length > 0);
}

// function sortTransactionSectionsByDate(
//   sections: TransactionSection[],
// ): TransactionSection[] {
//   return sections.map((section) => {
//     const sortedData = [...section.data].sort((a, b) => {
//       const dataA = new Date(a.date).getTime();
//       const dataB = new Date(b.date).getTime();

//       return dataB - dataA;
//     });

//     return { date: section.date, data: sortedData };
//   });
// }
