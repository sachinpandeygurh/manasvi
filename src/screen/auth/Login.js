import React, { useState, useEffect } from 'react';
import { Animated, Image, Linking, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from 'react-native-linear-gradient';
import Loading from "../../component/Loading";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setFlag] = useState('');
  const [psshow, setPsshow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {  
    const textRef = textRef?.bounce(8); 
    return () => textRef?.stopAnimation();
    
  }, []);


  // // TODO remove when build 
  // setTimeout(() => {
  //   navigation.navigate('Home');
  // }, 500);
  // const fadeAnim = new Animated.Value(0);

  // useEffect(() => {
  //     Animated.timing(fadeAnim, {
  //         toValue: 1,
  //         duration: 1500,
  //         useNativeDriver: true,
  //     }).start(() => {
  //         navigation.navigate('Home');
  //     });
  // }, [fadeAnim, 2000]);

  const handleEmailClick = () => {
    setFlag('username');
    setPsshow(false);
  };

  const handlePasswordClick = () => {
    setFlag('password');
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (username === '' || password === '') {
      return false;
    }
    try {
      const res = await axios.post("https://ntc98.com/api/token/auth", {
        grant_Type: "password",
        username,
        password,
      });

      console.log("res?.data", res?.data);

      if (res?.status === 200 && res?.data) {
        await AsyncStorage.setItem("@MySuperStore:key", JSON.stringify(res?.data));
        console.log("Data stored successfully!");
        setLoading(false);
        navigation.navigate('Home');
        console.log("Navigation successful!");
      } else {
        Alert.alert("Enter correct Username  & Password")
        console.log("Error", res.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden/>
      <ScrollView
        style={{ backgroundColor: '#141F35',  }}
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../../assets/icon/c_logo.png')} />
            <Text style={styles.title}>Login to your account</Text>
            <Text style={styles.subtitle}>Enter your details to login</Text>
          </View>
          {loading && <Loading />}
          <TouchableOpacity
            style={[
              styles.inputParent,
              flag === 'username' && { borderColor: '#FBCE6B' },
            ]}
            onPress={handleEmailClick}
          >
              <Fontisto name="email" size={24} color={flag === 'username' ? '#FBCE6B' : '#ffffff7a'} />
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
              placeholderTextColor={flag === 'username' ? '#FBCE6B' : '#ffffff7a'}
              style={styles.input}
              editable={flag === 'username'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.inputParent,
              flag === 'password' && { borderColor: '#FBCE6B' },
            ]}
            onPress={handlePasswordClick}
          >
  <EvilIcons name="lock" size={28} color={flag === 'password' ? '#FBCE6B' : '#ffffff7a'} />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              placeholderTextColor={flag === 'password' ? '#FBCE6B' : '#ffffff7a'}
              secureTextEntry={!psshow}
              style={styles.input}
              editable={flag === 'password'}
            />
          <Pressable style={{ position: "absolute", right: 5 }} onPress={() => setPsshow(!psshow)}>
          <AntDesign
            style={{ marginLeft: 130 }}
            name={psshow ? 'eye' : 'eyeo'}
            size={24}
            color={flag === 'password' ? '#FBCE6B' : '#ffffff7a'}
          />
        </Pressable>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.inputParent, { borderBottomWidth: 0 }]}>
            {/* Checkbox or any additional UI elements */}
          </TouchableOpacity>

          <LinearGradient
            colors={['#FBCE6B', '#D19D2C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}
          >
            <Pressable style={{}} onPress={handleSubmit}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 112,
    height: 112,
    marginVertical: 10,
  },
  title: {
    // fontFamily: 'Outfit',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 35,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'white',
  },
  subtitle: {
    // fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 20,
    letterSpacing: 0.01,
    textAlign: 'center',
    color: 'white',
    paddingVertical: 10,
  },
  formContainer: {
    marginTop: 20,
    zIndex: 1,
  },
  inputParent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: 300,
    borderRadius: 5,
  },
  input: {
    marginHorizontal: 10,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: "left"
  },
  button: {
    borderRadius: 15,
    padding: 15,
    width: '50%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Login;
