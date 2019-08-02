import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    Header,
    Segment,
    Form,
    Button
} from "semantic-ui-react";
import Loader from "react-loader-spinner";
import axios from 'axios';
import {SliderPicker} from 'react-color';


const StatusForm = (props) => {

    const [pageType, setPageType] = useState(((props.location.pathname).split("/"))[3]);
    const [isLoading, setLoading] = useState(true);
    const [pageTitle, setTitle] = useState('Create New Project Status');
    const [status, setStatus] = useState({
        status_id: ((props.location.pathname).split("/"))[2],
        title: '',
        color: ''
    });

    useEffect(() => {
        if (pageType === 'new') {
            setLoading(false);
        } else if (pageType === 'view' || pageType === 'edit') {
            const fetchData = () => {
                console.log(pageType)
                axios.get(process.env.REACT_APP_BASE_URL + 'status/' + status.status_id)
                    .then(res => {
                        console.log(res.data);
                        setLoading(false);

                        let content = res.data.content.status;

                        if (pageType === 'view') {
                            setTitle("'" + content.title + "' Info");
                        } else {
                            setTitle("Edit '" + content.title + "' Info");
                        }

                        setStatus({
                            ...status,
                            title: content.title,
                            color: content.color
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        setTitle("Something went wrong");
                        setLoading(false);
                    });
            };

            fetchData();
        }
    }, []);

    const updateFieldData = e => {
        const {name, value} = e.target;
        setStatus({...status, [name]: value});
    };

    const handleColorChange = color => {
        setStatus({...status, color: color.hex});
    };

    const submitCreate = data => {
        setTitle("Creating...");
        setLoading(true);

        axios.post(process.env.REACT_APP_BASE_URL + 'status/new', {
            status
        }).then(res => {
            console.log(res);
            props.history.push('/status/index');
        }).catch(error => {
            console.log(error);
            setTitle("Create New Project Status");
            setLoading(false);
        });
    };

    const submitUpdate = data => {
        setTitle("Updating...");
        setLoading(true);

        axios.post(process.env.REACT_APP_BASE_URL + 'status/update/' + status.status_id, {
            status
        }).then(res => {
            console.log(res);
            props.history.push('/status/index');
        }).catch(error => {
            console.log(error);
            setTitle("Edit '" + status.title + "' Info");
            setLoading(false);
        });
    };


    let formData;
    if (pageType === 'new') {
        formData =
            <Form>
                <Form.Input fluid label='Status name' placeholder='Status name' value={status.title}
                            onChange={updateFieldData} name='title'/>
                <label>Color code</label>
                <br/>
                <br/>
                <SliderPicker
                    color={status.color}
                    onChangeComplete={handleColorChange}
                />
                <br/>
                <br/>
                <br/>
                <br/>
                <Button primary onClick={submitCreate}>Create New Project Status</Button>
            </Form>
    } else if (pageType === 'edit') {
        formData =
            <Form>
                <Form.Input fluid label='Status name' placeholder='Status name' value={status.title}
                            onChange={updateFieldData} name='title'/>
                <label>Color code</label>
                <br/>
                <br/>
                <SliderPicker
                    color={status.color}
                    onChangeComplete={handleColorChange}
                />
                <br/>
                <br/>
                <br/>
                <br/>
                <Button primary onClick={submitUpdate}>Update Project Status</Button>
            </Form>
    } else if (pageType === 'view') {
        formData =
            <Form>
                <Form.Input fluid label='Status name' placeholder='Status name' value={status.title}
                            readOnly name='title'/>
                <label>Color code</label>
                <br/>
                <br/>
                <SliderPicker
                    color={status.color}
                    disabled={true}
                />
            </Form>
    }

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
        content = formData
    }

    return (
        <div>
            <Segment>
                <Header>{pageTitle}</Header>
                <br/>
                {content}
            </Segment>
        </div>
    );
};


export default StatusForm