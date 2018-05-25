import { parse } from 'url';

export const figmaFileId = (value: string): string => {
  let id = '';

  if (value && value.match(/figma.com/i)) {
    const { path } = parse(value);
    if (path) {
      id = path.split('/')[2];
    }
  } else {
    id = value.split('/')[0];
  }

  return id;
};
