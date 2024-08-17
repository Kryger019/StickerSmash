import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import EmojiPicker from "./components/EmojiPicker";

const PlaceholderImage = require('./assets/images/background.png');


export default function App() {
const [selectedImage, setSelectedImage] = useState(null);
const [showAppOptions, setShowAppOptions] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false);

  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  
  const onModalClose = () =>{
    setIsModalVisible(false);
  };

  const onReset = () => {
    setShowAppOptions(false);
  };
  
  const onSaveImageAsync = async ()=>{

  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);

    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
      </EmojiPicker>
      <View style={styles.imageContainer}>
        <ImageViewer
         placeholderImageSource={PlaceholderImage}
         selectedImage={selectedImage}
         />
         {/* <Image source={PlaceholderImage} style={styles.image}/> */}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker}/>
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
          </View>
        </View>
      ):(
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
      </View>
      )}
      <StatusBar style="auto"/>
    </View>
    );
  }

const styles = StyleSheet.create({
  optionsContainer:{
    position: 'absolute',
    bottom: 80,
  },
  optionsRow:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerContainer:{
    flex: 1 / 3,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    image: {
      width:320,
      height: 440,
      borderRadius: 18,
    },
    // justifyContent: 'center',
  });
