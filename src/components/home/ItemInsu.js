import React from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import { screen } from '../../config/System';
import { Actions } from 'react-native-router-flux';

const onPress = (type) => {
  switch(type) {
    case 'oto':
      return Actions.carProducer();
    default: 
      return;
  }
}
const ItemInsu = ({
    data,
}) => (
    <TouchableOpacity onPress={() => onPress(data.type)} style={{backgroundColor: '#fff', marginLeft: data.left, marginRight: data.right, paddingTop: 10, padding: 5, marginTop: 15, borderRadius: 5, width: (screen.width- 60)/3 }}>
      <View style={{height: 40, justifyContent: 'center',alignItems: 'center'}}>
        <Image style={{width: data.width, height: data.height}} source={data.icon}/>
      </View>
      <Text style={{textAlign: 'center', color: '#323643', marginTop: 8}}>Bảo hiểm</Text>
      <Text style={{textAlign: 'center', color: '#323643'}}>{data.title}</Text>
    </TouchableOpacity>
);

export default ItemInsu;
