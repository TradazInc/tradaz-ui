"use client";

import { toaster } from "@/components/ui/toaster";
import { useAddUIConfig } from "@/hooks/uiConfig";
import { puckConfig, PuckProps, PuckRootProps } from "@/puck.config";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { Data, Puck, WithDefaultRootFieldProps } from "@puckeditor/core";
import { EmotionIframe } from "./EmotionIframe";

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
