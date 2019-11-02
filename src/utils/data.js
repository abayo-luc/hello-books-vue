import {
  chunk
} from 'lodash';

export const D3transform = data => chunk(data, 3);

export const isEmpty = () => true;
