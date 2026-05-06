import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import axios from 'axios';

export default function ListScreen({ navigation }) {

  const [data, setData] = useState([]);

  const API_URL = 'http://localhost:8080/phonebooks';

  const getData = async () => {
    try {

      const response = await axios.get(API_URL);

      setData(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;

  }, [navigation]);

  return (

    <View style={styles.container}>

      <View style={styles.phoneContainer}>

        <View style={styles.headerContainer}>

          <Text style={styles.headerTitle}>
            Phonebooks Apps
          </Text>

          <TouchableOpacity
            style={styles.newButton}
            onPress={() => navigation.navigate('Detail')}
          >
            <Text style={styles.newButtonText}>
              + New
            </Text>
          </TouchableOpacity>

        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.idContact.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (

            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('Detail', { data: item })
              }
            >

              <Text style={styles.number}>
                {index + 1}
              </Text>

              <View style={styles.contentContainer}>

                <View>

                  <Text style={styles.name}>
                    {item.firstName}
                  </Text>

                  <Text style={styles.phone}>
                    {item.phoneNumber}
                  </Text>

                </View>

                <View
                  style={[
                    styles.statusBox,
                    {
                      backgroundColor:
                        item.status.toLowerCase() === 'single'
                          ? '#00C853'
                          : '#FFC107'
                    }
                  ]}
                >

                  <Text style={styles.statusText}>
                    {item.status.toLowerCase() === 'single'
                      ? 'S'
                      : 'M'}
                  </Text>

                </View>

              </View>

            </TouchableOpacity>

          )}
        />

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center'
  },

  phoneContainer: {
    width: 280,
    height: 600,
    backgroundColor: 'white',
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'black',
    padding: 20
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    paddingBottom: 10
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold'
  },

  newButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 15,
    paddingVertical: 6
  },

  newButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },

  number: {
    fontSize: 40,
    fontWeight: 'bold',
    width: 40
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  phone: {
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic'
  },

  statusBox: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444'
  },

  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  }

});