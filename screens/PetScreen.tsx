import { StyleSheet, View, Text, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

export default function PetScreen() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value * 5,
        },
        {
          translateY: Math.abs(offset.value) * 1,
        },
        {
          rotateZ: `${offset.value}deg`,
        },
        {
          rotateY: `${offset.value}deg`,
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the IOIOIOIOIOIO planning app!</Text>
      <Animated.Image
        source={{
          uri: 'data:image/jpeg;base64,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',
        }}
        style={[styles.image, animatedStyles]}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          offset.value = withSequence(
            withSpring([10, -10][Math.floor(Math.random() * 2)], {
              damping: 10,
              mass: 0.03,
              restDisplacementThreshold: 6,
            }),
            withSpring(0, { mass: 0.4, damping: 2 })
          );
        }}>
        <Text style={styles.text}>Pet the penguin</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 400,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
