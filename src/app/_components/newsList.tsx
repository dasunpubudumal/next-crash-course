import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  Center,
  IconButton,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import React from "react";
import { TopNews } from "../_util/model/dataModels";
import Link from "next/link";

interface NewsListProps {
  newsList: TopNews;
  page: number;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  nextEnabled: boolean;
  prevEnabled: boolean;
  onLastPage: () => void;
  onFirstPage: () => void;
}

const NewsListComponent: React.FC<NewsListProps> = ({
  newsList,
  page,
  onNext,
  onBack,
  isLoading,
  nextEnabled,
  prevEnabled,
  onLastPage,
  onFirstPage,
}) => {
  return (
    <>
      <Flex w="100%" p={5} alignItems="center" justifyContent="center">
        <Stack color="white" w="80%" spacing="4">
          {newsList.articles.map((news, index) => (
            <Skeleton isLoaded={!isLoading} key={index}>
              <Card key={index}>
                <CardHeader bg="gray.200">
                  <Center>
                    <Heading size="md">{news?.title}</Heading>
                  </Center>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Author(s)
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {news?.author}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        URL
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        <Link href={news?.url} target="_blank" color="teal.500">
                          {news?.url} <ExternalLinkIcon mx="2px" />
                        </Link>
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Source
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {news?.source.name}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Skeleton>
          ))}
          <Stack
            direction="row"
            alignItems="right"
            justifyContent="right"
            spacing={1}
          >
            <IconButton
              aria-label="Next"
              size="md"
              onClick={onFirstPage}
              icon={<ArrowLeftIcon />}
            />
            <IconButton
              aria-label="Back"
              size="md"
              icon={<ArrowBackIcon />}
              disabled={page === 1}
              onClick={onBack}
            />
            <Button disabled={true}>{page}</Button>
            <IconButton
              aria-label="Next"
              size="md"
              onClick={onNext}
              icon={<ArrowForwardIcon />}
              disabled={!nextEnabled}
            />
            <IconButton
              aria-label="Next"
              size="md"
              onClick={onLastPage}
              icon={<ArrowRightIcon />}
            />
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default NewsListComponent;
