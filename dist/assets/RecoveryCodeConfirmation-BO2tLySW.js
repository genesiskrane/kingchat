import{u as g,r as f,f as h,e as i,b as d,t as w,d as C,w as V,v as I,a as c,o as S,p as X,l as b,k}from"./index-BX35GXuC.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";const R=s=>(X("data-v-a6ecc238"),s=s(),b(),s),B={class:"grid content-center h-full w-full"},N={class:"mx-4"},U=R(()=>i("h2",{class:"my-2 text-center"},"We sent you a code",-1)),q={class:"mx-2 my-2 text-xs"},A={__name:"RecoveryCodeConfirmation",setup(s){const v=k(),u=g(),m=f(!1),l=f(""),_=x(u.user.email);function x(o){return console.log(o),o.replace(/(.{3})(.*)(?=@)/,(p,t,n)=>{console.log(p,t,n);for(let a=0;a<n.length;a++)t+="*";return t})}async function y(){if(l.value.length==6){let o=await u.verifyOTP({uid:u.user.uid,code:l.value});console.log(o),o?v.push("/auth/reset-password"):m.value=!0}}return(o,e)=>{const p=c("v-img"),t=c("v-alert"),n=c("v-text-field"),a=c("v-form");return S(),h("div",B,[i("div",null,[d(p,{src:"../assets/img/logo.png",class:"w-20 h-20 mx-auto my-8 rounded-sm"})]),i("div",N,[U,i("p",q," Check your email "+w(C(_))+" to get your confirmation code. If you need to request a new code, go back and re-enter your username or email. ",1),d(a,{onSubmit:e[3]||(e[3]=I(()=>{},["prevent"])),class:"flex flex-col gap-4"},{default:V(()=>[d(t,{text:"Invalid Code",type:"warning",modelValue:m.value,"onUpdate:modelValue":e[0]||(e[0]=r=>m.value=r),rounded:"",closable:""},null,8,["modelValue"]),d(n,{modelValue:l.value,"onUpdate:modelValue":e[1]||(e[1]=r=>l.value=r),label:"Recovery Code",id:"code",placeholder:"XXXXXX",maxlength:"6",counter:"",onInput:e[2]||(e[2]=r=>y())},null,8,["modelValue"])]),_:1})])])}}},O=E(A,[["__scopeId","data-v-a6ecc238"]]);export{O as default};