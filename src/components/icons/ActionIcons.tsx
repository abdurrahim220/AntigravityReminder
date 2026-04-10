import React from 'react';
import { View, StyleSheet } from 'react-native';

export const EyeIcon = ({ size = 20, color = '#3B82F6' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[
      styles.eyeOuter,
      {
        width: size,
        height: size * 0.64,
        borderRadius: size * 0.32,
        borderColor: color,
      }
    ]}>
      <View style={[
        styles.eyeInner,
        {
          width: size * 0.28,
          height: size * 0.28,
          borderRadius: size * 0.14,
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
        width: size * 0.28,
        height: size * 0.72,
        borderColor: color,
      }
    ]} />
    <View style={[
      styles.editTip,
      {
        bottom: size * 0.08,
        right: size * 0.08,
        borderLeftWidth: size * 0.08,
        borderRightWidth: size * 0.08,
        borderBottomWidth: size * 0.14,
        borderBottomColor: color,
      }
    ]} />
  </View>
);

export const TrashIcon = ({ size = 20, color = '#EF4444' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[styles.trashLid, { width: size * 0.64, backgroundColor: color }]} />
    <View style={[
      styles.trashBody,
      {
        width: size * 0.52,
        height: size * 0.64,
        borderColor: color,
      }
    ]}>
      <View style={[styles.trashLine, { backgroundColor: color }]} />
      <View style={[styles.trashLine, { backgroundColor: color }]} />
    </View>
  </View>
);

export const PlusIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[styles.plusHorizontal, { width: size * 0.6, backgroundColor: color }]} />
    <View style={[styles.plusVertical, { height: size * 0.6, backgroundColor: color }]} />
  </View>
);

export const ChevronLeftIcon = ({ size = 24, color = '#111827' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[
      styles.chevronLine, 
      { 
        width: size * 0.4, 
        backgroundColor: color, 
        transform: [{ translateY: -size * 0.12 }, { rotate: '-45deg' }] 
      }
    ]} />
    <View style={[
      styles.chevronLine, 
      { 
        width: size * 0.4, 
        backgroundColor: color, 
        transform: [{ translateY: size * 0.12 }, { rotate: '45deg' }] 
      }
    ]} />
  </View>
);

export const GrabHandle = () => (
  <View style={styles.grabHandleContainer}>
    <View style={styles.grabHandle} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeOuter: {
    borderWidth: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeInner: {},
  editBody: {
    borderWidth: 1.8,
    borderRadius: 2,
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
    height: 2.2,
    borderRadius: 2,
    marginBottom: 1.5,
  },
  trashBody: {
    borderWidth: 1.8,
    borderTopWidth: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 2.5,
  },
  trashLine: {
    width: 1.2,
    height: '75%',
    opacity: 0.6,
  },
  plusHorizontal: {
    height: 2.5,
    borderRadius: 2,
    position: 'absolute',
  },
  plusVertical: {
    width: 2.5,
    borderRadius: 2,
    position: 'absolute',
  },
  chevronLine: {
    height: 2.5,
    borderRadius: 2,
    position: 'absolute',
  },
  grabHandleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  grabHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
});
