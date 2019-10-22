import React from 'react';
import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';

import fidenz from '../../../assets/images/fidenz.png'
import quotation from '../../../assets/images/quotation.png'

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        padding: 20
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
        marginBottom: 10
    },
    logoAlignRight: {
        position: 'absolute',
        right: 0,
        display: 'block',
        height: 'auto',
        width: 140,
        marginBottom: 10
    },
    rowInfo: {
        flexDirection: 'row',
        backgroundColor: '#1579D0',
        height: 20,
        marginTop: 5
    },
    columnInfo: {
        width: '33.33%'
    },
    infoTextRight: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 10,
        margin: 4
    },
    infoTextCenter: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 10,
        margin: 4
    },
    infoTextLeft: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 10,
        margin: 4
    }
});

// Create Document Component
const QuotationFile = ({quotationData, financialData, releasePlanData, paymentPlanData, clientData}) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.row}>
                <Image src={fidenz} style={styles.logo}/>
                <Image src={quotation} style={styles.logoAlignRight}/>
            </View>
            <View style={styles.row}>
                <View style={styles.columnHeader}>
                    <Text style={styles.addressTitleTo}>Customer:</Text>
                    <Text style={styles.addressTo}>{clientData.name}</Text>
                    <Text style={styles.addressTo}>{clientData.address_line_first}</Text>
                    <Text style={styles.addressTo}>{clientData.address_line_last}</Text>
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
        </Page>
    </Document>
);

export default QuotationFile