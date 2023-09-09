import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  SimpleGrid,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../api/user";
import { FileCard } from "../components/FileCard";
import { separateCamelCase } from "../utils/separateCamelCase";
export const Files = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.files.length == 0) {
      dispatch(getMovies(user.folder));
    }
  }, []);

  console.log(user.files);
  return (
    <Flex flexDirection={"column"}>
      {user.isLoading ? (
        ""
      ) : (
        <SimpleGrid columns={[2, 2, 3, 3, 4]} gap={4}>
          {user && !user.isLoading && user.files ? (
            user.files.map((file) => {
              console.log(file._id);
              return (
                <>
                  {/* <Link key={file._id} to={`/file/${file._id}`}> */}
                  <FileCard
                    fileId={file._id}
                    posterUrl={file.posterUrl}
                    name={
                      separateCamelCase(file.name.split("-")[0]) +
                      " " +
                      file.name.split("-")[1]
                    }
                  />
                  {/* </Link> */}
                </>
              );
            })
          ) : (
            <Flex p={2} w={"full"} justifyContent="center" my={3}>
              <Spinner />
            </Flex>
          )}
        </SimpleGrid>
      )}
    </Flex>
  );
};
