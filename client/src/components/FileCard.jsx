import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Button,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { BsFillPlayFill } from "react-icons/bs";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";
export const FileCard = ({ name, posterUrl, fileId }) => {
  const navigateTo = useNavigate();
  const buttonRef = useRef(null);
  const [visibility, setVisibility] = useState(false);

  const handleClick = () => {
    navigateTo(`/file/${fileId}`);
  };
  const handleButtonClick = (e) => {
    e.stopPropagation();

    setVisibility(true);
  };
  return (
    <>
      <VideoPlayer
        visibility={visibility}
        setVisibility={setVisibility}
        videoId={fileId}
      />
      <Flex
        dir="column"
        justify={"space-between"}
        align={"flex-end"}
        bg={useColorModeValue("white", "gray.800")}
        h={[200]}
        borderWidth="1px"
        cursor={"pointer"}
        rounded="lg"
        shadow="lg"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          background: `url(${posterUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          zIndex: 0,
        }}
        sx={{
          ".movie-details": {
            transition: "transform 150ms linear",
            transform: "translateY(100%)",
          },
        }}
        _hover={[
          {},
          {
            ".movie-details": {
              transform: "translateY(0)",
              transition: "transform 150ms linear",
            },
          },
        ]}
        onClick={() => handleClick()}
      >
        <Box
          p={3}
          color={"white"}
          w={"full"}
          bg={"gray.600"}
          className="movie-details"
          position={"absolute"}
          bottom={["63px", "0"]}
        >
          <HStack display="flex" justifyContent={"space-between"}>
            <Tooltip label={name}>
              <Text
                isTruncated
                textTransform={"capitalize"}
                fontSize={"lg"}
                fontWeight={"semibold"}
              >
                {truncate(name, 25)}
              </Text>
            </Tooltip>
            <IconButton
              colorScheme="blue"
              size="md"
              icon={<BsFillPlayFill />}
              rounded={"full"}
              ref={buttonRef}
              onClick={(e) => handleButtonClick(e)}
            />
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

function truncate(text, num) {
  return text.length > num ? text.slice(0, num - 1) + "..." : text;
}
