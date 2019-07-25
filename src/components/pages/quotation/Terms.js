import React, {useState} from 'react';
import {
    Form, Input
} from "semantic-ui-react";

function Terms() {
    return (
        <div>
            <Form>
                <Form.Field>
                    <Form.TextArea label='Terms' placeholder='Terms and Conditions' style={{marginBottom:'20px'}}/>
                </Form.Field>
            </Form>
        </div>
    );
}

export default Terms