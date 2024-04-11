import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const InputField = ({ label, type, text, style }) => (
    <View style={[styles.inputContainer, style]}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
            style={styles.inputField}
            secureTextEntry={type === "password"}
            keyboardType={type === "email" ? "email-address" : "default"}
            autoCapitalize="none"
            placeholder={text}
            placeholderTextColor="#526999"
            textContentType={type === "email" ? "emailAddress" : "none"}
            accessibilityLabel={label}
            accessibilityHint={`Enter your ${label}`}
        />
    </View>
);

export const Checkbox = ({ label, onChange, checked }) => {
    const toggleCheckbox = () => {
        onChange(!checked);
    };

    return (
        <TouchableOpacity style={[styles.checkboxContainer, { marginVertical: 15 }]} onPress={toggleCheckbox}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={[styles.checkbox, checked && styles.checked]} >
                {checked && <FontAwesome name="check" size={12} color="white" />}
            </View>
        </TouchableOpacity>
    );
};

export const DropdownField = ({ label, options , style}) => (
    <View style={style}>
    <Text style={styles.inputLabel}>{label}</Text>
        <Picker style={{}}>
            {options.map((option, index) => (
                <Picker.Item label={option} value={option} key={index} />
            ))}
        </Picker>
    </View>
    );

// export const DropdownField = ({ label, options }) => {
//     const [value, setValue] = useState(null);
//     const [isFocus, setIsFocus] = useState(false);
//     const data = [
//         { label: 'Item 1', value: '1' },
//         { label: 'Item 2', value: '2' },
//         { label: 'Item 3', value: '3' },
//         { label: 'Item 4', value: '4' },
//         { label: 'Item 5', value: '5' },
//         { label: 'Item 6', value: '6' },
//         { label: 'Item 7', value: '7' },
//         { label: 'Item 8', value: '8' },
//       ];
//     const renderLabel = () => {
//       if (value || isFocus) {
//         return (
//           <Text style={[styles.label, isFocus && { color: 'blue' }]}>
//             Dropdown label
//           </Text>
//         );
//       }
//       return null;
//     };

//     return (
//       <View style={styles.inputContainer}>
//         {renderLabel()}
//         <Dropdown
//           style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
//           placeholderStyle={styles.inputField}
//           selectedTextStyle={styles.inputLabel}
//           inputSearchStyle={styles.inputLabel}
//           iconStyle={styles.iconStyle}
//           data={data}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={!isFocus ? 'Select item' : '...'}
//           searchPlaceholder="Search..."
//           value={value}
//           onFocus={() => setIsFocus(true)}
//           onBlur={() => setIsFocus(false)}
//           onChange={item => {
//             setValue(item.value);
//             setIsFocus(false);
//           }}
//           renderLeftIcon={() => (
//             <AntDesign
//               style={styles.icon}
//               color={isFocus ? 'blue' : 'black'}
//               name="Safety"
//               size={20}
//             />
//           )}
//         />
//       </View>
//     );
// }




  export  const CustomModal = (  {modelbody , modelName}) => {
        const [modalVisible, setModalVisible] = useState(false);
        return (
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
        );
      };

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 1,
        marginBottom: "20%"
    },
    mainContainer: {
        flex: 1,
        width: '97%',
        margin: 0,
        marginBottom: "25%"
    },
    inputContainer: {
        marginBottom: 20,
        borderRadius:10

    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: '#fff',
    },
    iconStyle: {
        width: 20,
        height: 20,
      },
    inputField: {
        borderWidth: 1,
        borderColor: '#22355C',
        borderRadius: 7,
        padding: 10,
        color: '#FBCE6B',
        backgroundColor: "#182A4E",
        margin: 0,

    },
    actionButton: {
        backgroundColor: '#0F1E3E',
        borderRadius: 7,
        padding: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    actionButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 5
    },
    scrollViewContent: {
        flexDirection: 'row',
        backgroundColor: "#212A3D", paddingVertical: 5, borderRadius: 20,
    },
    option: {
        borderRadius: 4,
        paddingVertical: 1,
        paddingHorizontal: 4,
        // marginHorizontal: 12,
        borderBottomWidth: 2,

    },
    optionText: {
        fontWeight: 'bold',
        fontSize: 18,

    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#212A3D",
        marginRight: 10,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    checked: {
        backgroundColor: "#212A3D",
    },
    label: {
        fontSize: 16,
        color: '#000',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
});
