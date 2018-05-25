import { Query, Visitor } from './types';
import { ascend, descend, sortWith, prop, uniq } from 'ramda';

export interface TypeStyle {
  fontFamily: string;
  fontSize: number;
}

const sortByFontFamilyAndSize = sortWith([
  ascend(prop('fontFamily')),
  descend(prop('fontSize')),
]);

export const getTypeStyles: Query<TypeStyle> = file => {
  const results: TypeStyle[] = [];

  const visit: Visitor = node => {
    if (node.type === 'TEXT') {
      const { fontFamily, fontSize, fontPostScriptName } = node.style;

      results.push({
        fontFamily,
        fontSize,
      });
    }

    if ('children' in node) {
      node.children.forEach(visit);
    }
  };

  visit(file.document);

  return sortByFontFamilyAndSize(results) as TypeStyle[]; // ugh
};

export const getUniqueTypeStyles = file => uniq(getTypeStyles(file));
