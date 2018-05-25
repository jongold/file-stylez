import * as React from 'react';
import * as Color from 'color';
import { Text } from 'rebass';

interface Props {
  hex: string;
}

const white = Color('#fff');

const textColor = (hex: string): string => {
  const a = Color(hex);
  const vsWhite = a.contrast(white);
  if (vsWhite > 4) {
    return '#fff';
  }

  return a.darken(0.7).hex();
};

export const Swatch: React.SFC<Props> = ({ hex }) => (
  <div
    style={{
      background: hex,
      height: 144,
      marginRight: 8,
      marginBottom: 8,
      width: 144,
      padding: 8,
      borderRadius: 4,
    }}
  >
    <Text
      style={{
        color: textColor(hex),
      }}
    >
      {hex}
    </Text>
  </div>
);
