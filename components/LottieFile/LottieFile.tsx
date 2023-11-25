import React, { useEffect, useState } from "react";
import axios from 'axios'
import Lottie from "react-lottie";
import animation from "./lotties/lottie final.json"
import { LottieFileProps } from "./LottieFile.Types";

const LottieFile = (props: LottieFileProps) => {
    const { fileName, width, height } = props
    const [ lottieJson, setLottieJson ] = useState<object | null>(null)
    const options = {
        loop: true,
        autoplay: true,
        animationData: lottieJson || animation
    };

    useEffect(()=>{
        if(fileName){
            axios.get(fileName)
                .then((res) => {
                    setLottieJson(res.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    },[fileName]);

    return(
        <div id="LottieContainer">
            <Lottie options={options} height={height} width={width} isClickToPauseDisabled={true} style={{ cursor:"default" }}/>
        </div>
    );
}

export default LottieFile;