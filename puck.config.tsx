import { Box, Button, Card, Grid, Heading } from "@chakra-ui/react";
import { Config, Slot } from "@puckeditor/core";

interface Props {
  HeadingBlock: { title: string };
  GridBlock: { children: Slot };
  CardBlock: { title: string; description: string; padding: number };
}

export const puckConfig: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: { title: { type: "text" } },
      defaultProps: { title: "Heading" },
      render: ({ title }) => {
        return (
          <Box>
            <Heading>{title}</Heading>
          </Box>
        );
      },
    },
    GridBlock: {
      fields: { children: { type: "slot" } },
      render: ({ children }) => {
        return <Grid>{children()}</Grid>;
      },
    },
    CardBlock: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        padding: { type: "number" },
      },
      defaultProps: {
        title: "Title",
        description: "This is a description...",
        padding: 16,
      },
      render: ({ description, padding, title }) => {
        return (
          <Card.Root width="320px" p={padding}>
            <Card.Body gap="2">
              <Card.Title mt="2">{title}</Card.Title>
              <Card.Description>{description}</Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline">View</Button>
              <Button>Join</Button>
            </Card.Footer>
          </Card.Root>
        );
      },
    },
  },
};
