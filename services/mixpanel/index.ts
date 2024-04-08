import { isDevelopmentEnv } from "@/constants/device";
import mixpanel, { Mixpanel as MixpanelType } from "mixpanel-browser";

export class Mixpanel {
  static mixpanelClient: MixpanelType;

  /**
   * Initialize Mixpanel.
   */
  static init() {
    // Do not initialize Mixpanel in a development environment or if the
    // token is not set.
    if (isDevelopmentEnv || !process.env.NEXT_PUBLIC_MIXPANEL_PUBLIC_TOKEN) {
      return;
    }

    this.mixpanelClient = mixpanel.init(
      process.env.NEXT_PUBLIC_MIXPANEL_PUBLIC_TOKEN,
      {
        debug: isDevelopmentEnv,
        persistence: "localStorage",
        track_pageview: "url-with-path",
      },
      "mixpanel",
    );
  }

  /**
   * Returns the device ID for the current user.
   */
  static getDeviceId(): string | undefined {
    return (
      this.mixpanelClient && this.mixpanelClient.get_property("$device_id")
    );
  }
}
