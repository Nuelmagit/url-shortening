import { GeneralDecodeListener } from './general-decode.listener';
import { GeneralEncodeListener } from './general-encode.listener';
import { UrlStatisticListener } from './url-statistic.listener';

export const listeners = [
  GeneralEncodeListener,
  GeneralDecodeListener,
  UrlStatisticListener,
];
