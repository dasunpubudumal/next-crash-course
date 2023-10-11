"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import NewsListComponent from "./_components/newsList";
import { API_GET_TOP_NEWS } from "./_util/constants";
import { TopNews } from "./_util/model/dataModels";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  BoxProps,
  Button,
  ChakraComponent,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { COUNTRY_CODES } from "./_util/model/data-helper";
import { filterCountry } from "./_util/filterFunctions";

const HomePage = () => {
  const [topNews, setTopNews] = useState<TopNews | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [nextEnabled, setIsNextEnabled] = useState<boolean>(true);
  const [prevEnabled, setIsPrevEnabled] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const ref = useRef();

  const loadTopNews = async (page: number, countryCode: string) => {
    setLoading(true);
    const topNewsResponse = await fetch(
      `${API_GET_TOP_NEWS}/${countryCode}/${page}`
    );
    const topNews = (await topNewsResponse.json()).body;
    setTopNews(topNews);
    setMaxPages(Math.ceil(topNews.totalResults / 10));
    setIsNextEnabled(page < maxPages);
    setLoading(false);
  };

  const onNext = async () => {
    if (page >= maxPages) {
      setIsNextEnabled(false);
      alert("No more news to show!");
    } else {
      setPage(page + 1);
      setIsNextEnabled(page < maxPages);
      if (page > 1) setIsPrevEnabled(true);
      await loadTopNews(page + 1, selectedCountry);
    }
  };

  const onLastPage = async () => {
    setPage(maxPages);
    await loadTopNews(maxPages, selectedCountry);
  };

  const onFirstPage = async () => {
    setPage(1);
    await loadTopNews(1, selectedCountry);
  };

  const onBack = async () => {
    if (page <= 1) {
      setIsPrevEnabled(false);
      alert("You are on the first page!");
    } else {
      setPage(page - 1);
      setIsNextEnabled(page < maxPages);
      await loadTopNews(page - 1, selectedCountry);
    }
  };

  const onCountryChange = async (event: any) => {
    setSelectedCountry(event.target.value);
    await loadTopNews(page, event.target.value);
  };

  const onCountryNameType = (event: any) => {
    // console.log(event);
    // if (event.target.value && event.key === 'Enter') {
    //   const countryCode = filterCountry(event.target.value);
    //   if (countryCode) {
    //     setSelectedCountry(countryCode);
    //     loadTopNews(page, countryCode);
    //   }
    // }
  };

  useEffect(() => {
    (async () => {
      try {
        await loadTopNews(page, selectedCountry);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <Flex alignContent="center" justifyContent="center">
        <Box w="70%" mt={10} mb={5}>
          {/* <Input
            placeholder="Enter Country Name"
            onChange={onCountryNameType}
          /> */}
          <Select
            placeholder="Select Country"
            value={selectedCountry}
            onChange={onCountryChange}
            mt={5}
          >
            {Object.keys(COUNTRY_CODES).map((country: string) => (
              <option key={country} value={country}>
                {COUNTRY_CODES[country as keyof typeof COUNTRY_CODES]}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
      {!selectedCountry && (
        <Flex p={10}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Invalid Country!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Please select a country from the drop down.
            </AlertDescription>
          </Alert>
        </Flex>
      )}
      {selectedCountry && topNews && (
        <NewsListComponent
          newsList={topNews}
          page={page}
          onNext={() => onNext()}
          onBack={() => onBack()}
          isLoading={loading}
          nextEnabled={nextEnabled}
          prevEnabled={prevEnabled}
          onLastPage={() => onLastPage()}
          onFirstPage={() => onFirstPage()}
        />
      )}
    </>
  );
};

export default HomePage;
