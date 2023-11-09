import React from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

const SnackbarBottom = ({label, title, visible, dismiss, textColor}) => {
  const styles = StyleSheet.create({
    snackbar: {
      position: 'absolute',
      bottom: 30,
    },
  });

  return (
    <Snackbar
      visible={visible}
      onDismiss={dismiss}
      style={styles.snackbar}
      duration={4000}
      action={{
        textColor: textColor,
        label: label,
        onPress: () => {
          // Do something
        },
      }}>
      {title}
    </Snackbar>
  );
};

export default SnackbarBottom;
