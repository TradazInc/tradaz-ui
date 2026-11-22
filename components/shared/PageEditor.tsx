"use client";

import { useAddUIConfig } from "@/hooks/uiConfig";
import { puckConfig } from "@/puck.config";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Data, Puck, UiState } from "@puckeditor/core";
import { ReactNode, useMemo } from "react";

interface EmotionIframeProps {
  children: ReactNode;
  document?: Document;
}

function EmotionIframe({ children, document }: EmotionIframeProps) {
  const cache = useMemo(
    () =>
      document && createCache({ key: "puck-frame", container: document.head }),
    [document],
  );

  if (!cache) return <>{children}</>;
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

const initialUi = {
  viewports: {
    current: { width: "100%", height: "auto" },
    options: [],
    controlsVisible: true,
  },
} satisfies Partial<UiState>;

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
      ui={initialUi}
      onPublish={(page) => trigger({ page })}
      overrides={{ iframe: EmotionIframe }}
    />
  );
}
