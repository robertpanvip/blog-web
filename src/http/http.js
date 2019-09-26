import axios from 'axios';
//const base_url=window.location.origin+':8040';
const base_url='';
// 允许携带cookie
axios.defaults.withCredentials=true
export default class Http {
    static  get(url,data,suc,err) {
        let baseQuest=(url,data,suc,err)=>{
            axios.get(base_url+url, {params:data}
            ).then(res => {
                if(res.status===200){
                    suc(res.data);
                }else{
                    return Promise.reject(res)
                }
            }).catch(err);
        };
        if(suc){
            baseQuest(url,data,suc,err);
        }else {
            return new Promise((resolve, reject)=>{
                baseQuest(url,data,resolve,reject)
            })
        }


    }

    static post(url,data,suc,err) {
        let baseQuest=(url,data,suc,err)=>{
            axios.post(base_url+url, data).then(res => {
                if(res.status===200){
                    suc(res.data);
                }else{
                    return Promise.reject(res)
                }
            }).catch(err);
        };
        if(suc){
            baseQuest(url,data,suc,err);
        }else {
            return new Promise((resolve, reject)=>{
                baseQuest(url,data,resolve,reject)
            })
        }

    }
}