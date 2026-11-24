"use client";

import { useBusinesses } from "@/hooks/business";
import { useClientSearch } from "@/hooks/useClientSearch";
import { GetAllBusinessOutputData } from "@/schema/business";
import {
  FormatNumber,
  HStack,
  Icon,
  Stat,
  StatRootProps,
} from "@chakra-ui/react";
import { StatContainer } from "./StatContainer";
import { useSession } from "@/hooks/session";
import { format } from "date-fns";
import { HiBuildingOffice2 } from "react-icons/hi2";

interface Props {
  initialBusinesses: Promise<GetAllBusinessOutputData>;
}

export const BusinessStat = ({
  initialBusinesses,
  ...props
}: Props & StatRootProps) => {
  const { data } = useBusinesses({
    fallbackData: initialBusinesses,
  });
  const { results: businesses } = useClientSearch(data, "name");

  const { data: session } = useSession();

  return (
    <StatContainer {...props}>
      <HStack justify={"space-between"}>
        <Stat.Label>Businesses</Stat.Label>
        <Icon color={"fg.muted"}>
          <HiBuildingOffice2 />
        </Icon>
      </HStack>

      <Stat.ValueText>
        <FormatNumber
          value={businesses.length}
          notation={"compact"}
          compactDisplay={"short"}
        />
      </Stat.ValueText>

      {session?.user && (
        <Stat.HelpText>
          since {format(session?.user.createdAt, "PPP")}
        </Stat.HelpText>
      )}
    </StatContainer>
  );
};
