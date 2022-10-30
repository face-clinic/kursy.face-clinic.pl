import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Kursy specjalistyczne od Face-Clinic</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-LEQ47M7MN3"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-LEQ47M7MN3');
                `}
            </Script>
            <Script id="facebook-pixel" strategy="afterInteractive">
                {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1290611288362789');
                fbq('track', 'PageView');
                `}
            </Script>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{
                primaryColor: 'dark'
            }}>
                <ModalsProvider>
                    <Component {...pageProps} />
                </ModalsProvider>
            </MantineProvider>
        </>
    )
}
