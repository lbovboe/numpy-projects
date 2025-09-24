
import {React,useState,useEffect} from "react";

export default function ProgressCart({homeScore,awayScore,homeName,awayName,title}){
    
    const [chartGrid,setChartGrid] = useState('100% 0')
    const [isEmpty,setIsEmpty] = useState(true)
    useEffect(()=>{
        if(homeScore){
            setIsEmpty(false)
            var ttl = Number(homeScore) + Number(awayScore);
            var a = Number(awayScore) * 100 / ttl;
            var h = 100 - a;
            var val = h+'% '+a+'%';
            setChartGrid(val);
        }
    },[homeScore])
    return (
        <>
            <div className="progress_container">
                    <div className="ptitle">{title||''}</div>
                    <div className="pchart">
                        <p className="home">{homeScore||'-'}</p>
                            <div style={{display:'grid',gridTemplateColumns:chartGrid,width:'100%'}}>
                            {isEmpty?
                                <div titledata='无数据' className="homec prightBorder"></div>
                            :
                              <>
                                <div titledata={`${homeName||''} : ${homeScore}`} className="homec"></div>
                                <div titledata={`${awayName||''} : ${awayScore}`} className="awayc"></div>
                              </>
                            }
                         </div>
                        <p className="away">{awayScore||'-'}</p>
                    </div>
            </div>
        </>
    )
}