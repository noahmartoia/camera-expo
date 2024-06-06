import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorche] = useState(false);
  const [codeRead, setReader] = useState(false);
  const [scan, setScan] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  function toggleTorche() {
    setTorche(current => (current ===  false ? true : false));
  }
  function onScan(code) {
    console.log(code.data)
    setScan(true)
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} enableTorch={torch} onBarcodeScanned={(code)=>onScan(code)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleTorche}>
            <Text style={styles.text}>Torch Mode</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer2}>
        <TouchableOpacity style={styles.button} onPress={toggleTorche}>
            <Text style={styles.rond}></Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position:'absolute',
    top:50,
  },
  buttonContainer2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin:5,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  rond:{
    borderRadius: 50 ,
    borderWidth: 35,
    borderColor: 'white',
  }
});