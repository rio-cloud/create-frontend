import SuspendedWithSpinner from '../components/SuspendedWithSpinner';
import { type ComponentType, lazy, type PropsWithoutRef } from 'react';

type DynamicImportFactory<T> = () => Promise<{ default: ComponentType<T> }>;

/**
 * Lazy-loads the given dynamic import and renders the imported component in a suspense with a big spinner as fallback.
 */
export const suspendPageLoad = <PropsType extends {}>(factory: DynamicImportFactory<PropsType>) => {
    const LazyComponent = lazy(factory);
    return (props: PropsWithoutRef<PropsType>) => (
        <SuspendedWithSpinner>
            <LazyComponent {...props} />
        </SuspendedWithSpinner>
    );
};
