/**
 * Since interfaces only exists during compiling time
 * a class is needed in order to be used as Injection Token
 */
export abstract class UrlToNumberTransformer {
  abstract urlToNumber(url: string): number;
}
