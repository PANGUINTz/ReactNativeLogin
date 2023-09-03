import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post('http://192.168.1.104:8080/register', user)
      .then(response => {
        console.log(response.data);
        Alert.alert(
          'Registration successful',
          'you have been registered successfully',
        );
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        Alert.alert(
          'Registration failed',
          'An error accurred during registration',
        );
        console.log('error', error);
      });
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{marginTop: 50}}>
        <Image
          style={{width: 150, height: 100, resizeMode: 'contain'}}
          source={{
            uri: 'https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png',
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 20,
              color: 'black',
            }}>
            Register
          </Text>
        </View>

        <View style={{marginTop: 40}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              paddingHorizontal: 5,
              borderRadius: 5,
            }}>
            <Icon name="account" color="gray" size={24} />
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              placeholderTextColor={'gray'}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder="username"
            />
          </View>
        </View>

        <View style={{marginTop: 40}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              paddingHorizontal: 5,
              borderRadius: 5,
            }}>
            <Icon name="email" color="gray" size={24} />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor={'gray'}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder="email"
            />
          </View>
        </View>

        <View style={{marginTop: 40}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              paddingHorizontal: 5,
              borderRadius: 5,
            }}>
            <Icon name="lock" color="gray" size={24} />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor={'gray'}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder="password"
            />
          </View>
        </View>
        <View style={{marginTop: 45}} />
        <Button onPress={handleRegister} title="SIGN UP" color="black" />
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{textAlign: 'right', marginTop: 5}}>
            Already have an account? Sign in
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
