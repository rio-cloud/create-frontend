import { PropsWithChildren, Suspense } from 'react';
import Spinner from '@rio-cloud/rio-uikit/Spinner';

const SuspendedWithSpinner = ({ children }: PropsWithChildren) => (
    <Suspense fallback={<Spinner isFullSized />}>{children}</Suspense>
);

export default SuspendedWithSpinner;
