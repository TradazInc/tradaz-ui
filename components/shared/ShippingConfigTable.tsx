"use client";

import EmptyPage from "@/components/shared/EmptyPage";
import { toaster } from "@/components/ui/toaster";
import {
  useRemoveShippingConfig,
  useShippingConfigs,
} from "@/hooks/shippingConfig";
import { GetAllShippingConfigOutputData } from "@/schema/shippingConfig";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { formatDays } from "@/utilities/formatDays";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
  Button,
  ButtonGroup,
  For,
  FormatNumber,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  initialShippingConfigs: Promise<GetAllShippingConfigOutputData[]>;
  businessId: string | undefined;
}

const ShippingConfigTable = ({ initialShippingConfigs, businessId }: Props) => {
  const { data, error, mutate, setSize, size } = useShippingConfigs(
    businessId,
    { fallbackData: initialShippingConfigs },
  );
  const { flatData: shippingConfigs, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useRemoveShippingConfig(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: {
        title: "Deleting shipping config...",
        description: "Please wait",
      },
      success: {
        title: "Deletion successful",
        description: "Shipping config has been deleted",
      },
      error: errorToastOptions,
    });
  };

  if (data && shippingConfigs.length === 0) {
    return (
      <EmptyPage
        title="No shipping configs found"
        description="Create a shipping config"
      />
    );
  }

  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={shippingConfigs.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Carrier</Table.ColumnHeader>
              <Table.ColumnHeader>Methods</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={shippingConfigs}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={3}>
                    No shipping configs available
                  </Table.Cell>
                </Table.Row>
              }
            >
              {(shippingConfig) => (
                <Table.Row key={shippingConfig.id} w={"full"}>
                  <Table.Cell>{shippingConfig.carrier}</Table.Cell>
                  <Table.Cell>
                    <Stack gap={1}>
                      {shippingConfig.shippingMethods?.map((method) => (
                        <HStack key={method.id} gap={2} textStyle={"sm"}>
                          <Text fontWeight={"medium"}>{method.name}</Text>
                          <Text color={"fg.muted"}>·</Text>
                          <FormatNumber
                            value={method.price}
                            style={"currency"}
                            currency={"NGN"}
                          />
                          <Text color={"fg.muted"}>·</Text>
                          <Text color={"fg.muted"}>
                            {formatDays(
                              method.deliveryDaysMin,
                              method.deliveryDaysMax,
                            )}
                          </Text>
                        </HStack>
                      ))}
                    </Stack>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <IconButton aria-label="Edit shipping config">
                        <AiOutlineEdit />
                      </IconButton>
                      <IconButton
                        aria-label="Delete shipping config"
                        color={"fg.error"}
                        _hover={{ bg: "bg.error", color: "fg.error" }}
                        onClick={() => handleDelete(shippingConfig.id)}
                        disabled={isMutating}
                      >
                        <MdDeleteOutline />
                      </IconButton>
                    </ButtonGroup>
                  </Table.Cell>
                </Table.Row>
              )}
            </For>
          </Table.Body>
        </Table.Root>
      </InfiniteScroll>
      {error && (
        <>
          <Button
            w={"full"}
            size={"md"}
            variant={"subtle"}
            onClick={() => mutate()}
          >
            Click to retry
          </Button>
          <Text>Shipping configs unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default ShippingConfigTable;
