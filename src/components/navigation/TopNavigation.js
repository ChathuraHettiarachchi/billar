import React, {Component} from 'react'
import {Image, Menu} from 'semantic-ui-react'

import BillarWhite from '../../assets/images/billar_white.png'

export default class TopNavigation extends Component {
    render() {
        return (
            <Menu fixed="top" stackable inverted borderless fluid widths={1}>
                <Menu.Item>
                    <Image src={BillarWhite} size='tiny' />
                </Menu.Item>
            </Menu>
        )
    }
}
