import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import RNDateTimePicker, {
  DatePickerOptions,
} from "@react-native-community/datetimepicker";
import { PropsWithChildren, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { KeyboardAccessoryModal } from "./KeyboardAccessoryModal";
import { formatDate } from "@/libs/utils";

type DataTimePickerProps<T extends FieldValues> = { label?: string } & Omit<
  ControllerProps<T>,
  "render"
> &
  Omit<DatePickerOptions, "value" | "onChange">;

//   !Todo
const DataTimePicker = <T extends FieldValues>({
  label,
  children,
  ...props
}: PropsWithChildren<DataTimePickerProps<T>>) => {
  const [displayDate, setDisplayDate] = useState<Date>();

  const [showModal, setShowModal] = useState(false);

  return (
    <View className="gap-y-2">
      {label && <Text className="font-semibold">{label}</Text>}
      <Pressable onPress={setShowModal.bind(null, true)}>
        <Text className="relative rounded-lg border border-gray-400 px-3 py-4 tracking-wide">
          {displayDate && formatDate(displayDate)}
        </Text>
        <AntDesign
          name="calendar"
          size={20}
          color="black"
          className="absolute right-3 top-1/2 -translate-y-1/2 transform"
        />
      </Pressable>
      <Controller
        {...props}
        render={({ field: { onChange, value, ref, ...field } }) => (
          <>
            <KeyboardAccessoryModal
              transparent
              visible={showModal}
              onDone={() => {
                setShowModal(false);
                setDisplayDate(value);
              }}
              onDismiss={() => {
                setShowModal(false);
                setDisplayDate(value);
              }}
            >
              <RNDateTimePicker
                {...field}
                {...props}
                display="spinner"
                textColor="#000000"
                style={{ alignSelf: "center" }}
                onChange={(e, date) => onChange(date)}
                value={value}
              />
            </KeyboardAccessoryModal>
          </>
        )}
      />
    </View>
  );
};

export { DataTimePicker };
