import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  List,
  ListItem,
  Spinner,
  GridItem,
  Grid,
  Text,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../api/user";
import { FileCard } from "../components/FileCard";
export const Files = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.files.length == 0) {
      dispatch(getMovies(user.folder));
    }
  }, []);
  const handleSync = () => {
    dispatch(getMovies(user.folder));
  };
  // const handleClick = (folder, file) => {};
  console.log(user.files);
  return (
    <Flex flexDirection={"column"} w={"100%"}>
      <Flex w={"100%"} justify={"center"}>
        <Button
          isLoading={user.isLoading}
          onClick={handleSync}
          py={2}
          px={10}
          m={2}
        >
          Sync with storage
        </Button>
      </Flex>

      <Heading mb={5}>Movies</Heading>
      {user.isLoading ? (
        ""
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={20}>
          {user.files.map((file) => {
            return (
              <Link key={file._id} to={`/file/${file._id}`}>
                <FileCard
                  // onClick={() => handleClick(user.folder, file.name)}
                  posterUrl={file.posterUrl}
                  name={file.name.split(".")[0]}
                />
              </Link>
            );
          })}
        </Grid>
      )}
    </Flex>
  );
};
