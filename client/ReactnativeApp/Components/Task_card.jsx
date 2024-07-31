import React from 'react';
import { Box, Text, HStack, VStack, Progress, Avatar, Center } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskCard = ({ name, dueDate, progress, icons, iconName }) => {
  return (
    <Box borderWidth={1} borderColor="coolGray.300" borderRadius="lg" p={3} my={2} mt={3}>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack space={1}>
          <Text bold fontSize="md">
            {name} 
          </Text>
          <Text color="coolGray.600">{dueDate.slice(0,10)}</Text>
          <Center>
      <Avatar.Group _avatar={{
      size: "sm"
    }} max={3}>
        <Avatar bg="green.500" source={{
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }}>
          AJ
        </Avatar>
        <Avatar bg="cyan.500" source={{
        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      }}>
          TE
        </Avatar>
        <Avatar bg="indigo.500" source={{
        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }}>
          JB
        </Avatar>
        <Avatar bg="amber.500" source={{
        uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      }}>
          TS
        </Avatar>
        <Avatar bg="green.500" source={{
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }}>
          AJ
        </Avatar>
        <Avatar bg="cyan.500" source={{
        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      }}>
          TE
        </Avatar>
        <Avatar bg="indigo.500" source={{
        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }}>
          JB
        </Avatar>
        <Avatar bg="amber.500" source={{
        uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      }}>
          TS
        </Avatar>
      </Avatar.Group>
    </Center>
        </VStack>
        <VStack alignItems="flex-end">
          <Text bold>{`${progress.slice(0,2)}/20`}</Text>
          <Progress value={((progress.slice(0,1)) /20) * 100} colorScheme="blue" width="150" />
        </VStack>
      </HStack>
    </Box>
  );
};

export default TaskCard;