"use client";

import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ReactNode, useMemo } from "react";

interface Props {
  children: ReactNode;
  document?: Document;
}

export function EmotionIframe({ children, document }: Props) {
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
