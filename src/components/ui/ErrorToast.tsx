import { useError } from "@/store";
import { View, Text } from "react-native";

const ErrorToast = () => {
  const { toast, error } = useError();

  if (!toast) return null;

  console.log(error);

  return (
    <View className="absolute bottom-10 items-center justify-center self-center rounded-full bg-red-500 px-5 py-2">
      <Text className="text-center text-white">Opps! Something went wrong</Text>
    </View>
  );
};

export { ErrorToast };
