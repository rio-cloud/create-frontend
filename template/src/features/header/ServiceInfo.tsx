import { Link } from 'react-router';
import ActionBarItem from '@rio-cloud/rio-uikit/ActionBarItem';
import { FormattedMessage } from 'react-intl';

const ServiceInfo = () => {
    const handleClick = () => {};

    const title = (
        <div>
            <span>
                <FormattedMessage id='intl-msg:starterTemplate.moduleName' />
            </span>
            <span className='text-color-gray margin-left-10'>{APP_VERSION}</span>
        </div>
    );

    return (
        <ActionBarItem id='serviceInfo' className='myItem'>
            <ActionBarItem.Icon>
                <span className='icon rioglyph rioglyph-info-sign' />
            </ActionBarItem.Icon>
            <ActionBarItem.Popover title={title}>
                <ActionBarItem.List>
                    <ActionBarItem.ListItem icon='rioglyph-hand-right' onClick={handleClick}>
                        Release notes
                    </ActionBarItem.ListItem>
                    <ActionBarItem.ListItem icon='rioglyph-exclamation-sign'>
                        <Link to='/abcd'>Link</Link>
                    </ActionBarItem.ListItem>
                </ActionBarItem.List>
            </ActionBarItem.Popover>
        </ActionBarItem>
    );
};

export default ServiceInfo;
