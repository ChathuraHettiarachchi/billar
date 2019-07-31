import React, {useState, useEffect} from 'react';
import {
    Button,
    Form
} from "semantic-ui-react";

const Terms = ({onTermsChange, pageType, data}) => {

    const [term, setTerms] = useState(data);

    useEffect(() => {
        setTerms(data);
    }, []);

    const handleOnTermsChange = (e) => {
        setTerms(e.target.value);

        onTermsChange(term);
    };

    let formData;
    if (pageType === 'new' || pageType === 'edit') {
        formData =
            <Form.TextArea label='Terms' placeholder='Terms and Conditions' style={{marginBottom: '20px'}}
                           name='term' value={term} onChange={handleOnTermsChange}/>
    }else {
        formData =
            <Form.TextArea label='Terms' placeholder='Terms and Conditions' style={{marginBottom: '20px'}}
                           name='term' value={term} onChange={handleOnTermsChange} readOnly/>
    }

    return (
        <div>
            <Form>
                <Form.Field>
                    {formData}
                </Form.Field>
            </Form>
        </div>
    );
};

export default Terms