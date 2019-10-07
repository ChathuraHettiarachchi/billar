import React from 'react';

import BillarNavigation from "./components/BillarNavigation";
import { useAuth0 } from "./react-auth0-wrapper";

function App() {

    const { loading } = useAuth0();

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className="App">
            <header>
                <BillarNavigation />
            </header>
        </div>
    );
}

export default App;
