import React, { useState } from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

import axios from 'axios';

export default function DetailScreen({ route, navigation }) {

  const selectedData = route.params?.data;

  const [firstName, setFirstName] =
    useState(selectedData?.firstName || '');

  const [lastName, setLastName] =
    useState(selectedData?.lastName || '');

  const [birthDate, setBirthDate] =
    useState(selectedData?.birthDate || '');

  const [phoneNumber, setPhoneNumber] =
    useState(selectedData?.phoneNumber || '');

  const [status, setStatus] =
    useState(selectedData?.status || '');

  const [address, setAddress] =
    useState(selectedData?.address || '');

  const API_URL = 'http://localhost:8080/phonebooks';

  const saveData = async () => {

    const data = {
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      status,
      address
    };

    try {

      if (selectedData) {

        await axios.put(
          `${API_URL}/${selectedData.idContact}`,
          data
        );

        Alert.alert('Success', 'Data Updated');

      } else {

        await axios.post(API_URL, data);

        Alert.alert('Success', 'Data Added');
      }

      navigation.goBack();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async () => {

    try {

      await axios.delete(
        `${API_URL}/${selectedData.idContact}`
      );

      Alert.alert('Success', 'Data Deleted');

      navigation.goBack();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <View style={styles.container}>

      <View style={styles.phoneContainer}>

        <Text style={styles.label}>
          First Name
        </Text>

        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>
          Last Name
        </Text>

        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>
          Birth Date
        </Text>

        <TextInput
          style={styles.input}
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <Text style={styles.label}>
          Phone Number
        </Text>

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.label}>
          Status
        </Text>

        <TextInput
          style={styles.input}
          value={status}
          onChangeText={setStatus}
        />

        <Text style={styles.label}>
          Address
        </Text>

        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        {!selectedData ? (

          <TouchableOpacity
            style={styles.addButton}
            onPress={saveData}
          >

            <Text style={styles.buttonText}>
              + Add Data
            </Text>

          </TouchableOpacity>

        ) : (

          <View style={styles.buttonContainer}>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={saveData}
            >

              <Text style={styles.buttonText}>
                Update
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteData}
            >

              <Text style={styles.buttonText}>
                Delete
              </Text>

            </TouchableOpacity>

          </View>

        )}

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center'
  },

  phoneContainer: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'black',
    padding: 20
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10
  },

  input: {
    borderWidth: 2,
    borderColor: '#2C4A5E',
    borderRadius: 6,
    height: 45,
    paddingHorizontal: 10
  },

  addButton: {
    backgroundColor: '#BFEFFF',
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#2C4A5E'
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  updateButton: {
    backgroundColor: '#FFC107',
    width: 90,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 2
  },

  deleteButton: {
    backgroundColor: 'red',
    width: 90,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 2
  },

  buttonText: {
    fontWeight: 'bold',
    color: 'black'
  }

});