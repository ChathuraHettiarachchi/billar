import React, {useState} from 'react'
import {Button, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import { useAuth0 } from "../../react-auth0-wrapper";

function SideNavigation(props) {

    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (e, {name}) => {
        setActiveItem(name);
        console.log(name);
        // window.location.reload();
    };

    const getMenu = () => {
        return (
            <Menu fixed='left' vertical inverted style={{marginTop: '52px'}}>
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
                        <Menu.Item as={Link} to={'/quotation/index'}
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
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    {isAuthenticated && <Button style={{width: '100%'}} primary onClick={() => logout()}>Log out</Button>}
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