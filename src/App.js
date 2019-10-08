import React from 'react';

import BillarNavigation from "./components/BillarNavigation";
import {useAuth0} from "./react-auth0-wrapper";
import Loader from "react-loader-spinner";

function App() {

    const {loading} = useAuth0();

    if (loading) {
        return (

            <div>
                <div style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    <Loader type="Triangle" color="blue" height="100px" width="100px"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <header>
                <BillarNavigation/>
            </header>
        </div>
    );
}

export default App;
