import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logoutThunk} from "../../redux/authReducer";

const HeaderIfAuth = (props) => {
    return <div className={styles.headerAuth}>
        <span>{props.userName}</span>
        <button onClick={props.logout}>Выход</button>
    </div>
}

const HeaderIfNotAuth = () => {
    return <div className={styles.headerNotAuth}>
        <button> <NavLink to='/login'>Логин</NavLink></button>
        <button> <NavLink to='/register'>Регистрация</NavLink></button>
    </div>
}

const Header = (props) => {
    let iconPath = "https://yandex.ru/images/_crpd/dL53jo135/6f7195Zv/8C7zanzTOhcE3vxQ_ov05fK7_Atqb8zF_7Az7fzcoeAwb7ZTJGk0A5AqPxDZ0sTrKhZx-4s9OKRedfEiLEqWi5RqwjrdJ9pDQUrJBF_c4WWWHz2u-urs8QsQtsktKdGhRI5TZtLZIAKU7zr1rzLkWxvkg1m62ktzPXdWIOvORv5RL6PbOQaZ9ZDP_LF9foSE4B5e2xhN7Ia5MpGdmPxiwnf9FxEHOTZCNd-odc5Wsc6fRcApShtJsV5nN9Br3paf8EzR_QmEi5Tkbj1QXo5kJKG_rzsL_s3FGnFwPcg-EcH17rcghou2IZZ_e6Ts15AOfoXyWQhIeyCuBtXCm0zWjZLukU5bJFtkdm78Us1PB7XxP03KKt8N1zpCsz34HrCTJ96mIyToFdF0rfkHjVWzLM4kQjtIqwng3uS2EeudR6yjTpId-uaIluWPHOL-PAd1Y5wvCtjezCXZ0mIeS21AoSfOxLLmGvWBVj645d420zztl-JJW6s6wQ_XtrLJX7fc4d0Cv7mk6McWbt0jHw4ElDIMf0tIPXxmWGHSjamsM3PWLVZw5WpVgjWtCxbOp8OdPfdAOUioSvOddWagyxyEr-MeY11a9ukGB41eke7dhwagnY6r2n-8thvzo56q7GMz5oyUYyXLFuN2HVil7udDDv41w_m6-ruD3Oc102ntNLwR35IdeTUZdQYPXzKPfwdl0r88O0uP3wbqcMPemKzAgeTctkBEG9RxN94Y1dxGcG5MdZHZS8v7or00VHPpDsTNkj2Rfain-NVkr_ySX010duPsTyr7n32kytPAnvkP4rNG3zUDlXp24KaseUWehFAO7cdhiOu4WsOulfUwSG10DgM_kyxLdKmnB89fExyv5SaDzX1LKp7fljnxoP7oXOFTFMy3k6TqdjDknTsm_lXjzT6XoGsrWOsDv3WWQAtMRpyhXGCPepb7lXfOvhN9zialQR69aiutPnYZ0eLcGpwBo"
    return (
        <header className={styles.header}>
            <div><img className={styles.icon} src={iconPath} alt="icon"/></div>
            <div>Зеленая энергетика</div>
            <div>{props.isAuth ? <HeaderIfAuth logout={props.logoutThunk} userName={props.userName}/>
                : <HeaderIfNotAuth />}
            </div>
        </header>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userName: state.auth.userName
})

export default connect(mapStateToProps, {logoutThunk})(Header);