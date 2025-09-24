import { subHours } from 'date-fns';
import format from 'date-fns/format';
import moment from 'moment'

const NOT_STARTED = 'not_started';
const LIVING = 'living';
const CANCEL = 'cancel';
const DELAY = 'delay';
const INTERRUPT = 'interrupt';
const CLOSED = 'closed';
const status = {
    0:NOT_STARTED,
    '-1':CLOSED,
    1:LIVING,
    2:LIVING,
    3:LIVING,
    4:LIVING,
    5:LIVING,
    50:LIVING,
    '-4':CANCEL,
    '-10':CANCEL,
    '-5':DELAY,
    '-14':DELAY,
    '-3':INTERRUPT,
    '-13':INTERRUPT,
    '-2':INTERRUPT,
    '-12':INTERRUPT,
    '-11':INTERRUPT,
    6:LIVING,
    7:LIVING,
}
export const getMatchStatus = (val) => {
   if(status.hasOwnProperty(val))
      return status[val];
   else if(val > 0)
      return status[1];
   else
      return status[-1];
};

export const getMatchStr = (val,opt=false) => {
   var sts = getMatchStatus(val);
   switch(sts){
      case NOT_STARTED:
         return opt?'观看':'未開始';
      case LIVING:
         return opt?'观看':'比賽中';
      case INTERRUPT:
         return '已中断';
      case CLOSED:
         return opt?'集锦':'已結束';
      case DELAY:
         return '比賽延期';
      case CANCEL:
         return '已取消';
      default:
         return opt?'集锦':'已結束';
   }
};
export const getMatchStr2 = (val) => {
   var sts = getMatchStatus(val);
   switch(sts){
      case NOT_STARTED:
         return '即将开始';
      case LIVING:
         return '比賽中';
      case INTERRUPT:
         return '已中断';
      case CLOSED:
         return '集锦/录像';
      case DELAY:
         return '已推迟';
      case CANCEL:
         return '已取消';
      default:
         return '集锦';
   }
};
export const getMatchCls = (val) => {
   var sts = getMatchStatus(val);
   if(sts == NOT_STARTED)
      return 'prelive';
   else if(sts == LIVING)
      return 'live';
   else 
      return 'end'
};
export const lastUpdateTime = () =>{
  const currentDate = subHours(new Date(), 3);
  return format(currentDate, 'yyyy-MM-dd HH:mm:ss');
};
export const changeDateFormat =(dateStr, formatStr)=> {
 if (!dateStr) return "";
 if(formatStr == undefined || formatStr == null)
   formatStr = 'yyyy-MM-dd';
  const outputFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  const formattedDate = moment(dateStr, 'YYYY-MM-DD HH:mm:ss').utcOffset('+0800').format(outputFormat);
  const date = new Date(formattedDate);
  return format(date, formatStr);
};
export const tdkDate = (date,format) => {
   const dateStr = moment(date).format(format || "MM-DD");
   const weekDay = week(date);
   return dateStr + " 周" + weekDay;
 };
