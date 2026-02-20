"use client";

import NextError from "next/error";
import { Alert } from "@chakra-ui/react";

import { Provider } from "../components/ui/provider"; 

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
    
        <Provider>
   
          <NextError statusCode={0} />
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{error.name}</Alert.Title>
              <Alert.Description>{error.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </Provider>
      </body>
    </html>
  );
}