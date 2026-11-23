"use client";

import { toaster } from "@/components/ui/toaster";
import { useAddUIConfig } from "@/hooks/uiConfig";
import { puckConfig, PuckProps, PuckRootProps } from "@/puck.config";
import { system } from "@/theme";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { ChakraProvider } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Data, Puck, WithDefaultRootFieldProps } from "@puckeditor/core";
import { ReactNode, useMemo } from "react";

interface EmotionIframeProps {
  children: ReactNode;
  document?: Document;
}

function EmotionIframe({ children, document }: EmotionIframeProps) {
  const cache = useMemo(() => {
    if (!document) return undefined;

    // Chakra's layer order must be the iframe's first style, or the reset outranks recipes
    let layerOrder = document.getElementById("chakra-layer-order");
    if (!layerOrder) {
      layerOrder = document.createElement("style");
      layerOrder.id = "chakra-layer-order";
      layerOrder.textContent = system.layers.atRule;
      document.head.prepend(layerOrder);
    }

    return createCache({
      key: "puck-frame",
      container: document.head,
      insertionPoint: layerOrder, // insert emotion styles after the layer order
    });
  }, [document]);

  if (!cache) return <>{children}</>;

  // Chakra globals in the iframe, so the reset can't override Container's margin and padding
  return (
    <CacheProvider value={cache}>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </CacheProvider>
  );
}

interface Props {
  initialData: Data;
  businessId: string | undefined;
}

export function PageEditor({ businessId, initialData }: Props) {
  const { trigger } = useAddUIConfig(businessId);

  const onPublish = async (
    page: Data<PuckProps, WithDefaultRootFieldProps<PuckRootProps>>,
  ) => {
    const promise = toaster.promise(trigger({ page }), {
      loading: {
        title: "Creating storefront...",
        description: "Please wait",
      },
      success: {
        title: "Creation successful",
        description: "Storefront has been created",
      },
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
    } catch {} // Error displayed by toaster
  };

  // Render Emotion styles into the preview iframe; Puck can't mirror them in production.
  return (
    <Puck
      config={puckConfig}
      data={initialData}
      onPublish={onPublish}
      overrides={{ iframe: EmotionIframe }}
    />
  );
}
