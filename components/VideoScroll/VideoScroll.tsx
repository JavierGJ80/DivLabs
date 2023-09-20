import "./VideoScroll.css";
import { throttle } from "lodash";
import React, { useRef, useEffect, useState } from "react";
import { VideoScrollProps } from "./VideoScroll.types";

const VideoScroll = (props: VideoScrollProps) => {
    const { video, width, lengthScroll } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [startTouchX, setStartTouchX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const [scrolling, setScrolling] = useState(false);

    console.log('V1.0')

    const handleScroll = throttle(() => {
        window.requestAnimationFrame(() => {
            const video = videoRef.current;
            const scrollContainer = scrollContainerRef.current;
            
            if (!video || !scrollContainer) return;

            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const scrollFraction = scrollContainer.scrollLeft / maxScroll;
            const videoDuration = video.duration;
            const targetTime = scrollFraction * videoDuration;

            video.currentTime = targetTime;
        });
    }, 50);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer) return;

        const handleTouchStart = (e: TouchEvent) => {
            setStartTouchX(e.touches[0].clientX);
            setStartScrollLeft(scrollContainer.scrollLeft);
            setScrolling(true);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (scrolling) {
                const touchX = e.touches[0].clientX;
                const deltaX = touchX - startTouchX;
                scrollContainer.scrollLeft = startScrollLeft - deltaX;
                e.preventDefault();
                handleScroll();
            }
        };

        const handleTouchEnd = () => {
            setScrolling(false);
        };

        scrollContainer.addEventListener("touchstart", handleTouchStart);
        scrollContainer.addEventListener("touchmove", handleTouchMove);
        scrollContainer.addEventListener("touchend", handleTouchEnd);

        return () => {
            scrollContainer.removeEventListener("touchstart", handleTouchStart);
            scrollContainer.removeEventListener("touchmove", handleTouchMove);
            scrollContainer.removeEventListener("touchend", handleTouchEnd);
        };
    }, [scrolling, handleScroll]);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer) return;

        scrollContainer.addEventListener("scroll", handleScroll);

        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

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
            <video ref={videoRef} width="100%" height="auto" preload="auto" playsInline muted>
                <source src={video} type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoScroll;