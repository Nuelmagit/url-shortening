import { INITIAL_URL_NUMERIC_VALUE } from '../../constants/initial-url-numeric-value';
import { AutoIncrementalTransformer } from './auto-incremental-transformer';

describe('AutoIncrementalTransformer', () => {
  let autoIncrementalTransformer: AutoIncrementalTransformer;

  beforeEach(async () => {
    autoIncrementalTransformer = new AutoIncrementalTransformer();
  });

  it('Should return INITIAL_URL_NUMERIC_VALUE', () => {
    expect(autoIncrementalTransformer.urlToNumber('www.google.com')).toBe(
      INITIAL_URL_NUMERIC_VALUE,
    );
  });

  it('Should return same the numer for the same url', () => {
    expect(true).toBe(false);
  });

  it('should return different numbers for different urls', () => {
    expect(true).toBe(false);
  });
});
