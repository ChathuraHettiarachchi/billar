import React, {Component} from 'react'
import {Button, Image, Menu} from 'semantic-ui-react'
import {useAuth0} from "../../react-auth0-wrapper";

import BillarWhite from '../../assets/images/billar_white.png'

function TopNavigation(props) {

    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    return (
        <Menu fixed="top" stackable inverted borderless fluid widths={1}>
            <Menu.Item>
                <Image src={BillarWhite} size='tiny' />
                {isAuthenticated &&
                <Button style={{width: '100px', position: 'absolute', right:'15px', top:'15px'}} primary onClick={() => logout()}>Log out</Button>}
            </Menu.Item>
        </Menu>
    )
}

export default TopNavigation;