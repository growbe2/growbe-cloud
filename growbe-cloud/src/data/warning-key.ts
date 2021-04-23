import {GrowbeWarningKey} from '../models/growbe-warning-key.model';

export const RTC_OFFSET_KEY = 'RTC_OFFSET';

export const DEFAULT_WARNING_KEY: Partial<GrowbeWarningKey>[] = [
  {
    key: RTC_OFFSET_KEY,
    multi: false,
  },
];
