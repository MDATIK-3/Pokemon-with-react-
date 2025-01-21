import GoogleAd from "./components/GoogleAd";
import Pokemon from "./Pokemon";
import { Helmet } from "react-helmet";

export const App = () => {
  return (
    <div>
      <Pokemon />
      <Helmet>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5385144928798539"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      <GoogleAd />
    </div>
  );
};

export default App;
