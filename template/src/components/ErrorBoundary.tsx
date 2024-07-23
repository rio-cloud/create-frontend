import React, { ErrorInfo, PropsWithChildren, ReactNode } from 'react';

export class ErrorBoundary extends React.Component<PropsWithChildren<{ fallback: ReactNode }>, { hasError: boolean }> {
    constructor(props: PropsWithChildren<{ fallback: ReactNode }>) {
        super(props);
        this.state = { hasError: false };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(error: unknown) {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
        console.error('Unexpected error in boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
