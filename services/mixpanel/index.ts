import { isDevelopmentEnv } from '@/constants/device';
import mixpanel from 'mixpanel-browser';

export class Mixpanel {
  /**
   * Initialize Mixpanel.
   */
  static init() {
    // Do not initialize Mixpanel in a development environment or if the
    // token is not set.
    if (isDevelopmentEnv || !process.env.NEXT_PUBLIC_MIXPANEL_PUBLIC_TOKEN)
      return;

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PUBLIC_TOKEN, {
      debug: isDevelopmentEnv,
      persistence: 'localStorage',
      track_pageview: 'url-with-path'
    });
  }
}
