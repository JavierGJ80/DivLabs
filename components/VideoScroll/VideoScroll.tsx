import "./VideoScroll.css";
import { throttle } from "lodash";
import React, { useRef, useEffect } from "react";
import { VideoScrollProps } from "./VideoScroll.types";

const VideoScroll = (props: VideoScrollProps) => {
    const { video, width, lengthScroll } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer || !video) return;

        const handleScroll = throttle(() => {
            window.requestAnimationFrame(() => {
                const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                const scrollFraction = scrollContainer.scrollLeft / maxScroll;
                const videoDuration = video.duration;
                const targetTime = scrollFraction * videoDuration;

                video.currentTime = targetTime;
            });
        }, 50);

        scrollContainer.addEventListener("scroll", handleScroll);

        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer || !video) return;

        if (!video) return;

        video.addEventListener("loadedmetadata", () => {
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const targetScroll = (video.currentTime / video.duration) * maxScroll;
            scrollContainer.scrollLeft = targetScroll;
        });

        return () => {
            video.removeEventListener("loadedmetadata", () => {});
        };
    }, []);

    return (
        <div
            className="video-scroll-container"
            style={{
                width: width,
            }}
        >
            <div ref={scrollContainerRef} className="scroll-container">
                <div
                    className="scroll-content"
                    style={{
                        minWidth: `${Math.round((lengthScroll || 2) * 100)}%`,
                    }}
                ></div>
            </div>
            <video ref={videoRef} width="100%" height="auto" preload="auto" playsInline>
                <source src={video} type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoScroll;