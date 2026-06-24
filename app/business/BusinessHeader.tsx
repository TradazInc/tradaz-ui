import { Flex, Box, Text, Breadcrumb } from "@chakra-ui/react";
import { MobileSidebar } from "@/app/components/MobileSidebar";
import { DashboardHeader } from "@/app/business/DashboardHeader";
import { SidebarItem } from "@/app/components/Sidebar";

interface BusinessHeaderProps {
  navItems: SidebarItem[];
  basePath: string;
}

export const BusinessHeader = ({ navItems, basePath }: BusinessHeaderProps) => {
  return (
    <Flex
      h="50px"
      w="full"
      align="center"
      bg="#000000"
      position="relative"
      zIndex={100}
      flexShrink={0}
      pl={6}
      pr={{ base: 4, md: 8 }}
      gap={3}
    >
      <MobileSidebar items={navItems} basePath={basePath} />

      <Breadcrumb.Root>
        <Breadcrumb.List gap={3}>
          {/* LOGO */}
          <Breadcrumb.Item>
            <Text
              fontSize="xl"
              fontWeight="extrabold"
              color="white"
              letterSpacing="tight"
              userSelect="none"
            >
              Tradaz
              <Text as="span" color="#888888">
                .
              </Text>
            </Text>
          </Breadcrumb.Item>

          <Breadcrumb.Separator
            color="gray.600"
            fontSize="xl"
            display={{ base: "none", md: "block" }}
          >
            /
          </Breadcrumb.Separator>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      {/* Profile/Store DashboardHeader */}
      <Flex
        flex={1}
        h="full"
        align="center"
        overflow="visible"
        position="relative"
        zIndex={2}
      >
        <DashboardHeader />
      </Flex>

      {/* Bottom Border Line */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        h="1px"
        bg="#1A1A1A"
        zIndex={10}
        pointerEvents="none"
      />
    </Flex>
  );
};
