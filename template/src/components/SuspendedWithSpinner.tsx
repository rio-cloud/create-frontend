import Spinner from '@rio-cloud/rio-uikit/Spinner';
import { type PropsWithChildren, Suspense } from 'react';

const SuspendedWithSpinner = ({ children }: PropsWithChildren) => (
    <Suspense fallback={<Spinner isFullSized />}>{children}</Suspense>
);

export default SuspendedWithSpinner;
