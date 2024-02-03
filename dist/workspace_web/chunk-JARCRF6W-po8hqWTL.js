import{f as v,j as b,r as h,t as E,b as w}from"./input.js";var k=v(function(r,a){const{htmlWidth:e,htmlHeight:t,alt:i,...l}=r;return b.jsx("img",{width:e,height:t,ref:a,alt:i,...l})});k.displayName="NativeImage";function G(n){const{loading:r,src:a,srcSet:e,onLoad:t,onError:i,crossOrigin:l,sizes:u,ignoreFallback:g}=n,[c,m]=h.useState("pending");h.useEffect(()=>{m(a?"loading":"pending")},[a]);const s=h.useRef(),p=h.useCallback(()=>{if(!a)return;d();const o=new Image;o.src=a,l&&(o.crossOrigin=l),e&&(o.srcset=e),u&&(o.sizes=u),r&&(o.loading=r),o.onload=f=>{d(),m("loaded"),t==null||t(f)},o.onerror=f=>{d(),m("failed"),i==null||i(f)},s.current=o},[a,l,e,u,t,i,r]),d=()=>{s.current&&(s.current.onload=null,s.current.onerror=null,s.current=null)};return E(()=>{if(!g)return c==="loading"&&p(),()=>{d()}},[c,p,g]),g?"loaded":c}var x=(n,r)=>n!=="loaded"&&r==="beforeLoadOrError"||n==="failed"&&r==="onError";function y(n,r=[]){const a=Object.assign({},n);for(const e of r)e in a&&delete a[e];return a}var N=v(function(r,a){const{fallbackSrc:e,fallback:t,src:i,srcSet:l,align:u,fit:g,loading:c,ignoreFallback:m,crossOrigin:s,fallbackStrategy:p="beforeLoadOrError",referrerPolicy:d,...o}=r,f=e!==void 0||t!==void 0,I=c!=null||m||!f,R=G({...r,crossOrigin:s,ignoreFallback:I}),j=x(R,p),F={ref:a,objectFit:g,objectPosition:u,...I?o:y(o,["onError","onLoad"])};return j?t||b.jsx(w.img,{as:k,className:"chakra-image__placeholder",src:e,...F}):b.jsx(w.img,{as:k,src:i,srcSet:l,crossOrigin:s,loading:c,referrerPolicy:d,className:"chakra-image",...F})});N.displayName="Image";var C=v(function(r,a){const{templateAreas:e,gap:t,rowGap:i,columnGap:l,column:u,row:g,autoFlow:c,autoRows:m,templateRows:s,autoColumns:p,templateColumns:d,...o}=r,f={display:"grid",gridTemplateAreas:e,gridGap:t,gridRowGap:i,gridColumnGap:l,gridAutoColumns:p,gridColumn:u,gridRow:g,gridAutoFlow:c,gridAutoRows:m,gridTemplateRows:s,gridTemplateColumns:d};return b.jsx(w.div,{ref:a,__css:f,...o})});C.displayName="Grid";export{C as G,N as I};