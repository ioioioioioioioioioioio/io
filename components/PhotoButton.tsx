import { useState } from 'react';
import React, { TouchableOpacity, Image } from 'react-native';
import ImageView from 'react-native-image-viewing';

export default function PhotoButton({ uri }: { uri: string }) {
  const [visible, setIsVisible] = useState(false);
  return (
    <TouchableOpacity onPress={() => setIsVisible(true)}>
      <Image
        source={{ uri, width: 75, height: 75 }}
        style={{ marginLeft: 'auto', marginRight: 10 }}
      />
      <ImageView
        images={[{ uri }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </TouchableOpacity>
  );
}
