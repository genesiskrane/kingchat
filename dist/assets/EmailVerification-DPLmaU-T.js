import{k as V,u as g,e as c,c as h,d as n,b as l,w,q as y,r as s,o as I,p as X,f as E}from"./index-BvIN2EcR.js";import{_ as S}from"./_plugin-vue_export-helper-DlAUqK2U.js";const u=o=>(X("data-v-a8ee306c"),o=o(),E(),o),b={class:"grid content-center h-full w-full"},k=u(()=>n("h2",{class:"my-2 text-center"},"Verify Email",-1)),B=u(()=>n("div",{class:"text-right"},"Resend Verification Email",-1)),C={__name:"EmailVerification",setup(o){const p=V(),d=g(),i=c(!1),t=c("");async function m(){if(t.value.length==6){let r=await d.verifyOTP({uid:d.app.user.uid,code:t.value});console.log(r),r?p.push("/auth/create-password"):i.value=!0}}return(r,e)=>{const f=s("v-img"),v=s("v-alert"),_=s("v-text-field"),x=s("v-form");return I(),h("div",b,[n("div",null,[l(f,{src:"../assets/img/logo.png",class:"w-20 h-20 mx-auto my-8 rounded-sm"})]),n("div",null,[k,l(x,{onSubmit:e[3]||(e[3]=y(()=>{},["prevent"])),class:"flex flex-col mx-4 gap-4"},{default:w(()=>[l(v,{text:"Invalid OTP",type:"warning",modelValue:i.value,"onUpdate:modelValue":e[0]||(e[0]=a=>i.value=a),rounded:"",closable:""},null,8,["modelValue"]),B,l(_,{modelValue:t.value,"onUpdate:modelValue":e[1]||(e[1]=a=>t.value=a),label:"Verification Code",id:"code",placeholder:"XXXXXX",maxlength:"6",counter:"",onInput:e[2]||(e[2]=a=>m())},null,8,["modelValue"])]),_:1})])])}}},P=S(C,[["__scopeId","data-v-a8ee306c"]]);export{P as default};
