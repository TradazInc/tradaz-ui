import { Flex, Box } from "@chakra-ui/react";
import { OverwatchHeader } from "./OverwatchHeader";
import { OverwatchSidebar } from "./OverwatchSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex h={{ base: "100dvh", lg: "100vh" }} bg="#000" overflow="hidden">
      {/* --- DESKTOP SIDEBAR --- */}
      <Box display={{ base: "none", lg: "flex" }} h="full">
        <OverwatchSidebar />
      </Box>

      {/* --- MAIN CONTENT AREA --- */}
      <Flex flex={1} direction="column" overflow="hidden">
        {/* --- HEADER --- */}
        <OverwatchHeader />

        {/* --- PAGE CONTENT --- */}
        <Box
          flex={1}
          overflowY="auto"
          id="admin-scroll-container"
          p={{ base: 4, lg: 8 }}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
