// 開発環境は、debug_mode: true を設定する
const GA_TRACKING_ID = "G-G1W2QZ0HDW";

export type Ga4Parameters<
  CustomDimensions extends string = string,
  CustomMetrics extends string = string,
> =
  | {
      [key in CustomDimensions]?: string;
    }
  | {
      [key in CustomMetrics]?: number;
    };

/**
 * https://developers.google.com/analytics/devguides/migration/measurement/virtual-pageviews?hl=ja
 */
export const sendVirtualPageView = (virtualPathname: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_location: location.origin + virtualPathname,
  });
};

/**
 * https://developers.google.com/tag-platform/devguides/events?hl=ja#google_analytics_4_events
 * https://support.google.com/analytics/answer/9267744?hl=ja
 */
export const sendEvent = (
  eventName: string,
  eventParams: Ga4Parameters = {},
) => {
  // 文字列長の制限を超えたら、切り捨てる
  const eventName_truncated = eventName.slice(0, 40);
  // 警告
  if (eventName_truncated !== eventName) {
    console.error(
      `Length of event name is limited to 40. Drop excess before sending. See analytics help (https://support.google.com/analytics/answer/9267744?hl=ja)`,
      { eventName, eventName_truncated },
    );
  }

  const eventParams_truncated: Ga4Parameters = {};

  Object.keys(eventParams).forEach((eventParamKey) => {
    // 文字列長の制限を超えたら、切り捨てる
    const eventParamKey_truncated = eventParamKey.slice(0, 40);
    // 警告
    if (eventParamKey_truncated !== eventParamKey) {
      console.error(
        `Length of parameter name is limited to 40. Drop excess before sending. See analytics help (https://support.google.com/analytics/answer/9267744?hl=ja)`,
        { eventParamKey, eventParamKey_truncated },
      );
    }

    const eventParamValue = eventParams[eventParamKey];
    if (typeof eventParamValue === "string") {
      // 文字列長の制限を超えたら、切り捨てる
      const eventParamValue_truncated = eventParamValue.slice(0, 100);
      eventParams_truncated[eventParamKey_truncated] =
        eventParamValue_truncated;

      // 警告
      if (eventParamValue_truncated !== eventParamValue) {
        console.error(
          `Length of parameter value is limited to 100. Drop excess before sending. See analytics help (https://support.google.com/analytics/answer/9267744?hl=ja)`,
          { eventParamValue, eventParamValue_truncated },
        );
      }
    } else {
      // number, boolean はそのまま
      eventParams_truncated[eventParamKey_truncated] = eventParamValue;
    }
  });

  // 送信
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag("event", eventName_truncated, eventParams_truncated);
};
