import React from 'react';
import { View, StyleSheet } from 'react-native';

export const EyeIcon = ({ size = 20, color = '#3B82F6' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[
      styles.eyeOuter,
      {
        width: size,
        height: size * 0.6,
        borderRadius: size * 0.3,
        borderColor: color,
      }
    ]}>
      <View style={[
        styles.eyeInner,
        {
          width: size * 0.25,
          height: size * 0.25,
          borderRadius: size * 0.125,
          backgroundColor: color
        }
      ]} />
    </View>
  </View>
);

export const EditIcon = ({ size = 20, color = '#3B82F6' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[
      styles.editBody,
      {
        width: size * 0.3,
        height: size * 0.8,
        borderColor: color,
      }
    ]} />
    <View style={[
      styles.editTip,
      {
        bottom: size * 0.1,
        right: size * 0.1,
        borderLeftWidth: size * 0.1,
        borderRightWidth: size * 0.1,
        borderBottomWidth: size * 0.15,
        borderBottomColor: color,
      }
    ]} />
  </View>
);

export const TrashIcon = ({ size = 20, color = '#EF4444' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    {/* Lid */}
    <View style={[styles.trashLid, { width: size * 0.6, backgroundColor: color }]} />
    {/* Body */}
    <View style={[
      styles.trashBody,
      {
        width: size * 0.5,
        height: size * 0.6,
        borderColor: color,
      }
    ]}>
      <View style={[styles.trashLine, { backgroundColor: color }]} />
      <View style={[styles.trashLine, { backgroundColor: color }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeOuter: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeInner: {},
  editBody: {
    borderWidth: 1.5,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
    backgroundColor: 'transparent',
  },
  editTip: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '225deg' }],
  },
  trashLid: {
    height: 2,
    borderRadius: 1,
    marginBottom: 1,
  },
  trashBody: {
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 2,
  },
  trashLine: {
    width: 1,
    height: '70%',
    opacity: 0.5,
  },
});
