import { BusinessNav } from "@/app/business/BusinessNav";

import { LayoutContainer } from "@/app/components/LayoutsContainer";
import { Box } from "@chakra-ui/react";
import { PageContainer } from "../components/PageContainer";
import { SidebarContainer } from "../components/SidebarContainer";
import { VendorSidebar } from "./VendorSideBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer>
      <BusinessNav />
      <PageContainer>
        <SidebarContainer>
          <VendorSidebar />
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
