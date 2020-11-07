import React from 'react';
import styles from './Main.module.css'

const Main = () => {
    return (
        <div className={styles.main}>
            Главная страница
        </div>
    )
}

class MainContainer extends React.Component {

    componentDidMount() {

    }

    render () {
        return (
            <Main />
        )
    }
}

export default Main;