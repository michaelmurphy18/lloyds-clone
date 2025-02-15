import { Button, TextInput } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const createPayeeFormSchema = z.object({
  name: z.string({
    required_error: "Payee name is required",
  }),
  // .max(16, { message: "Payee name must be less than 16 characters" }),
  sortCode: z
    .string({ required_error: "Sort code is required" })
    .min(6, { message: "Sort code must be 6 digits" })
    .max(6, { message: "Sort code must be 6 digits" }),
  accountNumber: z
    .string({ required_error: "Account number is required" })
    .min(8, { message: "Account number must be 8 digits" })
    .max(8, {
      message: "Account number must be 8 digits",
    }),
});

type CreatePayeeForm = z.infer<typeof createPayeeFormSchema>;

export default function Page() {
  const { bottom } = useSafeAreaInsets();

  const [checked, setChecked] = useState(false);

  const { control } = useForm<CreatePayeeForm>({
    resolver: zodResolver(createPayeeFormSchema),
    mode: "onSubmit",
    delayError: 100,
  });

  return (
    <View
      className="flex-1 gap-y-5 bg-white px-4 py-10"
      style={{ paddingBottom: bottom }}
    >
      <View className="flex-row items-center gap-x-3 rounded-xl border px-3">
        <Text>Payee name:</Text>
        <TextInput
          control={control}
          name="name"
          className="flex-1 py-4"
          placeholderTextColor="#838383"
          placeholder="Name of the person or company"
        />
      </View>
      <View className="flex-row items-center gap-x-3 rounded-xl border px-3">
        <Text>Sort code:</Text>
        <TextInput
          control={control}
          name="sortCode"
          className="flex-1 py-4"
          placeholderTextColor="#838383"
          placeholder="Enter sort code"
          keyboardType="numeric"
          maxLength={8}
          inputMode="numeric"
          returnKeyType="next"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View className="flex-row items-center rounded-xl border px-3">
        <Text>Account number:</Text>
        <TextInput
          control={control}
          name="accountNumber"
          className="border-0 border-none py-4"
          placeholderTextColor="#838383"
          placeholder="Enter account number"
          keyboardType="numeric"
          maxLength={8}
          inputMode="numeric"
          returnKeyType="next"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View className="flex-row items-center gap-x-3">
        <Checkbox
          style={{ borderRadius: 5, width: 25, height: 25 }}
          color={"#000"}
          value={checked}
          onValueChange={setChecked}
        />
        <Text className="">Is this a business?</Text>
      </View>
      <View className="flex-row items-center gap-x-3 rounded-xl bg-[#F2F2F2] px-3 py-4">
        <Ionicons name="shield-outline" size={24} color="black" />
        <Text className="text-sm">
          We'll check these details with the payee's bank.
        </Text>
      </View>
      <View className="flex-1" />
      <Button label="Continue" size="lg" />
    </View>
  );
}
