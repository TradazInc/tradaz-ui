"use client";

import { useAddUIConfig } from "@/hooks/uiConfig";
import { puckConfig } from "@/puck.config";
import { Data, Puck } from "@puckeditor/core";

interface Props {
  initialData: Partial<Data>;
  businessId: string | undefined;
}

export function PageEditor({ businessId, initialData }: Props) {
  const { trigger } = useAddUIConfig(businessId);

  return (
    <Puck
      config={puckConfig}
      data={initialData}
      onPublish={(data: any) => trigger(data)}
    />
  );
}
