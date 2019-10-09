import React from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Image, Input, Segment
} from 'semantic-ui-react';

import './Login.css'
import { useAuth0 } from "../../react-auth0-wrapper";

import fidenzLogo from '../../assets/images/fidenz.svg'
import billarShield from '../../assets/images/billar_shield.png'

const Login = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect({})
    };

    return (
        <div style={{backgroundColor: "#E4E5E6"}} className='backImage'>
            <Grid columns={4} divided style={{height: '100vh'}} className='darkOverlay'>
                <Grid.Row centered stretched verticalAlign='middle'>
                    <Grid.Column width={8}
                                 mobile="14"
                                 tablet="8"
                                 largeScreen="4"
                                 widescreen="4" style={{backgroundColor: 'white', padding: 40}} textAlign='center'>

                        <Image src={fidenzLogo} size='medium' style={{margin: 'auto'}}/>
                        <br/>
                        <br/>
                        <Image src={billarShield} size='small' style={{margin: 'auto'}}/>
                        <br/>
                        <br/>
                        <p>Login will redirect you to <b>Auth0</b> authentication.</p>
                        <Form>
                            <Button primary type='submit' style={{width:'100%'}}
                                    onClick={handleLogin}>Login</Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default Login