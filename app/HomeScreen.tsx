import { Text,Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";


export default function HomeScreen(){
    const router = useRouter()//Hook de navegação

    const realizarLogoff = async()=>{
        await AsyncStorage.removeItem('@user')
        router.push('./')//Redireciona para index.tsx
    }

    return(
        <SafeAreaView>
            <Text>Seja bem-vindo - Você está Logado!!</Text>
            <Button title="Sair da conta" onPress={realizarLogoff}/>
        </SafeAreaView>
    )
}