import { MaterialIcons } from "@expo/vector-icons";
import { Href } from "expo-router";
import { SectionListData } from "react-native";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

export type SettingsItem = {
  id: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  href: Href;
};

export const SettingsSection: SectionListData<
  SettingsItem,
  { title: string }
>[] = [
  {
    key: "app-security",
    title: "App security",
    data: [
      {
        id: "fingerprint",
        label: "Fingerprint logon",
        icon: "fingerprint",
        href: "/coming-soon",
      },
      {
        id: "password-reset",
        label: "Reset your password",
        icon: "password",
        href: "/coming-soon",
      },
      {
        id: "auto-logoff",
        label: "Auto logoff",
        icon: "logout",
        href: "/coming-soon",
      },
      {
        id: "reset-app",
        label: "Reset mobile app",
        icon: "replay",
        href: "/coming-soon",
      },
    ],
  },
  {
    key: "contact-preferences",
    title: "How we contact you",
    data: [
      {
        id: "notifications",
        label: "Notifications",
        icon: "notifications-none",
        href: "/coming-soon",
      },
      {
        id: "paper-free",
        label: "Paper free preferences",
        icon: "newspaper",
        href: "/coming-soon",
      },
      {
        id: "statement-frequency",
        label: "Statement frequency",
        icon: "class",
        href: "/coming-soon",
      },
      {
        id: "accessibility",
        label: "Accessibility options",
        icon: "accessibility",
        href: "/coming-soon",
      },
    ],
  },
  {
    key: "other-features",
    title: "Other feature settings",
    data: [
      {
        id: "open-banking",
        label: "Open Banking connected accounts",
        icon: "credit-card",
        href: "/coming-soon",
      },
    ],
  },
  {
    key: "privacy-and-data",
    title: "Privacy and data",
    data: [
      {
        id: "app-details",
        label: "App details",
        icon: "apps",
        href: "/coming-soon",
      },
      {
        id: "marketing-choices",
        label: "Marketing choices",
        icon: "chat-bubble-outline",
        href: "/coming-soon",
      },
      {
        id: "data-consent",
        label: "Data consent",
        icon: "data-array",
        href: "/coming-soon",
      },
      {
        id: "open-banking-services",
        label: "Open Banking connected services",
        icon: "key",
        href: "/coming-soon",
      },
      {
        id: "legal-info",
        label: "Legal information",
        icon: "document-scanner",
        href: "/coming-soon",
      },
    ],
  },
];
