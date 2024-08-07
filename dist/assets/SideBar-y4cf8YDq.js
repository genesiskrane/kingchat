import{h as v,a as m,o,k as r,F as d,l as $,u as h,c as b,w as y,d as s,t as p,m as f,q as k,r as w,H as C,b as u,p as S,n as I}from"./index-DxFlzq2_.js";import{_ as L}from"./_plugin-vue_export-helper-DlAUqK2U.js";const B={class:"flex flex-col justify-between"},N={class:"flex flex-row justify-start gap-4"},j=["src"],A={class:"inline-flex items-center"},F={__name:"Navigation",setup(n){const c=v(),a=[{name:"Home",route:"home",icon:"home",public:!0},{name:"Chats",route:"chats",icon:"envelop",public:!1},{name:"Rooms",route:"rooms",icon:"door",public:!0},{name:"Games",route:"games",icon:"gamepad",public:!0},{name:"Store",route:"store",icon:"buy",public:!1}];function t(l){return`/${l.route}`}function _(l){return`../assets/icons/${l}.svg`}return(l,g)=>{const i=m("router-link");return o(),r("nav",B,[(o(),r(d,null,$(a,e=>(o(),r(d,{key:e},[e.public|h(c).app.isLoggedIn?(o(),b(i,{key:0,to:t(e),class:"px-4 py-2"},{default:y(()=>[s("div",N,[s("div",null,[s("img",{src:_(e.icon),alt:""},null,8,j)]),s("div",A,[s("span",null,p(e.name),1)])])]),_:2},1032,["to"])):f("",!0)],64))),64))])}}},V=n=>(S("data-v-20e11c85"),n=n(),I(),n),H={id:"footer",class:"flex flex-col"},R={class:""},q=V(()=>s("li",null,[s("span",null,"Add Account")],-1)),z={class:"flex p-4 justify-between"},D={class:"flex gap-4"},E={class:"grid content-center"},G={class:"flex flex-col"},K={id:"display-name"},M={id:"username"},O={class:"grid content-center"},U={__name:"Footer",setup(n){const c=v(),a=k(c.user),t=w(!0);function _(){t.value=!t.value}async function l(){await c.logout()}return(g,i)=>{const e=m("v-img");return o(),r("div",H,[h(c).app.isLoggedIn?(o(),r(d,{key:0},[s("div",{class:C([{more:t.value},"border-2"])},[s("div",R,[s("ul",null,[q,s("li",null,[s("span",{onClick:i[0]||(i[0]=x=>l())},"Logout")])])])],2),s("div",z,[s("div",D,[s("div",E,[u(e,{src:a.photoURL,"aspect-ratio":"1",class:"w-12 h-12 rounded-full"},null,8,["src"])]),s("div",G,[s("div",K,p(a.displayName),1),s("div",M,"@"+p(a.username),1)])]),s("div",O,[s("div",null,[u(e,{src:"../assets/icons/more.svg",class:"w-6 h-6",onClick:i[1]||(i[1]=x=>_())})])])])],64)):f("",!0)])}}},J=L(U,[["__scopeId","data-v-20e11c85"]]),P={id:"sidebar",class:"flex flex-col justify-between h-screen"},Q={class:"flex px-4 py-8 gap-4"},T={class:"p-2 bg-red-500 rounded-2xl"},W=s("div",{class:"grid items-center"},[s("span",{class:""},"King Chat")],-1),X=s("hr",null,null,-1),Y=s("hr",{class:"mt-12"},null,-1),es={__name:"SideBar",setup(n){return(c,a)=>{const t=m("v-img");return o(),r("div",P,[s("div",null,[s("header",Q,[s("div",T,[u(t,{class:"w-20 h-20",src:"../assets/img/icon-black.svg","aspect-ratio":"1"})]),W]),X,u(F)]),s("div",null,[Y,u(J)])])}}};export{es as _};
