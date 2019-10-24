import React from 'react'
import SideNavigation from './navigation/SideNavigation'
import TopNavigation from './navigation/TopNavigation'

export default props => (
    <div className="grid">
        <div className="menu">
            <TopNavigation/>
        </div>
        <div className="main-content">
            <SideNavigation>
                {props.children}
            </SideNavigation>
        </div>
    </div>
)