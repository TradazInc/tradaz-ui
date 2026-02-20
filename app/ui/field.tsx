import { Field as ChakraField } from "@chakra-ui/react";
import * as React from "react";

export const Field = React.forwardRef(function Field(props, ref) {
  const { label, children, helperText, errorText, ...rest } = props;
  return (
    <ChakraField.Root ref={ref} {...rest}>
      {label && <ChakraField.Label>{label}</ChakraField.Label>}
      {children}
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && (
        <ChakraField.ErrorMessage>{errorText}</ChakraField.ErrorMessage>
      )}
    </ChakraField.Root>
  );
});
