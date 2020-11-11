import React from 'react';
import spinner from "../../../assets/images/spinner.svg";

let Preloader = () => {

    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    let localStyles = {
        preloaderDiv: {
            width,
            height,
            position: 'relative'
        },
        preloader: {
            position: 'absolute',
            top: height / 2 - 150,
            left: width / 2 - 100,
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 700
        }
    }

    return (
        <div style={localStyles.preloaderDiv}>
            <div style={localStyles.preloader}>
                <span ><p>Вход в систему...</p></span>
                <div >
                    <img alt={"preloader"} src={spinner}/>
                </div>
            </div>
        </div>
    );
}

export default Preloader;