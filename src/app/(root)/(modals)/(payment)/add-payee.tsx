import { cn } from "@/libs/utils";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 gap-y-5 bg-white py-10">
      <Text className="text-center font-semibold">
        What type of payment are you making?
      </Text>
      <View className="mx-3 flex-row flex-wrap justify-between">
        <CircularIcon
          label="Pay a person or company"
          iconName="user"
          iconType={Feather}
          href="/new-payee"
        />
        <CircularIcon
          label="International bank account"
          iconName="network"
          iconType={Entypo}
          href="/coming-soon"
        />
        <CircularIcon
          label="HMRC & Tax"
          iconName="warehouse"
          iconType={MaterialIcons}
          href="/coming-soon"
        />
        <CircularIcon
          label="Pay a conveyancer"
          iconName="list-alt"
          iconType={MaterialIcons}
          badge
          href="/coming-soon"
        />
      </View>
    </View>
  );
}

const CircularIcon = ({
  label,
  iconName: name,
  iconType: IconType,
  size = 28,
  className,
  badge = false,
  href,
}: {
  label: string;
  iconName: string;
  iconType: any;
  size?: number;
  className?: string;
  badge?: boolean;
  href: Href;
}) => {
  return (
    <Link href={href} asChild>
      <Pressable className="group flex-col items-center">
        <Text
          style={{ opacity: badge ? 1 : 0 }}
          className="rounded-md bg-green-500 px-2 py-1 font-semibold uppercase text-white"
        >
          NEW
        </Text>

        <View className="w-[125] items-center gap-y-0.5 py-2">
          <IconType
            name={name}
            size={size}
            color="black"
            className={cn(
              "rounded-full border border-gray-400 p-3",
              "group-active:bg-gray-200",
              className,
            )}
          />
          <Text className="text-wrap text-center text-xs">{label}</Text>
        </View>
      </Pressable>
    </Link>
  );
};
