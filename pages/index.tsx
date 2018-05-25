import * as React from 'react';
import { FigmaLoginButton } from '../components/FigmaLoginButton';
import { Provider, Pre } from 'rebass';
import theme from '../components/theme';
import * as Figma from 'figma-js';
import queryString from 'query-string';

import {
  Flex,
  Container,
  Box,
  Button,
  Input,
  Label,
  NavLink,
  Row,
  Column,
  Code,
  Text,
} from 'rebass';
import { figmaFileId } from '../utils/figmaFileId';
import { Nav } from '../components/Nav';
import { findTeamFiles } from '../utils/findTeamFiles';
import { getColors, getUniqueColors } from '../utils/getColors';
import {
  TypeStyle,
  getTypeStyles,
  getUniqueTypeStyles,
} from '../utils/getTypeStyles';
import { Swatch } from '../components/Swatch';

interface State {
  value: string;
  colors?: string[];
  typeStyles?: TypeStyle[];
  loading: boolean;
  accessToken?: string;
}

export default class Index extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      loading: false,
    };
  }

  componentDidMount() {
    const { access_token: accessToken } = queryString.parse(location.search);

    if (accessToken) {
      this.setState({
        accessToken: accessToken,
      });

      localStorage.setItem('accessToken', accessToken);
      return;
    }

    let localToken = localStorage.getItem('accessToken');

    if (localToken) {
      this.setState({ accessToken: localToken });
    }
  }

  onInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value.trim(),
    });
  };

  onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { value, accessToken } = this.state;

    if (!value || !accessToken) {
      return;
    }

    this.setState({ loading: true });

    const client = Figma.Client({
      accessToken,
    });

    try {
      const fileId = figmaFileId(value);
      // const fileSummaries = await findTeamFiles(client, value);

      // const fileKeys = fileSummaries.map(f => f.key);

      // const files = await Promise.all(
      //   fileKeys.map(key => client.file(key).then(r => r.data)),
      // );
      const { data: file } = await client.file(fileId);

      const colors = getUniqueColors(file);

      const typeStyles = getUniqueTypeStyles(file);
      // console.log
      this.setState({ colors, typeStyles, loading: false });
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
    }
  };

  onLogout = e => {
    e.preventDefault();

    window.localStorage.removeItem('accessToken');

    this.setState({ accessToken: null });
  };

  renderBody() {
    return (
      <Box>
        <Box is="form" onSubmit={this.onSubmitForm} mb={4}>
          <Label color="mono.2">Figma File URL</Label>
          <Input
            color="mono.2"
            border="1px solid !important"
            boxShadow="none"
            disabled={this.state.loading}
            fontSize={[1, 2, 3, 4]}
            p={[2, 2, 3]}
            placeholder="http://figma.com/file/123153/my-rad-file"
            onChange={this.onInput}
          />
        </Box>
        {this.state.loading && <Text color="mono.0">Loading…</Text>}
        {this.state.colors && (
          <Box mb={4}>
            <Text fontSize={2} mb={3}>
              {this.state.colors.length} unique colors
            </Text>
            <Flex flexWrap="wrap">
              {this.state.colors.map(d => <Swatch hex={d} key={d} />)}
            </Flex>
            {/* <pre>{JSON.stringify(this.state.typeStyles, null, 2)}</pre> */}
          </Box>
        )}
        {this.state.typeStyles && (
          <Box>
            <Text fontSize={2} mb={3}>
              {this.state.typeStyles.length} unique type styles
            </Text>
            <Box>
              {this.state.typeStyles.map(({ fontFamily, fontSize }) => (
                <Flex flexDirection="row" alignItems="baseline" mb={3}>
                  <Text
                    style={{ width: 36, position: 'relative', left: -36 }}
                    mr={3}
                    color="blue"
                  >
                    {fontSize}
                  </Text>
                  <Text
                    style={{
                      fontFamily: `${fontFamily}, sans-serif`,
                      fontSize,
                      fontWeight: 'bold',
                      lineHeight: 1,
                      textOverflow: 'clip',
                    }}
                    key={`${fontFamily}-${fontSize}`}
                  >
                    {fontFamily}
                  </Text>
                </Flex>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  }
  render() {
    return (
      <Provider theme={theme}>
        <Box style={{ minHeight: '100vh' }}>
          <Container>
            <Nav
              isLoggedIn={!!this.state.accessToken}
              onLogout={this.onLogout}
            />
            {this.state.accessToken ? (
              this.renderBody()
            ) : (
              <FigmaLoginButton
                bg="hue.3"
                color="base"
                href={`${process.env.AUTH_URL}/login`}
              />
            )}
          </Container>
        </Box>
      </Provider>
    );
  }
}
