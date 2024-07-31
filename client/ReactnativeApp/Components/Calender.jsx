import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-modern-datepicker';
const Calender = () => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <DatePicker
      mode="calendar"
      onDateChange={handleDateChange}
      selected={selectedDate}
    />
  </View>
  )
}

export default Calender