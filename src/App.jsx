import React, { useState } from 'react';
import {
  Box, Button, Image, Text, VStack, Heading, Center, List, ListItem, Badge, Flex
} from '@chakra-ui/react';
import axios from 'axios';

const MainCocktailPage = () => {

  const [cocktailData, setCocktailData] = useState([]);

  const handleGenerateCocktail = async () => {

    try {

      const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      const response = await axios.get(apiUrl)

      if (!response.data) {
        throw new Error("Couldn't get API response from " + apiUrl)
      }

      setCocktailData(response.data);


    } catch (error) {
      <p>
        {error.message}
      </p>
    }

  }


  console.log(cocktailData);

  const renderIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktailData?.drinks[0][`strIngredient${i}`];
      const measure = cocktailData?.drinks[0][`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure || ''} ${ingredient}`);
      }
    }
    return ingredients.map((ing, index) => (
      <ListItem key={index}>
        {ing}
      </ListItem>
    ));
  };

  return (
    <Center h="100vh" bgGradient="linear(to-tr, yellow.400, purple.500)">
      {!cocktailData || !cocktailData.drinks || cocktailData.drinks.length === 0 ? (
        <VStack spacing={8} p={5} borderRadius="xl" bg="rgba(255, 255, 255, 0.1)" boxShadow="2xl">
          <Text fontSize="4xl" fontWeight="bold" color="white">Cocktail Generator</Text>
          <Text fontSize="xl" color="gray.200">
            Ever had one of those evenings where tales of misadventures pour
            out smoother than the drink in your hand? Let's shake things up!
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="white">Ready for a Cocktail?</Text>
          <Button colorScheme="pink" size="lg" onClick={handleGenerateCocktail}>
            Generate New Cocktail
          </Button>
        </VStack>

      ) : (
        <Box
          w={["90%", "70%", "60%", "50%"]}  // Responsive design
          h="95vh"
          borderRadius="xl"
          bg="rgba(255, 255, 255, 0.1)"
          p={6}
          boxShadow="dark-lg"
          overflowY="auto"
          display="flex"  // Set to flex
          flexDirection="column"  // Column direction

        >
          <VStack spacing={6} align="center" flex="1" overflowY="auto"
            sx={{
              // For Webkit browsers
              '&::-webkit-scrollbar': {
                width: '3px',
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'gray.300',
                borderRadius: '5px',
                transition: 'background-color 0.3s'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555'
              },
              // For Firefox
              scrollbarColor: '#000 #F5F5F5',
              scrollbarWidth: '1px',
            }}>
            <Heading color="white" size="xl">{cocktailData.drinks[0].strDrink}</Heading>
            <Image
              boxSize="240px"
              objectFit="cover"
              src={cocktailData?.drinks[0].strDrinkThumb}
              alt={cocktailData?.drinks[0].strDrink}
              borderRadius="md"
              boxShadow="lg"
              transition="transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              _hover={{
                transform: "scale(1.1)",
              }}
            />
            <Badge colorScheme="pink" p={2}>{cocktailData?.drinks[0].strAlcoholic}</Badge>

            <Text fontSize="lg" fontWeight="bold" color="white">Instructions:</Text>
            <Text color="gray.200">{cocktailData?.drinks[0].strInstructions}</Text>
            <Box w="100%">
              <Text fontSize="lg" fontWeight="bold" color="white">Ingredients:</Text>
              <List spacing={2} color="gray.200">
                {renderIngredients()}
              </List>
            </Box>
          </VStack>
          <Button mt={4} colorScheme="pink" onClick={handleGenerateCocktail}>
            Another One!
          </Button>
        </Box>
      )}
    </Center>
  );
}


export default MainCocktailPage;
