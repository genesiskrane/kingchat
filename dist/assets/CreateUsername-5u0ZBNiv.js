import{l as k,u as V,e as w,f as c,c as C,d as v,b as r,w as y,q as B,r as l,o as E,i as g}from"./index-Do9ei8D9.js";import{u as q,r as A,m as L}from"./index-BZ9XoMjb.js";const M={class:"grid content-center h-full w-full"},N=v("h2",{class:"my-2 text-center"},"Create Unique Username",-1),R={__name:"CreateUsername",setup(S){const _=k(),a=V(),n=w({username:a.app.user.username}),u=c(""),m=c(""),i=c(!1),x={username:{required:A,minLengthValue:L(1)}},o=q(x,n);async function d(){let s=await a.verifyUsername(n.username);console.log(s),s?(i.value=!1,m.value="Username is available"):(m.value="Username is taken",i.value=!0)}function f(){if(o.value.$silentErrors.length>0){let s=o.value.$silentErrors[0].$message;console.log(s),s&&(u.value=s)}else u.value=""}function p(){const s=a.app.user.uid;a.updateUsername(s,n.username),_.push("/home")}return(s,e)=>{const U=l("v-img"),b=l("v-text-field"),h=l("v-btn"),$=l("v-form");return E(),C("div",M,[v("div",null,[r(U,{src:"../assets/img/logo.png",class:"w-20 h-20 mx-auto rounded-sm border"})]),N,v("div",null,[r($,{onSubmit:e[4]||(e[4]=B(t=>p(),["prevent"])),class:"flex flex-col mx-4 gap-4"},{default:y(()=>[r(b,{modelValue:n.username,"onUpdate:modelValue":e[0]||(e[0]=t=>n.username=t),label:"Choose Username","error-messages":u.value,messages:m.value,maxlength:"15",counter:"",onBlur:e[1]||(e[1]=t=>(f(),d(),g(o).username.$touch)),onInput:e[2]||(e[2]=t=>(f(),d(),g(o).username.$touch))},null,8,["modelValue","error-messages","messages"]),r(h,{class:"mt-2",color:"indigo-darken-1",block:"",text:"Finish",onClick:e[3]||(e[3]=t=>p()),disabled:i.value},null,8,["disabled"])]),_:1})])])}}};export{R as default};
