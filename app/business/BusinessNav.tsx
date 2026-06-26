import NavContainer from "../components/NavContainer";
import { LogoContainer } from "../components/LogoContainer";
import { BusinessSelector } from "./BusinessSelector";

export const BusinessNav = () => {
  return (
    <NavContainer>
      <LogoContainer>Tradaz</LogoContainer>
      <BusinessSelector />
    </NavContainer>
  );
};
