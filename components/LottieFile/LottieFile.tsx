import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
//import animation from "./lotties/Intento lottie.json"
import { LottieFileProps } from "./LottieFile.Types";

const LottieFile = (props: LottieFileProps) => {
    const { fileName, width, height } = props
    const [animation, setAnimation] = useState(null)
    const options = {
        loop: true,
        autoplay: true,
        animationData: animation
    };

    useEffect(()=>{
        import(`./lotties/${fileName}.json`)
            .then(module => {setAnimation(module.default);} )
            .catch(error => {console.error('Error while loading lottie:', error);})
    }, [fileName])

    return(
        <div id="LottieContainer">
            <Lottie options={options} height={height} width={width}/>
        </div>
    );
}

export default LottieFile;