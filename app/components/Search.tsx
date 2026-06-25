"use client";

import { Input, InputGroup } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  query: string;
  placeholder: string;
}

export default function Search({ query, placeholder }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(query, term);
    } else {
      params.delete(query);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <InputGroup startElement={<LuSearch />} minWidth={"30vw"}>
      <Input
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        color={"white"}
        borderRadius={"full"}
        defaultValue={searchParams.get(query)?.toString()}
      />
    </InputGroup>
  );
}
