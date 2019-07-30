import React, {useState} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom';

function SideNavigation(props) {

    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (e, {name}) => {
        setActiveItem(name);
        console.log(name)
    };

    const getMenu = () => {
        return (
            <Menu fixed='left' vertical inverted stackable style={{marginTop: '52px'}}>
                <Menu.Item>
                    <Menu.Header>Dashboard</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item as={Link} to={'/'}
                            name='home'
                            active={activeItem === 'home'}
                            onClick={handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Sales</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item  as={Link} to={'/quotation/index'}
                            name='quotations'
                            active={activeItem === 'quotations'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='invoices' as={Link} to={'/invoice/index'}
                            active={activeItem === 'invoices'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='releases' as={Link} to={'/releases/index'}
                            active={activeItem === 'releases'}
                            onClick={handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Other</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item as={Link} to={'/client/index'}
                            name='clients'
                            active={activeItem === 'clients'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item as={Link} to={'/status/index'}
                            name='projectStatus'
                            active={activeItem === 'projectStatus'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='users'
                            active={activeItem === 'users'}
                            onClick={handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        )
    };

    return (
        <div className='parent'>
            <div className='side'>
                {getMenu()}
            </div>
            <div className='content'>
                {props.children}
            </div>
        </div>
    )
}

export default SideNavigation