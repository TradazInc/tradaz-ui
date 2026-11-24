"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { system } from "@/theme";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { generateElementId } from "@/utilities/generateElementId";
import {
  Box,
  Button,
  Carousel,
  Center,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { HiUpload } from "react-icons/hi";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Props {
  value: string[];
  // Called with each uploaded URL, the form adds it to its own state
  onUpload: (url: string) => void;
  disabled?: boolean;
  maxFiles: number;
  maxFileSize: number;
  showCarousel?: boolean;
}

export const UploadDialog = ({
  disabled,
  maxFiles,
  maxFileSize,
  onUpload,
  value,
  showCarousel = true,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const items = Array.from({ length: maxFiles });
  const remainingFiles = maxFiles - value.length;

  return (
    <VStack gapY={5} w={"full"}>
      {showCarousel && (
        <Carousel.Root
          gap={"4"}
          w={"full"}
          mx={"auto"}
          spacing={"8px"}
          maxW={maxFiles <= 3 ? "xs" : undefined}
          slideCount={value.length || items.length}
          slidesPerPage={maxFiles > 3 ? 3.5 : maxFiles}
        >
          <Carousel.ItemGroup w="full">
            {value.length > 0
              ? value.map((url, index) => (
                  <Carousel.Item key={url} index={index}>
                    <Box rounded="md" asChild>
                      <CldImage
                        src={url}
                        aspectRatio={4 / 3}
                        crop={"fill"}
                        alt={`File ${index + 1}`}
                      />
                    </Box>
                  </Carousel.Item>
                ))
              : items.map((_, index) => (
                  <Carousel.Item key={index} index={index}>
                    <Center
                      w="full"
                      aspectRatio="4/3"
                      rounded="md"
                      fontSize="2.5rem"
                      bg="bg.emphasized"
                    >
                      {index + 1}
                    </Center>
                  </Carousel.Item>
                ))}
          </Carousel.ItemGroup>

          <Carousel.Control justifyContent="center" gap="4">
            <Carousel.PrevTrigger asChild>
              <IconButton size="xs" variant="ghost">
                <LuChevronLeft />
              </IconButton>
            </Carousel.PrevTrigger>

            <Carousel.Indicators />

            <Carousel.NextTrigger asChild>
              <IconButton size="xs" variant="ghost">
                <LuChevronRight />
              </IconButton>
            </Carousel.NextTrigger>
          </Carousel.Control>
        </Carousel.Root>
      )}

      <Button
        w={"full"}
        variant={"outline"}
        disabled={disabled || remainingFiles <= 0}
        onClick={() => setOpen(true)}
      >
        <HiUpload /> {`Select ${maxFiles > 1 ? "files" : "file"}`}
      </Button>

      <Dialog.Root
        open={open}
        // Block closing mid-upload: unmounting destroys the widget and aborts it
        onOpenChange={(e) => !uploading && setOpen(e.open)}
        closeOnEscape={!uploading}
        closeOnInteractOutside={!uploading}
        size={"lg"}
        lazyMount
        unmountOnExit
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner scrollbar={"hidden"}>
            <Dialog.Content scrollbar={"hidden"}>
              <Dialog.Header>
                <Dialog.Title>Upload files</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <InlineUploadWidget
                  maxFiles={remainingFiles}
                  maxFileSize={maxFileSize}
                  onUpload={onUpload}
                  setUploading={setUploading}
                  onClose={() => setOpen(false)}
                />
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" disabled={uploading} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  );
};

interface InlineUploadWidgetProps {
  maxFiles: number;
  maxFileSize: number;
  onUpload: (url: string) => void;
  setUploading: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const InlineUploadWidget = ({
  maxFiles,
  maxFileSize,
  onUpload,
  setUploading,
  onClose,
}: InlineUploadWidgetProps) => {
  const palette = useColorModeValue(lightModePalette, darkModePalette);
  const toastId = useId();
  const containerId = generateElementId();

  return (
    <CldUploadWidget
      options={{
        cropping: true,
        maxFileSize,
        maxFiles,
        inlineContainer: `#${containerId}`,
        styles: { palette },
        uploadSignature: (
          callback: (signature: string | null, error?: unknown) => void,
          paramsToSign: Record<string, unknown>,
        ) => {
          apiClient("@post/api/media/upload-signature", {
            body: { paramsToSign },
            ...apiConfig,
          })
            .then(({ signature }) => callback(signature))
            .catch((error) => callback(null, error));
        },
      }}
      onSuccess={(result) => {
        const info = result.info;
        if (!info || typeof info === "string") return;
        onUpload(info.secure_url);
      }}
      onClose={() => onClose()}
      onQueuesStart={() => {
        setUploading(true);
        toaster.loading({
          id: toastId,
          title: "Uploading files...",
          description: "This may take a moment",
        });
      }}
      onQueuesEnd={() => {
        setUploading(false);
        onClose();
        toaster.success({
          id: toastId,
          title: "Upload successful",
          description: "Files have been uploaded",
        });
      }}
      onRetry={() =>
        toaster.loading({
          id: toastId,
          title: "Retrying upload...",
          description: "Please wait",
        })
      }
      onBatchCancelled={(result) => {
        setUploading(false);
        const info = result.info;
        if (typeof info === "string") return;
        toaster.error({
          id: toastId,
          title: "Upload cancelled",
          description: info?.reason ?? "File upload was cancelled",
        });
      }}
      onError={(error) => {
        setUploading(false);
        toaster.create({ id: toastId, ...errorToastOptions(error) });
      }}
      onAbort={() => {
        setUploading(false);
        toaster.warning({
          id: toastId,
          title: "Upload aborted",
          description: "File upload was aborted",
        });
      }}
    >
      {({ open, isLoading }) => (
        <InlineContainer id={containerId} isLoading={isLoading} open={open} />
      )}
    </CldUploadWidget>
  );
};

interface InlineContainerProps {
  id: string;
  isLoading?: boolean;
  open: () => void;
}

const InlineContainer = ({ id, isLoading, open }: InlineContainerProps) => {
  const opened = useRef(false);

  // Open widget after it is loaded
  useEffect(() => {
    if (isLoading || opened.current) return;
    opened.current = true;
    open();
  }, [isLoading, open]);

  return (
    <Center
      id={id}
      w={"full"}
      rounded={"md"}
      overflow={"scroll"}
      scrollbar={"hidden"}
      h={{ base: "60vh", md: "500px" }}
    >
      {isLoading && <Spinner size={"xl"} />}
    </Center>
  );
};

const lightModePalette = {
  window: system.token("colors.white"),
  sourceBg: system.token("colors.white"),
  windowBorder: system.token("colors.gray.400"),
  tabIcon: system.token("colors.black"),
  inactiveTabIcon: system.token("colors.gray.400"),
  menuIcons: system.token("colors.black"),
  link: system.token("colors.gray.200"),
  action: system.token("colors.orange.600"),
  inProgress: system.token("colors.blue.600"),
  complete: system.token("colors.green.600"),
  error: system.token("colors.red.500"),
  textDark: system.token("colors.black"),
  textLight: system.token("colors.gray.50"),
};

const darkModePalette = {
  window: system.token("colors.gray.950"),
  sourceBg: system.token("colors.gray.950"),
  windowBorder: system.token("colors.gray.500"),
  tabIcon: system.token("colors.gray.50"),
  inactiveTabIcon: system.token("colors.gray.500"),
  menuIcons: system.token("colors.white"),
  link: system.token("colors.gray.800"),
  action: system.token("colors.blue.600"),
  inProgress: system.token("colors.blue.300"),
  complete: system.token("colors.green.300"),
  error: system.token("colors.red.400"),
  textDark: system.token("colors.black"),
  textLight: system.token("colors.gray.50"),
};
