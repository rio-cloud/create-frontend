declare global {
    interface Window {
        dataLayer?: unknown[];
    }
}

export type GAEvent = {
    category: string;
    action: string;
    label: string;
};

export const gaPush = (gaEvent: GAEvent) => {
    if (window.dataLayer) {
        window.dataLayer.push({
            event: 'ga_event',
            eventCategory: gaEvent.category,
            eventAction: gaEvent.action,
            eventLabel: gaEvent.label,
        });
    }
};

export const TRACKING_ACTIONS = {};

export const TRACKING_LABELS = {};

type AnyFunction = (...args: unknown[]) => unknown;

export const executeAndTrack =
    <T extends AnyFunction>(func: T, value: GAEvent) =>
    (...args: Parameters<T>) => {
        func.apply(null, args);
        gaPush(value);
    };

export type TrackingValues = {
    trigger: 'click' | 'visibility';
    category: string;
    action: string;
    label: string;
    value: string;
};

export type TrackingAttributes = {
    'data-track-ga-event-trigger': string;
    'data-track-ga-event-category': string;
    'data-track-ga-event-action': string;
    'data-track-ga-event-label'?: string;
    'data-track-ga-event-value'?: string;
};

export const getTrackingAttributes = (param: TrackingValues) => {
    const { trigger, category, action, label, value } = param;

    const attributes: TrackingAttributes = {
        'data-track-ga-event-trigger': trigger,
        'data-track-ga-event-category': category,
        'data-track-ga-event-action': action || `action_${trigger}`,
    };

    if (label) {
        attributes['data-track-ga-event-label'] = `additional::${label}`;
    }

    if (value) {
        attributes['data-track-ga-event-value'] = value;
    }

    return attributes;
};