export const goToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
export const diffToday = (value) => {
  return "#" + moment().add(value, "days").format("YYYY-MM-DD");
};
export const week = (date) => {
  const dateOfWeek = moment(date).day();
  const map = ["日", "一", "二", "三", "四", "五", "六"];
  if (dateOfWeek < 0 || dateOfWeek > 6) {
    return dateOfWeek;
  }
  return map[dateOfWeek];
};
export const matchDate = (date) => {
  const dateStr = moment(date).format("YYYY-MM-DD");
  const weekDay = week(date);
  return dateStr + " 周" + weekDay;
};
export const competitonDate = (val) => {
   let date = new Date(val);
   let year = date.getFullYear();
   let month = date.getMonth() + 1;
   let day = date.getDate();
   let hours = date.getHours('HH');
   let minutes = date.getMinutes('mm');
   let result = `${month}月${day}日 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return result;
};
export const recordStream = (matchId, id, link, mType, vendorId) => {
   var postdata = {
     match_id: matchId,
     match_type: mType,
     stream_id: id,
     source: "pc",
     vendor_id: vendorId,
   };
   var formData = new URLSearchParams();
   for (var key in postdata) {
     formData.append(key, postdata[key]);
   }
   fetch(process.env.RECORD_STREAM, {
     method: "POST",
     headers: {
       "Content-Type": "application/x-www-form-urlencoded",
     },
     body: formData.toString(),
   })
     .then((response) => response.json())
     .then((data) => {
       // Handle the response data
     })
     .catch((error) => {
       // Handle the error
     });
   window.open(link, "_blank");
 };
export const getPageTitle=(url)=>{
    var title = '';
    switch(url){
        case 'match/hot':
            title= "熱門";
            break;
        case 'match/all':
            title= "全部";
            break;
        case 'match/zonghe':
            title= "综合";
            break;
        case 'match/lanqiu':
        case 'live/lanqiu':
            title= "篮球";
            break;
        case 'match/zuqiu':
        case 'live/zuqiu':
            title= "足球";
            break;
        default:
            title = "";
    }
    return title;
}

export const pageTypeVerify=(b)=>{
   var a = '';
   switch(b){
      case 'lanqiu':
      case 'basketball':
       a = 'lanqiu';
       break;
      case 'zuqiu':
      case 'football':
       a = 'zuqiu';
       break;
      case 'wangqiu':
      case 'tennis':
       a = 'wangqiu';
       break;
      case 'zonghe':
      case 'zonghety':
       a = 'zonghe';
       break;
      default:
       a = '404';
     }
   return a;
}
export const getTeamAbbr = (matchType) => {
   switch (matchType) {
     case "zuqiu":
       return "tzu";
     case "lanqiu":
       return "tlq";
     default:
       return "";
   }
 };
 export const getBaseUrl = (matchType, topicName) => {
    switch (matchType) {
      case "wangqiu":
        return `/${matchType}`;
      default:
        return `/${matchType}/${topicName}`;
    }
  };
  export function getEventIcon(typ) {
    typ = Number(typ);
    switch (typ) {
      case 1:
        return "/images/match_details/goals.png";
      case 2:
        return "/images/match_details/red.png";
      case 3:
        return "/images/match_details/yellow.png";
      case 7:
        return "/images/match_details/penaltyGoals.png";
      case 8:
        return "/images/match_details/wulongball.png";
      case 9:
        return "/images/match_details/redyellow.png";
      case 11:
        return "/images/match_details/downTime.png";
      case 101:
        return "/images/match_details/assist.png";
      case 111:
        return "/images/match_details/upTime.png";
      case 13:
        return "/images/match_details/missedPenaltyGoals.png";
      case 14:
        return "/images/match_details/goalnot.png";
      default:
        return "n";
    }
  }
export const LogWriter=(line1,line2,line3)=>{
   const date = new Date();
   const formattedDate = moment(date, 'YYYY-MM-DD HH:mm:ss').utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss');
   console.log(`║ Date [ ${formattedDate} ] ║ ApiStatus [ ${line2} ] ║ DataCode [ ${line3} ] ║ Url [ ${line1} ]`)
}
export const ResLogWriter=(line1,line2)=>{
   const date = new Date();
   const formattedDate = moment(date, 'YYYY-MM-DD HH:mm:ss').utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss');
   console.log(`║ Date [ ${formattedDate} ] ║ ResCode [ ${line2} ] ║ Url [ ${line1} ]`)
}
export const checkIsFromMiddleWare=(val)=>{
   let ary = {};
   if(val.includes('_{isMiddleWare}_')){
      ary = parseString(val)
   }else{
      ary.val = val;  
      ary.isTdk = 'N'; 
      ary.url = '';
   }
   return ary;
 }
export const isNumeric=(value)=>{
   return !isNaN(parseFloat(value)) && isFinite(value);
 }
 export const checkNewsId = (newsId) => {
   const regexPattern = /^\d+-\d+$/;
   return regexPattern.test(newsId);
 };
export const checkIsAliasLink = (val) => {
   const param = val;
  if (param.includes("_{isAlias}_")) {
    const regex = /(.*?)_{(.*?)}__{(.*?)}_$/;
    const match = param.match(regex);
 
    if (!match) {
      return {
        val: param,
        isTdk: "N",
        url: "",
      };
    }
    const [, b, c,d] = match;
    return {
      val: b,
      isTdk: "Y",
      url: d.replace(/@/g, "/"),
    };
  } else {
    return {
      val: param,
      isTdk: "N",
      url: "",
    };
  }
 };
export const getNewsTitle = (topicName) => {
   switch (topicName) {
     case "lanqiu":
       return `籃球`;
     case "zuqiu":
       return `足球`;
     case "all":
       return `全部`;
     case "zonghe":
       return `綜合`;
     default:
       return ``;
   }
 };
