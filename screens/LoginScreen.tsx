import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

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
            login to Your Account
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
              placeholder="enter your email"
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
              placeholder="enter your password"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text>Keep me logged in</Text>
          <Text style={{fontWeight: '500', color: '#007FFF'}}>
            Forget Password
          </Text>
        </View>
        <View style={{marginTop: 45}} />
        <Button
          title="Log in"
          accessibilityLabel="Learn more about this purple button"
          color="black"
        />
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={{textAlign: 'right', marginTop: 5}}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
