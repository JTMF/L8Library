import React, { useState } from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
    const { datastring, index } = route.params;
    const mydata = JSON.parse(datastring);
    if (!Array.isArray(mydata)) {
        console.error('Data is not an array:', mydata);
        return null;
    }

    const book = mydata[index] || { title: '', isbn: '', copies: 0, image: '' };

    const [title, setTitle] = useState(book.title);
    const [isbn, setIsbn] = useState(book.isbn);
    const [copies, setCopies] = useState(String(book.copies));
    const [image, setImage] = useState(book.image);

    const setData = async (newData) => {
        await AsyncStorage.setItem('alphadata', JSON.stringify(newData));
        navigation.navigate('Home');
    };

    return (
        <View>
            <Text>Title:</Text>
            <TextInput value={title} style={{ borderWidth: 1 }} onChangeText={(text) => setTitle(text)} />
            <Text>ISBN:</Text>
            <TextInput value={isbn} style={{ borderWidth: 1 }} onChangeText={(text) => setIsbn(text)} />
            <Text>Copies:</Text>
            <TextInput
                value={copies}
                style={{ borderWidth: 1 }}
                keyboardType="numeric"
                onChangeText={(text) => setCopies(text)}
            />
            <Text>Image URL:</Text>
            <TextInput value={image} style={{ borderWidth: 1 }} onChangeText={(text) => setImage(text)} />

            <View style={{ flexDirection: 'row' }}>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button
                        title="Save"
                        onPress={() => {
                            mydata[index] = { title, isbn, copies: parseInt(copies) || 0, image };
                            setData(mydata);
                        }}
                    />
                </View>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button
                        title="Delete"
                        onPress={() =>
                            Alert.alert('Are you sure?', '', [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        if (Array.isArray(mydata)) {
                                            mydata.splice(index, 1);
                                            setData(mydata);
                                        } else {
                                            console.error('mydata is not an array:', mydata);
                                        }
                                    },
                                },
                                { text: 'No' },
                            ])
                        }
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
