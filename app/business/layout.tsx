import { Flex, Box } from "@chakra-ui/react";

// Import your Client Component wrappers (NO MORE DATA IMPORTS HERE!)
import { BusinessHeader } from "@/app/business/BusinessHeader";
import { BusinessSidebar } from "@/app/business/BussinessSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" h="100vh" w="full" bg="#000000" overflow="hidden">
      <BusinessHeader />

      {/* MAIN CONTENT AREA */}
      <Flex
        flex={1}
        position="relative"
        bg="#000000"
        alignItems="stretch"
        minH={0}
        overflow="hidden"
      >
        <Box display={{ base: "none", md: "block" }} h="full">
          <BusinessSidebar />
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
