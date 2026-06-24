import { Flex, Box, Text, Breadcrumb } from "@chakra-ui/react";
import { Sidebar } from "@/app/business/Sidebar";
import { DashboardHeader } from "@/app/business/DashboardHeader";
import { MobileSidebar } from "./MobileSidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" h="100vh" w="full" bg="#000000" overflow="hidden">
      {/* HEADER */}
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
        {/* State-driven Mobile Component */}
        <MobileSidebar />

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

        {/* DashboardHeader */}
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

      {/* MAIN CONTENT AREA */}
      <Flex
        flex={1}
        position="relative"
        bg="#000000"
        alignItems="stretch"
        minH={0}
        overflow="hidden"
      >
        {/* Desktop Sidebar - Hidden on mobile, pure server-rendered structure */}
        <Box display={{ base: "none", md: "block" }} h="full">
          <Sidebar isOpen={true} onClose={() => {}} />
        </Box>

        <Box
          flex={1}
          overflowY="auto"
          overflowX="hidden"
          scrollbarGutter="stable"
          as="main"
          p={{ base: 4, md: 8 }}
          minH={0}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
