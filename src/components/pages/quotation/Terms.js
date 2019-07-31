import React, {useState, useEffect} from 'react';
import {
    Button,
    Form
} from "semantic-ui-react";

const Terms = ({onTermsChange, pageType, data}) => {

    const [term, setTerms] = useState(data);
    const [readOnly, setReadOnly] = useState((pageType === 'new' || pageType === 'edit'));

    useEffect(() => {
        setTerms(data);
    }, []);

    const handleOnTermsChange = (e) => {
        setTerms(e.target.value);

        onTermsChange(term);
    };

    return (
        <div>
            <Form>
                <Form.Field>
                    <Form.TextArea label='Terms' placeholder='Terms and Conditions' style={{marginBottom: '20px'}}
                                   name='term' value={term} onChange={handleOnTermsChange} readOnly={!readOnly}/>
                </Form.Field>
            </Form>
        </div>
    );
};

export default Terms