import { Pressable, Text, View } from "react-native";

import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Link, useRouter } from "expo-router";

type HeaderProps = {
  showMessage?: boolean;
  showUser?: boolean;
  showSupport?: boolean;
  showClose?: boolean;
  showBack?: boolean;
  showInfo?: boolean;
  title?: string;
} & NativeStackHeaderProps;

const Header = ({
  showMessage = false,
  showUser = false,
  showSupport = false,
  showClose = false,
  showBack = false,
  showInfo = false,
  title: titleFromProps,
  route,
  options,
}: HeaderProps) => {
  const { top } = useSafeAreaInsets();

  const router = useRouter();

  const routeName = route.name;
  let title = titleFromProps ? titleFromProps : options.title || routeName;

  const renderIcon = ({
    icon: IconComponent,
    name,
    size = 22,
    action,
  }: {
    icon: any;
    name: string;
    size?: number;
    action?: () => void;
  }) => (
    <Pressable onPress={action} className="active:bg-black/10 rounded-full p-2">
      <IconComponent name={name} size={size} color="black" />
    </Pressable>
  );

  return (
    <View
      className="flex flex-row items-center gap-x-5 px-2 pb-5"
      style={{ paddingTop: top }}
    >
      {showBack &&
        renderIcon({
          icon: Ionicons,
          name: "arrow-back",
          action: () => router.back(),
        })}

      {showMessage && renderIcon({ icon: Feather, name: "mail" })}

      <Text className="font-bold text-lg">{title}</Text>

      {showInfo &&
        renderIcon({
          icon: Feather,
          name: "info",
        })}

      <View className="flex-1" />

      {showClose && (
        <Link asChild href="../">
          {renderIcon({
            icon: AntDesign,
            name: "close",
          })}
        </Link>
      )}

      {showSupport && (
        <Link href="/support" asChild>
          {renderIcon({
            icon: AntDesign,
            name: "questioncircleo",
          })}
        </Link>
      )}

      {showUser && renderIcon({ icon: FontAwesome5, name: "user-cog" })}
    </View>
  );
};

export default Header;
