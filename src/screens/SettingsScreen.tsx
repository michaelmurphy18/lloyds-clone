import { SettingsItem, SettingsSection } from "@/constants/settings";
import { cn } from "@/libs/utils";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Pressable,
  SectionList,
  SectionListRenderItem,
  Text,
  View,
} from "react-native";

const SettingsScreen = () => {
  const renderItem: SectionListRenderItem<
    SettingsItem,
    {
      title: string;
    }
  > = ({ item: { href, label, icon }, index, section }) => {
    const firstItem = index === 0;
    const lastItem = index === section.data.length - 1;

    return (
      <Link href={href} asChild>
        <Pressable
          className={cn(
            "flex-row items-center gap-x-3 bg-white p-5",
            lastItem && "rounded-b-xl",
            firstItem && "rounded-t-xl",
          )}
        >
          <MaterialIcons name={icon} size={24} color="black" />
          {/* <FontAwesome name={item.icon} size={24} color="black" /> */}
          <Text>{label}</Text>
          <View className="flex-1" />
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
      </Link>
    );
  };

  return (
    <View className="flex-1 gap-y-3 pt-5">
      <SectionList
        stickySectionHeadersEnabled={false}
        contentContainerClassName="flex-grow"
        showsVerticalScrollIndicator={false}
        SectionSeparatorComponent={() => <View className="h-4" />}
        ItemSeparatorComponent={() => (
          <View className="border-b-hairline border-b-gray-300" />
        )}
        renderSectionHeader={({ section }) => (
          <Text className="mt-2 text-sm font-semibold">{section.title}</Text>
        )}
        renderItem={renderItem}
        sections={SettingsSection}
      />
    </View>
  );
};
export default SettingsScreen;
