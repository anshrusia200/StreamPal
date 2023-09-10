import {
  Flex,
  Box,
  Text,
  Image,
  Heading,
  Spinner,
  Stack,
  Button,
  Tooltip,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addMetadata } from "../api/user";
import { separateCamelCase } from "../utils/separateCamelCase";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { VideoPlayer } from "../components/VideoPlayer";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export const FileView = () => {
  const { fileId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const metadataArray = useSelector((state) => state.user.metadataList);
  const [posterUrl, setPosterUrl] = useState(
    "https://res.cloudinary.com/appcloudansh/image/upload/v1689765821/Group_10_ycuou4.png"
  );
  const [localMetadata, setLocalMetadata] = useState(null);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [filename, setFilename] = useState("");
  const [visibility, setVisibility] = useState(false);
  const settings = {
    slidesToShow: 6,
    slidesToScroll: 2,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 476,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const sliderRef = React.useRef(null);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };
  useEffect(() => {
    if (metadataArray) {
      const existingMetadata = metadataArray.find(
        (metadata) => metadata._id === fileId
      );
      const requiredFileObject = user.files.filter(
        (object) => object._id === fileId
      );

      const fileData = {
        name: requiredFileObject[0].name,
        id: fileId,
      };
      if (existingMetadata) {
        setLocalMetadata(existingMetadata);
      } else {
        dispatch(addMetadata(fileData));
      }
      setFilename(requiredFileObject[0].name);
      setPosterUrl(requiredFileObject[0].posterUrl);
    }
  }, [fileId, metadataArray]);

  useEffect(() => {
    if (!isLoading) {
      const updatedMetadata = metadataArray.find(
        (metadata) => metadata._id === fileId
      );
      setLocalMetadata(updatedMetadata);
    }
  }, [isLoading, fileId, metadataArray]);

  /****
   ****/
  return (
    <Flex w="100%" m={0} flexDirection={"column"}>
      <Flex
        flexDirection={["column", "column", "row"]}
        w={"100%"}
        m={0}
        alignItems={["center", "center", "flex-start"]}
      >
        <Box
          mr={[0, 0, 10]}
          minW={"80px"}
          mb={[0, 0, 5]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            align={"center"}
            src={posterUrl}
            alt={`Picture of ${filename.split("-")[0]}`}
            rounded="lg"
            w={"300px"}
          />
        </Box>
        <Flex
          direction={"column"}
          justify={"left"}
          maxW={["100%", "100%", "60%"]}
        >
          <Heading
            textTransform={"capitalize"}
            textAlign={["center", "center", "left"]}
          >
            {filename ? separateCamelCase(filename.split("-")[0]) : "Loading"}
          </Heading>

          {isLoading || localMetadata == null || localMetadata == undefined ? (
            <Flex p={2} w={"full"} justifyContent="center" my={3}>
              <Spinner />
            </Flex>
          ) : (
            <Stack
              alignItems={["center", "center", "flex-start"]}
              fontSize="17px"
            >
              <Text
                fontSize="1.8rem"
                textTransform={"capitalize"}
                textAlign={["center", "center", "left"]}
              >
                {localMetadata.metadata.name} | {filename.split("-")[1]}
              </Text>
              <Text
                align={"`left"}
                my={2}
                textAlign={["center", "center", "left"]}
              >
                AIR Date : {localMetadata.metadata.air_date}
              </Text>
              <Flex width={"70px"} justifyContent={"space-between"}>
                <Text>{localMetadata.metadata.original_country}</Text>|
                <Text>
                  {localMetadata.metadata.original_language.toUpperCase()}
                </Text>
              </Flex>
            </Stack>
          )}
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Button
          colorScheme="blue"
          w={["full", "full", "300px"]}
          mx={0}
          my={2}
          mb={4}
          onClick={() => setVisibility(true)}
        >
          <BsFillPlayFill style={{ marginRight: "8px" }} /> Play
        </Button>

        {isLoading || localMetadata == null || localMetadata == undefined ? (
          <Flex p={2} w={"full"} justifyContent="center" my={3}>
            <Spinner />
          </Flex>
        ) : (
          <Text
            width="100%"
            maxWidth="850px"
            textAlign={["center", "left", "left"]}
          >
            <b fontSize={"20px"}>
              In this episode of {localMetadata.metadata.original_name}{" "}
            </b>
            &nbsp;
            {localMetadata.metadata.overview}
          </Text>
        )}
      </Flex>
      <Heading fontSize={"2rem"} mt={5}>
        Cast{" "}
      </Heading>
      {isLoading || localMetadata == null || localMetadata == undefined ? (
        <Flex p={2} w={"full"} justifyContent="center" my={3}>
          <Spinner />
        </Flex>
      ) : (
        <Box>
          {/* {console.log(localMetadata.metadata)} */}
          <VideoPlayer
            visibility={visibility}
            setVisibility={setVisibility}
            videoId={fileId}
          />
          <Flex
            width={"100%"}
            justifyContent={"flex-end"}
            mb={3}
            alignItems={"center"}
          >
            <Box textAlign="center">
              <Button
                onClick={prevSlide}
                background={"none"}
                _hover={{
                  "& .scroll-icon": {
                    color: "blue.400", // Change the color to your desired color
                  },
                }}
              >
                <ChevronLeftIcon fontSize={"1.6rem"} className="scroll-icon" />
              </Button>
              <Button
                onClick={nextSlide}
                background={"none"}
                _hover={{
                  "& .scroll-icon": {
                    color: "blue.400", // Change the color to your desired color
                  },
                }}
              >
                <ChevronRightIcon fontSize={"1.6rem"} className="scroll-icon" />
              </Button>
            </Box>
          </Flex>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <Slider {...settings} ref={sliderRef}>
            {localMetadata.metadata.cast.map((person, index) => (
              <Box key={index}>
                <Tooltip
                  label={
                    <>
                      <b>{person.name} </b> as <b>{person.character}</b>
                    </>
                  }
                >
                  <Image
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                        : "https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                    }
                    alt={`Picture of ${person.character}`}
                    w={"140px"}
                    h={"140px"}
                    rounded="full"
                    objectFit={"cover"}
                    objectPosition={person.profile_path ? "0 -20px" : ""}
                    m={"0 auto"}
                  />
                </Tooltip>
              </Box>
            ))}
          </Slider>
        </Box>
      )}
    </Flex>
  );
};

// https://chakra-templates.dev/page-sections/carousels

// {/* <Box position={"relative"} height={"600px"} width={"full"} overflow={"hidden"}>
//   {/* CSS files for react-slick */}
//   <link
//     rel="stylesheet"
//     type="text/css"
//     href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
//   />
//   <link
//     rel="stylesheet"
//     type="text/css"
//     href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
//   />
//   {/* Left Icon */}
//   <IconButton
//     aria-label="left-arrow"
//     colorScheme="messenger"
//     borderRadius="full"
//     position="absolute"
//     left={side}
//     top={top}
//     transform={"translate(0%, -50%)"}
//     zIndex={2}
//     onClick={() => slider?.slickPrev()}
//   >
//     <BiLeftArrowAlt />
//   </IconButton>
//   {/* Right Icon */}
//   <IconButton
//     aria-label="right-arrow"
//     colorScheme="messenger"
//     borderRadius="full"
//     position="absolute"
//     right={side}
//     top={top}
//     transform={"translate(0%, -50%)"}
//     zIndex={2}
//     onClick={() => slider?.slickNext()}
//   >
//     <BiRightArrowAlt />
//   </IconButton>
//   {/* Slider */}
//   {isLoading || localMetadata == null || localMetadata == undefined ? (
//     <Flex p={2} w={"full"} justifyContent="center" my={3}>
//       <Spinner />
//     </Flex>
//   ) : (
//     <Slider {...settings} ref={(slider) => setSlider(slider)}>
//       {localMetadata.metadata.cast.map((person, index) => (
//         <Box key={index} position="relative">
//           <Image
//             align={"center"}
//             src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
//             alt={`Picture of ${filename.split("-")[0]}`}
//             w={"100px"}
//             h={"100px"}
//             rounded="full"
//           />
//         </Box>
//       ))}
//     </Slider>
//   )}
// </Box>; */}
