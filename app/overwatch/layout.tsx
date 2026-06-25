import { Flex, Box } from "@chakra-ui/react";
import { OverwatchHeader } from "./OverwatchHeader";
import { OverwatchSidebar } from "./OverwatchSidebar";
import { LayoutContainer } from "../components/layoutContainer";
import { PageContainer } from "../components/PageContainer";
import { SidebarContainer } from "../components/SidebarContainer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer>
      <OverwatchHeader />
      <PageContainer>
        <SidebarContainer>
          <OverwatchSidebar />
        </SidebarContainer>
        <Flex flex={1} direction="column" overflow="hidden">
          <Box
            flex={1}
            overflowY="auto"
            id="admin-scroll-container"
            p={{ base: 4, lg: 8 }}
          >
            {children}
          </Box>
        </Flex>
      </PageContainer>
    </LayoutContainer>
  );
}
