import {
  Flex,
  Box,
  Heading,
  Spacer,
  Wrap,
  WrapItem,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import React from "react";

const NavBar = () => {
  return (
    <>
      <Flex
        borderBottom="1px"
        borderColor="gray.500"
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p={4}
        bg="transparent"
        backdropFilter="blur(10px)"
        position="sticky"
        top="0"
        zIndex="500"
      >
        <Box p="2">
          <Heading size="md">News App</Heading>
        </Box>
        <Spacer />
        <Wrap>
          <WrapItem>
            <Avatar>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </WrapItem>
        </Wrap>
      </Flex>
    </>
  );
};

export default NavBar;
