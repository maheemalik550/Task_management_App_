import React from 'react';
import { Box, Text, HStack, VStack} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

const TaskCard2 = ({ title, category }) => {
  return (
    <Box borderWidth={1} borderColor="coolGray.300" borderRadius="lg" p={3} my={2} mt={3}>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack space={1}>
          <Text bold fontSize="md">
            {title} 
          </Text>
          <Text color="coolGray.600">{category}</Text>
        </VStack>
        <VStack alignItems="flex-end">
         <Entypo name="dots-three-horizontal" color="black" size={20} />
        </VStack>
      </HStack>
    </Box>
  );
};

export default TaskCard2;
