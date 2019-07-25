import React, {useState}  from 'react';
import {Link} from 'react-router-dom';
import {
    Header,
    Segment,
    Form,
    Button
} from "semantic-ui-react";
import COUNTRY_OPTIONS from "../../../assets/data/countriesData";

function QuotCreateStepOne() {

    const clientList = [
        {"text": "Sample 1", "key": "S1", "value": "S1"},
        {"text": "Sample 2", "key": "S2", "value": "S2"},
        {"text": "Sample 3", "key": "S3", "value": "S3"}
    ];

    return (
        <div>
            <Segment>
                <Header>Please select a cline to continue</Header>
                <br/>
                <Form>
                    <Form.Select fluid label='Client' placeholder='Client' options={clientList} width={8}/>
                    <Button primary as={Link} to={'/quotation/step2'}>Continue</Button>
                </Form>
            </Segment>
        </div>
    );
}


export default QuotCreateStepOne