import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

interface PageWrapperProps {
    children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({children}) => {
  return (
    <Flex alignItems="center" justifyContent="center">
        <Box p={5}>
            {children}
        </Box>
    </Flex>
  )
}

export default PageWrapper