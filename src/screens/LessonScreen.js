import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PronunciationButton from '../components/PronunciationButton';

export default function LessonScreen({ route }) {
  const { lesson } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const currentWord = lesson.words[currentIndex];

  const checkAnswer = () => {
    if (userAnswer.toLowerCase().trim() === currentWord.word.toLowerCase()) {
      setFeedback('✅ صحيح! أحسنت');
      setScore(score + 10);
      setTimeout(() => {
        if (currentIndex + 1 < lesson.words.length) {
          setCurrentIndex(currentIndex + 1);
          setUserAnswer('');
          setFeedback('');
        } else {
          setFeedback(`🎉 تهانينا! أتممت الدرس! مجموع نقاطك: ${score + 10}`);
        }
      }, 1000);
    } else {
      setFeedback(`❌ خطأ. الإجابة الصحيحة: ${currentWord.word}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>⭐ النقاط: {score}</Text>
      </View>
      
      <Text style={styles.progress}>
        الكلمة {currentIndex + 1} من {lesson.words.length}
      </Text>
      
      <Text style={styles.word}>{currentWord.word}</Text>
      
      <Image source={{ uri: currentWord.image }} style={styles.image} />
      
      <Text style={styles.translation}>المعنى: {currentWord.translation}</Text>
      
      <PronunciationButton phrase={currentWord.audioPhrase} />
      
      <TextInput
        style={styles.input}
        placeholder="✏️ اكتب الكلمة بالإنجليزية..."
        value={userAnswer}
        onChangeText={setUserAnswer}
      />
      
      <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
        <Text style={styles.buttonText}>تحقق من إجابتي</Text>
      </TouchableOpacity>
      
      {feedback !== '' && <Text style={styles.feedback}>{feedback}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scoreContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  progress: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 10,
  },
  word: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 20,
  },
  translation: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#34495e',
  },
  input: {
    borderWidth: 2,
    borderColor: '#bdc3c7',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  checkButton: {
    backgroundColor: '#3498db',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedback: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    color: '#2c3e50',
  },
});
