import{j as m,e as o,r as f,o as v,g as x,d as s,E as _,t as h,a as w,w as y}from"./index-CXDzGQ2b.js";const k="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='32'%20height='32'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='%23FFFFFF'%20d='m2%2021l21-9L2%203v7l15%202l-15%202z'/%3e%3c/svg%3e",b={id:"messenger",class:"flex flex-row bg-black m-1 p-1 gap-1"},C={id:"message",class:"w-full h-full bg-white grid items-center p-0"},F={class:"bg-yellow-100 h-full grid items-center"},T={id:"sender",class:"grid items-end"},z=s("img",{src:k,class:"h-10 w-10",alt:"Send"},null,-1),S={__name:"Messenger",setup(B){const c=m(),p=o(),l=o(),a=o(!1),u=o("Type a message");let r={};function i(e){l.value.innerText.length!==0&&(a.value=!0),e.type=="keyup"&&delete r[e.keyCode],e.type=="keydown"&&(r[e.keyCode]=!0,e.keyCode==13&&Object.keys(r).length==1&&(e.preventDefault(),d()))}function d(){const e=l.value.innerText.trim();l.value.innerText="",a.value=!1,c.sendToRoom(e)}return(e,t)=>{const g=f("v-btn");return v(),x("div",b,[s("div",C,[s("div",F,[s("p",{id:"text",contenteditable:"true",class:"p-1.5 max-h-60 break-all overflow-auto z-10",onKeyup:t[0]||(t[0]=n=>i(n)),onKeydown:t[1]||(t[1]=n=>i(n)),ref_key:"text",ref:l},null,544),s("div",{ref_key:"placeholder",ref:p,class:_([{hidden:a.value},"p-1.5 absolute z-0"])},h(u.value),3)])]),s("div",T,[w(g,{class:"flex flex-row min-h-min px-1.5 gap-1.5",color:"red-darken-1",rounded:"0",onClick:t[2]||(t[2]=n=>d())},{default:y(()=>[z]),_:1})])])}}};export{S as _};
