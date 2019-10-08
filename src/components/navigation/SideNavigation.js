import React, {useEffect, useState} from 'react'
import {Button, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom';

function SideNavigation(props) {

    const [activeItem, setActiveItem] = useState(((window.location.href).split("/"))[3]);

    useEffect(() => {
        try {
            let selected = ((window.location.href).split("/"))[3];
            if (selected === 'quotation') {
                setActiveItem('quotations')
            } else if (selected === 'status') {
                setActiveItem('projectStatus')
            } else if (selected === 'invoice') {
                setActiveItem('invoices')
            } else if (selected === 'client') {
                setActiveItem('clients')
            } else if (selected === 'releases'){
                setActiveItem('releases')
            } else {
                setActiveItem('home')
            }

            console.log("Active: " + activeItem);
        } catch (e) {
            setActiveItem('home')
        }
    }, []);


    const handleItemClick = (e, {name}) => {
        setActiveItem(name);
    };

    const getMenu = (item) => {
        return (
            <Menu fixed='left' vertical inverted style={{marginTop: '52px'}}>
                <Menu.Item>
                    <Menu.Header>Dashboard</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item as={Link} to={'/'}
                                   name='home'
                                   active={item === 'home'}
                                   onClick={handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Sales</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item as={Link} to={'/quotation/index'}
                                   name='quotations'
                                   active={item === 'quotations'}
                                   onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='invoices' as={Link} to={'/invoice/index'}
                            active={item === 'invoices'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='releases' as={Link} to={'/releases/index'}
                            active={item === 'releases'}
                            onClick={handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Other</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item as={Link} to={'/client/index'}
                                   name='clients'
                                   active={item === 'clients'}
                                   onClick={handleItemClick}
                        />
                        <Menu.Item as={Link} to={'/status/index'}
                                   name='projectStatus'
                                   active={item === 'projectStatus'}
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
                {getMenu(activeItem)}
            </div>
            <div className='content'>
                {props.children}
            </div>
        </div>
    )
}

export default SideNavigation