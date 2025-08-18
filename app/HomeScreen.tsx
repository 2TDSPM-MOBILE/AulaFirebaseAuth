import { Text,Button,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import {auth} from '../services/firebaseConfig'
import { deleteUser } from "firebase/auth";


export default function HomeScreen(){
    const router = useRouter()//Hook de navegação

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

    return(
        <SafeAreaView>
            <Text>Seja bem-vindo - Você está Logado!!</Text>
            <Button title="Sair da conta" onPress={realizarLogoff}/>
            <Button title="Excluir conta" color='red' onPress={excluirConta}/>
        </SafeAreaView>
    )
}