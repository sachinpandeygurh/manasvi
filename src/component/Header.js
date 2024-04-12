import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  Dimensions,
} from 'react-native';
import Sidebar from './Sidebar';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';


const {width} = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight;
const Header = ({backarrow=true}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();


  const handleMenu = () => {
    setModalVisible(true);
    console.log('presweergrew3efefrwe');
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  return (
    <>
      <View style={styles.headerContainer}>
          <StatusBar animated={true}  backgroundColor="#FBCE6B" /> 
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={require('../assets/icon/header_logo.png')}
            style={styles.headerBackground}>
            <View style={styles.overlay} />
            <View style={styles.headerContent}>
           {  //TODO  onPress={() => navigation.navigate(-1)} fix this
           backarrow ?(     <TouchableOpacity>
           <Image
                style={styles.tinyLogo}
                source={require('../assets/icon/arrow.png')}
              /></TouchableOpacity>):(
              <Text>    </Text>)}
              <Image
                style={styles.logo}
                source={require('../assets/icon/logo.png')}
              />
              <Pressable onPress={handleMenu} style={styles.menuButton}>
                <Entypo name="menu" size={34} color="black" />
              </Pressable>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </View>

      {modalVisible && (
        <Modal animationType="fade" transparent={true}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <EvilIcons name="close-o" size={34} color="white" />
          </TouchableOpacity>
          <Sidebar />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 99,
    backgroundColor: '#212A3D',
    justifyContent: 'center',
    height: 80,
    width: '100%',
  },
  headerBackground: {
    height: '100%',
    paddingHorizontal: 20,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FBCE6B',
    opacity: 0.78,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 72,
    height: 71,
  },
  closeButton: {
    position: 'absolute',
    top: '3%',
    left: '25%',
    zIndex: 9,
  },
  tinyLogo: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: statusBarHeight,
    resizeMode: 'stretch', // or 'stretch' depending on your preference
    transform: [{rotate: '180deg'}],
  },
});

export default Header;