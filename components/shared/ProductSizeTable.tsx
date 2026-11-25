"use client";

import EmptyPage from "@/components/shared/EmptyPage";
import { toaster } from "@/components/ui/toaster";
import { useRemoveSizeType, useSizeTypes } from "@/hooks/sizeType";
import { GetAllSizeTypeOutputData } from "@/schema/sizeType";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
  Button,
  ButtonGroup,
  For,
  Spinner,
  Table,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductSizeSquare from "./ProductSizeSquare";
import DeleteIconButton from "./DeleteIconButton";
import EditIconButton from "./EditIconButton";

interface Props {
  initialSizeTypes: Promise<GetAllSizeTypeOutputData[]>;
  businessId: string | undefined;
}

const ProductSizeTable = ({ initialSizeTypes, businessId }: Props) => {
  const { data, error, mutate, setSize, size } = useSizeTypes(businessId, {
    fallbackData: initialSizeTypes,
  });
  const { flatData: sizeTypes, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useRemoveSizeType(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: { title: "Deleting size type...", description: "Please wait" },
      success: {
        title: "Deletion successful",
        description: "Size type has been deleted",
      },
      error: errorToastOptions,
    });
  };

  if (data && sizeTypes.length === 0) {
    return (
      <EmptyPage title="No sizes found" description="Create a product size" />
    );
  }

  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={sizeTypes.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Sizes</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={sizeTypes}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={3}>No size types available</Table.Cell>
                </Table.Row>
              }
            >
              {(sizeType) => (
                <Table.Row key={sizeType.id} w={"full"}>
                  <Table.Cell>{sizeType.name}</Table.Cell>
                  <Table.Cell>
                    <Wrap>
                      {sizeType.sizes?.map((size) => (
                        <ProductSizeSquare key={size.id} value={size.value} />
                      ))}
                    </Wrap>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <EditIconButton />
                      <DeleteIconButton
                        onClick={() => handleDelete(sizeType.id)}
                        disabled={isMutating}
                      />
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
          <Text>Size types unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default ProductSizeTable;
