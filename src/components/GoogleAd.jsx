import { useEffect } from "react";

const GoogleAd = () => {
    useEffect(() => {
        // Push the AdSense adsbygoogle script on component mount
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error: ", e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-5385144928798539"
            data-ad-slot="5873359968"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
};

export default GoogleAd;
