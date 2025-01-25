import { PropsWithChildren } from "react";
import { ModalProps, Modal, Text, Pressable, View } from "react-native";

type KeyboardAccessoryModalProps = {
  onNext?: () => void;
  onPrev?: () => void;
  onDone?: () => void;
  showKeyboardAccessoryView?: boolean;
} & ModalProps;

const KeyboardAccessoryModal = ({
  showKeyboardAccessoryView = true,
  onNext,
  onPrev,
  onDone,
  children,
  animationType = "slide",
  ...props
}: PropsWithChildren<KeyboardAccessoryModalProps>) => {
  const handlePress = (val: "next" | "prev" | "done") => {
    props.onDismiss?.();

    const actions: Record<typeof val, (() => void) | undefined> = {
      next: onNext,
      prev: onPrev,
      done: onDone,
    };

    actions[val]?.();
  };
  return (
    <Modal className="relative" animationType={animationType} {...props}>
      <Pressable
        className="absolute inset-0 bg-transparent"
        onPress={props.onDismiss}
      />
      <View className="absolute bottom-0 h-1/3 w-full bg-white">
        {showKeyboardAccessoryView && (
          <View className="flex-row gap-x-4 bg-black p-4">
            <Pressable onPress={handlePress.bind(null, "prev")}>
              <Text className="text-lg text-white">Prev</Text>
            </Pressable>
            <Pressable onPress={handlePress.bind(null, "next")}>
              <Text className="text-lg text-white">Next</Text>
            </Pressable>
            <View className="flex-1" />
            <Pressable onPress={handlePress.bind(null, "done")}>
              <Text className="text-lg text-white">Done</Text>
            </Pressable>
          </View>
        )}
        {children}
      </View>
    </Modal>
  );
};

export { KeyboardAccessoryModal };
