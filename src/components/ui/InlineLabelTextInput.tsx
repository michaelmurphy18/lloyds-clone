import { cn } from "@/libs/utils";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import {
  TextInput as RNTextInput,
  Text,
  type TextInputProps as RNTextInputProps,
  View,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Label } from "./Label";

type TextInputProps<T extends FieldValues> = {
  label: string;
  info?: string;
  textModifiers?: (text: string) => string | number;
} & RNTextInputProps &
  Omit<ControllerProps<T>, "render">;

const InlineLabelTextInput = <T extends FieldValues>({
  className,
  children,
  label,
  info,
  textModifiers,
  ...props
}: TextInputProps<T>) => {
  const [focus, setFocus] = useState(false);

  return (
    <Controller
      {...props}
      render={({
        field: { onChange, onBlur, value, ...field },
        fieldState: { error },
        formState,
      }) => {
        return (
          <View className="gap-y-2">
            <Pressable
              className={cn(
                "rounded-lg border border-black/50",
                error && "border-red-600",
                focus && "border-black",
                className,
              )}
            >
              <Label
                className="absolute left-3 top-1/2 -translate-y-1/2"
                children={label}
              />
              <View>
                <RNTextInput
                  {...props}
                  {...field}
                  className="py-4 pe-3"
                  style={[
                    {
                      paddingStart: (label.length + 1) * 8,
                    },
                    props.style,
                  ]}
                  value={value}
                  onChangeText={(text) => {
                    onChange(textModifiers?.(text) || text);
                  }}
                  onFocus={setFocus.bind(null, true)}
                  onBlur={() => {
                    setFocus(false);
                    onBlur();
                  }}
                />
              </View>
            </Pressable>
            {error && (
              <Text className="px-3 text-sm text-red-600">{error.message}</Text>
            )}
            {focus && info && !error && (
              <Text className="px-3 text-sm font-semibold">{info}</Text>
            )}
          </View>
        );
      }}
    />
  );
};

InlineLabelTextInput.displayName = "InlineLabelTextInput";

export { InlineLabelTextInput };
