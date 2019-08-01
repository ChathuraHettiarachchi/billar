import React, {useState, useEffect} from 'react';
import './Release.css'
import Moment from 'moment';

function ReleaseRow({data}) {

    const [releases, setRelease] = useState(data);

    useEffect(() => {
        setRelease(data)
    }, []);

    const getTableData = releases => {
        return releases.map((rel, index) =>
            <div key={index} className="column-rel-release" style={passedStyle(rel.release_date)}>
                <p>{Moment(rel.release_date).format('YYYY - MMMM - DD')}</p>
            </div>
        );
    };

    const datePassed = {
        backgroundColor: '#000000',
        color: '#ffffff'
    };

    const dateThisWeek = {
        backgroundColor: '#cc0000',
        color: '#ffffff'
    };

    const dateNextWeek = {
        backgroundColor: '#098c39',
        color: '#ffffff'
    };

    const dateOther = {
        backgroundColor: '#fff',
        color: '#000'
    };

    const passedStyle = date => {
        if (Moment() > Moment(date)){
            return datePassed;
        } else if (Moment().isoWeek() === Moment(date).isoWeek()){
            return dateThisWeek;
        } else if (Moment(date).isoWeek() === (Moment().isoWeek()+1)){
            return dateNextWeek;
        } else {
            return dateOther;
        }
    };

    return (
        <div>
            <div className="row-rel">
                <div className="column-rel">
                    <h4 style={{display: 'inline'}}>Client Name: </h4>
                    {releases[0].client_name}
                </div>
                <div className="column-rel">
                    <h4 style={{display: 'inline'}}>Client Code: </h4>
                    {releases[0].client_code}
                </div>
            </div>
            <div className="row-rel">
                <div className="column-rel">
                    <h4 style={{display: 'inline'}}>Quotation Code: </h4>
                    #{(Moment(releases[0].quotation_created_at).format('YYYYMM') + '00' + releases[0].quotation_id)}
                </div>
                <div className="column-rel">
                    <h4 style={{display: 'inline'}}>Quotation Amount: </h4>
                    {releases[0].quotation_amount} USD
                </div>
                <div className="column-rel">
                    <h4 style={{display: 'inline'}}>Quotation Title: </h4>
                    {releases[0].quotation_title}
                </div>
            </div>
            <div className="row-rel">
                {getTableData(releases)}
            </div>
        </div>
    );
}


export default ReleaseRow