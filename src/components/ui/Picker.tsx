import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import { View, Text, TextInput, Pressable } from "react-native";
import {
  Picker as RNPicker,
  PickerProps as RNPickerProps,
} from "@react-native-picker/picker";

import { KeyboardAccessoryModal } from "./KeyboardAccessoryModal";

type PickerProps<
  T extends FieldValues,
  U extends { value: string; label: string },
> = {
  items: U[];
  label?: string;
} & Omit<ControllerProps<T>, "render"> &
  RNPickerProps<U>;

const Picker = <
  T extends FieldValues,
  U extends { value: string; label: string },
>({
  items,
  label,
  ...props
}: PickerProps<T, U>) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <View className="gap-y-2">
        <Text className="font-semibold">{label}</Text>
        <Pressable onPress={setShowModal.bind(null, true)}>
          <TextInput
            className="rounded-lg border border-gray-400 px-3 py-4"
            // editable={false}
            pointerEvents="none"
            placeholder="Select account type"
            value={String(items[selectedIndex].label)}
          />
          <Entypo
            className="absolute right-3 top-1/2 -translate-y-1/2 transform"
            name="chevron-small-down"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      <Controller
        {...props}
        render={({ field: { onChange, value, ...field } }) => (
          <KeyboardAccessoryModal
            visible={showModal}
            onDismiss={setShowModal.bind(null, false)}
            onPrev={() => console.log("prev")}
            transparent
            animationType="slide"
          >
            <RNPicker
              {...props}
              {...field}
              itemStyle={{ color: "#000000" }}
              selectedValue={value}
              onValueChange={(_, itemIndex) => {
                setSelectedIndex(itemIndex);
                onChange(items[itemIndex].value);
              }}
            >
              {items.map(({ label, value }: U) => (
                <RNPicker.Item key={`${value}`} label={label} value={value} />
              ))}
            </RNPicker>
          </KeyboardAccessoryModal>
        )}
      />
    </>
  );
};

export { Picker };
