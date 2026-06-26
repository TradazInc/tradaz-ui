import NavContainer from "../components/NavContainer";
import { LogoContainer } from "../components/LogoContainer";
import { Breadcrumb } from "@chakra-ui/react";

import { BUSINESS_NAV_ITEMS } from "@/data/sidebarItems";
export const BusinessNav = () => {
  return (
<Breadcrumb.Root>
      <Breadcrumb.List gap={3}>
        <Breadcrumb.Item>
          <NavContainer>
            <LogoContainer>Tradaz</LogoContainer>
          </NavContainer>
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
  );
};

