(this["webpackJsonpimage-upload"]=this["webpackJsonpimage-upload"]||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var i=n(1),c=n.n(i),r=n(4),o=n.n(r),a=(n(10),n(2)),u=n(5),s=n.n(u),l=(n(11),n(12),n(0)),h=function(){return Object(l.jsxs)("svg",{width:"90",height:"100",viewBox:"0 0 90 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(l.jsx)("path",{d:"M0 4C0 1.79086 1.79086 0 4 0H86C88.2091 0 90 1.79086 90 4V96C90 98.2091 88.2091 100 86 100H4C1.79086 100 0 98.2091 0 96V4Z",fill:"#F4F4F4"}),Object(l.jsx)("path",{d:"M61 68C59.4348 60.0541 52.8261 54 45 54C37.1739 54 30.7391 60.0541 29 68",stroke:"#999999",strokeWidth:"2",strokeMiterlimit:"10",strokeLinecap:"round",strokeLinejoin:"round"}),Object(l.jsx)("path",{d:"M45 48C49.4183 48 53 44.4183 53 40C53 35.5817 49.4183 32 45 32C40.5817 32 37 35.5817 37 40C37 44.4183 40.5817 48 45 48Z",stroke:"#999999",strokeWidth:"2",strokeMiterlimit:"10",strokeLinecap:"round",strokeLinejoin:"round"})]})};var d=function(){var e,t,n=Object(i.useState)(""),c=Object(a.a)(n,2),r=c[0],o=c[1],u=Object(i.useRef)(null),d=Object(i.useRef)(null),j=Object(i.useRef)(null),g=Object(i.useRef)(null),b=Object(i.useState)({unit:"%",width:90,height:100}),f=Object(a.a)(b,2),v=f[0],O=f[1],p=Object(i.useState)(null),x=Object(a.a)(p,2),w=x[0],m=x[1];Object(i.useEffect)((function(){if(k(),w&&g.current&&j.current){var e=j.current,t=g.current,n=w,i=e.naturalWidth/e.width,c=e.naturalHeight/e.height,r=t.getContext("2d"),o=window.devicePixelRatio;t.width=n.width*o,t.height=n.height*o,r.setTransform(o,0,0,o,0,0),r.imageSmoothingQuality="high",r.drawImage(e,n.x*i,n.y*c,n.width*i,n.height*c,0,0,n.width,n.height)}}),[u,w]);var C=Object(i.useCallback)((function(e){j.current=e}),[]),k=function(){navigator.mediaDevices&&navigator.mediaDevices.getUserMedia({video:{width:300},audio:!1}).then((function(e){var t=u.current;t&&(t.srcObject=e,t.play())})).catch((function(e){console.log("error",e)}))};return Object(l.jsx)("div",{className:"App",children:Object(l.jsxs)("header",{className:"App-header",children:[r?Object(l.jsx)("img",{src:r,alt:"alt",width:"90",height:"100",style:{objectFit:"cover"}}):Object(l.jsx)(h,{}),Object(l.jsx)("h3",{children:"-----------------------------Testing Upload-----------------------------"}),Object(l.jsx)("input",{type:"file",id:"picture",name:"picture",required:!0,accept:"image/*",onChange:function(e){if(null!==e.target.files){var t=e.target.files[0],n=URL.createObjectURL(t);i=n,console.log("event.target.files[0]",i),o(i)}var i}}),Object(l.jsx)("h3",{children:"-----------------------------Testing WebCam-----------------------------"}),Object(l.jsx)("video",{onCanPlay:function(){return function(){var e=u.current,t=d.current,n=t.getContext("2d");return t.width=320,t.height=240,setInterval((function(){n.drawImage(e,0,0,320,240)}),200)}()},ref:u}),Object(l.jsx)("button",{type:"button",onClick:function(){return function(){var e=d.current.toDataURL("image/jpeg");o(e)}()},children:"Take a photo with the webcam"}),Object(l.jsx)("canvas",{ref:d,style:{display:"none"}}),Object(l.jsx)("h3",{children:"-----------------------------Testing Crop-----------------------------"}),r||v?Object(l.jsx)(s.a,{src:r,onImageLoaded:C,crop:v,onChange:function(e){O(e)},onComplete:function(e){m(e)},style:{width:"170px",heigh:"auto"}}):null,Object(l.jsxs)("div",{children:[Object(l.jsx)("canvas",{ref:g,style:{display:"none",width:Math.round(null!==(e=null===w||void 0===w?void 0:w.width)&&void 0!==e?e:0),height:Math.round(null!==(t=null===w||void 0===w?void 0:w.height)&&void 0!==t?t:0)}}),Object(l.jsx)("button",{type:"button",disabled:!(null===w||void 0===w?void 0:w.width)||!(null===w||void 0===w?void 0:w.height),onClick:function(){return function(e,t){t&&e&&e.toBlob((function(e){var t=URL.createObjectURL(e);o(t)}),"image/png",1)}(g.current,w)},children:"Select this image"})]})]})})},j=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),i(e),c(e),r(e),o(e)}))};o.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(d,{})}),document.getElementById("root")),j()}},[[14,1,2]]]);
//# sourceMappingURL=main.7fdca66a.chunk.js.map