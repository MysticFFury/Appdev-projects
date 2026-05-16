import { Text, View } from "react-native";
import { ToastConfig } from "react-native-toast-message";

const toastConfig: ToastConfig = { 
    customError: () => null,

    customSuccess: () => null,

    customInfo: ({ text1, text2 }) => (
      <View>
        <Text style={{fontWeight:'bold', fontSize:18, marginLeft:10}}>{text1}</Text>
        <Text style={{ fontSize:15, marginLeft:10}}>{text2}</Text> 
      </View>
    ),
};

export default toastConfig;