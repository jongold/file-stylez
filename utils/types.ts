import * as Figma from 'figma-js';

export type Query<T> = (file: Figma.FileResponse) => T[];

export type Visitor = (node: Figma.Node) => void;

export type ValidNode = (node: Figma.Node) => boolean;
