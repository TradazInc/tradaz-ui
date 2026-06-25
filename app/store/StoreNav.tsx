import { Skeleton } from "@chakra-ui/react";
import { Suspense } from "react";
import NavContainer from "../components/NavContainer";
import { LogoContainer } from "../components/LogoContainer";
import Search from "../components/Search";

export const StoreNav = async () => {
  return (
    <NavContainer>
      <LogoContainer>OGTech</LogoContainer>
      <Suspense fallback={<Skeleton />}>
        <Search placeholder="Search Products" query="name" />
      </Suspense>
    </NavContainer>
  );
};
