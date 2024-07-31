import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const dates = [
    { date: 19, day: 'Sat' },
    { date: 20, day: 'Sun' },
    { date: 21, day: 'Mon' },
    { date: 22, day: 'Tue' },
    { date: 23, day: 'Wed' }
  ];
  const navigation = useNavigation();


  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate)
  };

  return (
    <>
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("TodayTask_Screen")}>
            <MaterialIcons name="keyboard-arrow-left" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Monthly Task</Text>
          <FontAwesome name="pencil-square-o" size={24} />
        </View>
        <Text style={styles.date}>{selectedDate ? selectedDate : "8-July-2024"}✍️</Text>
        <Text style={styles.subtitle}>15 tasks today</Text>
      </View>
      
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.dateContainer}>
        {dates.map(({ date, day }) => (
          <TouchableOpacity key={date} onPress={() => setSelectedDate(date)}>
            <View style={[styles.dateBox, selectedDate === date && styles.selectedDateBox]}>
              <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>{date}</Text>
              <Text style={[styles.dayText, selectedDate === date && styles.selectedDayText]}>{day}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.calendarContainer}>
            <DatePicker
              mode="calendar"
              // onDateChange={(date) => setSelectedDate(date)}
              onDateChange={handleDateChange}
              selected={selectedDate}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  subtitle: {
    fontSize: 16,
    marginHorizontal: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    gap: 100,
    height:1,
    backgroundColor: 'white',
  },
  dateBox: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
    width: 80,
    height: 130,
  },
  selectedDateBox: {
    backgroundColor: '#3B82F6',
  },
  dateText: {
    fontSize: 24,
    paddingTop: 10,
  },
  selectedDateText: {
    color: '#FFF',
  },
  dayText: {
    fontSize: 12,
    color: '#6B7280',
  },
  selectedDayText: {
    color: '#FFF',
  },
  calendarContainer: {
    width: 370,
    height: 800,
    backgroundColor: 'white',
  },
});

export default CalendarScreen;