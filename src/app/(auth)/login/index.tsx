import { Button } from "@/components/ui/Button";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 justify-center gap-y-4 bg-white px-5">
      <View className="gap-y-2">
        <Text>To log on, you'll need your:</Text>
        <Text>{`\u2022 User ID`}</Text>
        <Text>{`\u2022 Password`}</Text>
      </View>
      <Link href="/(auth)/login/form" asChild>
        <Button label="Log on now" variant="default" size="lg" />
      </Link>
      <Text className="mt-10 text-lg font-semibold">
        Don't have Internet Banking yet?
      </Text>
      <Text className="leading-tight">
        Let's get you banking online. First, we'll ask for your account details.
        You'll find these on cards, statements, and bank documents.
      </Text>
      <Link href="/(auth)/signup" asChild>
        <Button label="Set up Internet Banking" variant="outline" size="lg" />
      </Link>

      <View className="h-1/3" />
    </View>
  );
}
