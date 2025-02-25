import { Tabs } from "expo-router"
import { getFontSize, useTheme } from "tamagui"
import HouseSimpleIcon from "../../../components/icons/HouseSimple"
import ChatCircleIcon from "../../../components/icons/ChatCircle"
import UserIcon from "../../../components/icons/User"

export default function TabLayout() {
  const theme = useTheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme["primary"].val,
        tabBarInactiveTintColor: theme["element-disabled"].val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderColor: theme.background.val,
          height: 100,
          paddingTop: 25
        },
        tabBarLabelStyle: {
          fontSize: getFontSize("$label-medium-w-medium"),
          fontWeight: "medium"
        },
        tabBarIconStyle: {
          marginBottom: 6
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <HouseSimpleIcon width={26} height={26} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <ChatCircleIcon width={26} height={26} color={color} />,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: "Mi perfil",
          tabBarIcon: ({ color }) => <UserIcon width={26} height={26} color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  )
}
