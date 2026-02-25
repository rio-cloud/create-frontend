import ErrorState from '@rio-cloud/rio-uikit/ErrorState';
import { FormattedMessage } from 'react-intl';

type ErrorFallbackProps = {
    errorMessage?: string;
};

const ErrorFallback = ({ errorMessage }: ErrorFallbackProps) => (
    <ErrorState
        outerClassName='margin-top-20'
        headline={<FormattedMessage id='intl-msg:common-message.error.generic.headline' />}
        message={
            <>
                <FormattedMessage id='intl-msg:common-message.error.generic.message' />
                {errorMessage && <div className='margin-top-15 text-color-dark'>{errorMessage}</div>}
            </>
        }
    />
);

export default ErrorFallback;
