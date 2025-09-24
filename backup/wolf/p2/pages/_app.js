import "../public/style/reset.css";
import "../public/style/pc.css";
import "../public/style/font-icon/iconfont.css";
import $ from "jquery";
import { enc, AES } from "crypto-js";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Icons from "../components/tools/icons";
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import ScrollButton from "../components/contain/scroll_button";

export default function MyApp({ Component, pageProps }) {
  const [locationCheck, setLocationCheck] = useState(null);
  const [injectComponent, setInjectComponent] = useState(null);
  const renderInjectComponent = (component) => setInjectComponent(component);
  const router = useRouter();
  useEffect(() => {
    if (pageProps.redirect) router.push("/");
  }, [pageProps.redirect]);
  useEffect(() => {
    var curDate = new Date();
    var siteDate = curDate.toLocaleDateString(); //年月日
    if (window.localStorage.getItem("site")) {
      if (window.localStorage.getItem("site") == siteDate) {
        //console.log('是当天');
        //let returnCitySN = window.localStorage.getItem("sitePos");
        //let cityId = window.localStorage.getItem("siteId");
        //let cityIp = window.localStorage.getItem("siteIp");
      } else {
        //console.log("不是当天");
        window.localStorage.setItem("site", siteDate);
        window.localStorage.removeItem("location_c");
        getSitePos();
      }
    } else {
      //console.log("no cache");
      window.localStorage.setItem("site", siteDate);
      getSitePos();
    }

    async function getSitePos() {
      try {
        var cityMsg = await fnOrderIp();
        //console.log(cityMsg)
        window.localStorage.setItem("sitePos", cityMsg.cityAddress); //地址
        window.localStorage.setItem("siteId", cityMsg.cityId); //地址id
        window.localStorage.setItem("siteIp", cityMsg.cityIp); //地址ip
        //let getCname = window.localStorage.getItem("sitePos");
        //let cityId = window.localStorage.getItem("siteId");
        //let cityIp = window.localStorage.getItem("siteIp");
      } catch (error) {
        //console.log(error);
        window.localStorage.setItem("sitePos", ""); //地址
        window.localStorage.setItem("siteId", ""); //地址id
        window.localStorage.setItem("siteIp", ""); //地址ip
        //let getCname = window.localStorage.getItem("sitePos");
        //let cityId = window.localStorage.getItem("siteId");
        //let cityIp = window.localStorage.getItem("siteIp");
      }
    }

    // 按顺序请求地址   搜狐  qq
    function fnOrderIp() {
      return new Promise((resolve) => {
        setTimeout(() => {
          // 调用 qq
          $.ajax({
            type: "GET",
            url: "https://r.inews.qq.com/api/ip2city?otype=jsonp&callback=cityIp",
            dataType: "jsonp",
            success: function (res) {
              // console.log(res);
              let cityMsg = {
                cityAddress: "",
                cityIp: "",
                cityId: "",
              };
              if (res == "" || res == null || res == "null") {
                resolve(cityMsg);
              } else {
                if (res.province == res.city) {
                  cityMsg.cityAddress = res.city;
                } else {
                  cityMsg.cityAddress = res.province.concat(res.city);
                }
                cityMsg.cityIp = res.ip;
                cityMsg.cityId = res.districtCode;
                //console.log(cityMsg.cityAddress);
                resolve(cityMsg);
              }
            },
            error: function (err) {
              $.getScript("https://pv.sohu.com/cityjson?ie=utf-8", function () {
                setTimeout(() => {
                  let cityMsg = {
                    cityAddress: "",
                    cityIp: "",
                    cityId: "",
                  };
                  if (
                    returnCitySN == "" ||
                    returnCitySN == null ||
                    returnCitySN == "null"
                  ) {
                    resolve(cityMsg);
                  } else {
                    cityMsg.cityAddress = returnCitySN.cname;
                    cityMsg.cityIp = returnCitySN.cip;
                    cityMsg.cityId = returnCitySN.cid;
                    // console.log(cityMsg);
                    resolve(cityMsg);
                  }
                }, 500);
              }).fail(function () {
                // console.log('-------访问错误');
                let cityMsg = {
                  cityAddress: "",
                  cityIp: "",
                  cityId: "",
                };
                resolve(cityMsg);
              });
            },
          });
        }, 500);
      });
    }

    setLocationCheck({
      pos: window.localStorage.getItem("sitePos"),
      ip: window.localStorage.getItem("siteIp"),
    });
  }, []);
  return (
    <>
      <Icons />
      <Header injectComponent={injectComponent} isNavDisplay={pageProps.isNavDisplay}></Header>
      <ScrollButton showAlways={pageProps.showAlways} />
      <div className="w-full max-w-[1200px] mx-auto max12:px-[10px]">
        <Component
          {...pageProps}
          locationCheck={locationCheck}
          renderInjectComponent={renderInjectComponent}
          setInjectComponent={setInjectComponent}
        />
      </div>
      <Footer friendsData={pageProps.friendsData} lastUpdate={pageProps.lastUpdate}/>
    </>
  );
}
