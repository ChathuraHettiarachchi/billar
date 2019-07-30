import React, {useState} from 'react';
import {
    Form
} from "semantic-ui-react";

const Terms = ({onTermsChange}) => {

    const [terms, setTerms] = useState('');

    const handleOnTermsChange = (e) => {
        setTerms(e.target.value);

        onTermsChange(terms);
    };

    return (
        <div>
            <Form>
                <Form.Field>
                    <Form.TextArea label='Terms' placeholder='Terms and Conditions' style={{marginBottom:'20px'}} name='terms' value={terms} onChange={handleOnTermsChange}/>
                </Form.Field>
            </Form>
        </div>
    );
};

export default Terms