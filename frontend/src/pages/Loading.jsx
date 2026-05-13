import { useState, useEffect } from "react";

const Loading = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    onFinish();
                    return 100;
                }
                return prev + 2;
            });
        }, 70);
    }, [])

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-[#241919]">
            <img src="/logo.png" alt="FinBear Logo" className="w-56 h-56 rounded-full"/>
            <div className="w-64 bg-gray-700 rounded-full h-3 mb-4 ">
                <div
                    className="bg-orange-400 h-3 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                    >
                </div>
            </div>
            <p className="text-white text-sm tracking-widest">LOADING.....</p>
        </div>
    )
};

export default Loading;