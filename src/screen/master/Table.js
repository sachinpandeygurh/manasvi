import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Toggler = ({ text, onPress, flagState }) => {
  return (
    <Pressable onPress={onPress} style={{ flexDirection: "row", color: "white", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#EDBE58", marginBottom: 2 }}> {text} </Text>
      <Feather name={flagState ? "toggle-left" : "toggle-right"} size={24} color={flagState ? "red" : "green"} />
    </Pressable>
  );
};

export const TableHeader = ({ data, setData }) => {
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);

  const handleActive = () => {
    setFlag(!flag);
    flag && setData(data.filter(item => item.recrdState === 'Active'));
  };

  const handleInactive = () => {
    setFlag1(!flag1);
    flag1 && setData(data.filter(item => item.recrdState === 'InActive'));
  };

  return (
    <View>
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 18, borderRadius: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#0C1B3D", borderBottomWidth: 2, borderBottomColor: '#FBCE6B', width: "95%", gap: 0, borderTopEndRadius: 10, borderTopStartRadius: 10, paddingHorizontal: 20, paddingVertical: 5 }}>
          <Toggler text="Active" onPress={handleActive} flagState={flag} />
          <Toggler text="Inactive" onPress={handleInactive} flagState={flag1} />
          <Text style={{ color: "#FFFFFF33" }}>NEED HELP?</Text>
        </View>
      </View>
    </View>
  );
};

export const Table = ({ key, Sno, Data1, Data2, Data3, Data4, Data5, Data6, Data7, Data8 , modelName , modelbody}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
    <View key={key} style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Pressable onPress={() => setModalVisible(true)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#0C1B3D", borderBottomWidth: 0.5, width: 380, gap: 1, borderRadius: 0, paddingHorizontal: 20, paddingVertical: 5 }}>
        <Text style={{ color: "#FFFFFF", width: "5%" }}>{Sno}</Text>
        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between", width: "25%" }}>
          <Text style={{ color: "#FFFFFF" }}>{Data1}</Text>
          <Text style={{ color: "#FFFFFF33", backgroundColor: "#0D1934", paddingHorizontal: 10 }}>{Data2}</Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "25%" }}>
          <Text style={{ color: "#FFFFFF" }}>{Data3}</Text>
          <Text style={{ color: "#FFFFFF33", backgroundColor: "#0D1934", paddingHorizontal: 10 }}>{Data4}</Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "12%" }}>
          <Text style={{ color: "#FFFFFF" }}>{Data5}</Text>
          <Text style={{ color: "#EDBE58", backgroundColor: "#0D1934", paddingHorizontal: 10, fontSize: 10 }}>{Data6}</Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 5, width: "32%" }}>
          <Text style={{ color: "#FFFFFF", fontSize: 12 }}>{Data7}</Text>
          <Text style={{ color: "#FFFFFF33" }}>{Data8}</Text>
        </View>
      </Pressable>
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View
            style={{  backgroundColor: 'transparent',
            width:"100%",
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            paddingBottom:10,
            marginBottom:10,
            paddingVertical:20,   borderBottomColor:"#D19D2C",
            borderBottomWidth:3,}}>
            <Text style={{textAlign:"center", color:"#F4BA00"}}></Text>
            <Text style={{textAlign:"center", color:"#F4BA00", fontSize:20, fontWeight:600}}>{modelName}</Text>
            <Text   onPress={() => setModalVisible(!modalVisible)} style={styles.textStyle}> <AntDesign name="closecircleo" size={24} color="#F4BA00" /></Text>
          </View>
          <View style={styles.modalBody}>
   {modelbody}
    </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 10,
    backgroundColor: "#121A2C",
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height:5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  button: {
    backgroundColor: 'blue',
    padding: responsiveHeight(2),
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
  },
  modalBody:{
 

  }
});
