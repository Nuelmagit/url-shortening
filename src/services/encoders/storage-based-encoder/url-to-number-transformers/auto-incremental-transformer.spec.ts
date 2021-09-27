import { INITIAL_URL_NUMERIC_VALUE } from '../../constants/initial-url-numeric-value';
import { AutoIncrementalTransformer } from './auto-incremental-transformer';

const TEST_URL = 'www.google.com';

describe('AutoIncrementalTransformer', () => {
  let autoIncrementalTransformer: AutoIncrementalTransformer;

  beforeEach(async () => {
    autoIncrementalTransformer = new AutoIncrementalTransformer();
  });

  it('Should return INITIAL_URL_NUMERIC_VALUE', () => {
    expect(autoIncrementalTransformer.urlToNumber(TEST_URL)).toBe(
      INITIAL_URL_NUMERIC_VALUE,
    );
  });

  it('Should return the same number for the same url', () => {
    let counter = 0;

    while (counter < 150) {
      const numericUrl = autoIncrementalTransformer.urlToNumber(TEST_URL);
      expect(numericUrl).toBe(INITIAL_URL_NUMERIC_VALUE);
      counter++;
    }
  });

  it('Should return different numbers for different urls', () => {
    let counter = 0;

    const numericUrls = [];

    while (counter < 150) {
      const numericUrl = autoIncrementalTransformer.urlToNumber(
        `${TEST_URL}${counter}`,
      );
      expect(numericUrls.includes(numericUrl)).toBe(false);
      numericUrls.push(numericUrl);
      counter++;
    }
  });
});
