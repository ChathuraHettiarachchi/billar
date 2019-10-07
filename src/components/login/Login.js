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
import background from '../../assets/images/background_login.jpg'

const Login = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div style={{backgroundColor: "#E4E5E6"}} className='backImage'>
            <Grid columns={4} divided style={{height: '100vh'}} className='darkOverlay'>
                <Grid.Row centered stretched verticalAlign='middle'>
                    <Grid.Column width={8}
                                 mobile="14"
                                 tablet="8"
                                 largeScreen="4"
                                 widescreen="4" style={{backgroundColor: 'white', padding: 40}} textAlign='center'>
                        <Header as='h1'>Login</Header>
                        <p style={{marginBottom: '20px', marginTop: '-10px'}}>Sign in to your account</p>
                        <Form>
                            <Form.Field>
                                <Input icon='user' iconPosition='left' placeholder='Username'/>
                            </Form.Field>
                            <Form.Field>
                                <Input icon='lock' iconPosition='left' placeholder='Password'/>
                            </Form.Field>
                            <Button primary type='submit' style={{width:'100%'}}
                                    onClick={loginWithRedirect({})}>Submit</Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default Login