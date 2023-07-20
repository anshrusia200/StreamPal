import { useState } from "react";
import { Box, Button, IconButton, Flex, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Logout } from "../components/Logout";

export const Sidebar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex>
      {/* Hamburger Button */}
      <IconButton
        aria-label="Toggle Sidebar"
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        onClick={isOpen ? onClose : onOpen}
        position="fixed"
        right={3}
        top={3}
        display={{ base: "inherit", md: "none" }} // Show only on smaller screen sizes
      />

      {/* Sidebar */}
      <Box
        position="fixed"
        left={isSidebarOpen ? "0" : "-100%"} // Show/hide based on isSidebarOpen state
        top="0"
        height="100vh"
        width="200px"
        bg="gray.200"
        transition="left 0.3s linear"
        overflowX="hidden"
        padding="4"
        zIndex={"2"}
        display={{ base: isOpen ? "block" : "none", md: "inherit" }} // Show only on larger screen sizes when sidebar is open
      >
        {/* Sidebar Content */}
        <Box>
          {/* Add your sidebar content here */}
          <Button mb="2">Sidebar Item 1</Button>
          <Button mb="2">Sidebar Item 2</Button>
          <Logout />
        </Box>
      </Box>

      {/* Main Content */}
      <Box ml={{ base: "0", md: "200px" }} p="4" width="100%">
        {/* Render child components */}
        {children}
      </Box>
    </Flex>
  );
};
