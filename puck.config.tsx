import { Box, Heading, Text } from "@chakra-ui/react";
import { Config, DropZone } from "@puckeditor/core";

interface Props {
  HeadingBlock: { title: string; body: string };
  GridBlock: {};
}

export const puckConfig: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
        body: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
        body: "Description",
      },
      render: ({ title, body }) => {
        return (
          <Box>
            <Heading>{title}</Heading>
            <Text>{body}</Text>
          </Box>
        );
      },
    },
    GridBlock: {
      render: () => {
        return (
          <DropZone
            zone="products"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
          />
        );
      },
    },
  },
};
