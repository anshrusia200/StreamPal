import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../components/Logout";
import {
  Box,
  Button,
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Link,
  useColorModeValue,
  Text,
  ListItem,
  Spacer,
  List,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  loadDrives,
  fetchSubdirectories,
  fetchBackSubdirectories,
  setPath,
} from "../api/user";
import { toast } from "react-toastify";

export const FolderSubmit = () => {
  const [drives, setDrives] = useState([]);
  const [subDirs, setSubDirs] = useState([]);
  const [subFiles, setFiles] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  /*******************************
   * * GET DRIVES  OF THE SYSTEM *
   *******************************/
  const handleDrives = async () => {
    const fetchedDrives = await loadDrives();
    setDrives(fetchedDrives);
    console.log(drives);
  };
  useEffect(() => {
    handleDrives();
  }, []);

  /*********************************
   * ON DRIVE CLICK GET SUBFOLDERS *
   *********************************/

  const handleDriveSelect = async (drive) => {
    // generatePath(currentPath, drive);
    setSelectedDrive(drive);
    const data = await fetchSubdirectories("", drive);
    console.log(data);
    // check here ... I was trying to return path from the api along with the directories ....clicking a drive is not giving results on a single click. requires 2 clicks
    setCurrentPath(data.path);
    setSubDirs(data.directories);
    setFiles(data.files);
    console.log(currentPath);
    scrollToTop();
  };
  /******************
   * GET SUBFOLDERS *
   ******************/
  const handleSubDirClick = async (dir) => {
    const data = await fetchSubdirectories(currentPath, dir);
    setSubDirs(data.directories);
    setFiles(data.files);
    setCurrentPath(data.path);
    scrollToTop();
  };
  /****************************
   * HANDLE FOLDER BACK CLICK *
   ****************************/
  const handleBack = async () => {
    const data = await fetchBackSubdirectories(currentPath);
    setSubDirs(data.directories);
    setFiles(data.files);
    setCurrentPath(data.path);
    scrollToTop();
  };

  /*******************************************
   * SCROLL CONTAINER TO TOP ON DRIVE CHANGE *
   *******************************************/

  const containerRef = useRef(null);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  /****************************
   * SET PATH IN STATE AND DB *
   ****************************/
  const handleSetPath = async () => {
    if (currentPath != "") dispatch(setPath(currentPath));
    else toast.error("Please select a folder ");
  };

  /**************
   * CHECK AUTH *
   **************/
  const userEmail = useSelector((state) => state.user.email);
  console.log(userEmail);
  if (!userEmail) {
    return <Navigate to="/signin" replace={true} />;
  }
  if (user.folder != "") {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <Box width={"100%"}>
      <Flex
        align={"start"}
        justify={"center"}
        mx={0}
        margin={"0 auto"}
        // maxH={"80vh"}
        flexDirection={"column"}
        // overflow={"auto"}
        w={"700px"}
        // bg={useColorModeValue("gray.100", "gray.800")}
        p={"2rem"}
        // overflow={"auto"}
      >
        <Stack w={"100%"}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} p={"px"}>
              Select Movie folder path
            </Heading>
          </Stack>
          <Flex
            display={"flex"}
            flexDirection={"column"}
            align={"center"}
            padding={0}
            marginTop={5}
          >
            <Box
              width={"100%"}
              border={1}
              borderColor={"gray.300"}
              borderStyle={"solid"}
              padding={2}
              align={"left"}
              borderBottom={"none"}
            >
              <Text fontSize={20} marginLeft={2}>
                <b> Current Path - &nbsp; &nbsp; </b>{" "}
                <span style={{ color: "#ECC94B" }}> {currentPath}</span>
              </Text>
            </Box>
            <Flex
              // mt={2}
              bg={useColorModeValue("white", "gray.700")}
              // boxShadow={"lg"}
              w={"100%"}
              p={0}
              minH={"200px"}
              gap={0}
              justifyContent={"space-between"}
              border={1}
              borderColor={"gray.300"}
              borderStyle={"solid"}
            >
              <Box w={"50%"}>
                <Flex flexDirection="column" height="">
                  {drives.map((drive, index) => (
                    <Box
                      // boxShadow="md"
                      rounded="lg"
                      py={2}
                      borderRadius={0}
                      justifyContent={"flex-start"}
                      fontSize={"20px"}
                      _hover={{
                        bg: selectedDrive === drive ? "yellow.400" : "gray.600",
                      }}
                      bg={
                        selectedDrive === drive ? "yellow.400" : "transparent"
                      }
                      onClick={() => handleDriveSelect(drive)}
                      key={index}
                      borderBottom={
                        index === drives.length - 1 && subDirs.length === 0
                          ? 0
                          : 1
                      }
                      transition={"all 100ms linear"}
                      borderColor={"gray.300"}
                      borderStyle={"solid"}
                    >
                      &nbsp;&nbsp;{drive}
                    </Box>
                  ))}
                </Flex>
              </Box>
              <Box
                className="scrollbar-none"
                w={"100%"}
                m={0}
                p={0}
                maxH={"400px"}
                minH={"200px"}
                ref={containerRef}
                overflowY="auto"
                borderLeft={1}
                borderColor={"gray.300"}
                borderStyle={"solid"}
                position="relative"
                display={"flex"}
                flexDirection={"column"}
                align={"space-between"}
                scrollBehavior={"smooth"}
              >
                <Box display={"flex"} flexDirection={"column"}>
                  <List p={0}>
                    {subDirs.length || currentPath != "" ? (
                      subDirs.map((dir, index) => {
                        return (
                          <ListItem
                            textAlign="start"
                            w="full"
                            px={4}
                            py={2}
                            _hover={{
                              bg: "gray.600",
                            }}
                            role={"group"}
                            borderBottom={1}
                            borderStyle="solid"
                            borderColor="gray.200"
                            cursor={"pointer"}
                            onClick={() => handleSubDirClick(dir)}
                          >
                            <HStack justify="space-between">
                              <Text
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                              >
                                {dir}
                              </Text>
                              <Text
                                opacity={0}
                                transform={"translateX(-4px)"}
                                transition="all 100ms linear"
                                _groupHover={{
                                  opacity: 1,
                                  transform: "translateX(0)",
                                }}
                              >
                                <ChevronRightIcon boxSize={5} />
                              </Text>
                            </HStack>
                          </ListItem>
                        );
                      })
                    ) : (
                      <Box>Select a Drive to get sub-folders</Box>
                    )}
                  </List>

                  <List p={0}>
                    {subFiles.length ? (
                      subFiles.map((file, index) => (
                        <Tooltip label="">
                          <ListItem
                            textAlign="start"
                            w="full"
                            px={4}
                            py={2}
                            bg={"gray.500"}
                            color={"gray.400"}
                            role={"group"}
                            borderBottom={1}
                            borderStyle="solid"
                            borderColor="gray.200"
                            key={index}
                          >
                            <HStack justify="space-between">
                              <Text
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                              >
                                {file}
                              </Text>
                            </HStack>
                          </ListItem>
                        </Tooltip>
                      ))
                    ) : (
                      <></>
                    )}
                  </List>
                </Box>
                <Spacer />
                {subDirs.length || currentPath != "" ? (
                  <Box
                    py={2}
                    zIndex={1}
                    bg={"gray.800"}
                    position="sticky"
                    bottom="0"
                    right="0"
                    left={0}
                    w={"full"}
                    rounded={0}
                    cursor={"pointer"}
                    display={"flex"}
                    // justifyContent={"space-evenly"}
                  >
                    <Box onClick={scrollToTop} w={"50%"} textAlign={"center"}>
                      Scroll to top
                    </Box>
                    <Box
                      onClick={handleBack}
                      borderLeft={2}
                      borderStyle={"solid"}
                      borderColor={"gray.400"}
                      w={"50%"}
                      textAlign={"center"}
                    >
                      Back
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </Flex>
          </Flex>
        </Stack>
        <Box width="100%" display="flex" align="center" my={3}>
          <Logout />
          <Spacer />
          <Button isLoading={user.isLoading} my={2} onClick={handleSetPath}>
            Set Path
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
