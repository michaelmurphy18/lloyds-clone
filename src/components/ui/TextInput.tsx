import { cn } from "@/libs/utils";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import {
  TextInput as RNTextInput,
  Text,
  type TextInputProps as RNTextInputProps,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

type TextInputProps<T extends FieldValues> = {
  label?: string;
  textModifiers?: (text: string) => string;
} & RNTextInputProps &
  Omit<ControllerProps<T>, "render">;

const TextInput = <T extends FieldValues>({
  className,
  children,
  label,
  textModifiers,
  ...props
}: TextInputProps<T>) => {
  return (
    <Controller
      {...props}
      render={({
        field: { onChange, ...field },
        fieldState: { error },
        formState,
      }) => {
        return (
          <View className="gap-y-2">
            {label && <Text className="font-semibold">{label}</Text>}

            {children}
            <View>
              <RNTextInput
                className={cn(
                  "rounded-lg border border-gray-400 px-3 py-4",
                  error && "border-red-600",
                  className,
                )}
                {...props}
                onChangeText={(text) => {
                  onChange(textModifiers?.(text) || text);
                }}
                {...field}
              />
              {error && (
                <Feather
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  name="info"
                  size={24}
                  color="#dc2626"
                />
              )}
            </View>
            {error && (
              <Text className="text-sm text-red-600">{error.message}</Text>
            )}
          </View>
        );
      }}
    />
  );
};

TextInput.displayName = "TextInput";

export { TextInput };
