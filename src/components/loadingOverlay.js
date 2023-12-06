import React, {useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {Portal, Modal, Text} from 'react-native-paper';
import farmer from '../assets/images/farmer.gif';
import {useGlobal} from '../contexts/GlobalContext';

const LoadingOverlay = () => {
  const {isLoading} = useGlobal();

  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'white',
      padding: 20,
      maxWidth: '80%',
      maxHeight: '60%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  });

  if (!isLoading) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={true}
        dismissable={false}
        contentContainerStyle={styles.containerStyle}>
        <Image
          source={farmer}
          alt="farmer"
          resizeMode="contain"
          style={{
            maxWidth: '100%', // Set the maximum width
            maxHeight: 300, // Set the maximum height if needed
          }}
        />
        <Text variant="titleLarge">Please wait for awhile...</Text>
      </Modal>
    </Portal>
  );
};

export default LoadingOverlay;

const LoadingOverlayPage = () => {
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: 'white',
      padding: 20,
      maxWidth: '80%',
      maxHeight: '60%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  });
  return (
    <Portal>
      <Modal
        visible={true}
        dismissable={false}
        contentContainerStyle={styles.containerStyle}>
        <Image
          source={farmer}
          alt="farmer"
          resizeMode="contain"
          style={{
            maxWidth: '100%', // Set the maximum width
            maxHeight: 300, // Set the maximum height if needed
          }}
        />
        <Text variant="titleLarge">Please wait for awhile...</Text>
      </Modal>
    </Portal>
  );
};

export {LoadingOverlay, LoadingOverlayPage};
