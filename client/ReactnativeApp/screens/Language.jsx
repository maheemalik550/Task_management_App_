import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, Flex, Heading, Radio } from 'native-base';
import Naviagtion from '../config/Naviagtion';
import { useNavigation } from '@react-navigation/native';

const Language = () => {
  const navigation = useNavigation()
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <View style={styles.header}>
       <TouchableOpacity onPress={()=>navigation.navigate("Setting")}><MaterialIcons name="keyboard-arrow-left" size={24} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Radio.Group 
          name="languageOptions" 
          value={selectedOption} 
          onChange={handleSelect}
        >
          {["English", "Bangla", "Spanish","France"].map((item, index) => (
            <Button
              key={index}
              style={styles.menuButton}
              mt={4}
              onPress={() => handleSelect(item)}
              colorScheme="indigo"
            >
              <Flex direction="row" justifyContent="space-between" width="100%" alignItems="center">
                <Heading size="md" fontWeight="600" color="#102C57">
                  {item}
                </Heading>
                <Radio
                  value={item}
                  colorScheme="indigo"
                  accessibilityLabel={`Select ${item}`}
                />
              </Flex>
            </Button>
          ))}
        </Radio.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 100,
    alignItems: 'center',
  },
  headerTitle: {
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
});

export default Language;
