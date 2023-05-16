
// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import '@/styles/globals.scss';
import '@/styles/components/loading.scss';
import '@/styles/components/message.scss';
import '@/styles/components/navigationbar.scss';
import '@/styles/pages/signin.scss';
import '@/styles/layouts/dashboardnav.scss';
import '@/styles/layouts/cartsideover.scss';
import '@/styles/pages/bikes/bike.scss';
import Layout from '@/layouts/Layout';
import NextUIWrapper from '@/layouts/NextUIWrapper';

const App = ({ Component, pageProps }) => {
    return (
        <NextUIWrapper>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NextUIWrapper>
    );
};

export default App;
