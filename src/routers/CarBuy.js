
import {Easing, Animated } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import CarProducer from '../car/screens/buy/CarProducer';
import CarPrice from '../car/screens/buy/CarPrice';
import Buy from '../screens/tab/Buy';

const CarBuy = createStackNavigator(
  {
    buy: Buy,
    carProducer: CarProducer,
    carPrice: CarPrice
  },
  {
    initialRouteName: 'carProducer',
    navigationOptions: () => ({
      header: null,
    }),
    transitionConfig: () => {
      return {
        transitionSpec: {
          duration: 500,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {      
          const { layout, position, scene } = sceneProps
    
          const thisSceneIndex = scene.index
          const width = layout.initWidth
          const height = layout.initHeight
          
          const opacity = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex],
            outputRange: [0, 1],
          })

          const translateY = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [height, 0, 0]
          })

          // const translateX = position.interpolate({
          //   inputRange: [thisSceneIndex - 1, thisSceneIndex],
          //   outputRange: [width, 0],
          // })

          const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [width, 0, 0]
          })
          const slideFromRight = { transform: [{ translateX }] }
    
          // return { transform: [ { fromRight } ] , opacity}
          return slideFromRight
        },
      }
    }
  }
)

export default CarBuy
