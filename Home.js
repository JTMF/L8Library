import React, { useState, useEffect } from 'react';
import { StatusBar, Button, FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    textStyle: {
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
    },
});

const Home = ({ navigation }) => {
    const [mydata, setMydata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const datastr = await AsyncStorage.getItem('alphadata');
                if (datastr) {
                    const jsondata = JSON.parse(datastr);
                    setMydata(jsondata);
                } else {
                    setMydata(datasource);
                }
            } catch (error) {
                console.error('Error fetching data from AsyncStorage:', error);
                setMydata(datasource);
            }
        };

        fetchData();
    }, []);




    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.opacityStyle}
            onPress={() =>
                navigation.navigate('Edit', {
                    index,
                    datastring: JSON.stringify(mydata),
                })
            }
        >
            <Text style={styles.textStyle}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 150, marginBottom: 10 }} />
        </TouchableOpacity>
    );

    return (
        <View>
            <StatusBar />
            <Button
                title="Add Book"
                onPress={() =>
                    navigation.navigate('Add', {
                        datastring: JSON.stringify(mydata),
                    })
                }
            />
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(item.isbn || index)}
            />
        </View>
    );
};

export default Home;
