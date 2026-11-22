"use client";

import { useAddUIConfig } from "@/hooks/uiConfig";
import { puckConfig } from "@/puck.config";
import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Data, Puck } from "@puckeditor/core";
import { ReactNode, useMemo } from "react";

interface EmotionIframeProps {
  children: ReactNode;
  document?: Document;
}

function EmotionIframe({ children, document }: EmotionIframeProps) {
  const cache = useMemo(
    () =>
      document &&
      createCache({
        key: "puck-frame",
        container: document.head,
        prepend: true, // declare Chakra's layer order before any other iframe styles
      }),
    [document],
  );

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

  // Render Emotion styles into the preview iframe; Puck can't mirror them in production.
  return (
    <Puck
      config={puckConfig}
      data={initialData}
      onPublish={(page) => trigger({ page })}
      overrides={{ iframe: EmotionIframe }}
    />
  );
}
