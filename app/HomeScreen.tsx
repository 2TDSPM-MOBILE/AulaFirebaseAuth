import { Text,Button,Alert, TextInput,StyleSheet, ActivityIndicator, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { addDoc,collection,db,getDocs } from "../services/firebaseConfig";

import {auth} from '../services/firebaseConfig'
import { deleteUser } from "firebase/auth";
import ItemLoja from "../components/ItemLoja";
import { useEffect, useState } from "react";


export default function HomeScreen(){
    const router = useRouter()//Hook de navegação
    const[nomeProduto,setNomeProduto]=useState('')
    interface Item{
        id:string;
        nomeProduto:string;
        isChecked:boolean
    }
    const[listaItems,setListaItems]=useState<Item[]>([])

    const realizarLogoff = async()=>{
        await AsyncStorage.removeItem('@user')
        router.push('/')//Redireciona para index.tsx
    }

    const excluirConta = ()=>{
        Alert.alert("CONFIRMAR EXCLUSÃO","Tem certeza que deseja excluir? Esta ação não poderá ser desfeita.",
            [
                {text:'Cancelar', style:'cancel'},
                {text:'Excluir', style:'destructive',
                    onPress:async()=>{
                        try{
                            const user = auth.currentUser
                            if(user){
                                await deleteUser(user)//Deleta o user do firebase Auth
                                await AsyncStorage.removeItem('@user')
                                Alert.alert("Conta Excluída","Sua conta foi excluída com sucesso.")
                                router.replace('/')
                            }else{
                                Alert.alert("Erro","Nenhum usuário logado")
                            }
                        }catch(error){
                            console.log("Erro ao excluir conta")
                            Alert.alert("Erro","Não foi possível excluir a conta")
                        }
                    }
                }
            ],{
                cancelable:true
            }
        )
    }

    const salvarItem = async()=>{
        try{
            const docRef = await addDoc(collection(db,'items'),{
                nomeProduto:nomeProduto,
                isCheked:false
            })
            //console.log("Sucesso ao salvar", docRef.id)
            Alert.alert("Sucesso","Produto salvo com sucesso.")
            setNomeProduto('')//Limpa o TextInput
        }catch(e){
            console.log("Error ao salvar",e)
        }
    }

    const buscarItems = async()=>{
        try{
            const querySnapshot = await getDocs(collection(db,'items'))
            const items:any[]=[]

            querySnapshot.forEach((item)=>{
                items.push({
                    ...item.data(),
                    id:item.id
                })
            })
            //console.log("Dados carregados",items)
            setListaItems(items)
        }catch(e){
            console.log("Erro ao buscar os dados",e)
        }
    }
    useEffect(()=>{
        buscarItems()
    },[listaItems])

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView //É um componente que ajuste o layout automaticamente
                style={styles.container}
                behavior={Platform.OS==='ios'?'padding':'height'}
                keyboardVerticalOffset={20}//desloca o conteúdo verticalmente
            >
            <Text>Seja bem-vindo - Você está Logado!!</Text>
            <Button title="Sair da conta" onPress={realizarLogoff}/>
            <Button title="Excluir conta" color='red' onPress={excluirConta}/>
            <Button title="Alterar Senha" onPress={()=>router.push('AlterarSenhaScreen')}/>

            {listaItems.length<=0?<ActivityIndicator/>:(
                <FlatList
                    data={listaItems}
                    renderItem={({item})=>(
                        <ItemLoja 
                            nomeProduto={item.nomeProduto}
                            isChecked={item.isChecked}
                            id={item.id}    
                        />
                    )}
                />
            )}

            <TextInput 
                placeholder="Digite o nome do produto" 
                style={styles.input}
                value={nomeProduto}
                onChangeText={(value)=>setNomeProduto(value)}
                onSubmitEditing={salvarItem}
            />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{
       backgroundColor:'lightgray' ,
       width:'90%',
       padding:10,
       alignSelf:'center',
       borderRadius:10,
       marginTop:20
    }
})