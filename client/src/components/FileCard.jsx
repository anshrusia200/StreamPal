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
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

export const FileCard = ({ name, posterUrl }) => {
  return (
    <Tooltip label={name}>
      <Flex px={0} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue("white", "gray.800")}
          w={"200px"}
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
          p={2}
        >
          <Image
            src={posterUrl}
            alt={`Picture of ${name}`}
            rounded="lg"
            w={"200px"}
          />

          <Box
            fontSize="xl"
            fontWeight="semibold"
            lineHeight="tight"
            isTruncated
          >
            {name}
          </Box>
        </Box>
      </Flex>
    </Tooltip>
  );
};
