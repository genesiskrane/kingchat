import{f as y,r as V,k as i,c as C,w as o,e as N,a as t,o as B,b as e,u as s,i as u,D,t as R,d as S}from"./index-kHuLdyXg.js";import{_ as $}from"./SideBar-BmjqUDGZ.js";import{_ as j}from"./Messenger-BqRhh1bk.js";const q=S("div",{class:"bg-green-100"},null,-1),E={__name:"Chat",setup(A){const m=y(),c=N();let a=V(!1);const d=c.query.origin;let r;switch(d){case"/home":r="recent";break;case"/chats":r="chats";break}let l=i(m[r].find(p=>p.profile.username==c.params.username));const f=i({type:"Chat",chatid:l._id||l.chatid});return(p,n)=>{const v=t("v-navigation-drawer"),b=t("v-app-bar-nav-icon"),h=t("v-app-bar-title"),g=t("v-app-bar"),k=t("v-container"),w=t("v-main"),x=t("v-app");return B(),C(x,null,{default:o(()=>[e(v,{modelValue:s(a),"onUpdate:modelValue":n[0]||(n[0]=_=>u(a)?a.value=_:a=_)},{default:o(()=>[e($)]),_:1},8,["modelValue"]),e(g,{elevation:2,color:"red-darken-1"},{default:o(()=>[e(b,{onClick:n[1]||(n[1]=_=>u(a)?a.value=!s(a):a=!s(a))}),e(h,null,{default:o(()=>[D(R(s(l).profile.displayName),1)]),_:1})]),_:1}),e(w,null,{default:o(()=>[e(k,{class:"ma-0 pa-0 mx-auto flex flex-col justify-between h-full"},{default:o(()=>[q,e(j,{to:f},null,8,["to"])]),_:1})]),_:1})]),_:1})}}};export{E as default};