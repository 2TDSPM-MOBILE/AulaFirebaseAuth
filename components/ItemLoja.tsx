import { StyleSheet, View, Text, Pressable } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useState } from "react";
import {updateDoc,doc,db} from '../services/firebaseConfig'

export default function ItemLoja(props: any) {
    const [isChecked, setIsChecked] = useState(props.isChecked)
    return (
        <View style={styles.container}>
            <Pressable onPress={() => setIsChecked(!isChecked)}>
                {isChecked ? (
                    <AntDesign name="checkcircle" color='black' size={24} />
                ):(
                    <AntDesign name="checkcircleo" color='black' size={24} />
                )}

            </Pressable>
            <Text style={styles.title}>{props.nomeProduto}</Text>
            <Pressable>
                <MaterialIcons name='delete' color='black' size={24} />
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 500
    }
})