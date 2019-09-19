import React from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './style';

const Modal = ({visible, onRequestClose, children}) => (
  <RNModal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onRequestClose}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={styles.content}>{children}</View>
    </KeyboardAvoidingView>
  </RNModal>
);

export default Modal;
