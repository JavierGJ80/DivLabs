import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animation from "./lotties/lottie final.json"
import { LottieFileProps } from "./LottieFile.Types";

const LottieFile = (props: LottieFileProps) => {
    const { fileName, width, height } = props
    const options = {
        loop: true,
        autoplay: true,
        animationData: animation
    };

    return(
        <div id="LottieContainer">
            <Lottie options={options} height={height} width={width} isClickToPauseDisabled={true} style={{ cursor:"default" }}/>
        </div>
    );
}

export default LottieFile;