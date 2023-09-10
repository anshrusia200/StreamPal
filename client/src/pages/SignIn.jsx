import React, { useEffect, useState } from "react";
import { Navigate, Link as ReactRouterLink } from "react-router-dom";

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
import "react-toastify/dist/ReactToastify.css";
import app from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../api/user";
// const signUp = (email, password) => {
//   const auth = getAuth(app);
//   console.log(auth);
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log(user);
//     toast.success("Email registered successfully");
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     toast.error(errorCode + " " + errorMessage);
//     // ..
//   });
// };

export const SignIn = () => {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;
  const isError = email === "";
  const dispatch = useDispatch();
  const signIn = (e) => {
    e.preventDefault();
    dispatch(login(email));
  };
  if (user.email) {
    return <Navigate to="/setFolder" replace={true} />;
  }
  const handleKeyPress = (e) => {
    console.log("Enter");
    if (e.key === "Enter") {
      signIn(e);
    }
  };
  return (
    // <div>
    //   <form action="">
    //     <input type="text" placeholder="email" value={email} />
    //     <input type="password" placeholder="password" value={email} />
    //     <button></button>
    //   </form>
    // </div>

    <Flex
      align={"center"}
      justify={"center"}
      w={"100%"}
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={["3xl", "4xl", "4xl"]} textAlign="center">
            Enter Registered Email
          </Heading>
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
                  Enter the email you have registered earlier.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            {/* <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </FormControl> */}
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"center"}
              >
                <Link
                  as={ReactRouterLink}
                  color={"blue.400"}
                  to="/signup"
                  width={"100%"}
                  textAlign={"center"}
                >
                  Create new user
                </Link>
              </Stack>
              <Button
                isLoading={user.isLoading}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={signIn}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
