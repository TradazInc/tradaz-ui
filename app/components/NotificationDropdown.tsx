"use client";

import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { LuBell, LuShoppingBag } from "react-icons/lu";
import { Menu, Portal } from "@chakra-ui/react";

export const NotificationDropdown = () => {
  const notifications = [
    {
      id: "ertyuioiuhg",
      title: " New order received!",
      description: "Order #POS-8829 needs fulfillment.",
      createdAt: "10 MINS AGO",
    },
    {
      id: "ertylkmnbvciuhg",
      title: " New order received!",
      description: "Order #POS-8429 needs fulfillment.",
      createdAt: "10 MINS AGO",
    },
    {
      id: "errtyuhniuhg",
      title: " New order received!",
      description: "Order #POS-8869 needs fulfillment.",
      createdAt: "10 MINS AGO",
    },
  ];

  return (
    <Menu.Root>
      <Menu.Trigger rounded="full">
        <Icon
          as={LuBell}
          color="white"
          boxSize="20px"
          mt={1}
          strokeWidth={"2.5"}
        />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content background={"black"}>
            <Menu.Item value="settings">
              <NotificationHeader />
            </Menu.Item>
            {notifications.map((content, index) => (
              <Menu.Item value={content.id}>
                <NotificationContent
                  key={index}
                  createdAt={content.createdAt}
                  description={content.description}
                  title={content.title}
                />
              </Menu.Item>
            ))}
            <Menu.Item value="logout">
              <NotificationFooter />
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const NotificationHeader = () => {
  return (
    <Flex
      px={4}
      py={3}
      justify="space-between"
      align="center"
      w={"full"}
      borderBottom="1px solid #1A1A1A"
    >
      <Text fontSize="13px" fontWeight="bold" color="white">
        Notifications
      </Text>
      <Text fontSize="12px" color="#888888" cursor="pointer">
        Mark all read
      </Text>
    </Flex>
  );
};

const NotificationFooter = () => {
  return (
    <Box p={3}>
      <Button
        w="full"
        rounded="none"
        border="1px solid #333"
        fontWeight="bold"
        fontSize="12px"
        size="sm"
      >
        View All
      </Button>
    </Box>
  );
};

const NotificationContent = ({
  createdAt,
  description,
  title,
}: {
  title: string;
  description: string;
  createdAt: string;
}) => {
  return (
    <Box
      maxH="300px"
      overflowY="auto"
      css={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      <Flex
        px={4}
        py={4}
        gap={4}
        cursor="pointer"
        borderBottom="1px solid #1A1A1A"
      >
        <Flex
          align="center"
          justify="center"
          boxSize="32px"
          color="white"
          border="1px solid #333"
          rounded="none"
        >
          <Icon as={LuShoppingBag} boxSize="14px" />
        </Flex>
        <Box>
          <Text fontSize="13px" color="white" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="12px" color="#888888" mt={1}>
            {description}
          </Text>
          <Text fontSize="10px" color="#555555" mt={2} fontWeight="bold">
            {createdAt}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
