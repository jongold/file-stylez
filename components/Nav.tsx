import * as React from 'react';
import { Column, Row, NavLink } from 'rebass';
import f from '../now.json';

interface Props {
  isLoggedIn: boolean;
  onLogout: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Nav: React.SFC<Props> = ({ isLoggedIn, onLogout }) => (
  <Row py={3}>
    <Column>
      <NavLink color="mono.2">{f.name}</NavLink>
    </Column>
    <Column flex="0">
      <NavLink
        color="mono.2"
        href={`https://github.com/jongold/${f.name}`}
        target="_blank"
      >
        GitHub
      </NavLink>
    </Column>
    {isLoggedIn && (
      <Column flex="0">
        <NavLink color="mono.2" onClick={onLogout}>
          Logout
        </NavLink>
      </Column>
    )}
  </Row>
);
