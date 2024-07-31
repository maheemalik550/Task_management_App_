import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, Flex, Heading, HStack, Switch } from 'native-base';
import { useNavigation } from '@react-navigation/native';



const Setting = () => {
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={{ flex: 1, margin: 20 }}>
            <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.navigate("Home")}><MaterialIcons name="keyboard-arrow-left" size={24} /></TouchableOpacity>
                <Text style={styles.headerTitle}>Search</Text>
            </View>
            <View>
                <Button
                    style={styles.menuButton}
                    mt={4}
                    onPress={() => alert(`Navigate to ${item.name}`)}
                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                            Permission
                        </Heading>
                        <HStack alignItems="center" space={4}>
                          <Switch
                            size="md"
                            isChecked={isEnabled}
                            onToggle={toggleSwitch}
                            trackColor={{ false: "#767577", true: "#B1AFFF" }}
                          />
                        </HStack>
                    </Flex>
                </Button>
            </View>
            <View>
                <Button
                    style={styles.menuButton}
                    mt={4}
                    onPress={() => alert(`Navigate to ${item.name}`)}
                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                           Push Notificataion
                        </Heading>
                        <HStack alignItems="center" space={4}>
                          <Switch
                            size="md"
                            isChecked={isEnabled}
                            onToggle={toggleSwitch}
                            trackColor={{ false: "#767577", true: "#B1AFFF" }}
                          />
                        </HStack>
                    </Flex>
                </Button>
            </View>
            <View>
                <Button
                    style={styles.menuButton}
                    mt={4}
                    onPress={() => alert(`Navigate to ${item.name}`)}
                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                           Dark Mode
                        </Heading>
                        <HStack alignItems="center" space={4}>
                          <Switch
                            size="md"
                            isChecked={isEnabled}
                            onToggle={toggleSwitch}
                            trackColor={{ false: "#767577", true: "#B1AFFF" }}
                          />
                        </HStack>
                    </Flex>
                </Button>
            </View>
            <View>
                <Button
                    style={styles.menuButton}
                    mt={4}
                    onPress={() => alert(`Navigate to ${item.name}`)}
                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                            Security
                        </Heading>
                        <MaterialIcons name="keyboard-arrow-right" type="feather" size={24} />
                    </Flex>
                </Button>
            </View>
            <View>
                <Button
                    style={styles.menuButton}
                    mt={4}
                    onPress={() => alert(`Navigate to ${item.name}`)}
                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                           Help
                        </Heading>
                        <MaterialIcons name="keyboard-arrow-right" type="feather" size={24} />
                       
                    </Flex>
                </Button>
            </View>
            <View>
                <Button
                    style={styles.menuButton}
                    mt={4}
                    onPress={() =>navigation.navigate("Language")}
                    colorScheme="indigo"
                >
                    <Flex direction="row" justifyContent="space-between" width="100%">
                        <Heading size="md" fontWeight="600" color="#102C57">
                            language
                        </Heading>
                        <MaterialIcons name="keyboard-arrow-right" type="feather" size={24} />
                        
                    </Flex>
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        gap: 100,
        // justifyContent: 'space-between',
        alignItems: 'center',
    }, headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#102C57",
    },
    menuButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#EEEDEB",
        borderRadius: 20,
        width: "100%",
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default Setting