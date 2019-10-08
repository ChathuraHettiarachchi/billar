import React, {useEffect, useState} from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";
import Loader from "react-loader-spinner";

const QuotCreateStepOne = (props) => {

    const [clientList, setClients] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(process.env.REACT_APP_BASE_URL + 'clients/');
            const json = await res.json();

            setLoading(false);

            let clients = [];
            let cList = json.content.clients;
            for (var i = 0; i < cList.length; i++) {
                clients.push({
                    "text": (cList[i].code + "  (" + cList[i].name + ")"),
                    "key": cList[i].client_id,
                    "value": cList[i].client_id
                })
            }

            setClients(clients);
        };


        fetchData();
    }, []);

    const handleClientSelection = (e, data) => {
        setClientId(data.value)
    };

    const onContinue = () => {
        props.history.push('/quotation/step2/' + clientId + '/new');
    };

    let content;
    if (isLoading) {
        content =
            <div>
                <div style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    <Loader type="Plane" color="blue" height="100" width="100"/>
                </div>
            </div>
    } else {
        content =
            <Form>
                <Form.Select fluid label='Client' placeholder='Client' options={clientList} width={8}
                             onChange={handleClientSelection} name='clientId' value={clientId}/>
                <Button primary onClick={onContinue}>Continue</Button>
            </Form>
    }

    return (
        <div>
            <Segment>
                <Header>Please select a cline to continue</Header>
                <br/>
                {content}
            </Segment>
        </div>
    );
};


export default QuotCreateStepOne