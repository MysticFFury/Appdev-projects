import { Text, TextInput, View, TextStyle, ViewStyle } from 'react-native';

interface CustomTextInputProps {
  label?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  textStyle?: TextStyle;
  TextInputStyle?: ViewStyle;
}

export default function CustomTextInput({
  label,
  placeholder,
  onChangeText,
  textStyle, 
  TextInputStyle
}: CustomTextInputProps) {
  return (
    <View>
      <Text
        style={textStyle}
      >{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        onChangeText={e => onChangeText?.(e)}
        style={TextInputStyle}
      />

    </View>
  );
}
