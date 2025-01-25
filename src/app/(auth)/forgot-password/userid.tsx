import { View, Text, ScrollView } from "react-native";

import { Button, DataTimePicker, Picker, TextInput } from "@/components/ui";
import { Feather } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { sortCodeFormatter } from "@/libs/utils";

import { MAXIMUM_DOB, accountType, accountTypeLabels } from "@/constants";
import { FindUserIdFormType, findUserIdSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

// ! implement react-native-keyboard-controller after going out of Expo Go
export default function Page() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FindUserIdFormType>({
    resolver: zodResolver(findUserIdSchema),
    mode: "all",
    shouldFocusError: true,
  });

  const onSubmit = (data: FindUserIdFormType) => {
    console.log(data);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
      className="bg-white px-4 pb-20"
    >
      <Text className="py-10 font-light">
        Let's find your account. Afterwards you'll be able to reset your
        password if you need to. {`\n\n`}
        If you have more than one account with us, you can use any of them here.
      </Text>

      <View className="gap-y-4 pb-3">
        <Picker
          label="Select your account type"
          items={[...accountTypeLabels]}
          defaultValue={accountTypeLabels[0].label}
          control={control}
          name="accountType"
        />
        <View className="flex-row items-center gap-x-2">
          <Feather name="info" size={32} color="black" />
          <Text className="flex-1">
            You can find these details on your statement, or on your debit card
            if you have one.
          </Text>
        </View>
        <TextInput
          control={control}
          name="sortCode"
          keyboardType="number-pad"
          maxLength={8}
          textModifiers={sortCodeFormatter}
          label="Sort code"
          className="rounded-lg border border-gray-400 px-3 py-4"
        />

        <TextInput
          control={control}
          name="accountNumber"
          keyboardType="number-pad"
          maxLength={8}
          label="Account number"
          className="rounded-lg border border-gray-400 px-3 py-4"
        />
        <TextInput
          control={control}
          name="firstName"
          keyboardType="ascii-capable"
          label="First name"
          className="rounded-lg border border-gray-400 px-3 py-4"
        />
        <TextInput
          control={control}
          name="lastName"
          keyboardType="ascii-capable"
          label="Last name"
          className="rounded-lg border border-gray-400 px-3 py-4"
        />
        <DataTimePicker
          control={control}
          name="dateOfBirth"
          defaultValue={MAXIMUM_DOB}
          maximumDate={MAXIMUM_DOB}
          display="spinner"
          label="Date of birth"
        />

        <View className="flex-1" />

        <Button
          label="Continue"
          size="lg"
          // disabled={!isValid}
          onPress={handleSubmit(onSubmit, (err) => {
            console.log(err);
          })}
        />
      </View>
    </ScrollView>
  );
}
