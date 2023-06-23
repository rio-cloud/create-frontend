import { FormattedMessage } from 'react-intl';
import MyForm from '../features/myForm/MyForm';

const Intro = () => (
    <div className="intro">
        <h1>
            <FormattedMessage id="intl-msg:starterTemplate.sublink.intro" />
        </h1>
        <div className="panel panel-default shadow-default">
            <div className="panel-body">{'Hello there!'}</div>
        </div>
        <div className="panel panel-default shadow-default">
            <div className="panel-body padding-25">
                <MyForm />
            </div>
        </div>
    </div>
);

export default Intro;
