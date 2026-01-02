"use client";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

const LoadingScreen = () => {
    const { RiveComponent } = useRive({
        src: "/Loading.riv",
        autoplay: true,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
        }),
    });

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <RiveComponent style={{ width: 200, height: 200 }} />
        </div>
    );
};

export default LoadingScreen;
