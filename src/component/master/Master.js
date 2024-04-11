import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function Master({ masterType, highlightedOption, setHighlightedOption }) {
  const handlePress = (optionIndex) => {
    setHighlightedOption(optionIndex);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {masterType.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(item.id)}>
            <View style={[styles.option, { borderBottomColor: highlightedOption === item.id ? '#EDBE58' : 'transparent' }]}>
              <Text style={[styles.optionText, { color: highlightedOption === item.id ? '#EDBE58' : '#ffffff' }]}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141F35',
    marginHorizontal: 10,
    marginVertical: 11,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  option: {
    borderRadius: 4,
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginHorizontal: 12,
    borderBottomWidth: 2,
  },
  optionText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
