import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Box, FlatList, HStack, Input, ScrollView, VStack } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { get_Project_service } from '../services/Project_servise';
import { apiHandle } from '../config/ApiHandle';
import debounce from 'lodash.debounce';

const Project = () => {
    const [allProject, setAllProject] = useState([]);
    const [profileImages, setProfileImages] = useState({});
    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await get_Project_service();
                if (res) {
                    console.log("res data", res.data);
                    setAllProject(res.data.data);
                setLoading(false);

                }
            } catch (error) {
                console.log({ error });
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handle_id = async (id, user_id) => {
        if (profileImages[user_id]) return; // If image is already fetched, skip
        try {
            const res = await apiHandle.get(`/users/${user_id}`);
            if (res) {
                console.log("user", res.data.data.profileImage);
                setProfileImages(prev => ({ ...prev, [user_id]: res.data.data.profileImage }));
            }
        } catch (error) {
            console.log({ error });
        }
    };

    const list = [
        "Favourite",
        "Recents",
        "All"
    ];

    const handlePress = (index) => {
        setSelectedItem(index);
        setFilter(list[index]);
    };

    const handleSearch = debounce((query) => {
        setSearchQuery(query);
    }, 300);

    const filteredTasks = allProject.filter(task => {
        const matchesFilter = filter === "All" ||
            (filter === "Favourite" && task.isFavourite) ||
            (filter === "Recents" && task.isRecent);
        const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error loading projects</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Projects</Text>
                <TouchableOpacity onPress={() => navigation.navigate("AddProject")}>
                    <AntDesign name="pluscircleo" size={24} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 40 }}>
                <Input
                    style={{ borderRadius: 2000 }}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={handleSearch}
                    InputLeftElement={
                        <Feather name="search" size={30} color="gray" style={{ backgroundColor: "#F5F7F8", marginLeft: 10 }} />
                    }
                />
            </View>
            <ScrollView
                horizontal
                style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 15 }}
            >
                {list.map((name, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(index)}
                        style={{
                            marginRight: 20,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            borderWidth: selectedItem === index ? 1 : 0,
                            borderColor: selectedItem === index ? '#B1AFFF' : 'transparent',
                        }}
                    >
                        <Text>{name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredTasks}
                keyExtractor={(item) => item._id}
                initialNumToRender={5}
                windowSize={10}
                renderItem={({ item }) => {
                    handle_id(item._id, item.user);
                    return (
                        <Box borderWidth={1} borderColor="coolGray.300" borderRadius="lg" p={3} my={2} mt={3}>
                            <HStack justifyContent={"space-between"}>
                                <HStack display={"flex"} alignItems="center">
                                    <HStack display={"flex"}>
                                        <VStack space={1}>
                                            <Avatar
                                                bg="amber.500"
                                                source={{
                                                    uri: profileImages[item.user]
                                                }}
                                            />
                                        </VStack>
                                        <VStack space={1}>
                                            <Text bold fontSize="md" style={{ marginLeft: 10 }}>
                                                {item.name}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </HStack>
                                <VStack alignItems="flex-end">
                                    <Entypo name="dots-three-horizontal" color="black" size={20} />
                                </VStack>
                            </HStack>
                        </Box>
                    );
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#102C57",
    },
});

export default Project;
