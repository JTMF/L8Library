import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [image, setImage] = useState('');

    const setData = async (newData) => {
        await AsyncStorage.setItem('alphadata', JSON.stringify(newData));
        navigation.navigate('Home');
    };

    return (
        <View>
            <StatusBar />
            <Text>Title:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setTitle(text)}
                value={title}
            />
            <Text>ISBN:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setIsbn(text)}
                value={isbn}
            />
            <Text>Copies:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setCopies(text)}
                value={copies}
                keyboardType="numeric"
            />
            <Text>Image URL:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setImage(text)}
                value={image}
            />
            <Button
                title="Submit"
                onPress={() => {
                    const mydata = JSON.parse(route.params.datastring || '[]');
                    const newBook = { title, isbn, copies: parseInt(copies) || 0, image };
                    mydata.push(newBook);
                    setData(mydata);
                }}
            />
        </View>
    );
};

export default Add;
