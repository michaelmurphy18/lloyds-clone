import { cn } from "@/libs/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Text, TextProps } from "react-native";

const labelVariants = cva("peer-disabled:opacity-70");

const Label = ({
  className,
  ...props
}: {} & TextProps & VariantProps<typeof labelVariants>) => {
  return <Text className={cn(labelVariants(), className)} {...props} />;
};

export { Label };
