import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'

export default class SideNavigation extends Component {
    state = {};
    handleItemClick = name => this.setState({activeItem: name});

    getMenu() {
        const {activeItem} = this.state;

        return (
            <Menu fixed='left' vertical inverted stackable style={{marginTop: '52px'}}>
                <Menu.Item>
                    <Menu.Header>Dashboard</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='home'
                            active={activeItem === 'home'}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Sales</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='quotations'
                            active={activeItem === 'quotations'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='invoices'
                            active={activeItem === 'invoices'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='releases'
                            active={activeItem === 'releases'}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>

                <Menu.Item>
                    <Menu.Header>Other</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                            name='clients'
                            active={activeItem === 'clients'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='projects'
                            active={activeItem === 'projects'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='projectStatus'
                            active={activeItem === 'projectStatus'}
                            onClick={this.handleItemClick}
                        />
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        )
    }


    render() {
        return (
            <div className='parent'>
                <div className='side'>
                    {this.getMenu()}
                </div>
                <div className='content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}