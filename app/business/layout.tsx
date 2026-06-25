import { BusinessHeader } from "@/app/business/BusinessHeader";
import { BusinessSidebar } from "@/app/business/BussinessSidebar";
import { LayoutContainer } from "@/app/components/LayoutContainer";
import { Box } from "@chakra-ui/react";
import { PageContainer } from "../components/PageContainer";
import { SidebarContainer } from "../components/SidebarContainer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer>
      <BusinessHeader />
      <PageContainer>
        <SidebarContainer>
          <BusinessSidebar />
        </SidebarContainer>
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
      </PageContainer>
    </LayoutContainer>
  );
}
