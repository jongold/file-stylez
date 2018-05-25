import * as React from 'react';
import { Button, Flex, Box, Image } from 'rebass';

interface Props {
  href: string;
  bg?: string;
  color?: string;
}

export const FigmaLoginButton: React.SFC<Props> = ({
  href,
  bg = 'base',
  color = 'mono.0',
}) => (
  <Button is="a" href={href} bg={bg} color={color} py={2}>
    <Flex alignItems="center">
      <Image
        src="/static/figma.svg"
        width="16px"
        mr={3}
        mb={'-5px'}
        mt={'1px'}
      />
      Login with Figma
    </Flex>
  </Button>
);
