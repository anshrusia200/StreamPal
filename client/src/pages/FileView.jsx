import { Flex, Box, Text, Image, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMetadata } from "../api/user";

export const FileView = () => {
  const { fileId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [posterUrl, setPosterUrl] = useState(
    "https://res.cloudinary.com/appcloudansh/image/upload/v1689765821/Group_10_ycuou4.png"
  );
  const [filename, setFilename] = useState("");
  useEffect(() => {
    const requiredFileObject = user.files.filter(
      (object) => object._id === fileId
    );
    setFilename(requiredFileObject[0].name);
    setPosterUrl(requiredFileObject[0].posterUrl);
    const requiredMetadataObject = user.metadataList.filter((object) => {
      object._id === fileId;
    });
    if (requiredMetadataObject.length == 0) {
      dispatch(addMetadata(filename, fileId));
    }
  }, []);
  return (
    <Flex w="100%" m={0}>
      <Flex flexDirection={["column", "column", "row"]} w={"100%"} m={0}>
        <Box mr={10}>
          <Image
            src={posterUrl}
            alt={`Picture of ${filename.split(".")[0]}`}
            rounded="lg"
            w={"250px"}
            mx={2}
          />
        </Box>
        <Flex>
          <Heading textTransform={"capitalize"}>
            {filename.split(".")[0]}
          </Heading>
          <Text></Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
