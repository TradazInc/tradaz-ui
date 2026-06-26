"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  Box,
  Button,
  Flex,
  Icon,
  ScrollArea,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuChevronDown } from "react-icons/lu";
import { LogoutButton } from "@/app/components/LogoutButton";

export type SidebarItem = {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: SidebarItem[];
};

export interface ReusableSidebarProps {
  items: SidebarItem[];
  basePath?: string;
  onClose?: () => void;
  showSubscription?: boolean;
}

export const Sidebar = ({
  items,
  basePath = "",
  onClose,
  showSubscription = false,
}: ReusableSidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const resolvePath = (item: SidebarItem) => {
    if (item.path) return item.path;
    return `${basePath}/${item.label.toLowerCase().replace(/\s+/g, "-")}`;
  };

  useEffect(() => {
    const activeParent = items.find((item) =>
      item.children?.some((child) => resolvePath(child) === pathname),
    );

    if (activeParent && !openMenus.includes(activeParent.label)) {
      setOpenMenus((prev) => [...prev, activeParent.label]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, items]);

  const triggerHoverStyle = { bg: "#111111", color: "white" };
  const subItemHoverStyle = { bg: "#111111", color: "white" };
  const iconStyle = { strokeWidth: "2.5", boxSize: "18px", flexShrink: 0 };
  const subIconStyle = { strokeWidth: "2.5", boxSize: "14px", flexShrink: 0 };

  return (
    <Box
      w={{ base: "100%", md: isCollapsed ? "80px" : "280px" }}
      h="100%"
      bg="#000000"
      borderRight={{ base: "none", md: "1px solid #1A1A1A" }}
      display="flex"
      flexDirection="column"
      transition="width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      color="white"
      flexShrink={0}
    >
      <ScrollArea.Root
        flex={1}
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <ScrollArea.Viewport flex={1}>
          <Box
            pt={4}
            pb={2}
            css={{
              '& [data-part="indicator"]': {
                display: isCollapsed ? "none" : "block",
              },
            }}
          >
            <Accordion.Root
              collapsible
              multiple
              variant="plain"
              value={openMenus}
              onValueChange={(e) => setOpenMenus(e.value)}
            >
              {items.map((item, idx) => {
                const hasChildren = item.children && item.children.length > 0;
                const resolvedItemPath = resolvePath(item);
                const isItemActive = pathname === resolvedItemPath;
                const isAccordionOpen = openMenus.includes(item.label);

                if (!hasChildren) {
                  return (
                    <Box key={idx} borderBottom="1px solid #1A1A1A" mb={0}>
                      <Link
                        href={resolvedItemPath}
                        onClick={onClose}
                        style={{ display: "block", textDecoration: "none" }}
                      >
                        <Flex
                          align="center"
                          justify={isCollapsed ? "center" : "flex-start"}
                          gap={3}
                          py={3}
                          px={isCollapsed ? 0 : 6}
                          bg={isItemActive ? "#111111" : "transparent"}
                          color={isItemActive ? "white" : "#A1A1AA"}
                          borderRight={
                            isItemActive ? "2px solid white" : "none"
                          }
                          _hover={triggerHoverStyle}
                          transition="all 0.2s"
                          w="full"
                        >
                          <Icon as={item.icon} css={iconStyle} />
                          {!isCollapsed && (
                            <Text
                              fontSize="14px"
                              fontWeight={isItemActive ? "bold" : "500"}
                              whiteSpace="nowrap"
                            >
                              {item.label}
                            </Text>
                          )}
                        </Flex>
                      </Link>
                    </Box>
                  );
                }

                return (
                  <Accordion.Item
                    key={idx}
                    value={item.label}
                    border="none"
                    borderBottom="1px solid #1A1A1A"
                    mb={0}
                  >
                    <Accordion.ItemTrigger
                      _hover={triggerHoverStyle}
                      py={3}
                      px={isCollapsed ? 0 : 6}
                      rounded="none"
                      cursor="pointer"
                      w="full"
                      display="flex"
                      justifyContent={isCollapsed ? "center" : "space-between"}
                      onClick={() => {
                        if (isCollapsed) setIsCollapsed(false);
                      }}
                      color={isAccordionOpen ? "white" : "#A1A1AA"}
                      transition="all 0.2s"
                    >
                      <Flex
                        align="center"
                        justify={isCollapsed ? "center" : "flex-start"}
                        gap={3}
                      >
                        <Icon as={item.icon} css={iconStyle} />
                        {!isCollapsed && (
                          <Text
                            fontSize="14px"
                            fontWeight="500"
                            whiteSpace="nowrap"
                          >
                            {item.label}
                          </Text>
                        )}
                      </Flex>
                      {!isCollapsed && (
                        <Accordion.ItemIndicator>
                          <Icon
                            as={LuChevronDown}
                            color="#666666"
                            css={{ strokeWidth: 2 }}
                          />
                        </Accordion.ItemIndicator>
                      )}
                    </Accordion.ItemTrigger>

                    <Accordion.ItemContent
                      p={0}
                      pb={1}
                      display={isCollapsed ? "none" : "block"}
                    >
                      <VStack align="start" gap={0}>
                        {item.children?.map((child, cIdx) => {
                          const resolvedChildPath = resolvePath(child);
                          const isChildActive = pathname === resolvedChildPath;

                          return (
                            <Link
                              key={cIdx}
                              href={resolvedChildPath}
                              style={{ width: "100%", textDecoration: "none" }}
                              onClick={onClose}
                            >
                              <Flex
                                align="center"
                                gap={3}
                                bg={isChildActive ? "#111111" : "transparent"}
                                color={isChildActive ? "white" : "#888888"}
                                borderRight={
                                  isChildActive ? "2px solid white" : "none"
                                }
                                cursor="pointer"
                                _hover={subItemHoverStyle}
                                py={2.5}
                                pl={isCollapsed ? 0 : 12}
                                pr={4}
                                rounded="none"
                                w="full"
                                transition="all 0.2s"
                              >
                                <Icon as={child.icon} css={subIconStyle} />
                                <Text
                                  fontSize="13px"
                                  fontWeight={isChildActive ? "bold" : "normal"}
                                  whiteSpace="nowrap"
                                >
                                  {child.label}
                                </Text>
                              </Flex>
                            </Link>
                          );
                        })}
                      </VStack>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>
          </Box>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar bg="#000000" w="6px" p={0}>
          <ScrollArea.Thumb
            bg="#1A1A1A"
            rounded="none"
            _hover={{ bg: "#333333" }}
          />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      {/* --- BOTTOM SECTION --- */}
      <Box
        px={isCollapsed ? 2 : 6}
        pt={!isCollapsed && showSubscription ? 4 : 2}
        pb={4}
        mt="auto"
        flexShrink={0}
        borderTop={
          !isCollapsed && showSubscription ? "1px solid #1A1A1A" : "none"
        }
        bg="#000000"
      >
        {!isCollapsed && showSubscription && (
          <Box
            p={3}
            bg="#0A0A0A"
            border="1px solid #1A1A1A"
            rounded="none"
            mb={3}
          >
            <Flex align="center" justify="space-between" mb={3}>
              <Text
                fontSize="13px"
                fontWeight="500"
                color="#A1A1AA"
                whiteSpace="nowrap"
              >
                Storage: 45%
              </Text>
            </Flex>
            <Button
              h="32px"
              fontSize="13px"
              fontWeight="bold"
              w="full"
              bg="white"
              color="black"
              _hover={{ bg: "#E5E5E5" }}
              transition="all 0.2s"
              border="none"
              rounded="none"
            >
              Upgrade Plan
            </Button>
          </Box>
        )}

        <Box py={isCollapsed ? 2 : 0}>
          <LogoutButton
            isCollapsed={isCollapsed}
            onClick={() => console.log("Logout triggered")}
          />
        </Box>
      </Box>
    </Box>
  );
};
