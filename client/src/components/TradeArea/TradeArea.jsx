import React from 'react';
import styles from './TradeArea.module.css';
import {connect} from "react-redux";
import moment from "moment";

const TradeArea = (props) => {
    let sstyle = {
        "marginBottom": "10px",
        "padding": "5px 15px",
        "backgroundColor": "lightgreen",
        "boxSizing": "borderBox"
    }

    return (
        <div className={styles.tradearea}>
            <div className={styles.tradeTitle}><h2>Торговая площадка</h2></div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    deals: state.tradearea,
    userID: state.auth.userID
})

export default connect(mapStateToProps, {})(TradeArea);