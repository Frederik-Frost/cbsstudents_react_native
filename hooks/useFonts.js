import { OpenSans_400Regular, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import { Teko_500Medium } from "@expo-google-fonts/teko";
import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    // 'OpenSans_400Regular' :  require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans_400Regular' : OpenSans_400Regular,
    'OpenSans_700Bold' : OpenSans_700Bold,
    'Teko_500Medium' : Teko_500Medium
  });