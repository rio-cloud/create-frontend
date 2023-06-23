declare global {
    interface Window {
        dataLayer?: any[];
    }
}

export interface GAEvent {
    category: string;
    action: string;
    label: string;
}

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

export const executeAndTrack =
    (func: Function, value: GAEvent) =>
    (...args: any) => {
        func.apply(null, args);
        gaPush(value);
    };

export interface TrackingValues {
    trigger: 'click' | 'visibility';
    category: string;
    action: string;
    label: string;
    value: string;
}

export interface TrackingAttributes {
    'data-track-ga-event-trigger': string;
    'data-track-ga-event-category': string;
    'data-track-ga-event-action': string;
    'data-track-ga-event-label'?: string;
    'data-track-ga-event-value'?: string;
}

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
