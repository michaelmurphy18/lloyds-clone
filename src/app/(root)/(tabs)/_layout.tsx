import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Header } from "@/components/headers";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

function TabBarIcon({
  size = 24,
  icon: Icon,
  ...props
}: {
  icon: any;
  name: string;
  color: string;
  size?: number;
}) {
  return <Icon size={size} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // header: (props) => <Header {...props} />,
        tabBarActiveTintColor: "#000000",
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon icon={Feather} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(apply)"
        options={{
          title: "Apply",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              icon={FontAwesome}
              name="hand-pointer-o"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(payment)"
        options={{
          title: "Payment",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              icon={MaterialCommunityIcons}
              name="bank-transfer"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(search)"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon={AntDesign} name="search1" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(cards)"
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <TabBarIcon icon={FontAwesome} name="credit-card" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
