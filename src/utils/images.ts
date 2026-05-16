import { ImageSourcePropType } from 'react-native';

interface Images {
  LOGO: ImageSourcePropType;
}

const images: Images = {
  LOGO: require('../../assets/logo.png'),
};

export default images;
