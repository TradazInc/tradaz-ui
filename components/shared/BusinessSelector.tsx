"use client";

import { toaster } from "@/components/ui/toaster";
import { useBusinesses } from "@/hooks/business";
import { computePath } from "@/utilities/computePath";
import {
  useSession,
  useSetActiveBusiness,
  useSetActiveStore,
} from "@/hooks/session";
import { useStores } from "@/hooks/store";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { Breadcrumb, HStack, Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { LiaSlashSolid, LiaStoreAltSolid } from "react-icons/lia";
import { LuChevronDown } from "react-icons/lu";
import { BusinessSelectorMenu } from "./BusinessSelectorMenu";
import TradazLogo from "./TradazLogo";

export const BusinessSelector = () => {
  const { data: session } = useSession();
  const activeBusinessId = session?.session.activeOrganizationId ?? undefined;
  const activeStoreId = session?.session.activeTeamId ?? undefined;
  const sessionLoaded = !!session;

  const businesses = useBusinesses();
  const stores = useStores(activeBusinessId);
  const setActiveBusiness = useSetActiveBusiness();
  const setActiveStore = useSetActiveStore();

  const activeBusiness = useMemo(
    () => businesses.data?.find((b) => b.id === activeBusinessId),
    [businesses.data, activeBusinessId],
  );
  const activeStore = useMemo(
    () => stores.data?.find((s) => s.id === activeStoreId),
    [stores.data, activeStoreId],
  );

  const handleBusiness = async (businessId?: string) => {
    try {
      await setActiveBusiness.trigger(businessId);
    } catch (e) {
      toaster.error(errorToastOptions(e));
    }
  };

  const handleStore = async (storeId?: string) => {
    try {
      await setActiveStore.trigger(storeId);
    } catch (e) {
      toaster.error(errorToastOptions(e));
    }
  };

  // Tracks url changes
  const { businessId, storeId } = useParams<{
    businessId?: string;
    storeId?: string;
  }>();

  useEffect(() => {
    if (!sessionLoaded) return;

    // Use URL to update session
    const sync = async () => {
      if (activeBusinessId !== businessId) {
        await handleBusiness(businessId); // clears the store
        if (storeId) await handleStore(storeId);
        return;
      }
      if (activeStoreId !== storeId) await handleStore(storeId);
    };
    sync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLoaded, businessId, storeId]);

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Link href={computePath()}>
          <TradazLogo h={3} />
        </Link>

        <Breadcrumb.Separator>
          <LiaSlashSolid />
        </Breadcrumb.Separator>

        <Breadcrumb.Item>
          <BusinessSelectorMenu data={businesses.data}>
            <Breadcrumb.Link as={"button"}>
              <HiBuildingOffice2 />
              <Skeleton height={5} loading={businesses.isLoading}>
                <HStack>
                  {activeBusiness ? activeBusiness.name : "Businesses"}
                  <LuChevronDown />
                </HStack>
              </Skeleton>
            </Breadcrumb.Link>
          </BusinessSelectorMenu>
        </Breadcrumb.Item>

        {activeStore && (
          <>
            <Breadcrumb.Separator>
              <LiaSlashSolid />
            </Breadcrumb.Separator>

            <Breadcrumb.Item>
              <BusinessSelectorMenu data={stores.data}>
                <Breadcrumb.Link as={"button"}>
                  <LiaStoreAltSolid />
                  {activeStore.name}
                  <LuChevronDown />
                </Breadcrumb.Link>
              </BusinessSelectorMenu>
            </Breadcrumb.Item>
          </>
        )}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};
