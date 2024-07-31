import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Input, useNativeBase } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import TaskCard from '../Components/Task_card';
import { apiHandle } from '../config/ApiHandle';
import Navigation from '../config/Naviagtion';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const Navigation = useNavigation()

  useEffect(() => {
    (async () => {
      try {
        const res = await apiHandle.get('gettask');
        if (res) {
          console.log("res", res.data);
          setTasks(res.data);
          setFilteredTasks(res.data); // Initialize filtered tasks with all tasks
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const results = tasks.filter(task =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchQuery, tasks]);

  const list = ["tasks", "file"];

  const handlePress = (index) => {
    setSelectedItem(index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>Navigation.navigate("Home")}><MaterialIcons name="keyboard-arrow-left" size={24} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Tasks</Text>
      </View>
      
      <View style={{ marginTop: 40 }}>
        <Input
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          InputLeftElement={<Feather name="search" size={30} color="gray" style={styles.searchIcon} />}
        />
      </View>

      <ScrollView 
        horizontal 
        style={styles.categoryScroll}
      >
        {list.map((name, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={[
              styles.categoryButton,
              {
                borderWidth: selectedItem === index ? 1 : 0,
                borderColor: selectedItem === index ? '#B1AFFF' : 'transparent',
              }
            ]}
          >
            <Text>{name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View>
        {filteredTasks.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#102C57",
    marginLeft: 110,
  },
  searchInput: {
    borderRadius: 2000,
  },
  searchIcon: {
    backgroundColor: "#F5F7F8",
    marginLeft: 10,
  },
  categoryScroll: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  categoryButton: {
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default Search;
