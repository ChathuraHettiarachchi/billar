import React from 'react'
import SideNavigation from './navigation/SideNavigation'
import TopNavigation from './navigation/TopNavigation'

export default props => (
    <div>
        <div>
            <TopNavigation/>
        </div>
        <div>
            <SideNavigation/>
        </div>
    </div>
)