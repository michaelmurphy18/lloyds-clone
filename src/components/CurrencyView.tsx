import { View, Text, ViewProps } from "react-native";

import { splitDecimal, formatCurrency, cn } from "@/libs/utils";
import { forwardRef } from "react";

type CurrencyViewProps = {
  amount: number;
  integerSize?: string;
  decimalSize?: string;
} & ViewProps;

const CurrencyView = forwardRef<View, CurrencyViewProps>(
  ({ amount, className, integerSize, decimalSize, ...props }, ref) => {
    const formatedAmount = splitDecimal(formatCurrency(amount));

    return (
      <View
        ref={ref}
        className={cn("flex-row items-baseline", className)}
        {...props}
      >
        <Text className={cn("text-xl font-semibold", integerSize)}>
          {formatedAmount[0]}
        </Text>
        <Text className={cn("text-sm font-semibold", decimalSize)}>.</Text>
        <Text className={cn("text-sm font-semibold", decimalSize)}>
          {formatedAmount[1]}
        </Text>
      </View>
    );
  },
);

CurrencyView.displayName = "CurrencyView";

export default CurrencyView;
