import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Button, DataTimePicker, TextInput } from "@/components/ui";
import { useForm } from "react-hook-form";
import { MAXIMUM_DOB } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
  const { bottom } = useSafeAreaInsets();
  const { control } = useForm();

  return (
    <View className="flex-1 gap-y-5 bg-white" style={{ paddingBottom: bottom }}>
      <View className="h-1 bg-green-700/50">
        <View className="h-1 w-1/5 bg-green-600" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-y-4 flew-grow"
        className="p-4"
      >
        <Text className="text-2xl font-semibold">Registration is simple</Text>
        <Text className="py-2">
          It should only take a few minutes to get set up.
        </Text>
        <TextInput control={control} name="firstName" label="First name" />
        <TextInput control={control} name="lastName" label="Last name" />
        <TextInput control={control} name="email" label="Email" />

        <DataTimePicker
          control={control}
          name="dateOfBirth"
          label="Date of birth"
          defaultValue={MAXIMUM_DOB}
          maximumDate={MAXIMUM_DOB}
        />
        <TextInput control={control} name="postCode" label="Postcode" />
      </ScrollView>

      <View className="flex-row gap-x-5 px-5">
        <Link asChild href="..">
          <Button label="Back" variant="outline" className="flex-1" />
        </Link>
        <Link asChild href="/(auth)/signup/account">
          <Button label="Next" className="flex-1" />
        </Link>
      </View>
    </View>
  );
};

export default Page;
