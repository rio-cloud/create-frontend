import omit from 'lodash/omit';
import type { PropsWithChildren } from 'react';

type MockComponentProps = {
    name: string;
    data?: Record<string, unknown>;
};

const MockComponent = ({ name, data, children }: PropsWithChildren<MockComponentProps>) => (
    <div className='MockComponent' data-testid={`MockComponent-${name}`}>
        <div>{name}</div>
        {data && <div>{JSON.stringify(omit(data, ['children']))}</div>}
        <div>{children}</div>
    </div>
);

export default MockComponent;
