
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'; 

interface AlertMsgProps {
   title: string; 
   message: string;    
   position?: 'top' | 'bottom';
   visibilityTime?: number; 
}

const  showInfo =({title,message,position = 'top',visibilityTime = 3000}: AlertMsgProps) =>{
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    position: position,
    visibilityTime: visibilityTime,
    bottomOffset: 50,
  });  
}   

export {showInfo}