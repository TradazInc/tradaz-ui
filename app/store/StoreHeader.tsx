import { Skeleton } from "@chakra-ui/react";
import { Suspense } from "react";
import NavContainer from "../components/NavContainer";
import NavHeading from "../components/NavHeading";
import Search from "../components/Search";

const StoreHeader = async () => {
  return (
    <NavContainer>
      <NavHeading>OGTech</NavHeading>
      <Suspense fallback={<Skeleton />}>
        <Search placeholder="Search Products" />
      </Suspense>
    </NavContainer>
  );
};

export default StoreHeader;
