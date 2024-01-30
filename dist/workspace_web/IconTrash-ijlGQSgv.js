import{c as ge,r,j as u,b as E,u as X,t as Y,s as xe,g as s,k as m,m as ie,Y as Z,f as de,e as we,o as Ie,D as Se,d as Ee,z as Pe,a5 as Le}from"./input.js";import{a3 as Me,a4 as fe,e as me}from"./App-EbJ8EOYb.js";import{G as De}from"./chunk-JARCRF6W-po8hqWTL.js";var[lt,Re]=ge({name:"CheckboxGroupContext",strict:!1});function _e(e){const[o,t]=r.useState(e),[a,d]=r.useState(!1);return e!==o&&(d(!0),t(e)),a}function je(e){return u.jsx(E.svg,{width:"1.2em",viewBox:"0 0 12 10",style:{fill:"none",strokeWidth:2,stroke:"currentColor",strokeDasharray:16},...e,children:u.jsx("polyline",{points:"1.5 6 4.5 9 10.5 1"})})}function Fe(e){return u.jsx(E.svg,{width:"1.2em",viewBox:"0 0 24 24",style:{stroke:"currentColor",strokeWidth:4},...e,children:u.jsx("line",{x1:"21",x2:"3",y1:"12",y2:"12"})})}function Ae(e){const{isIndeterminate:o,isChecked:t,...a}=e,d=o?Fe:je;return t||o?u.jsx(E.div,{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"},children:u.jsx(d,{...a})}):null}var Be={border:"0",clip:"rect(0, 0, 0, 0)",height:"1px",width:"1px",margin:"-1px",padding:"0",overflow:"hidden",whiteSpace:"nowrap",position:"absolute"},Ge=()=>typeof document<"u",ce=!1,G=null,g=!1,J=!1,Q=new Set;function ee(e,o){Q.forEach(t=>t(e,o))}var Ke=typeof window<"u"&&window.navigator!=null?/^Mac/.test(window.navigator.platform):!1;function Te(e){return!(e.metaKey||!Ke&&e.altKey||e.ctrlKey||e.key==="Control"||e.key==="Shift"||e.key==="Meta")}function le(e){g=!0,Te(e)&&(G="keyboard",ee("keyboard",e))}function S(e){if(G="pointer",e.type==="mousedown"||e.type==="pointerdown"){g=!0;const o=e.composedPath?e.composedPath()[0]:e.target;let t=!1;try{t=o.matches(":focus-visible")}catch{}if(t)return;ee("pointer",e)}}function Ne(e){return e.mozInputSource===0&&e.isTrusted?!0:e.detail===0&&!e.pointerType}function He(e){Ne(e)&&(g=!0,G="virtual")}function Ue(e){e.target===window||e.target===document||(!g&&!J&&(G="virtual",ee("virtual",e)),g=!1,J=!1)}function Ve(){g=!1,J=!0}function ue(){return G!=="pointer"}function We(){if(!Ge()||ce)return;const{focus:e}=HTMLElement.prototype;HTMLElement.prototype.focus=function(...t){g=!0,e.apply(this,t)},document.addEventListener("keydown",le,!0),document.addEventListener("keyup",le,!0),document.addEventListener("click",He,!0),window.addEventListener("focus",Ue,!0),window.addEventListener("blur",Ve,!1),typeof PointerEvent<"u"?(document.addEventListener("pointerdown",S,!0),document.addEventListener("pointermove",S,!0),document.addEventListener("pointerup",S,!0)):(document.addEventListener("mousedown",S,!0),document.addEventListener("mousemove",S,!0),document.addEventListener("mouseup",S,!0)),ce=!0}function $e(e){We(),e(ue());const o=()=>e(ue());return Q.add(o),()=>{Q.delete(o)}}function ze(e,o=[]){const t=Object.assign({},e);for(const a of o)a in t&&delete t[a];return t}function Oe(e={}){const o=Me(e),{isDisabled:t,isReadOnly:a,isRequired:d,isInvalid:i,id:v,onBlur:x,onFocus:P,"aria-describedby":b}=o,{defaultChecked:C,isChecked:L,isFocusable:W,onChange:$,isIndeterminate:f,name:M,value:K,tabIndex:T=void 0,"aria-label":D,"aria-labelledby":R,"aria-invalid":k,...z}=e,_=ze(z,["isDisabled","isReadOnly","isRequired","isInvalid","id","onBlur","onFocus","aria-describedby"]),j=X($),N=X(x),F=X(P),[w,O]=r.useState(!1),[y,H]=r.useState(!1),[A,te]=r.useState(!1),[B,I]=r.useState(!1);r.useEffect(()=>$e(O),[]);const h=r.useRef(null),[ne,he]=r.useState(!0),[pe,U]=r.useState(!!C),q=L!==void 0,c=q?L:pe,ae=r.useCallback(n=>{if(a||t){n.preventDefault();return}q||U(c?n.target.checked:f?!0:n.target.checked),j==null||j(n)},[a,t,c,q,f,j]);Y(()=>{h.current&&(h.current.indeterminate=!!f)},[f]),xe(()=>{t&&H(!1)},[t,H]),Y(()=>{const n=h.current;if(!(n!=null&&n.form))return;const l=()=>{U(!!C)};return n.form.addEventListener("reset",l),()=>{var p;return(p=n.form)==null?void 0:p.removeEventListener("reset",l)}},[]);const oe=t&&!W,se=r.useCallback(n=>{n.key===" "&&I(!0)},[I]),re=r.useCallback(n=>{n.key===" "&&I(!1)},[I]);Y(()=>{if(!h.current)return;h.current.checked!==c&&U(h.current.checked)},[h.current]);const ve=r.useCallback((n={},l=null)=>{const p=V=>{y&&V.preventDefault(),I(!0)};return{...n,ref:l,"data-active":s(B),"data-hover":s(A),"data-checked":s(c),"data-focus":s(y),"data-focus-visible":s(y&&w),"data-indeterminate":s(f),"data-disabled":s(t),"data-invalid":s(i),"data-readonly":s(a),"aria-hidden":!0,onMouseDown:m(n.onMouseDown,p),onMouseUp:m(n.onMouseUp,()=>I(!1)),onMouseEnter:m(n.onMouseEnter,()=>te(!0)),onMouseLeave:m(n.onMouseLeave,()=>te(!1))}},[B,c,t,y,w,A,f,i,a]),ke=r.useCallback((n={},l=null)=>({...n,ref:l,"data-active":s(B),"data-hover":s(A),"data-checked":s(c),"data-focus":s(y),"data-focus-visible":s(y&&w),"data-indeterminate":s(f),"data-disabled":s(t),"data-invalid":s(i),"data-readonly":s(a)}),[B,c,t,y,w,A,f,i,a]),ye=r.useCallback((n={},l=null)=>({..._,...n,ref:ie(l,p=>{p&&he(p.tagName==="LABEL")}),onClick:m(n.onClick,()=>{var p;ne||((p=h.current)==null||p.click(),requestAnimationFrame(()=>{var V;(V=h.current)==null||V.focus({preventScroll:!0})}))}),"data-disabled":s(t),"data-checked":s(c),"data-invalid":s(i)}),[_,t,c,i,ne]),be=r.useCallback((n={},l=null)=>({...n,ref:ie(h,l),type:"checkbox",name:M,value:K,id:v,tabIndex:T,onChange:m(n.onChange,ae),onBlur:m(n.onBlur,N,()=>H(!1)),onFocus:m(n.onFocus,F,()=>H(!0)),onKeyDown:m(n.onKeyDown,se),onKeyUp:m(n.onKeyUp,re),required:d,checked:c,disabled:oe,readOnly:a,"aria-label":D,"aria-labelledby":R,"aria-invalid":k?!!k:i,"aria-describedby":b,"aria-disabled":t,style:Be}),[M,K,v,ae,N,F,se,re,d,c,oe,a,D,R,k,i,b,t,T]),Ce=r.useCallback((n={},l=null)=>({...n,ref:l,onMouseDown:m(n.onMouseDown,qe),"data-disabled":s(t),"data-checked":s(c),"data-invalid":s(i)}),[c,t,i]);return{state:{isInvalid:i,isFocused:y,isChecked:c,isActive:B,isHovered:A,isIndeterminate:f,isDisabled:t,isReadOnly:a,isRequired:d},getRootProps:ye,getCheckboxProps:ve,getIndicatorProps:ke,getInputProps:be,getLabelProps:Ce,htmlProps:_}}function qe(e){e.preventDefault(),e.stopPropagation()}var Xe={display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"top",userSelect:"none",flexShrink:0},Ye={cursor:"pointer",display:"inline-flex",alignItems:"center",verticalAlign:"top",position:"relative"},Je=Z({from:{opacity:0,strokeDashoffset:16,transform:"scale(0.95)"},to:{opacity:1,strokeDashoffset:0,transform:"scale(1)"}}),Qe=Z({from:{opacity:0},to:{opacity:1}}),Ze=Z({from:{transform:"scaleX(0.65)"},to:{transform:"scaleX(1)"}}),et=de(function(o,t){const a=Re(),d={...a,...o},i=we("Checkbox",d),v=Ie(o),{spacing:x="0.5rem",className:P,children:b,iconColor:C,iconSize:L,icon:W=u.jsx(Ae,{}),isChecked:$,isDisabled:f=a==null?void 0:a.isDisabled,onChange:M,inputProps:K,...T}=v;let D=$;a!=null&&a.value&&v.value&&(D=a.value.includes(v.value));let R=M;a!=null&&a.onChange&&v.value&&(R=Se(a.onChange,M));const{state:k,getInputProps:z,getCheckboxProps:_,getLabelProps:j,getRootProps:N}=Oe({...T,isDisabled:f,isChecked:D,onChange:R}),F=_e(k.isChecked),w=r.useMemo(()=>({animation:F?k.isIndeterminate?`${Qe} 20ms linear, ${Ze} 200ms linear`:`${Je} 200ms linear`:void 0,fontSize:L,color:C,...i.icon}),[C,L,F,k.isIndeterminate,i.icon]),O=r.cloneElement(W,{__css:w,isIndeterminate:k.isIndeterminate,isChecked:k.isChecked});return u.jsxs(E.label,{__css:{...Ye,...i.container},className:Ee("chakra-checkbox",P),...N(),children:[u.jsx("input",{className:"chakra-checkbox__input",...z(K,t)}),u.jsx(E.span,{__css:{...Xe,...i.control},className:"chakra-checkbox__control",..._(),children:O}),b&&u.jsx(E.span,{className:"chakra-checkbox__label",...j(),__css:{marginStart:x,...i.label},children:b})]})});et.displayName="Checkbox";var tt=de(function(o,t){const{columns:a,spacingX:d,spacingY:i,spacing:v,minChildWidth:x,...P}=o,b=Pe(),C=x?at(x,b):ot(a);return u.jsx(De,{ref:t,gap:v,columnGap:d,rowGap:i,templateColumns:C,...P})});tt.displayName="SimpleGrid";function nt(e){return typeof e=="number"?`${e}px`:e}function at(e,o){return fe(e,t=>{const a=Le("sizes",t,nt(t))(o);return t===null?null:`repeat(auto-fit, minmax(${a}, 1fr))`})}function ot(e){return fe(e,o=>o===null?null:`repeat(${o}, minmax(0, 1fr))`)}var ut=me("chevron-right","IconChevronRight",[["path",{d:"M9 6l6 6l-6 6",key:"svg-0"}]]),dt=me("trash","IconTrash",[["path",{d:"M4 7l16 0",key:"svg-0"}],["path",{d:"M10 11l0 6",key:"svg-1"}],["path",{d:"M14 11l0 6",key:"svg-2"}],["path",{d:"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",key:"svg-3"}],["path",{d:"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3",key:"svg-4"}]]);export{et as C,dt as I,tt as S,ut as a};
