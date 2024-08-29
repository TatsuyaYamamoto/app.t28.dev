import { Ga4Parameters, sendEvent as _sendEvent } from "shared/helpers/ga";

export type EventName = "click" | "submit";

export type CustomDimensions = "app" | "click_target" | "label";

export type CustomMetrics = "value";

type Params = Ga4Parameters<CustomDimensions, CustomMetrics>;

export const sendEvent = (evenName: EventName, eventParams?: Params) => {
  const params: Params = {
    app: "oshamoji",
    ...eventParams,
  };

  _sendEvent(evenName, params);
};
