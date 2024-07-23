import ErrorState from '@rio-cloud/rio-uikit/ErrorState';

const AppErrorPage = () => (
    <ErrorState
        outerClassName="margin-top-20"
        headline="Something went very wrong"
        message="We're sorry, the application encountered an unexpected error. Please try again later."
    />
);

export default AppErrorPage;
