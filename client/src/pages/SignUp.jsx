import React, { useState } from "react";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { register } from "../api/user";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import app from "../firebase";

export const SignUp = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;
  const isError = email === "";
  if (user.email) {
    return <Navigate to="/setFolder" replace={true} />;
  }

  const signUp = async () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return toast.error("Please enter a valid email");
    }
    dispatch(register(email));
  };
  const handleKeyPress = (e) => {
    console.log("Enter");
    if (e.key === "Enter") {
      signUp();
    }
  };
  return (
    <Flex
      align={"center"}
      justify={"center"}
      w={"100%"}
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create a New User</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onKeyDown={handleKeyPress}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the email you want to create an account with.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"center"}
              >
                <Link as={ReactRouterLink} color={"blue.400"} to="/signin">
                  Already a user ?
                </Link>
              </Stack>
              <Button
                isLoading={user.isLoading}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => signUp()}
              >
                Create user
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
