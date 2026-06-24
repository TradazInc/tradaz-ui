"use client";

import { useState } from "react";
import {
  IconButton,
  Icon,
  Drawer,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";

// Import your shared Sidebar component and types
import { Sidebar, SidebarItem } from "@/app/components/Sidebar";

export interface MobileSidebarProps {
  items: SidebarItem[];
  basePath?: string;
}

export const MobileSidebar = ({ items, basePath = "" }: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Trigger */}
      <IconButton
        aria-label="Open Menu"
        variant="ghost"
        display={{ base: "flex", md: "none" }}
        onClick={() => setIsOpen(true)}
        color="#888888"
        _hover={{ color: "white", bg: "#111111" }}
        size="sm"
        rounded="none"
      >
        <Icon as={LuMenu} boxSize="22px" strokeWidth="2.5" />
      </IconButton>

      {/* Chakra Drawer for Mobile Sidebar */}
      <Drawer.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="start" // "start" slides in from the left
      >
        <Portal>
          <Drawer.Backdrop bg="rgba(0,0,0,0.85)" backdropFilter="blur(4px)" />
          <Drawer.Positioner zIndex={10001}>
            <Drawer.Content
              bg="#000000"
              w="280px"
              maxW="80vw"
              rounded="none"
              borderRight="1px solid #1A1A1A"
            >
              <Drawer.CloseTrigger asChild>
                <CloseButton
                  position="absolute"
                  top={4}
                  right={4}
                  size="sm"
                  color="#888888"
                  rounded="none"
                  _hover={{ bg: "#1A1A1A", color: "white" }}
                  zIndex={10}
                />
              </Drawer.CloseTrigger>

              <Drawer.Body
                p={0}
                css={{ "&::-webkit-scrollbar": { display: "none" } }}
              >
                {/* 
                  We pass down the dynamic data, and MOST IMPORTANTLY, 
                  we tell it to close the drawer when a link is clicked. 
                */}
                <Sidebar
                  items={items}
                  basePath={basePath}
                  onClose={() => setIsOpen(false)}
                />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};
