import * as Figma from 'figma-js';
import {
  ascend,
  compose,
  map,
  or,
  propEq,
  sortBy,
  sortWith,
  uniq,
} from 'ramda';
import * as Color from 'color';
import { Query, Visitor } from './types';

const sortByHSL = (xs: Color[]): Color[] =>
  sortWith(
    [
      ascend(x => x.hue()),
      ascend(x => x.lightness()),
      ascend(x => x.saturationl()),
    ],
    xs,
  );

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

const ratioToRGB = ({ r, g, b }: Figma.Color): RGBColor => ({
  r: r * 255,
  g: g * 255,
  b: b * 255,
});

export const getColors: Query<string> = file => {
  // const results: Set<string> = new Set();
  let results: Color[] = [];

  const visit: Visitor = node => {
    if ('fills' in node) {
      const { fills } = node;

      const colors = fills
        .filter(f => f.type === 'SOLID')
        .filter(f => !!f.color)
        .map(f => Color(ratioToRGB(f.color)));

      results = [...results, ...colors];
    }

    if ('children' in node) {
      node.children.forEach(visit);
    }
  };

  visit(file.document);

  return compose(map((c: Color) => c.hex()), sortByHSL)(results);
};

export const getUniqueColors = file => uniq(getColors(file));
