// MasterScreen.js
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View , Text} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Master from '../master/Master';
import Search from '../../component/Search';
import {Table , TableHeader} from './Table';
import Header from '../../component/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import AddShift from '../../component/master/shift/AddShift';
import UpdateAgents from '../../component/master/agents/UpdateAgents';
import UpdateLedgers from '../../component/master/Ledgers/UpdateLedgers';
import AddLedgers from '../../component/master/Ledgers/AddLedgers';
import AddAgents from '../../component/master/agents/addAgents';

export default function MainMaster() {
    const [highlightedOption, setHighlightedOption] = useState(1);
    const [data, setData] = useState(null);
    const [ledgerData, setLedgerData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const value = await AsyncStorage.getItem("@MySuperStore:key");
                if (value !== null) {
                    const authData = JSON.parse(value);
                    getShift(authData?.access_token);
                    getLedger(authData?.access_token);
                } else {
                    console.error("Authentication token not found.");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [data]);

    const getShift = async (authToken) => {
        try {
            const response = await axios.get('https://ntc98.com/api/Shift/GetAll?pageIndex=0&pageSize=all',
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
            setData(response.data.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getLedger = async (authToken) => {
        try {
            const response = await axios.get('https://ntc98.com/api/Ledger/GetAllLedger/0/All/%20/%20/Active?party=%20',
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
            setLedgerData(response.data.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const masterType = [
        { id: 1, name: 'Shift' },
        { id: 2, name: 'Ledgers' },
        { id: 3, name: 'Agents' },
        { id: 4, name: 'Feedback' },
    ];

    const handleLedger = (itemid) => {
        console.log("id", itemid) 
    }

    return (
        <LinearGradient colors={['#141F35', '#141F35']} style={{ flex: 1 }}>
            <Header/>
            <ScrollView style={styles.scrollViewContent}>
                <View style={{ flexDirection: "column", justifyContent: "center" }} >
                    <Master masterType={masterType} highlightedOption={highlightedOption} setHighlightedOption={setHighlightedOption} />
                    <View>
                        {highlightedOption === 1 && <>
                            <Search text="Search.." modelName="ShiftName" modelbody={<AddShift />} dropitems={false} />
                            <TableHeader />
                            {data && data.map((item, index) => {
                                const dateObj = new Date(item.openDate);
                                const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${String(dateObj.getFullYear()).slice(-2)}`;
                                const updateDateObj = new Date(item.updateDate);
                                const formattedUpdateDate = `${updateDateObj.getDate()}-${updateDateObj.getMonth() + 1}-${String(updateDateObj.getFullYear()).slice(-2)} ${updateDateObj.getHours()}:${updateDateObj.getMinutes()}`;
                                const formattedCreatedByName = item.createdByName ? `${item.createdByName.split(" ")[0]} ${item.createdByName.split(" ")[1].charAt(0)}` : "";

                                return (
                                    <Table
                                        modelName="Update Shift"
                                        modelbody={<UpdateAgents />}
                                        key={index}
                                        Sno={item.order}
                                        Data1={item.name}
                                        Data2={formattedCreatedByName}
                                        Data3=""
                                        Data4={item.openDate ? formattedDate : ""}
                                        Data5=""
                                        Data6={item.isNextDay ? "YES" : "NO"}
                                        Data7={item?.updatedByName}
                                        Data8={formattedUpdateDate}
                                    />
                                );
                            })}
                        </>}

                        {highlightedOption === 2 && <>
                            <Search text="Search.." modelName="Add Ledgers" modelbody={<AddLedgers />} dropitems={true} dropinput1='-Agent Name-' dropinput2='-All Group-' />
                            <TableHeader />
                            {data && data.map((item, index) => {
                                const dateObj = new Date(item.openDate);
                                const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${String(dateObj.getFullYear()).slice(-2)}`;
                                const updateDateObj = new Date(item.updateDate);
                                const formattedUpdateDate = `${updateDateObj.getDate()}-${updateDateObj.getMonth() + 1}-${String(updateDateObj.getFullYear()).slice(-2)} ${updateDateObj.getHours()}:${updateDateObj.getMinutes()}`;
                                const formattedCreatedByName = item.createdByName ? `${item.createdByName.split(" ")[0]} ${item.createdByName.split(" ")[1].charAt(0)}` : "";

                                return (
                                    <Table
                                        modelName="Update Ledgers"
                                        modelbody={<UpdateLedgers />}
                                        key={item.id}
                                        Sno={index + 1}
                                        Data1={item.name}
                                        Data2={formattedCreatedByName}
                                        Data3=""
                                        Data4={item.openDate ? formattedDate : ""}
                                        Data5=""
                                        Data6={item.isNextDay ? "YES" : "NO"}
                                        Data7={item?.updatedByName}
                                        Data8={formattedUpdateDate}
                                    />
                                );
                            })}
                        </>}

                        {highlightedOption === 3 && <>
                            <Search text="Search.." modelName="Add Staff" modelbody={<AddAgents />} dropitems={false} dropinput1='-Agent Name-' dropinput2='-All Group-' />
                            <TableHeader />
                            {data && data.map((item, index) => {
                                const dateObj = new Date(item.openDate);
                                const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${String(dateObj.getFullYear()).slice(-2)}`;
                                const updateDateObj = new Date(item.updateDate);
                                const formattedUpdateDate = `${updateDateObj.getDate()}-${updateDateObj.getMonth() + 1}-${String(updateDateObj.getFullYear()).slice(-2)} ${updateDateObj.getHours()}:${updateDateObj.getMinutes()}`;
                                const formattedCreatedByName = item.createdByName ? `${item.createdByName.split(" ")[0]} ${item.createdByName.split(" ")[1].charAt(0)}` : "";

                                return (
                                    <Table
                                        modelName="Update Agents"
                                        modelbody={<UpdateAgents />}
                                        key={item.id}
                                        Sno={index + 1}
                                        Data1={item.name}
                                        Data2={formattedCreatedByName}
                                        Data3=""
                                        Data4={item.openDate ? formattedDate : ""}
                                        Data5=""
                                        Data6={item.isNextDay ? "YES" : "NO"}
                                        Data7={item?.updatedByName}
                                        Data8={formattedUpdateDate}
                                    />
                                );
                            })}
                        </>}

                        {highlightedOption === 4 && <>
                            <Search text="Search.." modelName="Add Feedback" modelbody={<AddLedgers />} dropitems={false} dropinput1='-Agent Name-' dropinput2='-All Group-' />
                            <TableHeader />
                            {data && data.map((item, index) => {
                                const dateObj = new Date(item.openDate);
                                const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${String(dateObj.getFullYear()).slice(-2)}`;
                                const updateDateObj = new Date(item.updateDate);
                                const formattedUpdateDate = `${updateDateObj.getDate()}-${updateDateObj.getMonth() + 1}-${String(updateDateObj.getFullYear()).slice(-2)} ${updateDateObj.getHours()}:${updateDateObj.getMinutes()}`;
                                const formattedCreatedByName = item.createdByName ? `${item.createdByName.split(" ")[0]} ${item.createdByName.split(" ")[1].charAt(0)}` : "";

                                return (
                                    <Table
                                        modelName="Update Feedback"
                                        modelbody={<UpdateAgents />}
                                        key={item.id}
                                        Sno={index + 1}
                                        Data1={item.name}
                                        Data2={formattedCreatedByName}
                                        Data3=""
                                        Data4={item.openDate ? formattedDate : ""}
                                        Data5=""
                                        Data6={item.isNextDay ? "YES" : "NO"}
                                        Data7={item?.updatedByName}
                                        Data8={formattedUpdateDate}
                                    />
                                );
                            })}
                        </>}

                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        marginTop: 80,
    },
});
