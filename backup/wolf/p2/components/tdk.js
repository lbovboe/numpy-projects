import { useEffect, useState } from "react"
import Head from "next/head"

export default function PageTDK({data}){
    
    const getAnalyticsTag = () => {
        return {
          __html: `
	  if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            var path = window.location.pathname;
            window.location = "${process.env.MOBILE_DOMAIN}" + path;
          }
	
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?f05ce05e7dcc2c4533becdb206feab2c";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();`,
        }
      }

    return (
        <Head>
             <link
              rel="icon"
              href="/images/favicon.ico"
              type="image/x-icon"
            />
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta httpEquiv="X-UA-Compatible" />
            <meta name="copyright" content={process.env.DOMAIN_PC}/>
            <title>{data?.title || process.env.DEF_TITLE}</title>
            <meta content={data?.description || process.env.DEF_DESCRIPTION} name="description"/>
            <meta content={data?.keywords || process.env.DEF_KEYWORD} name="keywords"/>
            <meta name="referrer" content="strict-origin-when-cross-origin"/>
            <script dangerouslySetInnerHTML={getAnalyticsTag()}/>
        </Head>
    )
}
