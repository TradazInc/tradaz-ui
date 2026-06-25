import NavContainer from "../components/NavContainer";
import NavHeading from "../components/NavHeading";
import Search from "../components/Search";

const StoreHeader = () => {
  return (
    <NavContainer>
      <NavHeading>OGTech</NavHeading>
      <Search placeholder="Search Products" />
    </NavContainer>
  );
};

export default StoreHeader;
