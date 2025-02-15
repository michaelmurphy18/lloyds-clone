import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import SegmentedContol from "@react-native-segmented-control/segmented-control";
import { Button, DataTimePicker, TextInput } from "@/components/ui";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { FindUserForm, findUserFormSchema } from "@/schema";
import { MAXIMUM_DOB } from "@/constants";

export default function Page() {
  const [userIdKnown, setUserIdKnown] = useState(true);

  const {
    control,
    formState: { errors, isValid },
  } = useForm<FindUserForm>({
    resolver: zodResolver(findUserFormSchema),
    mode: "all",
    shouldFocusError: true,
  });

  return (
    <ScrollView
      className="bg-white px-4 pb-20"
      contentContainerClassName="flex-grow"
    >
      <Text className="py-10 font-light">
        First let's find you. Then you'll be able to change your password
      </Text>

      <View className="gap-y-2 pb-3">
        <Text className="font-semibold">Do you know your User ID ?</Text>
        <SegmentedContol
          values={["Yes", "No"]}
          selectedIndex={userIdKnown ? 0 : 1}
          onChange={(event) =>
            setUserIdKnown(event.nativeEvent.selectedSegmentIndex === 0)
          }
          tintColor="#000000"
          activeFontStyle={{ color: "#ffffff" }}
          style={{ height: 40, width: "30%" }}
        />
      </View>
      {/* {userIdKnown && <PasswordForm />} */}

      <View className="flex-1 gap-y-4">
        <TextInput control={control} name="userId" label="Enter your User ID" />
        <TextInput control={control} name="firstName" label="First name" />
        <TextInput control={control} name="lastName" label="Last name" />

        <DataTimePicker
          control={control}
          name="dob"
          defaultValue={MAXIMUM_DOB}
          maximumDate={MAXIMUM_DOB}
          label="Date of birth"
        />

        <View className="flex-1" />

        <Button label="Continue" size="lg" />
      </View>
    </ScrollView>
  );
}
