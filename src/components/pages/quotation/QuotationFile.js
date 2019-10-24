import React from 'react';
import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import Moment from 'moment';

import fidenz from '../../../assets/images/fidenz.png'
import quotation from '../../../assets/images/quotation.png'
import COUNTRY_OPTIONS from "../../../assets/data/countryOptionList";

// Create Document Component
const QuotationFile = ({quotationData, financialData, releasePlanData, paymentPlanData, clientData, terms}) => {

    // Create styles
    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff',
            padding: 30
        },
        row: {
            flexDirection: 'row'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        columnHeader: {
            width: '50%'
        },
        addressFrom: {
            fontSize: 11,
            textAlign: 'right',
            color: '#535353'
        },
        addressTo: {
            fontSize: 11,
            textAlign: 'left',
            color: '#535353'
        },
        addressTitleFrom: {
            fontSize: 12,
            textAlign: 'right',
            marginBottom: 5
        },
        addressTitleTo: {
            fontSize: 12,
            textAlign: 'left',
            marginBottom: 5,
        },
        logo: {
            display: 'block',
            height: 'auto',
            width: 140,
            marginBottom: 15
        },
        logoAlignRight: {
            position: 'absolute',
            right: 0,
            display: 'block',
            height: 'auto',
            width: 140,
            marginBottom: 15
        },
        rowInfo: {
            flexDirection: 'row',
            backgroundColor: '#1579D0',
            height: 20,
            marginTop: 20,
            marginLeft: -30,
            marginRight: -30
        },
        columnInfo: {
            width: '33.33%'
        },
        infoTextRight: {
            textAlign: 'right',
            color: '#fff',
            fontSize: 9,
            marginRight: 30,
            marginTop: 4,
            marginBottom: 4
        },
        infoTextCenter: {
            textAlign: 'center',
            color: '#fff',
            fontSize: 9,
            margin: 4
        },
        infoTextLeft: {
            textAlign: 'left',
            color: '#fff',
            fontSize: 9,
            marginLeft: 30,
            marginTop: 4,
            marginBottom: 4
        },
        textTitle: {
            textAlign: 'left',
            color: '#1579D0',
            fontSize: 16,
            marginTop: 25,
            marginBottom: 25
        },
        line: {
            backgroundColor: 'grey',
            height: 1,
            flexDirection: 'row'
        },
        pageTitle: {
            textAlign: 'left',
            width: '100%',
            color: '#1579D0',
            fontSize: 18,
            marginTop: 15,
            marginBottom: 10
        },
        contentBreak: {
            marginTop: 10
        },
        tableTitle: {
            textAlign: 'center',
            width: '100%',
            color: '#fff',
            padding: 5,
            fontSize: 12,
            backgroundColor: '#1579D0'
        },
        table: {
            display: "table",
            width: "auto",
            borderStyle: "solid",
            borderWidth: 1,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderBottomWidth: 0,
            marginTop: -1
        },
        tableRow: {
            margin: "auto",
            flexDirection: "row",
            height: 26
        },
        tableRowBlue: {
            margin: "auto",
            flexDirection: "row",
            height: 26,
            backgroundColor: "#C9DEF1"
        },
        tableColIndex: {
            width: "10%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        tableColContent: {
            width: "60%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        tableColContentPayment: {
            width: "50%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        tableColContentLeftPayment: {
            width: "50%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 10
        },
        tableColRightPayment: {
            width: "20%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        tableColRightPaymentAmount: {
            width: "20%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            alignItems: 'right',
            justifyContent: 'center',
            paddingRight: 10
        },
        tableColRight: {
            width: "30%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        tableColRightContent: {
            width: "30%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            alignItems: 'right',
            justifyContent: 'center',
            paddingRight: 10
        },
        tableColLeft: {
            width: "60%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            alignItems: 'left',
            justifyContent: 'center'
        },
        tableColLeftContent: {
            width: "60%",
            borderStyle: "solid",
            borderWidth: 1,
            borderRightWidth: 0,
            borderTopWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 10
        },
        tableCellCenter: {
            fontSize: 10
        },
        tableCellContent: {
            fontSize: 10,
            color: '#535353'
        },
        tableCellRight: {
            margin: "auto",
            fontSize: 10,
            textAlign: 'right'
        },
        tableCellLeft: {
            margin: "auto",
            fontSize: 10,
            textAlign: 'left'
        }
    });

    const tableContentFinancial = d => {
        return d.map((data, index) =>
            <View style={styles.tableRow} key={index}>
                <View style={styles.tableColIndex}>
                    <Text style={styles.tableCellContent}>{('0' + (index+1)).slice(-2)}</Text>
                </View>
                <View style={styles.tableColLeftContent}>
                    <Text style={styles.tableCellContent}>{data.description}</Text>
                </View>
                <View style={styles.tableColRightContent}>
                    <Text style={styles.tableCellContent}>{thousandsSeparators(data.amount)}</Text>
                </View>
            </View>)
    };

    const tableContentRelease = d => {
        return d.map((data, index) =>
            <View style={styles.tableRow} key={index}>
                <View style={styles.tableColIndex}>
                    <Text style={styles.tableCellContent}>{('0' + (index+1)).slice(-2)}</Text>
                </View>
                <View style={styles.tableColLeftContent}>
                    <Text style={styles.tableCellContent}>{data.description}</Text>
                </View>
                <View style={styles.tableColRight}>
                    <Text style={styles.tableCellContent}>{getDate(data.release_date)}</Text>
                </View>
            </View>)
    };

    const tableContentPayment = d => {
        return d.map((data, index) =>
            <View style={styles.tableRow} key={index}>
                <View style={styles.tableColIndex}>
                    <Text style={styles.tableCellContent}>{('0' + (index+1)).slice(-2)}</Text>
                </View>
                <View style={styles.tableColContentLeftPayment}>
                    <Text style={styles.tableCellContent}>{data.description}</Text>
                </View>
                <View style={styles.tableColRightPayment}>
                    <Text style={styles.tableCellContent}>{getDate(data.invoice_date)}</Text>
                </View>
                <View style={styles.tableColRightPaymentAmount}>
                    <Text style={styles.tableCellContent}>{thousandsSeparators(data.amount)}</Text>
                </View>
            </View>)
    };

    const getDate = d => {
        try{
            return Moment(d).format('DD-MMM-YYYY')
        } catch (e) {
            return "N/A"
        }
    };

    const getTotalCosts = d => {
        return d.reduce((total, item) => {
            return total + Number(item.amount);
        }, 0);
    };

    const thousandsSeparators = (num) => {
        let num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    const countryName = (slug) => {
        for(let i=0; i<COUNTRY_OPTIONS.length; i++){
            let c = COUNTRY_OPTIONS[i];
            if (c.key === slug){
                return c.text;
            }
        }
    };

    return (
        <Document>
            <Page style={styles.page} wrap>
                <View style={styles.row}>
                    <Image src={fidenz} style={styles.logo}/>
                    <Image src={quotation} style={styles.logoAlignRight}/>
                </View>
                {/*----------------------------------------------------------------------*/}
                <View style={styles.row}>
                    <View style={styles.columnHeader}>
                        <Text style={styles.addressTitleTo}>Customer:</Text>
                        <Text style={styles.addressTo}>{clientData.name}</Text>
                        <Text style={styles.addressTo}>{clientData.address_line_first}</Text>
                        <Text style={styles.addressTo}>{clientData.address_line_last}, {countryName(clientData.country)}</Text>
                        <Text style={styles.addressTo}>{clientData.email}</Text>
                    </View>
                    <View style={styles.columnHeader}>
                        <Text style={styles.addressTitleFrom}>From:</Text>
                        <Text style={styles.addressFrom}>Fidenz Private Limited</Text>
                        <Text style={styles.addressFrom}>No. 239, Nawala Road,</Text>
                        <Text style={styles.addressFrom}>Nawala, Sri Lanka</Text>
                        <Text style={styles.addressFrom}>info@fidenz.com</Text>
                    </View>
                </View>
                {/*----------------------------------------------------------------------*/}
                <View style={styles.rowInfo}>
                    <View style={styles.columnInfo}>
                        <Text style={styles.infoTextLeft}>Quotation No: #{quotationData.quot_no}</Text>
                    </View>
                    <View style={styles.columnInfo}>
                        <Text style={styles.infoTextCenter}>Created Date: {quotationData.created_at}</Text>
                    </View>
                    <View style={styles.columnInfo}>
                        <Text style={styles.infoTextRight}>Updated Date: {quotationData.updated_at}</Text>
                    </View>
                </View>
                {/*----------------------------------------------------------------------*/}
                <View style={styles.row}>
                    <Text style={styles.textTitle}>{quotationData.title}</Text>
                </View>
                <View style={styles.line}/>
                {/*----------------------------------------------------------------------*/}
                <View style={styles.row}>
                    <Text style={styles.pageTitle}>Scope of Work</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.addressTo}>{quotationData.description}</Text>
                </View>
                {/*----------------------------------------------------------------------*/}
                <View style={styles.contentBreak}/>
                <View style={styles.row}>
                    <Text style={styles.pageTitle}>Financials</Text>
                </View>
                {/*----------------------------------------------------------------------*/}
                <Text style={styles.tableTitle}>Financial Details</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCellCenter}>No</Text>
                        </View>
                        <View style={styles.tableColContent}>
                            <Text style={styles.tableCellCenter}>Description</Text>
                        </View>
                        <View style={styles.tableColRight}>
                            <Text style={styles.tableCellCenter}>Amount (USD)</Text>
                        </View>
                    </View>
                    {tableContentFinancial(financialData)}
                    <View style={styles.tableRowBlue}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCellCenter}/>
                        </View>
                        <View style={styles.tableColLeftContent}>
                            <Text style={styles.tableCellCenter}>Total</Text>
                        </View>
                        <View style={styles.tableColRightContent}>
                            <Text style={styles.tableCellCenter}>{thousandsSeparators(getTotalCosts(financialData))}</Text>
                        </View>
                    </View>
                </View>
            </Page>
            <Page style={styles.page} wrap>
                {/*----------------------------------------------------------------------*/}
                <View style={styles.contentBreak}/>
                <View style={styles.row}>
                    <Text style={styles.pageTitle}>Release Plan</Text>
                </View>
                {/*----------------------------------------------------------------------*/}
                <Text style={styles.tableTitle}>Invoicing Plan</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCellCenter}>No</Text>
                        </View>
                        <View style={styles.tableColContent}>
                            <Text style={styles.tableCellCenter}>Description</Text>
                        </View>
                        <View style={styles.tableColRight}>
                            <Text style={styles.tableCellCenter}>Release Date</Text>
                        </View>
                    </View>
                    {tableContentRelease(releasePlanData)}
                </View>
                {/*----------------------------------------------------------------------*/}
                <View style={styles.contentBreak}/>
                <View style={styles.row}>
                    <Text style={styles.pageTitle}>Payment Plan</Text>
                </View>
                {/*----------------------------------------------------------------------*/}
                <Text style={styles.tableTitle}>Invoicing Plan</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCellCenter}>No</Text>
                        </View>
                        <View style={styles.tableColContentPayment}>
                            <Text style={styles.tableCellCenter}>Description</Text>
                        </View>
                        <View style={styles.tableColRightPayment}>
                            <Text style={styles.tableCellCenter}>Invoice Date</Text>
                        </View>
                        <View style={styles.tableColRightPayment}>
                            <Text style={styles.tableCellCenter}>Amount (USD)</Text>
                        </View>
                    </View>
                    {tableContentPayment(paymentPlanData)}
                </View>
                {/*----------------------------------------------------------------------*/}
                <View style={styles.contentBreak}/>
                <View style={styles.contentBreak}/>
                <View style={styles.row}>
                    <Text style={styles.addressTitleTo}>Terms & Conditions </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.addressTo}>{terms}</Text>
                </View>
            </Page>
        </Document>)
};

export default QuotationFile