import { createPayee } from "@/api/users/payee";
import { Button } from "@/components/ui";
import { InlineLabelTextInput } from "@/components/ui";
import { sortCodeFormatter } from "@/libs/utils";
import { CreatePayeeForm, createPayeeFormSchema } from "@/schema";
import { LoadingScreen } from "@/screens/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Checkbox from "expo-checkbox";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const { bottom } = useSafeAreaInsets();

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: createPayee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payee"] });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<CreatePayeeForm>({
    resolver: zodResolver(createPayeeFormSchema),
    mode: "all",
    criteriaMode: "all",
    delayError: 100,
  });

  const onSubmit = (data: CreatePayeeForm) => {
    mutate.mutate(data);
  };

  return (
    <View
      className="flex-1 gap-y-5 bg-white px-4 py-10"
      style={{ paddingBottom: bottom }}
    >
      <InlineLabelTextInput
        label="Payee name:"
        info="Please use their full name"
        control={control}
        name="name"
        placeholderTextColor="#838383"
        placeholder="Name of the person or company"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <InlineLabelTextInput
        label="Sort code:"
        control={control}
        textModifiers={sortCodeFormatter}
        name="sortCode"
        placeholderTextColor="#838383"
        placeholder="Enter sort code"
        keyboardType="numeric"
        maxLength={8}
        inputMode="numeric"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <InlineLabelTextInput
        label="Account number:"
        control={control}
        name="accountNumber"
        placeholderTextColor="#838383"
        placeholder="Enter account number"
        keyboardType="numeric"
        maxLength={8}
        inputMode="numeric"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Controller
        control={control}
        name="business"
        render={({ field: { value, onChange } }) => (
          <Pressable
            onPress={() => onChange(!value)}
            className="flex-row items-center gap-x-3"
          >
            <Checkbox
              style={{ borderRadius: 5, width: 25, height: 25 }}
              color={"#000"}
              value={value}
              onValueChange={onChange}
            />
            <Text>Is this a business?</Text>
          </Pressable>
        )}
      />

      <View className="flex-row items-center gap-x-3 rounded-xl bg-[#F2F2F2] px-3 py-4">
        <Ionicons name="shield-outline" size={24} color="black" />
        <Text className="text-sm">
          We'll check these details with the payee's bank.
        </Text>
      </View>

      {/* {mutate.isPending && <ActivityIndicator />} */}

      <View className="flex-1" />

      <Button
        disabled={!isValid || !isDirty}
        label="Continue"
        size="lg"
        onPress={handleSubmit(onSubmit)}
      />

      {mutate.isPending && <LoadingScreen />}
    </View>
  );
}
