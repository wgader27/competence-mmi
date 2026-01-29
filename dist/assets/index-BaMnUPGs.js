(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();class Rt{constructor(r,e={}){let t=document.getElementById(r);t||(t=document.createElement("div"),console.warn(`Element with id "${r}" not found. Creating a new div as root.`),document.body.appendChild(t)),this.root=t,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=e.loginPath||"/login",window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",n=>{n.target.matches("[data-link]")&&(n.preventDefault(),this.navigate(n.target.getAttribute("href")))})}setAuth(r){this.isAuthenticated=r}addLayout(r,e){return this.layouts[r]=e,this}findLayout(r){let e=null,t=0;for(const[n,i]of Object.entries(this.layouts))r.startsWith(n)&&n.length>t&&(e=i,t=n.length);return e}addRoute(r,e,t={}){const n=this.pathToRegex(r),i=this.extractParams(r);return this.routes.push({path:r,regex:n,keys:i,handler:e,requireAuth:t.requireAuth||!1,useLayout:t.useLayout!==!1}),this}pathToRegex(r){if(r==="*")return/.*/;const e=r.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+e+"$")}extractParams(r){const e=[],t=r.matchAll(/:(\w+)/g);for(const n of t)e.push(n[1]);return e}getParams(r,e){const t=e.match(r.regex);if(!t)return{};const n={};return r.keys.forEach((i,o)=>{n[i]=t[o+1]}),n}navigate(r){window.history.pushState(null,null,r),this.handleRoute()}handleRoute(){const r=window.location.pathname;for(const t of this.routes)if(t.regex.test(r)){if(t.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",r),this.navigate(this.loginPath);return}this.currentRoute=r;const n=this.getParams(t,r),i=t.handler(n);i instanceof Promise?i.then(o=>{this.renderContent(o,t,r)}):this.renderContent(i,t,r);return}const e=this.routes.find(t=>t.path==="*");if(e){const t=e.handler({});this.root.innerHTML=t}}renderContent(r,e,t){const n=r instanceof DocumentFragment,i=r instanceof HTMLElement;if(e.useLayout){const o=this.findLayout(t);if(o){const l=o(),s=l.querySelector("slot");if(s)if(i||n)s.replaceWith(r);else{const d=document.createElement("template");d.innerHTML=r,s.replaceWith(d.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(l)}else i?(this.root.innerHTML="",this.root.appendChild(r)):this.root.innerHTML=r}else i||n?(this.root.innerHTML="",this.root.appendChild(r)):this.root.innerHTML=r;this.attachEventListeners(t)}attachEventListeners(r){const e=document.getElementById("loginBtn");e&&e.addEventListener("click",()=>{this.login()});const t=document.getElementById("logoutBtn");t&&t.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const r=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(r||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const qt=`<div class="root-layout">\r
    <slot name="header"></slot>\r
    <!-- <main class="root-main">\r
        <slot></slot>\r
    </main> -->\r
    <slot name="footer"></slot>\r
</div>`;function Cr(a){const r=document.createElement("template");r.innerHTML=a.trim();const e=r.content;return e.childElementCount===1?e.firstElementChild:(console.error("htmlToDOM: fragment must contain exactly one child element."),null)}const B1=`<header class="header">\r
  <div class="header-row">\r
    <h2 class="header-title">SAE 3.03 - Starter Project</h2>\r
    <nav class="header-nav">\r
      <a href="/svg-demo1" data-link class="header-link">SVG Demo 1</a>\r
      <a href="/svg-demo2" data-link class="header-link">SVG Demo 2</a>\r
      <a href="/svg-demo3" data-link class="header-link">SVG Demo 3</a>\r
      <a href="/svg-demo4" data-link class="header-link">SVG Demo 4</a>\r
      <a href="/svg-demo5" data-link class="header-link">SVG Demo 5</a>\r
     </nav>\r
  </div>\r
</header>\r
`;let zt={html:function(){return B1},dom:function(){return Cr(B1)}};const F1=`<footer class="footer">\r
    <p class="footer-text">&copy; 2025 - MMI - SAE 3.01</p>\r
</footer>\r
`;let Nt={html:function(){return F1},dom:function(){return Cr(F1)}};function Yt(){let a=Cr(qt);return zt.dom(),Nt.dom(),a}const $t=` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;function Xt(){return $t}function vr(a){if(a===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function z1(a,r){a.prototype=Object.create(r.prototype),a.prototype.constructor=a,a.__proto__=r}var dr={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Qr={duration:.5,overwrite:!1,delay:0},o1,X,Z,fr=1e8,O=1/fr,ze=Math.PI*2,Wt=ze/4,Jt=0,N1=Math.sqrt,Kt=Math.cos,Qt=Math.sin,Y=function(r){return typeof r=="string"},P=function(r){return typeof r=="function"},Fr=function(r){return typeof r=="number"},a1=function(r){return typeof r>"u"},xr=function(r){return typeof r=="object"},rr=function(r){return r!==!1},l1=function(){return typeof window<"u"},we=function(r){return P(r)||Y(r)},Y1=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},J=Array.isArray,rn=/random\([^)]+\)/g,en=/,\s*/g,b1=/(?:-?\.?\d|\.)+/gi,$1=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,$r=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ue=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,X1=/[+-]=-?[.\d]+/,tn=/[^,'"\[\]\s]+/gi,nn=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,D,mr,Ne,s1,cr={},be={},W1,J1=function(r){return(be=re(r,cr))&&ir},d1=function(r,e){return console.warn("Invalid property",r,"set to",e,"Missing plugin? gsap.registerPlugin()")},fe=function(r,e){return!e&&console.warn(r)},K1=function(r,e){return r&&(cr[r]=e)&&be&&(be[r]=e)||cr},he=function(){return 0},on={suppressEvents:!0,isStart:!0,kill:!1},ve={suppressEvents:!0,kill:!1},an={suppressEvents:!0},c1={},Vr=[],Ye={},Q1,or={},De={},M1=30,Be=[],u1="",p1=function(r){var e=r[0],t,n;if(xr(e)||P(e)||(r=[r]),!(t=(e._gsap||{}).harness)){for(n=Be.length;n--&&!Be[n].targetTest(e););t=Be[n]}for(n=r.length;n--;)r[n]&&(r[n]._gsap||(r[n]._gsap=new vt(r[n],t)))||r.splice(n,1);return r},Hr=function(r){return r._gsap||p1(hr(r))[0]._gsap},rt=function(r,e,t){return(t=r[e])&&P(t)?r[e]():a1(t)&&r.getAttribute&&r.getAttribute(e)||t},er=function(r,e){return(r=r.split(",")).forEach(e)||r},j=function(r){return Math.round(r*1e5)/1e5||0},U=function(r){return Math.round(r*1e7)/1e7||0},Wr=function(r,e){var t=e.charAt(0),n=parseFloat(e.substr(2));return r=parseFloat(r),t==="+"?r+n:t==="-"?r-n:t==="*"?r*n:r/n},ln=function(r,e){for(var t=e.length,n=0;r.indexOf(e[n])<0&&++n<t;);return n<t},Me=function(){var r=Vr.length,e=Vr.slice(0),t,n;for(Ye={},Vr.length=0,t=0;t<r;t++)n=e[t],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},f1=function(r){return!!(r._initted||r._startAt||r.add)},et=function(r,e,t,n){Vr.length&&!X&&Me(),r.render(e,t,!!(X&&e<0&&f1(r))),Vr.length&&!X&&Me()},tt=function(r){var e=parseFloat(r);return(e||e===0)&&(r+"").match(tn).length<2?e:Y(r)?r.trim():r},nt=function(r){return r},ur=function(r,e){for(var t in e)t in r||(r[t]=e[t]);return r},sn=function(r){return function(e,t){for(var n in t)n in e||n==="duration"&&r||n==="ease"||(e[n]=t[n])}},re=function(r,e){for(var t in e)r[t]=e[t];return r},S1=function a(r,e){for(var t in e)t!=="__proto__"&&t!=="constructor"&&t!=="prototype"&&(r[t]=xr(e[t])?a(r[t]||(r[t]={}),e[t]):e[t]);return r},Se=function(r,e){var t={},n;for(n in r)n in e||(t[n]=r[n]);return t},ce=function(r){var e=r.parent||D,t=r.keyframes?sn(J(r.keyframes)):ur;if(rr(r.inherit))for(;e;)t(r,e.vars.defaults),e=e.parent||e._dp;return r},dn=function(r,e){for(var t=r.length,n=t===e.length;n&&t--&&r[t]===e[t];);return t<0},it=function(r,e,t,n,i){var o=r[n],l;if(i)for(l=e[i];o&&o[i]>l;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=r[t],r[t]=e),e._next?e._next._prev=e:r[n]=e,e._prev=o,e.parent=e._dp=r,e},Le=function(r,e,t,n){t===void 0&&(t="_first"),n===void 0&&(n="_last");var i=e._prev,o=e._next;i?i._next=o:r[t]===e&&(r[t]=o),o?o._prev=i:r[n]===e&&(r[n]=i),e._next=e._prev=e.parent=null},Gr=function(r,e){r.parent&&(!e||r.parent.autoRemoveChildren)&&r.parent.remove&&r.parent.remove(r),r._act=0},Rr=function(r,e){if(r&&(!e||e._end>r._dur||e._start<0))for(var t=r;t;)t._dirty=1,t=t.parent;return r},cn=function(r){for(var e=r.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return r},$e=function(r,e,t,n){return r._startAt&&(X?r._startAt.revert(ve):r.vars.immediateRender&&!r.vars.autoRevert||r._startAt.render(e,!0,n))},un=function a(r){return!r||r._ts&&a(r.parent)},A1=function(r){return r._repeat?ee(r._tTime,r=r.duration()+r._rDelay)*r:0},ee=function(r,e){var t=Math.floor(r=U(r/e));return r&&t===r?t-1:t},Ae=function(r,e){return(r-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Ee=function(r){return r._end=U(r._start+(r._tDur/Math.abs(r._ts||r._rts||O)||0))},Ie=function(r,e){var t=r._dp;return t&&t.smoothChildTiming&&r._ts&&(r._start=U(t._time-(r._ts>0?e/r._ts:((r._dirty?r.totalDuration():r._tDur)-e)/-r._ts)),Ee(r),t._dirty||Rr(t,r)),r},ot=function(r,e){var t;if((e._time||!e._dur&&e._initted||e._start<r._time&&(e._dur||!e.add))&&(t=Ae(r.rawTime(),e),(!e._dur||ke(0,e.totalDuration(),t)-e._tTime>O)&&e.render(t,!0)),Rr(r,e)._dp&&r._initted&&r._time>=r._dur&&r._ts){if(r._dur<r.duration())for(t=r;t._dp;)t.rawTime()>=0&&t.totalTime(t._tTime),t=t._dp;r._zTime=-O}},yr=function(r,e,t,n){return e.parent&&Gr(e),e._start=U((Fr(t)?t:t||r!==D?pr(r,t,e):r._time)+e._delay),e._end=U(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),it(r,e,"_first","_last",r._sort?"_start":0),Xe(e)||(r._recent=e),n||ot(r,e),r._ts<0&&Ie(r,r._tTime),r},at=function(r,e){return(cr.ScrollTrigger||d1("scrollTrigger",e))&&cr.ScrollTrigger.create(e,r)},lt=function(r,e,t,n,i){if(_1(r,e,i),!r._initted)return 1;if(!t&&r._pt&&!X&&(r._dur&&r.vars.lazy!==!1||!r._dur&&r.vars.lazy)&&Q1!==ar.frame)return Vr.push(r),r._lazy=[i,n],1},pn=function a(r){var e=r.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||a(e))},Xe=function(r){var e=r.data;return e==="isFromStart"||e==="isStart"},fn=function(r,e,t,n){var i=r.ratio,o=e<0||!e&&(!r._start&&pn(r)&&!(!r._initted&&Xe(r))||(r._ts<0||r._dp._ts<0)&&!Xe(r))?0:1,l=r._rDelay,s=0,d,c,p;if(l&&r._repeat&&(s=ke(0,r._tDur,e),c=ee(s,l),r._yoyo&&c&1&&(o=1-o),c!==ee(r._tTime,l)&&(i=1-o,r.vars.repeatRefresh&&r._initted&&r.invalidate())),o!==i||X||n||r._zTime===O||!e&&r._zTime){if(!r._initted&&lt(r,e,n,t,s))return;for(p=r._zTime,r._zTime=e||(t?O:0),t||(t=e&&!p),r.ratio=o,r._from&&(o=1-o),r._time=0,r._tTime=s,d=r._pt;d;)d.r(o,d.d),d=d._next;e<0&&$e(r,e,t,!0),r._onUpdate&&!t&&lr(r,"onUpdate"),s&&r._repeat&&!t&&r.parent&&lr(r,"onRepeat"),(e>=r._tDur||e<0)&&r.ratio===o&&(o&&Gr(r,1),!t&&!X&&(lr(r,o?"onComplete":"onReverseComplete",!0),r._prom&&r._prom()))}else r._zTime||(r._zTime=e)},hn=function(r,e,t){var n;if(t>e)for(n=r._first;n&&n._start<=t;){if(n.data==="isPause"&&n._start>e)return n;n=n._next}else for(n=r._last;n&&n._start>=t;){if(n.data==="isPause"&&n._start<e)return n;n=n._prev}},te=function(r,e,t,n){var i=r._repeat,o=U(e)||0,l=r._tTime/r._tDur;return l&&!n&&(r._time*=o/r._dur),r._dur=o,r._tDur=i?i<0?1e10:U(o*(i+1)+r._rDelay*i):o,l>0&&!n&&Ie(r,r._tTime=r._tDur*l),r.parent&&Ee(r),t||Rr(r.parent,r),r},V1=function(r){return r instanceof K?Rr(r):te(r,r._dur)},_n={_start:0,endTime:he,totalDuration:he},pr=function a(r,e,t){var n=r.labels,i=r._recent||_n,o=r.duration()>=fr?i.endTime(!1):r._dur,l,s,d;return Y(e)&&(isNaN(e)||e in n)?(s=e.charAt(0),d=e.substr(-1)==="%",l=e.indexOf("="),s==="<"||s===">"?(l>=0&&(e=e.replace(/=/,"")),(s==="<"?i._start:i.endTime(i._repeat>=0))+(parseFloat(e.substr(1))||0)*(d?(l<0?i:t).totalDuration()/100:1)):l<0?(e in n||(n[e]=o),n[e]):(s=parseFloat(e.charAt(l-1)+e.substr(l+1)),d&&t&&(s=s/100*(J(t)?t[0]:t).totalDuration()),l>1?a(r,e.substr(0,l-1),t)+s:o+s)):e==null?o:+e},ue=function(r,e,t){var n=Fr(e[1]),i=(n?2:1)+(r<2?0:1),o=e[i],l,s;if(n&&(o.duration=e[1]),o.parent=t,r){for(l=o,s=t;s&&!("immediateRender"in l);)l=s.vars.defaults||{},s=rr(s.vars.inherit)&&s.parent;o.immediateRender=rr(l.immediateRender),r<2?o.runBackwards=1:o.startAt=e[i-1]}return new R(e[0],o,e[i+1])},Ir=function(r,e){return r||r===0?e(r):e},ke=function(r,e,t){return t<r?r:t>e?e:t},W=function(r,e){return!Y(r)||!(e=nn.exec(r))?"":e[1]},gn=function(r,e,t){return Ir(t,function(n){return ke(r,e,n)})},We=[].slice,st=function(r,e){return r&&xr(r)&&"length"in r&&(!e&&!r.length||r.length-1 in r&&xr(r[0]))&&!r.nodeType&&r!==mr},Cn=function(r,e,t){return t===void 0&&(t=[]),r.forEach(function(n){var i;return Y(n)&&!e||st(n,1)?(i=t).push.apply(i,hr(n)):t.push(n)})||t},hr=function(r,e,t){return Z&&!e&&Z.selector?Z.selector(r):Y(r)&&!t&&(Ne||!ne())?We.call((e||s1).querySelectorAll(r),0):J(r)?Cn(r,t):st(r)?We.call(r,0):r?[r]:[]},Je=function(r){return r=hr(r)[0]||fe("Invalid scope")||{},function(e){var t=r.current||r.nativeElement||r;return hr(e,t.querySelectorAll?t:t===r?fe("Invalid scope")||s1.createElement("div"):r)}},dt=function(r){return r.sort(function(){return .5-Math.random()})},ct=function(r){if(P(r))return r;var e=xr(r)?r:{each:r},t=qr(e.ease),n=e.from||0,i=parseFloat(e.base)||0,o={},l=n>0&&n<1,s=isNaN(n)||l,d=e.axis,c=n,p=n;return Y(n)?c=p={center:.5,edges:.5,end:1}[n]||0:!l&&s&&(c=n[0],p=n[1]),function(f,h,_){var u=(_||e).length,g=o[u],y,C,x,k,m,v,B,F,w;if(!g){if(w=e.grid==="auto"?0:(e.grid||[1,fr])[1],!w){for(B=-fr;B<(B=_[w++].getBoundingClientRect().left)&&w<u;);w<u&&w--}for(g=o[u]=[],y=s?Math.min(w,u)*c-.5:n%w,C=w===fr?0:s?u*p/w-.5:n/w|0,B=0,F=fr,v=0;v<u;v++)x=v%w-y,k=C-(v/w|0),g[v]=m=d?Math.abs(d==="y"?k:x):N1(x*x+k*k),m>B&&(B=m),m<F&&(F=m);n==="random"&&dt(g),g.max=B-F,g.min=F,g.v=u=(parseFloat(e.amount)||parseFloat(e.each)*(w>u?u-1:d?d==="y"?u/w:w:Math.max(w,u/w))||0)*(n==="edges"?-1:1),g.b=u<0?i-u:i,g.u=W(e.amount||e.each)||0,t=t&&u<0?kt(t):t}return u=(g[f]-g.min)/g.max||0,U(g.b+(t?t(u):u)*g.v)+g.u}},Ke=function(r){var e=Math.pow(10,((r+"").split(".")[1]||"").length);return function(t){var n=U(Math.round(parseFloat(t)/r)*r*e);return(n-n%1)/e+(Fr(t)?0:W(t))}},ut=function(r,e){var t=J(r),n,i;return!t&&xr(r)&&(n=t=r.radius||fr,r.values?(r=hr(r.values),(i=!Fr(r[0]))&&(n*=n)):r=Ke(r.increment)),Ir(e,t?P(r)?function(o){return i=r(o),Math.abs(i-o)<=n?i:o}:function(o){for(var l=parseFloat(i?o.x:o),s=parseFloat(i?o.y:0),d=fr,c=0,p=r.length,f,h;p--;)i?(f=r[p].x-l,h=r[p].y-s,f=f*f+h*h):f=Math.abs(r[p]-l),f<d&&(d=f,c=p);return c=!n||d<=n?r[c]:o,i||c===o||Fr(o)?c:c+W(o)}:Ke(r))},pt=function(r,e,t,n){return Ir(J(r)?!e:t===!0?!!(t=0):!n,function(){return J(r)?r[~~(Math.random()*r.length)]:(t=t||1e-5)&&(n=t<1?Math.pow(10,(t+"").length-2):1)&&Math.floor(Math.round((r-t/2+Math.random()*(e-r+t*.99))/t)*t*n)/n})},mn=function(){for(var r=arguments.length,e=new Array(r),t=0;t<r;t++)e[t]=arguments[t];return function(n){return e.reduce(function(i,o){return o(i)},n)}},yn=function(r,e){return function(t){return r(parseFloat(t))+(e||W(t))}},kn=function(r,e,t){return ht(r,e,0,1,t)},ft=function(r,e,t){return Ir(t,function(n){return r[~~e(n)]})},xn=function a(r,e,t){var n=e-r;return J(r)?ft(r,a(0,r.length),e):Ir(t,function(i){return(n+(i-r)%n)%n+r})},wn=function a(r,e,t){var n=e-r,i=n*2;return J(r)?ft(r,a(0,r.length-1),e):Ir(t,function(o){return o=(i+(o-r)%i)%i||0,r+(o>n?i-o:o)})},_e=function(r){return r.replace(rn,function(e){var t=e.indexOf("[")+1,n=e.substring(t||7,t?e.indexOf("]"):e.length-1).split(en);return pt(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},ht=function(r,e,t,n,i){var o=e-r,l=n-t;return Ir(i,function(s){return t+((s-r)/o*l||0)})},vn=function a(r,e,t,n){var i=isNaN(r+e)?0:function(h){return(1-h)*r+h*e};if(!i){var o=Y(r),l={},s,d,c,p,f;if(t===!0&&(n=1)&&(t=null),o)r={p:r},e={p:e};else if(J(r)&&!J(e)){for(c=[],p=r.length,f=p-2,d=1;d<p;d++)c.push(a(r[d-1],r[d]));p--,i=function(_){_*=p;var u=Math.min(f,~~_);return c[u](_-u)},t=e}else n||(r=re(J(r)?[]:{},r));if(!c){for(s in e)h1.call(l,r,s,"get",e[s]);i=function(_){return m1(_,l)||(o?r.p:r)}}}return Ir(t,i)},O1=function(r,e,t){var n=r.labels,i=fr,o,l,s;for(o in n)l=n[o]-e,l<0==!!t&&l&&i>(l=Math.abs(l))&&(s=o,i=l);return s},lr=function(r,e,t){var n=r.vars,i=n[e],o=Z,l=r._ctx,s,d,c;if(i)return s=n[e+"Params"],d=n.callbackScope||r,t&&Vr.length&&Me(),l&&(Z=l),c=s?i.apply(d,s):i.call(d),Z=o,c},se=function(r){return Gr(r),r.scrollTrigger&&r.scrollTrigger.kill(!!X),r.progress()<1&&lr(r,"onInterrupt"),r},Xr,_t=[],gt=function(r){if(r)if(r=!r.name&&r.default||r,l1()||r.headless){var e=r.name,t=P(r),n=e&&!t&&r.init?function(){this._props=[]}:r,i={init:he,render:m1,add:h1,kill:Tn,modifier:Dn,rawVars:0},o={targetTest:0,get:0,getSetter:C1,aliases:{},register:0};if(ne(),r!==n){if(or[e])return;ur(n,ur(Se(r,i),o)),re(n.prototype,re(i,Se(r,o))),or[n.prop=e]=n,r.targetTest&&(Be.push(n),c1[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}K1(e,n),r.register&&r.register(ir,n,tr)}else _t.push(r)},V=255,de={aqua:[0,V,V],lime:[0,V,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,V],navy:[0,0,128],white:[V,V,V],olive:[128,128,0],yellow:[V,V,0],orange:[V,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[V,0,0],pink:[V,192,203],cyan:[0,V,V],transparent:[V,V,V,0]},Te=function(r,e,t){return r+=r<0?1:r>1?-1:0,(r*6<1?e+(t-e)*r*6:r<.5?t:r*3<2?e+(t-e)*(2/3-r)*6:e)*V+.5|0},Ct=function(r,e,t){var n=r?Fr(r)?[r>>16,r>>8&V,r&V]:0:de.black,i,o,l,s,d,c,p,f,h,_;if(!n){if(r.substr(-1)===","&&(r=r.substr(0,r.length-1)),de[r])n=de[r];else if(r.charAt(0)==="#"){if(r.length<6&&(i=r.charAt(1),o=r.charAt(2),l=r.charAt(3),r="#"+i+i+o+o+l+l+(r.length===5?r.charAt(4)+r.charAt(4):"")),r.length===9)return n=parseInt(r.substr(1,6),16),[n>>16,n>>8&V,n&V,parseInt(r.substr(7),16)/255];r=parseInt(r.substr(1),16),n=[r>>16,r>>8&V,r&V]}else if(r.substr(0,3)==="hsl"){if(n=_=r.match(b1),!e)s=+n[0]%360/360,d=+n[1]/100,c=+n[2]/100,o=c<=.5?c*(d+1):c+d-c*d,i=c*2-o,n.length>3&&(n[3]*=1),n[0]=Te(s+1/3,i,o),n[1]=Te(s,i,o),n[2]=Te(s-1/3,i,o);else if(~r.indexOf("="))return n=r.match($1),t&&n.length<4&&(n[3]=1),n}else n=r.match(b1)||de.transparent;n=n.map(Number)}return e&&!_&&(i=n[0]/V,o=n[1]/V,l=n[2]/V,p=Math.max(i,o,l),f=Math.min(i,o,l),c=(p+f)/2,p===f?s=d=0:(h=p-f,d=c>.5?h/(2-p-f):h/(p+f),s=p===i?(o-l)/h+(o<l?6:0):p===o?(l-i)/h+2:(i-o)/h+4,s*=60),n[0]=~~(s+.5),n[1]=~~(d*100+.5),n[2]=~~(c*100+.5)),t&&n.length<4&&(n[3]=1),n},mt=function(r){var e=[],t=[],n=-1;return r.split(Or).forEach(function(i){var o=i.match($r)||[];e.push.apply(e,o),t.push(n+=o.length+1)}),e.c=t,e},G1=function(r,e,t){var n="",i=(r+n).match(Or),o=e?"hsla(":"rgba(",l=0,s,d,c,p;if(!i)return r;if(i=i.map(function(f){return(f=Ct(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),t&&(c=mt(r),s=t.c,s.join(n)!==c.c.join(n)))for(d=r.replace(Or,"1").split($r),p=d.length-1;l<p;l++)n+=d[l]+(~s.indexOf(l)?i.shift()||o+"0,0,0,0)":(c.length?c:i.length?i:t).shift());if(!d)for(d=r.split(Or),p=d.length-1;l<p;l++)n+=d[l]+i[l];return n+d[p]},Or=(function(){var a="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",r;for(r in de)a+="|"+r+"\\b";return new RegExp(a+")","gi")})(),Bn=/hsl[a]?\(/,yt=function(r){var e=r.join(" "),t;if(Or.lastIndex=0,Or.test(e))return t=Bn.test(e),r[1]=G1(r[1],t),r[0]=G1(r[0],t,mt(r[1])),!0},ge,ar=(function(){var a=Date.now,r=500,e=33,t=a(),n=t,i=1e3/240,o=i,l=[],s,d,c,p,f,h,_=function u(g){var y=a()-n,C=g===!0,x,k,m,v;if((y>r||y<0)&&(t+=y-e),n+=y,m=n-t,x=m-o,(x>0||C)&&(v=++p.frame,f=m-p.time*1e3,p.time=m=m/1e3,o+=x+(x>=i?4:i-x),k=1),C||(s=d(u)),k)for(h=0;h<l.length;h++)l[h](m,f,v,g)};return p={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(g){return f/(1e3/(g||60))},wake:function(){W1&&(!Ne&&l1()&&(mr=Ne=window,s1=mr.document||{},cr.gsap=ir,(mr.gsapVersions||(mr.gsapVersions=[])).push(ir.version),J1(be||mr.GreenSockGlobals||!mr.gsap&&mr||{}),_t.forEach(gt)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,s&&p.sleep(),d=c||function(g){return setTimeout(g,o-p.time*1e3+1|0)},ge=1,_(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(s),ge=0,d=he},lagSmoothing:function(g,y){r=g||1/0,e=Math.min(y||33,r)},fps:function(g){i=1e3/(g||240),o=p.time*1e3+i},add:function(g,y,C){var x=y?function(k,m,v,B){g(k,m,v,B),p.remove(x)}:g;return p.remove(g),l[C?"unshift":"push"](x),ne(),x},remove:function(g,y){~(y=l.indexOf(g))&&l.splice(y,1)&&h>=y&&h--},_listeners:l},p})(),ne=function(){return!ge&&ar.wake()},b={},Fn=/^[\d.\-M][\d.\-,\s]/,bn=/["']/g,Mn=function(r){for(var e={},t=r.substr(1,r.length-3).split(":"),n=t[0],i=1,o=t.length,l,s,d;i<o;i++)s=t[i],l=i!==o-1?s.lastIndexOf(","):s.length,d=s.substr(0,l),e[n]=isNaN(d)?d.replace(bn,"").trim():+d,n=s.substr(l+1).trim();return e},Sn=function(r){var e=r.indexOf("(")+1,t=r.indexOf(")"),n=r.indexOf("(",e);return r.substring(e,~n&&n<t?r.indexOf(")",t+1):t)},An=function(r){var e=(r+"").split("("),t=b[e[0]];return t&&e.length>1&&t.config?t.config.apply(null,~r.indexOf("{")?[Mn(e[1])]:Sn(r).split(",").map(tt)):b._CE&&Fn.test(r)?b._CE("",r):t},kt=function(r){return function(e){return 1-r(1-e)}},xt=function a(r,e){for(var t=r._first,n;t;)t instanceof K?a(t,e):t.vars.yoyoEase&&(!t._yoyo||!t._repeat)&&t._yoyo!==e&&(t.timeline?a(t.timeline,e):(n=t._ease,t._ease=t._yEase,t._yEase=n,t._yoyo=e)),t=t._next},qr=function(r,e){return r&&(P(r)?r:b[r]||An(r))||e},Nr=function(r,e,t,n){t===void 0&&(t=function(s){return 1-e(1-s)}),n===void 0&&(n=function(s){return s<.5?e(s*2)/2:1-e((1-s)*2)/2});var i={easeIn:e,easeOut:t,easeInOut:n},o;return er(r,function(l){b[l]=cr[l]=i,b[o=l.toLowerCase()]=t;for(var s in i)b[o+(s==="easeIn"?".in":s==="easeOut"?".out":".inOut")]=b[l+"."+s]=i[s]}),i},wt=function(r){return function(e){return e<.5?(1-r(1-e*2))/2:.5+r((e-.5)*2)/2}},Pe=function a(r,e,t){var n=e>=1?e:1,i=(t||(r?.3:.45))/(e<1?e:1),o=i/ze*(Math.asin(1/n)||0),l=function(c){return c===1?1:n*Math.pow(2,-10*c)*Qt((c-o)*i)+1},s=r==="out"?l:r==="in"?function(d){return 1-l(1-d)}:wt(l);return i=ze/i,s.config=function(d,c){return a(r,d,c)},s},je=function a(r,e){e===void 0&&(e=1.70158);var t=function(o){return o?--o*o*((e+1)*o+e)+1:0},n=r==="out"?t:r==="in"?function(i){return 1-t(1-i)}:wt(t);return n.config=function(i){return a(r,i)},n};er("Linear,Quad,Cubic,Quart,Quint,Strong",function(a,r){var e=r<5?r+1:r;Nr(a+",Power"+(e-1),r?function(t){return Math.pow(t,e)}:function(t){return t},function(t){return 1-Math.pow(1-t,e)},function(t){return t<.5?Math.pow(t*2,e)/2:1-Math.pow((1-t)*2,e)/2})});b.Linear.easeNone=b.none=b.Linear.easeIn;Nr("Elastic",Pe("in"),Pe("out"),Pe());(function(a,r){var e=1/r,t=2*e,n=2.5*e,i=function(l){return l<e?a*l*l:l<t?a*Math.pow(l-1.5/r,2)+.75:l<n?a*(l-=2.25/r)*l+.9375:a*Math.pow(l-2.625/r,2)+.984375};Nr("Bounce",function(o){return 1-i(1-o)},i)})(7.5625,2.75);Nr("Expo",function(a){return Math.pow(2,10*(a-1))*a+a*a*a*a*a*a*(1-a)});Nr("Circ",function(a){return-(N1(1-a*a)-1)});Nr("Sine",function(a){return a===1?1:-Kt(a*Wt)+1});Nr("Back",je("in"),je("out"),je());b.SteppedEase=b.steps=cr.SteppedEase={config:function(r,e){r===void 0&&(r=1);var t=1/r,n=r+(e?0:1),i=e?1:0,o=1-O;return function(l){return((n*ke(0,o,l)|0)+i)*t}}};Qr.ease=b["quad.out"];er("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(a){return u1+=a+","+a+"Params,"});var vt=function(r,e){this.id=Jt++,r._gsap=this,this.target=r,this.harness=e,this.get=e?e.get:rt,this.set=e?e.getSetter:C1},Ce=(function(){function a(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,te(this,+e.duration,1,1),this.data=e.data,Z&&(this._ctx=Z,Z.data.push(this)),ge||ar.wake()}var r=a.prototype;return r.delay=function(t){return t||t===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},r.duration=function(t){return arguments.length?this.totalDuration(this._repeat>0?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},r.totalDuration=function(t){return arguments.length?(this._dirty=0,te(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},r.totalTime=function(t,n){if(ne(),!arguments.length)return this._tTime;var i=this._dp;if(i&&i.smoothChildTiming&&this._ts){for(Ie(this,t),!i._dp||i.parent||ot(i,this);i&&i.parent;)i.parent._time!==i._start+(i._ts>=0?i._tTime/i._ts:(i.totalDuration()-i._tTime)/-i._ts)&&i.totalTime(i._tTime,!0),i=i.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&t<this._tDur||this._ts<0&&t>0||!this._tDur&&!t)&&yr(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===O||!this._initted&&this._dur&&t||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),et(this,t,n)),this},r.time=function(t,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+A1(this))%(this._dur+this._rDelay)||(t?this._dur:0),n):this._time},r.totalProgress=function(t,n){return arguments.length?this.totalTime(this.totalDuration()*t,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},r.progress=function(t,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-t:t)+A1(this),n):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},r.iteration=function(t,n){var i=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*i,n):this._repeat?ee(this._tTime,i)+1:1},r.timeScale=function(t,n){if(!arguments.length)return this._rts===-O?0:this._rts;if(this._rts===t)return this;var i=this.parent&&this._ts?Ae(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-O?0:this._rts,this.totalTime(ke(-Math.abs(this._delay),this.totalDuration(),i),n!==!1),Ee(this),cn(this)},r.paused=function(t){return arguments.length?(this._ps!==t&&(this._ps=t,t?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ne(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==O&&(this._tTime-=O)))),this):this._ps},r.startTime=function(t){if(arguments.length){this._start=U(t);var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&yr(n,this,this._start-this._delay),this}return this._start},r.endTime=function(t){return this._start+(rr(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},r.rawTime=function(t){var n=this.parent||this._dp;return n?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ae(n.rawTime(t),this):this._tTime:this._tTime},r.revert=function(t){t===void 0&&(t=an);var n=X;return X=t,f1(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),this.data!=="nested"&&t.kill!==!1&&this.kill(),X=n,this},r.globalTime=function(t){for(var n=this,i=arguments.length?t:n.rawTime();n;)i=n._start+i/(Math.abs(n._ts)||1),n=n._dp;return!this.parent&&this._sat?this._sat.globalTime(t):i},r.repeat=function(t){return arguments.length?(this._repeat=t===1/0?-2:t,V1(this)):this._repeat===-2?1/0:this._repeat},r.repeatDelay=function(t){if(arguments.length){var n=this._time;return this._rDelay=t,V1(this),n?this.time(n):this}return this._rDelay},r.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},r.seek=function(t,n){return this.totalTime(pr(this,t),rr(n))},r.restart=function(t,n){return this.play().totalTime(t?-this._delay:0,rr(n)),this._dur||(this._zTime=-O),this},r.play=function(t,n){return t!=null&&this.seek(t,n),this.reversed(!1).paused(!1)},r.reverse=function(t,n){return t!=null&&this.seek(t||this.totalDuration(),n),this.reversed(!0).paused(!1)},r.pause=function(t,n){return t!=null&&this.seek(t,n),this.paused(!0)},r.resume=function(){return this.paused(!1)},r.reversed=function(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-O:0)),this):this._rts<0},r.invalidate=function(){return this._initted=this._act=0,this._zTime=-O,this},r.isActive=function(){var t=this.parent||this._dp,n=this._start,i;return!!(!t||this._ts&&this._initted&&t.isActive()&&(i=t.rawTime(!0))>=n&&i<this.endTime(!0)-O)},r.eventCallback=function(t,n,i){var o=this.vars;return arguments.length>1?(n?(o[t]=n,i&&(o[t+"Params"]=i),t==="onUpdate"&&(this._onUpdate=n)):delete o[t],this):o[t]},r.then=function(t){var n=this,i=n._prom;return new Promise(function(o){var l=P(t)?t:nt,s=function(){var c=n.then;n.then=null,i&&i(),P(l)&&(l=l(n))&&(l.then||l===n)&&(n.then=c),o(l),n.then=c};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?s():n._prom=s})},r.kill=function(){se(this)},a})();ur(Ce.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-O,_prom:0,_ps:!1,_rts:1});var K=(function(a){z1(r,a);function r(t,n){var i;return t===void 0&&(t={}),i=a.call(this,t)||this,i.labels={},i.smoothChildTiming=!!t.smoothChildTiming,i.autoRemoveChildren=!!t.autoRemoveChildren,i._sort=rr(t.sortChildren),D&&yr(t.parent||D,vr(i),n),t.reversed&&i.reverse(),t.paused&&i.paused(!0),t.scrollTrigger&&at(vr(i),t.scrollTrigger),i}var e=r.prototype;return e.to=function(n,i,o){return ue(0,arguments,this),this},e.from=function(n,i,o){return ue(1,arguments,this),this},e.fromTo=function(n,i,o,l){return ue(2,arguments,this),this},e.set=function(n,i,o){return i.duration=0,i.parent=this,ce(i).repeatDelay||(i.repeat=0),i.immediateRender=!!i.immediateRender,new R(n,i,pr(this,o),1),this},e.call=function(n,i,o){return yr(this,R.delayedCall(0,n,i),o)},e.staggerTo=function(n,i,o,l,s,d,c){return o.duration=i,o.stagger=o.stagger||l,o.onComplete=d,o.onCompleteParams=c,o.parent=this,new R(n,o,pr(this,s)),this},e.staggerFrom=function(n,i,o,l,s,d,c){return o.runBackwards=1,ce(o).immediateRender=rr(o.immediateRender),this.staggerTo(n,i,o,l,s,d,c)},e.staggerFromTo=function(n,i,o,l,s,d,c,p){return l.startAt=o,ce(l).immediateRender=rr(l.immediateRender),this.staggerTo(n,i,l,s,d,c,p)},e.render=function(n,i,o){var l=this._time,s=this._dirty?this.totalDuration():this._tDur,d=this._dur,c=n<=0?0:U(n),p=this._zTime<0!=n<0&&(this._initted||!d),f,h,_,u,g,y,C,x,k,m,v,B;if(this!==D&&c>s&&n>=0&&(c=s),c!==this._tTime||o||p){if(l!==this._time&&d&&(c+=this._time-l,n+=this._time-l),f=c,k=this._start,x=this._ts,y=!x,p&&(d||(l=this._zTime),(n||!i)&&(this._zTime=n)),this._repeat){if(v=this._yoyo,g=d+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(g*100+n,i,o);if(f=U(c%g),c===s?(u=this._repeat,f=d):(m=U(c/g),u=~~m,u&&u===m&&(f=d,u--),f>d&&(f=d)),m=ee(this._tTime,g),!l&&this._tTime&&m!==u&&this._tTime-m*g-this._dur<=0&&(m=u),v&&u&1&&(f=d-f,B=1),u!==m&&!this._lock){var F=v&&m&1,w=F===(v&&u&1);if(u<m&&(F=!F),l=F?0:c%d?d:c,this._lock=1,this.render(l||(B?0:U(u*g)),i,!d)._lock=0,this._tTime=c,!i&&this.parent&&lr(this,"onRepeat"),this.vars.repeatRefresh&&!B&&(this.invalidate()._lock=1,m=u),l&&l!==this._time||y!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(d=this._dur,s=this._tDur,w&&(this._lock=2,l=F?d:-1e-4,this.render(l,!0),this.vars.repeatRefresh&&!B&&this.invalidate()),this._lock=0,!this._ts&&!y)return this;xt(this,B)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(C=hn(this,U(l),U(f)),C&&(c-=f-(f=C._start))),this._tTime=c,this._time=f,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,l=0),!l&&c&&d&&!i&&!m&&(lr(this,"onStart"),this._tTime!==c))return this;if(f>=l&&n>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&C!==h){if(h.parent!==this)return this.render(n,i,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,i,o),f!==this._time||!this._ts&&!y){C=0,_&&(c+=this._zTime=-O);break}}h=_}else{h=this._last;for(var M=n<0?n:f;h;){if(_=h._prev,(h._act||M<=h._end)&&h._ts&&C!==h){if(h.parent!==this)return this.render(n,i,o);if(h.render(h._ts>0?(M-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(M-h._start)*h._ts,i,o||X&&f1(h)),f!==this._time||!this._ts&&!y){C=0,_&&(c+=this._zTime=M?-O:O);break}}h=_}}if(C&&!i&&(this.pause(),C.render(f>=l?0:-O)._zTime=f>=l?1:-1,this._ts))return this._start=k,Ee(this),this.render(n,i,o);this._onUpdate&&!i&&lr(this,"onUpdate",!0),(c===s&&this._tTime>=this.totalDuration()||!c&&l)&&(k===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((n||!d)&&(c===s&&this._ts>0||!c&&this._ts<0)&&Gr(this,1),!i&&!(n<0&&!l)&&(c||l||!s)&&(lr(this,c===s&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<s&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(n,i){var o=this;if(Fr(i)||(i=pr(this,i,n)),!(n instanceof Ce)){if(J(n))return n.forEach(function(l){return o.add(l,i)}),this;if(Y(n))return this.addLabel(n,i);if(P(n))n=R.delayedCall(0,n);else return this}return this!==n?yr(this,n,i):this},e.getChildren=function(n,i,o,l){n===void 0&&(n=!0),i===void 0&&(i=!0),o===void 0&&(o=!0),l===void 0&&(l=-fr);for(var s=[],d=this._first;d;)d._start>=l&&(d instanceof R?i&&s.push(d):(o&&s.push(d),n&&s.push.apply(s,d.getChildren(!0,i,o)))),d=d._next;return s},e.getById=function(n){for(var i=this.getChildren(1,1,1),o=i.length;o--;)if(i[o].vars.id===n)return i[o]},e.remove=function(n){return Y(n)?this.removeLabel(n):P(n)?this.killTweensOf(n):(n.parent===this&&Le(this,n),n===this._recent&&(this._recent=this._last),Rr(this))},e.totalTime=function(n,i){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=U(ar.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),a.prototype.totalTime.call(this,n,i),this._forcing=0,this):this._tTime},e.addLabel=function(n,i){return this.labels[n]=pr(this,i),this},e.removeLabel=function(n){return delete this.labels[n],this},e.addPause=function(n,i,o){var l=R.delayedCall(0,i||he,o);return l.data="isPause",this._hasPause=1,yr(this,l,pr(this,n))},e.removePause=function(n){var i=this._first;for(n=pr(this,n);i;)i._start===n&&i.data==="isPause"&&Gr(i),i=i._next},e.killTweensOf=function(n,i,o){for(var l=this.getTweensOf(n,o),s=l.length;s--;)Mr!==l[s]&&l[s].kill(n,i);return this},e.getTweensOf=function(n,i){for(var o=[],l=hr(n),s=this._first,d=Fr(i),c;s;)s instanceof R?ln(s._targets,l)&&(d?(!Mr||s._initted&&s._ts)&&s.globalTime(0)<=i&&s.globalTime(s.totalDuration())>i:!i||s.isActive())&&o.push(s):(c=s.getTweensOf(l,i)).length&&o.push.apply(o,c),s=s._next;return o},e.tweenTo=function(n,i){i=i||{};var o=this,l=pr(o,n),s=i,d=s.startAt,c=s.onStart,p=s.onStartParams,f=s.immediateRender,h,_=R.to(o,ur({ease:i.ease||"none",lazy:!1,immediateRender:!1,time:l,overwrite:"auto",duration:i.duration||Math.abs((l-(d&&"time"in d?d.time:o._time))/o.timeScale())||O,onStart:function(){if(o.pause(),!h){var g=i.duration||Math.abs((l-(d&&"time"in d?d.time:o._time))/o.timeScale());_._dur!==g&&te(_,g,0,1).render(_._time,!0,!0),h=1}c&&c.apply(_,p||[])}},i));return f?_.render(0):_},e.tweenFromTo=function(n,i,o){return this.tweenTo(i,ur({startAt:{time:pr(this,n)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(n){return n===void 0&&(n=this._time),O1(this,pr(this,n))},e.previousLabel=function(n){return n===void 0&&(n=this._time),O1(this,pr(this,n),1)},e.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+O)},e.shiftChildren=function(n,i,o){o===void 0&&(o=0);var l=this._first,s=this.labels,d;for(n=U(n);l;)l._start>=o&&(l._start+=n,l._end+=n),l=l._next;if(i)for(d in s)s[d]>=o&&(s[d]+=n);return Rr(this)},e.invalidate=function(n){var i=this._first;for(this._lock=0;i;)i.invalidate(n),i=i._next;return a.prototype.invalidate.call(this,n)},e.clear=function(n){n===void 0&&(n=!0);for(var i=this._first,o;i;)o=i._next,this.remove(i),i=o;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),Rr(this)},e.totalDuration=function(n){var i=0,o=this,l=o._last,s=fr,d,c,p;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-n:n));if(o._dirty){for(p=o.parent;l;)d=l._prev,l._dirty&&l.totalDuration(),c=l._start,c>s&&o._sort&&l._ts&&!o._lock?(o._lock=1,yr(o,l,c-l._delay,1)._lock=0):s=c,c<0&&l._ts&&(i-=c,(!p&&!o._dp||p&&p.smoothChildTiming)&&(o._start+=U(c/o._ts),o._time-=c,o._tTime-=c),o.shiftChildren(-c,!1,-1/0),s=0),l._end>i&&l._ts&&(i=l._end),l=d;te(o,o===D&&o._time>i?o._time:i,1,1),o._dirty=0}return o._tDur},r.updateRoot=function(n){if(D._ts&&(et(D,Ae(n,D)),Q1=ar.frame),ar.frame>=M1){M1+=dr.autoSleep||120;var i=D._first;if((!i||!i._ts)&&dr.autoSleep&&ar._listeners.length<2){for(;i&&!i._ts;)i=i._next;i||ar.sleep()}}},r})(Ce);ur(K.prototype,{_lock:0,_hasPause:0,_forcing:0});var Vn=function(r,e,t,n,i,o,l){var s=new tr(this._pt,r,e,0,1,At,null,i),d=0,c=0,p,f,h,_,u,g,y,C;for(s.b=t,s.e=n,t+="",n+="",(y=~n.indexOf("random("))&&(n=_e(n)),o&&(C=[t,n],o(C,r,e),t=C[0],n=C[1]),f=t.match(Ue)||[];p=Ue.exec(n);)_=p[0],u=n.substring(d,p.index),h?h=(h+1)%5:u.substr(-5)==="rgba("&&(h=1),_!==f[c++]&&(g=parseFloat(f[c-1])||0,s._pt={_next:s._pt,p:u||c===1?u:",",s:g,c:_.charAt(1)==="="?Wr(g,_)-g:parseFloat(_)-g,m:h&&h<4?Math.round:0},d=Ue.lastIndex);return s.c=d<n.length?n.substring(d,n.length):"",s.fp=l,(X1.test(n)||y)&&(s.e=0),this._pt=s,s},h1=function(r,e,t,n,i,o,l,s,d,c){P(n)&&(n=n(i||0,r,o));var p=r[e],f=t!=="get"?t:P(p)?d?r[e.indexOf("set")||!P(r["get"+e.substr(3)])?e:"get"+e.substr(3)](d):r[e]():p,h=P(p)?d?In:Mt:g1,_;if(Y(n)&&(~n.indexOf("random(")&&(n=_e(n)),n.charAt(1)==="="&&(_=Wr(f,n)+(W(f)||0),(_||_===0)&&(n=_))),!c||f!==n||Qe)return!isNaN(f*n)&&n!==""?(_=new tr(this._pt,r,e,+f||0,n-(f||0),typeof p=="boolean"?Un:St,0,h),d&&(_.fp=d),l&&_.modifier(l,this,r),this._pt=_):(!p&&!(e in r)&&d1(e,n),Vn.call(this,r,e,f,n,h,s||dr.stringFilter,d))},On=function(r,e,t,n,i){if(P(r)&&(r=pe(r,i,e,t,n)),!xr(r)||r.style&&r.nodeType||J(r)||Y1(r))return Y(r)?pe(r,i,e,t,n):r;var o={},l;for(l in r)o[l]=pe(r[l],i,e,t,n);return o},Bt=function(r,e,t,n,i,o){var l,s,d,c;if(or[r]&&(l=new or[r]).init(i,l.rawVars?e[r]:On(e[r],n,i,o,t),t,n,o)!==!1&&(t._pt=s=new tr(t._pt,i,r,0,1,l.render,l,0,l.priority),t!==Xr))for(d=t._ptLookup[t._targets.indexOf(i)],c=l._props.length;c--;)d[l._props[c]]=s;return l},Mr,Qe,_1=function a(r,e,t){var n=r.vars,i=n.ease,o=n.startAt,l=n.immediateRender,s=n.lazy,d=n.onUpdate,c=n.runBackwards,p=n.yoyoEase,f=n.keyframes,h=n.autoRevert,_=r._dur,u=r._startAt,g=r._targets,y=r.parent,C=y&&y.data==="nested"?y.vars.targets:g,x=r._overwrite==="auto"&&!o1,k=r.timeline,m,v,B,F,w,M,I,G,L,$,z,H,N;if(k&&(!f||!i)&&(i="none"),r._ease=qr(i,Qr.ease),r._yEase=p?kt(qr(p===!0?i:p,Qr.ease)):0,p&&r._yoyo&&!r._repeat&&(p=r._yEase,r._yEase=r._ease,r._ease=p),r._from=!k&&!!n.runBackwards,!k||f&&!n.stagger){if(G=g[0]?Hr(g[0]).harness:0,H=G&&n[G.prop],m=Se(n,c1),u&&(u._zTime<0&&u.progress(1),e<0&&c&&l&&!h?u.render(-1,!0):u.revert(c&&_?ve:on),u._lazy=0),o){if(Gr(r._startAt=R.set(g,ur({data:"isStart",overwrite:!1,parent:y,immediateRender:!0,lazy:!u&&rr(s),startAt:null,delay:0,onUpdate:d&&function(){return lr(r,"onUpdate")},stagger:0},o))),r._startAt._dp=0,r._startAt._sat=r,e<0&&(X||!l&&!h)&&r._startAt.revert(ve),l&&_&&e<=0&&t<=0){e&&(r._zTime=e);return}}else if(c&&_&&!u){if(e&&(l=!1),B=ur({overwrite:!1,data:"isFromStart",lazy:l&&!u&&rr(s),immediateRender:l,stagger:0,parent:y},m),H&&(B[G.prop]=H),Gr(r._startAt=R.set(g,B)),r._startAt._dp=0,r._startAt._sat=r,e<0&&(X?r._startAt.revert(ve):r._startAt.render(-1,!0)),r._zTime=e,!l)a(r._startAt,O,O);else if(!e)return}for(r._pt=r._ptCache=0,s=_&&rr(s)||s&&!_,v=0;v<g.length;v++){if(w=g[v],I=w._gsap||p1(g)[v]._gsap,r._ptLookup[v]=$={},Ye[I.id]&&Vr.length&&Me(),z=C===g?v:C.indexOf(w),G&&(L=new G).init(w,H||m,r,z,C)!==!1&&(r._pt=F=new tr(r._pt,w,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(gr){$[gr]=F}),L.priority&&(M=1)),!G||H)for(B in m)or[B]&&(L=Bt(B,m,r,z,w,C))?L.priority&&(M=1):$[B]=F=h1.call(r,w,B,"get",m[B],z,C,0,n.stringFilter);r._op&&r._op[v]&&r.kill(w,r._op[v]),x&&r._pt&&(Mr=r,D.killTweensOf(w,$,r.globalTime(e)),N=!r.parent,Mr=0),r._pt&&s&&(Ye[I.id]=1)}M&&Vt(r),r._onInit&&r._onInit(r)}r._onUpdate=d,r._initted=(!r._op||r._pt)&&!N,f&&e<=0&&k.render(fr,!0,!0)},Gn=function(r,e,t,n,i,o,l,s){var d=(r._pt&&r._ptCache||(r._ptCache={}))[e],c,p,f,h;if(!d)for(d=r._ptCache[e]=[],f=r._ptLookup,h=r._targets.length;h--;){if(c=f[h][e],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==e&&c.fp!==e;)c=c._next;if(!c)return Qe=1,r.vars[e]="+=0",_1(r,l),Qe=0,s?fe(e+" not eligible for reset"):1;d.push(c)}for(h=d.length;h--;)p=d[h],c=p._pt||p,c.s=(n||n===0)&&!i?n:c.s+(n||0)+o*c.c,c.c=t-c.s,p.e&&(p.e=j(t)+W(p.e)),p.b&&(p.b=c.s+W(p.b))},Ln=function(r,e){var t=r[0]?Hr(r[0]).harness:0,n=t&&t.aliases,i,o,l,s;if(!n)return e;i=re({},e);for(o in n)if(o in i)for(s=n[o].split(","),l=s.length;l--;)i[s[l]]=i[o];return i},En=function(r,e,t,n){var i=e.ease||n||"power1.inOut",o,l;if(J(e))l=t[r]||(t[r]=[]),e.forEach(function(s,d){return l.push({t:d/(e.length-1)*100,v:s,e:i})});else for(o in e)l=t[o]||(t[o]=[]),o==="ease"||l.push({t:parseFloat(r),v:e[o],e:i})},pe=function(r,e,t,n,i){return P(r)?r.call(e,t,n,i):Y(r)&&~r.indexOf("random(")?_e(r):r},Ft=u1+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",bt={};er(Ft+",id,stagger,delay,duration,paused,scrollTrigger",function(a){return bt[a]=1});var R=(function(a){z1(r,a);function r(t,n,i,o){var l;typeof n=="number"&&(i.duration=n,n=i,i=null),l=a.call(this,o?n:ce(n))||this;var s=l.vars,d=s.duration,c=s.delay,p=s.immediateRender,f=s.stagger,h=s.overwrite,_=s.keyframes,u=s.defaults,g=s.scrollTrigger,y=s.yoyoEase,C=n.parent||D,x=(J(t)||Y1(t)?Fr(t[0]):"length"in n)?[t]:hr(t),k,m,v,B,F,w,M,I;if(l._targets=x.length?p1(x):fe("GSAP target "+t+" not found. https://gsap.com",!dr.nullTargetWarn)||[],l._ptLookup=[],l._overwrite=h,_||f||we(d)||we(c)){if(n=l.vars,k=l.timeline=new K({data:"nested",defaults:u||{},targets:C&&C.data==="nested"?C.vars.targets:x}),k.kill(),k.parent=k._dp=vr(l),k._start=0,f||we(d)||we(c)){if(B=x.length,M=f&&ct(f),xr(f))for(F in f)~Ft.indexOf(F)&&(I||(I={}),I[F]=f[F]);for(m=0;m<B;m++)v=Se(n,bt),v.stagger=0,y&&(v.yoyoEase=y),I&&re(v,I),w=x[m],v.duration=+pe(d,vr(l),m,w,x),v.delay=(+pe(c,vr(l),m,w,x)||0)-l._delay,!f&&B===1&&v.delay&&(l._delay=c=v.delay,l._start+=c,v.delay=0),k.to(w,v,M?M(m,w,x):0),k._ease=b.none;k.duration()?d=c=0:l.timeline=0}else if(_){ce(ur(k.vars.defaults,{ease:"none"})),k._ease=qr(_.ease||n.ease||"none");var G=0,L,$,z;if(J(_))_.forEach(function(H){return k.to(x,H,">")}),k.duration();else{v={};for(F in _)F==="ease"||F==="easeEach"||En(F,_[F],v,_.easeEach);for(F in v)for(L=v[F].sort(function(H,N){return H.t-N.t}),G=0,m=0;m<L.length;m++)$=L[m],z={ease:$.e,duration:($.t-(m?L[m-1].t:0))/100*d},z[F]=$.v,k.to(x,z,G),G+=z.duration;k.duration()<d&&k.to({},{duration:d-k.duration()})}}d||l.duration(d=k.duration())}else l.timeline=0;return h===!0&&!o1&&(Mr=vr(l),D.killTweensOf(x),Mr=0),yr(C,vr(l),i),n.reversed&&l.reverse(),n.paused&&l.paused(!0),(p||!d&&!_&&l._start===U(C._time)&&rr(p)&&un(vr(l))&&C.data!=="nested")&&(l._tTime=-O,l.render(Math.max(0,-c)||0)),g&&at(vr(l),g),l}var e=r.prototype;return e.render=function(n,i,o){var l=this._time,s=this._tDur,d=this._dur,c=n<0,p=n>s-O&&!c?s:n<O?0:n,f,h,_,u,g,y,C,x,k;if(!d)fn(this,n,i,o);else if(p!==this._tTime||!n||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(f=p,x=this.timeline,this._repeat){if(u=d+this._rDelay,this._repeat<-1&&c)return this.totalTime(u*100+n,i,o);if(f=U(p%u),p===s?(_=this._repeat,f=d):(g=U(p/u),_=~~g,_&&_===g?(f=d,_--):f>d&&(f=d)),y=this._yoyo&&_&1,y&&(k=this._yEase,f=d-f),g=ee(this._tTime,u),f===l&&!o&&this._initted&&_===g)return this._tTime=p,this;_!==g&&(x&&this._yEase&&xt(x,y),this.vars.repeatRefresh&&!y&&!this._lock&&f!==u&&this._initted&&(this._lock=o=1,this.render(U(u*_),!0).invalidate()._lock=0))}if(!this._initted){if(lt(this,c?n:f,o,i,p))return this._tTime=0,this;if(l!==this._time&&!(o&&this.vars.repeatRefresh&&_!==g))return this;if(d!==this._dur)return this.render(n,i,o)}if(this._tTime=p,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=C=(k||this._ease)(f/d),this._from&&(this.ratio=C=1-C),!l&&p&&!i&&!g&&(lr(this,"onStart"),this._tTime!==p))return this;for(h=this._pt;h;)h.r(C,h.d),h=h._next;x&&x.render(n<0?n:x._dur*x._ease(f/this._dur),i,o)||this._startAt&&(this._zTime=n),this._onUpdate&&!i&&(c&&$e(this,n,i,o),lr(this,"onUpdate")),this._repeat&&_!==g&&this.vars.onRepeat&&!i&&this.parent&&lr(this,"onRepeat"),(p===this._tDur||!p)&&this._tTime===p&&(c&&!this._onUpdate&&$e(this,n,!0,!0),(n||!d)&&(p===this._tDur&&this._ts>0||!p&&this._ts<0)&&Gr(this,1),!i&&!(c&&!l)&&(p||l||y)&&(lr(this,p===s?"onComplete":"onReverseComplete",!0),this._prom&&!(p<s&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),a.prototype.invalidate.call(this,n)},e.resetTo=function(n,i,o,l,s){ge||ar.wake(),this._ts||this.play();var d=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||_1(this,d),c=this._ease(d/this._dur),Gn(this,n,i,o,l,c,d,s)?this.resetTo(n,i,o,l,1):(Ie(this,0),this.parent||it(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(n,i){if(i===void 0&&(i="all"),!n&&(!i||i==="all"))return this._lazy=this._pt=0,this.parent?se(this):this.scrollTrigger&&this.scrollTrigger.kill(!!X),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(n,i,Mr&&Mr.vars.overwrite!==!0)._first||se(this),this.parent&&o!==this.timeline.totalDuration()&&te(this,this._dur*this.timeline._tDur/o,0,1),this}var l=this._targets,s=n?hr(n):l,d=this._ptLookup,c=this._pt,p,f,h,_,u,g,y;if((!i||i==="all")&&dn(l,s))return i==="all"&&(this._pt=0),se(this);for(p=this._op=this._op||[],i!=="all"&&(Y(i)&&(u={},er(i,function(C){return u[C]=1}),i=u),i=Ln(l,i)),y=l.length;y--;)if(~s.indexOf(l[y])){f=d[y],i==="all"?(p[y]=i,_=f,h={}):(h=p[y]=p[y]||{},_=i);for(u in _)g=f&&f[u],g&&((!("kill"in g.d)||g.d.kill(u)===!0)&&Le(this,g,"_pt"),delete f[u]),h!=="all"&&(h[u]=1)}return this._initted&&!this._pt&&c&&se(this),this},r.to=function(n,i){return new r(n,i,arguments[2])},r.from=function(n,i){return ue(1,arguments)},r.delayedCall=function(n,i,o,l){return new r(i,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:i,onReverseComplete:i,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:l})},r.fromTo=function(n,i,o){return ue(2,arguments)},r.set=function(n,i){return i.duration=0,i.repeatDelay||(i.repeat=0),new r(n,i)},r.killTweensOf=function(n,i,o){return D.killTweensOf(n,i,o)},r})(Ce);ur(R.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});er("staggerTo,staggerFrom,staggerFromTo",function(a){R[a]=function(){var r=new K,e=We.call(arguments,0);return e.splice(a==="staggerFromTo"?5:4,0,0),r[a].apply(r,e)}});var g1=function(r,e,t){return r[e]=t},Mt=function(r,e,t){return r[e](t)},In=function(r,e,t,n){return r[e](n.fp,t)},Zn=function(r,e,t){return r.setAttribute(e,t)},C1=function(r,e){return P(r[e])?Mt:a1(r[e])&&r.setAttribute?Zn:g1},St=function(r,e){return e.set(e.t,e.p,Math.round((e.s+e.c*r)*1e6)/1e6,e)},Un=function(r,e){return e.set(e.t,e.p,!!(e.s+e.c*r),e)},At=function(r,e){var t=e._pt,n="";if(!r&&e.b)n=e.b;else if(r===1&&e.e)n=e.e;else{for(;t;)n=t.p+(t.m?t.m(t.s+t.c*r):Math.round((t.s+t.c*r)*1e4)/1e4)+n,t=t._next;n+=e.c}e.set(e.t,e.p,n,e)},m1=function(r,e){for(var t=e._pt;t;)t.r(r,t.d),t=t._next},Dn=function(r,e,t,n){for(var i=this._pt,o;i;)o=i._next,i.p===n&&i.modifier(r,e,t),i=o},Tn=function(r){for(var e=this._pt,t,n;e;)n=e._next,e.p===r&&!e.op||e.op===r?Le(this,e,"_pt"):e.dep||(t=1),e=n;return!t},Pn=function(r,e,t,n){n.mSet(r,e,n.m.call(n.tween,t,n.mt),n)},Vt=function(r){for(var e=r._pt,t,n,i,o;e;){for(t=e._next,n=i;n&&n.pr>e.pr;)n=n._next;(e._prev=n?n._prev:o)?e._prev._next=e:i=e,(e._next=n)?n._prev=e:o=e,e=t}r._pt=i},tr=(function(){function a(e,t,n,i,o,l,s,d,c){this.t=t,this.s=i,this.c=o,this.p=n,this.r=l||St,this.d=s||this,this.set=d||g1,this.pr=c||0,this._next=e,e&&(e._prev=this)}var r=a.prototype;return r.modifier=function(t,n,i){this.mSet=this.mSet||this.set,this.set=Pn,this.m=t,this.mt=i,this.tween=n},a})();er(u1+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(a){return c1[a]=1});cr.TweenMax=cr.TweenLite=R;cr.TimelineLite=cr.TimelineMax=K;D=new K({sortChildren:!1,defaults:Qr,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});dr.stringFilter=yt;var zr=[],Fe={},jn=[],L1=0,Hn=0,He=function(r){return(Fe[r]||jn).map(function(e){return e()})},r1=function(){var r=Date.now(),e=[];r-L1>2&&(He("matchMediaInit"),zr.forEach(function(t){var n=t.queries,i=t.conditions,o,l,s,d;for(l in n)o=mr.matchMedia(n[l]).matches,o&&(s=1),o!==i[l]&&(i[l]=o,d=1);d&&(t.revert(),s&&e.push(t))}),He("matchMediaRevert"),e.forEach(function(t){return t.onMatch(t,function(n){return t.add(null,n)})}),L1=r,He("matchMedia"))},Ot=(function(){function a(e,t){this.selector=t&&Je(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Hn++,e&&this.add(e)}var r=a.prototype;return r.add=function(t,n,i){P(t)&&(i=n,n=t,t=P);var o=this,l=function(){var d=Z,c=o.selector,p;return d&&d!==o&&d.data.push(o),i&&(o.selector=Je(i)),Z=o,p=n.apply(o,arguments),P(p)&&o._r.push(p),Z=d,o.selector=c,o.isReverted=!1,p};return o.last=l,t===P?l(o,function(s){return o.add(null,s)}):t?o[t]=l:l},r.ignore=function(t){var n=Z;Z=null,t(this),Z=n},r.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof a?t.push.apply(t,n.getTweens()):n instanceof R&&!(n.parent&&n.parent.data==="nested")&&t.push(n)}),t},r.clear=function(){this._r.length=this.data.length=0},r.kill=function(t,n){var i=this;if(t?(function(){for(var l=i.getTweens(),s=i.data.length,d;s--;)d=i.data[s],d.data==="isFlip"&&(d.revert(),d.getChildren(!0,!0,!1).forEach(function(c){return l.splice(l.indexOf(c),1)}));for(l.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,p){return p.g-c.g||-1/0}).forEach(function(c){return c.t.revert(t)}),s=i.data.length;s--;)d=i.data[s],d instanceof K?d.data!=="nested"&&(d.scrollTrigger&&d.scrollTrigger.revert(),d.kill()):!(d instanceof R)&&d.revert&&d.revert(t);i._r.forEach(function(c){return c(t,i)}),i.isReverted=!0})():this.data.forEach(function(l){return l.kill&&l.kill()}),this.clear(),n)for(var o=zr.length;o--;)zr[o].id===this.id&&zr.splice(o,1)},r.revert=function(t){this.kill(t||{})},a})(),Rn=(function(){function a(e){this.contexts=[],this.scope=e,Z&&Z.data.push(this)}var r=a.prototype;return r.add=function(t,n,i){xr(t)||(t={matches:t});var o=new Ot(0,i||this.scope),l=o.conditions={},s,d,c;Z&&!o.selector&&(o.selector=Z.selector),this.contexts.push(o),n=o.add("onMatch",n),o.queries=t;for(d in t)d==="all"?c=1:(s=mr.matchMedia(t[d]),s&&(zr.indexOf(o)<0&&zr.push(o),(l[d]=s.matches)&&(c=1),s.addListener?s.addListener(r1):s.addEventListener("change",r1)));return c&&n(o,function(p){return o.add(null,p)}),this},r.revert=function(t){this.kill(t||{})},r.kill=function(t){this.contexts.forEach(function(n){return n.kill(t,!0)})},a})(),Ve={registerPlugin:function(){for(var r=arguments.length,e=new Array(r),t=0;t<r;t++)e[t]=arguments[t];e.forEach(function(n){return gt(n)})},timeline:function(r){return new K(r)},getTweensOf:function(r,e){return D.getTweensOf(r,e)},getProperty:function(r,e,t,n){Y(r)&&(r=hr(r)[0]);var i=Hr(r||{}).get,o=t?nt:tt;return t==="native"&&(t=""),r&&(e?o((or[e]&&or[e].get||i)(r,e,t,n)):function(l,s,d){return o((or[l]&&or[l].get||i)(r,l,s,d))})},quickSetter:function(r,e,t){if(r=hr(r),r.length>1){var n=r.map(function(c){return ir.quickSetter(c,e,t)}),i=n.length;return function(c){for(var p=i;p--;)n[p](c)}}r=r[0]||{};var o=or[e],l=Hr(r),s=l.harness&&(l.harness.aliases||{})[e]||e,d=o?function(c){var p=new o;Xr._pt=0,p.init(r,t?c+t:c,Xr,0,[r]),p.render(1,p),Xr._pt&&m1(1,Xr)}:l.set(r,s);return o?d:function(c){return d(r,s,t?c+t:c,l,1)}},quickTo:function(r,e,t){var n,i=ir.to(r,ur((n={},n[e]="+=0.1",n.paused=!0,n.stagger=0,n),t||{})),o=function(s,d,c){return i.resetTo(e,s,d,c)};return o.tween=i,o},isTweening:function(r){return D.getTweensOf(r,!0).length>0},defaults:function(r){return r&&r.ease&&(r.ease=qr(r.ease,Qr.ease)),S1(Qr,r||{})},config:function(r){return S1(dr,r||{})},registerEffect:function(r){var e=r.name,t=r.effect,n=r.plugins,i=r.defaults,o=r.extendTimeline;(n||"").split(",").forEach(function(l){return l&&!or[l]&&!cr[l]&&fe(e+" effect requires "+l+" plugin.")}),De[e]=function(l,s,d){return t(hr(l),ur(s||{},i),d)},o&&(K.prototype[e]=function(l,s,d){return this.add(De[e](l,xr(s)?s:(d=s)&&{},this),d)})},registerEase:function(r,e){b[r]=qr(e)},parseEase:function(r,e){return arguments.length?qr(r,e):b},getById:function(r){return D.getById(r)},exportRoot:function(r,e){r===void 0&&(r={});var t=new K(r),n,i;for(t.smoothChildTiming=rr(r.smoothChildTiming),D.remove(t),t._dp=0,t._time=t._tTime=D._time,n=D._first;n;)i=n._next,(e||!(!n._dur&&n instanceof R&&n.vars.onComplete===n._targets[0]))&&yr(t,n,n._start-n._delay),n=i;return yr(D,t,0),t},context:function(r,e){return r?new Ot(r,e):Z},matchMedia:function(r){return new Rn(r)},matchMediaRefresh:function(){return zr.forEach(function(r){var e=r.conditions,t,n;for(n in e)e[n]&&(e[n]=!1,t=1);t&&r.revert()})||r1()},addEventListener:function(r,e){var t=Fe[r]||(Fe[r]=[]);~t.indexOf(e)||t.push(e)},removeEventListener:function(r,e){var t=Fe[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)},utils:{wrap:xn,wrapYoyo:wn,distribute:ct,random:pt,snap:ut,normalize:kn,getUnit:W,clamp:gn,splitColor:Ct,toArray:hr,selector:Je,mapRange:ht,pipe:mn,unitize:yn,interpolate:vn,shuffle:dt},install:J1,effects:De,ticker:ar,updateRoot:K.updateRoot,plugins:or,globalTimeline:D,core:{PropTween:tr,globals:K1,Tween:R,Timeline:K,Animation:Ce,getCache:Hr,_removeLinkedListItem:Le,reverting:function(){return X},context:function(r){return r&&Z&&(Z.data.push(r),r._ctx=Z),Z},suppressOverwrites:function(r){return o1=r}}};er("to,from,fromTo,delayedCall,set,killTweensOf",function(a){return Ve[a]=R[a]});ar.add(K.updateRoot);Xr=Ve.to({},{duration:0});var qn=function(r,e){for(var t=r._pt;t&&t.p!==e&&t.op!==e&&t.fp!==e;)t=t._next;return t},zn=function(r,e){var t=r._targets,n,i,o;for(n in e)for(i=t.length;i--;)o=r._ptLookup[i][n],o&&(o=o.d)&&(o._pt&&(o=qn(o,n)),o&&o.modifier&&o.modifier(e[n],r,t[i],n))},Re=function(r,e){return{name:r,headless:1,rawVars:1,init:function(n,i,o){o._onInit=function(l){var s,d;if(Y(i)&&(s={},er(i,function(c){return s[c]=1}),i=s),e){s={};for(d in i)s[d]=e(i[d]);i=s}zn(l,i)}}}},ir=Ve.registerPlugin({name:"attr",init:function(r,e,t,n,i){var o,l,s;this.tween=t;for(o in e)s=r.getAttribute(o)||"",l=this.add(r,"setAttribute",(s||0)+"",e[o],n,i,0,0,o),l.op=o,l.b=s,this._props.push(o)},render:function(r,e){for(var t=e._pt;t;)X?t.set(t.t,t.p,t.b,t):t.r(r,t.d),t=t._next}},{name:"endArray",headless:1,init:function(r,e){for(var t=e.length;t--;)this.add(r,t,r[t]||0,e[t],0,0,0,0,0,1)}},Re("roundProps",Ke),Re("modifiers"),Re("snap",ut))||Ve;R.version=K.version=ir.version="3.14.1";W1=1;l1()&&ne();b.Power0;b.Power1;b.Power2;b.Power3;b.Power4;b.Linear;b.Quad;b.Cubic;b.Quart;b.Quint;b.Strong;b.Elastic;b.Back;b.SteppedEase;b.Bounce;b.Sine;b.Expo;b.Circ;var E1,Sr,Jr,y1,jr,I1,k1,Nn=function(){return typeof window<"u"},br={},Pr=180/Math.PI,Kr=Math.PI/180,Yr=Math.atan2,Z1=1e8,x1=/([A-Z])/g,Yn=/(left|right|width|margin|padding|x)/i,$n=/[\s,\(]\S/,kr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},e1=function(r,e){return e.set(e.t,e.p,Math.round((e.s+e.c*r)*1e4)/1e4+e.u,e)},Xn=function(r,e){return e.set(e.t,e.p,r===1?e.e:Math.round((e.s+e.c*r)*1e4)/1e4+e.u,e)},Wn=function(r,e){return e.set(e.t,e.p,r?Math.round((e.s+e.c*r)*1e4)/1e4+e.u:e.b,e)},Jn=function(r,e){return e.set(e.t,e.p,r===1?e.e:r?Math.round((e.s+e.c*r)*1e4)/1e4+e.u:e.b,e)},Kn=function(r,e){var t=e.s+e.c*r;e.set(e.t,e.p,~~(t+(t<0?-.5:.5))+e.u,e)},Gt=function(r,e){return e.set(e.t,e.p,r?e.e:e.b,e)},Lt=function(r,e){return e.set(e.t,e.p,r!==1?e.b:e.e,e)},Qn=function(r,e,t){return r.style[e]=t},ri=function(r,e,t){return r.style.setProperty(e,t)},ei=function(r,e,t){return r._gsap[e]=t},ti=function(r,e,t){return r._gsap.scaleX=r._gsap.scaleY=t},ni=function(r,e,t,n,i){var o=r._gsap;o.scaleX=o.scaleY=t,o.renderTransform(i,o)},ii=function(r,e,t,n,i){var o=r._gsap;o[e]=t,o.renderTransform(i,o)},T="transform",nr=T+"Origin",oi=function a(r,e){var t=this,n=this.target,i=n.style,o=n._gsap;if(r in br&&i){if(this.tfm=this.tfm||{},r!=="transform")r=kr[r]||r,~r.indexOf(",")?r.split(",").forEach(function(l){return t.tfm[l]=Br(n,l)}):this.tfm[r]=o.x?o[r]:Br(n,r),r===nr&&(this.tfm.zOrigin=o.zOrigin);else return kr.transform.split(",").forEach(function(l){return a.call(t,l,e)});if(this.props.indexOf(T)>=0)return;o.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(nr,e,"")),r=T}(i||e)&&this.props.push(r,e,i[r])},Et=function(r){r.translate&&(r.removeProperty("translate"),r.removeProperty("scale"),r.removeProperty("rotate"))},ai=function(){var r=this.props,e=this.target,t=e.style,n=e._gsap,i,o;for(i=0;i<r.length;i+=3)r[i+1]?r[i+1]===2?e[r[i]](r[i+2]):e[r[i]]=r[i+2]:r[i+2]?t[r[i]]=r[i+2]:t.removeProperty(r[i].substr(0,2)==="--"?r[i]:r[i].replace(x1,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)n[o]=this.tfm[o];n.svg&&(n.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),i=k1(),(!i||!i.isStart)&&!t[T]&&(Et(t),n.zOrigin&&t[nr]&&(t[nr]+=" "+n.zOrigin+"px",n.zOrigin=0,n.renderTransform()),n.uncache=1)}},It=function(r,e){var t={target:r,props:[],revert:ai,save:oi};return r._gsap||ir.core.getCache(r),e&&r.style&&r.nodeType&&e.split(",").forEach(function(n){return t.save(n)}),t},Zt,t1=function(r,e){var t=Sr.createElementNS?Sr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),r):Sr.createElement(r);return t&&t.style?t:Sr.createElement(r)},sr=function a(r,e,t){var n=getComputedStyle(r);return n[e]||n.getPropertyValue(e.replace(x1,"-$1").toLowerCase())||n.getPropertyValue(e)||!t&&a(r,ie(e)||e,1)||""},U1="O,Moz,ms,Ms,Webkit".split(","),ie=function(r,e,t){var n=e||jr,i=n.style,o=5;if(r in i&&!t)return r;for(r=r.charAt(0).toUpperCase()+r.substr(1);o--&&!(U1[o]+r in i););return o<0?null:(o===3?"ms":o>=0?U1[o]:"")+r},n1=function(){Nn()&&window.document&&(E1=window,Sr=E1.document,Jr=Sr.documentElement,jr=t1("div")||{style:{}},t1("div"),T=ie(T),nr=T+"Origin",jr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Zt=!!ie("perspective"),k1=ir.core.reverting,y1=1)},D1=function(r){var e=r.ownerSVGElement,t=t1("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=r.cloneNode(!0),i;n.style.display="block",t.appendChild(n),Jr.appendChild(t);try{i=n.getBBox()}catch{}return t.removeChild(n),Jr.removeChild(t),i},T1=function(r,e){for(var t=e.length;t--;)if(r.hasAttribute(e[t]))return r.getAttribute(e[t])},Ut=function(r){var e,t;try{e=r.getBBox()}catch{e=D1(r),t=1}return e&&(e.width||e.height)||t||(e=D1(r)),e&&!e.width&&!e.x&&!e.y?{x:+T1(r,["x","cx","x1"])||0,y:+T1(r,["y","cy","y1"])||0,width:0,height:0}:e},Dt=function(r){return!!(r.getCTM&&(!r.parentNode||r.ownerSVGElement)&&Ut(r))},Lr=function(r,e){if(e){var t=r.style,n;e in br&&e!==nr&&(e=T),t.removeProperty?(n=e.substr(0,2),(n==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),t.removeProperty(n==="--"?e:e.replace(x1,"-$1").toLowerCase())):t.removeAttribute(e)}},Ar=function(r,e,t,n,i,o){var l=new tr(r._pt,e,t,0,1,o?Lt:Gt);return r._pt=l,l.b=n,l.e=i,r._props.push(t),l},P1={deg:1,rad:1,turn:1},li={grid:1,flex:1},Er=function a(r,e,t,n){var i=parseFloat(t)||0,o=(t+"").trim().substr((i+"").length)||"px",l=jr.style,s=Yn.test(e),d=r.tagName.toLowerCase()==="svg",c=(d?"client":"offset")+(s?"Width":"Height"),p=100,f=n==="px",h=n==="%",_,u,g,y;if(n===o||!i||P1[n]||P1[o])return i;if(o!=="px"&&!f&&(i=a(r,e,t,"px")),y=r.getCTM&&Dt(r),(h||o==="%")&&(br[e]||~e.indexOf("adius")))return _=y?r.getBBox()[s?"width":"height"]:r[c],j(h?i/_*p:i/100*_);if(l[s?"width":"height"]=p+(f?o:n),u=n!=="rem"&&~e.indexOf("adius")||n==="em"&&r.appendChild&&!d?r:r.parentNode,y&&(u=(r.ownerSVGElement||{}).parentNode),(!u||u===Sr||!u.appendChild)&&(u=Sr.body),g=u._gsap,g&&h&&g.width&&s&&g.time===ar.time&&!g.uncache)return j(i/g.width*p);if(h&&(e==="height"||e==="width")){var C=r.style[e];r.style[e]=p+n,_=r[c],C?r.style[e]=C:Lr(r,e)}else(h||o==="%")&&!li[sr(u,"display")]&&(l.position=sr(r,"position")),u===r&&(l.position="static"),u.appendChild(jr),_=jr[c],u.removeChild(jr),l.position="absolute";return s&&h&&(g=Hr(u),g.time=ar.time,g.width=u[c]),j(f?_*i/p:_&&i?p/_*i:0)},Br=function(r,e,t,n){var i;return y1||n1(),e in kr&&e!=="transform"&&(e=kr[e],~e.indexOf(",")&&(e=e.split(",")[0])),br[e]&&e!=="transform"?(i=ye(r,n),i=e!=="transformOrigin"?i[e]:i.svg?i.origin:Ge(sr(r,nr))+" "+i.zOrigin+"px"):(i=r.style[e],(!i||i==="auto"||n||~(i+"").indexOf("calc("))&&(i=Oe[e]&&Oe[e](r,e,t)||sr(r,e)||rt(r,e)||(e==="opacity"?1:0))),t&&!~(i+"").trim().indexOf(" ")?Er(r,e,i,t)+t:i},si=function(r,e,t,n){if(!t||t==="none"){var i=ie(e,r,1),o=i&&sr(r,i,1);o&&o!==t?(e=i,t=o):e==="borderColor"&&(t=sr(r,"borderTopColor"))}var l=new tr(this._pt,r.style,e,0,1,At),s=0,d=0,c,p,f,h,_,u,g,y,C,x,k,m;if(l.b=t,l.e=n,t+="",n+="",n.substring(0,6)==="var(--"&&(n=sr(r,n.substring(4,n.indexOf(")")))),n==="auto"&&(u=r.style[e],r.style[e]=n,n=sr(r,e)||n,u?r.style[e]=u:Lr(r,e)),c=[t,n],yt(c),t=c[0],n=c[1],f=t.match($r)||[],m=n.match($r)||[],m.length){for(;p=$r.exec(n);)g=p[0],C=n.substring(s,p.index),_?_=(_+1)%5:(C.substr(-5)==="rgba("||C.substr(-5)==="hsla(")&&(_=1),g!==(u=f[d++]||"")&&(h=parseFloat(u)||0,k=u.substr((h+"").length),g.charAt(1)==="="&&(g=Wr(h,g)+k),y=parseFloat(g),x=g.substr((y+"").length),s=$r.lastIndex-x.length,x||(x=x||dr.units[e]||k,s===n.length&&(n+=x,l.e+=x)),k!==x&&(h=Er(r,e,u,x)||0),l._pt={_next:l._pt,p:C||d===1?C:",",s:h,c:y-h,m:_&&_<4||e==="zIndex"?Math.round:0});l.c=s<n.length?n.substring(s,n.length):""}else l.r=e==="display"&&n==="none"?Lt:Gt;return X1.test(n)&&(l.e=0),this._pt=l,l},j1={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},di=function(r){var e=r.split(" "),t=e[0],n=e[1]||"50%";return(t==="top"||t==="bottom"||n==="left"||n==="right")&&(r=t,t=n,n=r),e[0]=j1[t]||t,e[1]=j1[n]||n,e.join(" ")},ci=function(r,e){if(e.tween&&e.tween._time===e.tween._dur){var t=e.t,n=t.style,i=e.u,o=t._gsap,l,s,d;if(i==="all"||i===!0)n.cssText="",s=1;else for(i=i.split(","),d=i.length;--d>-1;)l=i[d],br[l]&&(s=1,l=l==="transformOrigin"?nr:T),Lr(t,l);s&&(Lr(t,T),o&&(o.svg&&t.removeAttribute("transform"),n.scale=n.rotate=n.translate="none",ye(t,1),o.uncache=1,Et(n)))}},Oe={clearProps:function(r,e,t,n,i){if(i.data!=="isFromStart"){var o=r._pt=new tr(r._pt,e,t,0,0,ci);return o.u=n,o.pr=-10,o.tween=i,r._props.push(t),1}}},me=[1,0,0,1,0,0],Tt={},Pt=function(r){return r==="matrix(1, 0, 0, 1, 0, 0)"||r==="none"||!r},H1=function(r){var e=sr(r,T);return Pt(e)?me:e.substr(7).match($1).map(j)},w1=function(r,e){var t=r._gsap||Hr(r),n=r.style,i=H1(r),o,l,s,d;return t.svg&&r.getAttribute("transform")?(s=r.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(",")==="1,0,0,1,0,0"?me:i):(i===me&&!r.offsetParent&&r!==Jr&&!t.svg&&(s=n.display,n.display="block",o=r.parentNode,(!o||!r.offsetParent&&!r.getBoundingClientRect().width)&&(d=1,l=r.nextElementSibling,Jr.appendChild(r)),i=H1(r),s?n.display=s:Lr(r,"display"),d&&(l?o.insertBefore(r,l):o?o.appendChild(r):Jr.removeChild(r))),e&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},i1=function(r,e,t,n,i,o){var l=r._gsap,s=i||w1(r,!0),d=l.xOrigin||0,c=l.yOrigin||0,p=l.xOffset||0,f=l.yOffset||0,h=s[0],_=s[1],u=s[2],g=s[3],y=s[4],C=s[5],x=e.split(" "),k=parseFloat(x[0])||0,m=parseFloat(x[1])||0,v,B,F,w;t?s!==me&&(B=h*g-_*u)&&(F=k*(g/B)+m*(-u/B)+(u*C-g*y)/B,w=k*(-_/B)+m*(h/B)-(h*C-_*y)/B,k=F,m=w):(v=Ut(r),k=v.x+(~x[0].indexOf("%")?k/100*v.width:k),m=v.y+(~(x[1]||x[0]).indexOf("%")?m/100*v.height:m)),n||n!==!1&&l.smooth?(y=k-d,C=m-c,l.xOffset=p+(y*h+C*u)-y,l.yOffset=f+(y*_+C*g)-C):l.xOffset=l.yOffset=0,l.xOrigin=k,l.yOrigin=m,l.smooth=!!n,l.origin=e,l.originIsAbsolute=!!t,r.style[nr]="0px 0px",o&&(Ar(o,l,"xOrigin",d,k),Ar(o,l,"yOrigin",c,m),Ar(o,l,"xOffset",p,l.xOffset),Ar(o,l,"yOffset",f,l.yOffset)),r.setAttribute("data-svg-origin",k+" "+m)},ye=function(r,e){var t=r._gsap||new vt(r);if("x"in t&&!e&&!t.uncache)return t;var n=r.style,i=t.scaleX<0,o="px",l="deg",s=getComputedStyle(r),d=sr(r,nr)||"0",c,p,f,h,_,u,g,y,C,x,k,m,v,B,F,w,M,I,G,L,$,z,H,N,gr,xe,oe,ae,Zr,v1,wr,Ur;return c=p=f=u=g=y=C=x=k=0,h=_=1,t.svg=!!(r.getCTM&&Dt(r)),s.translate&&((s.translate!=="none"||s.scale!=="none"||s.rotate!=="none")&&(n[T]=(s.translate!=="none"?"translate3d("+(s.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(s.rotate!=="none"?"rotate("+s.rotate+") ":"")+(s.scale!=="none"?"scale("+s.scale.split(" ").join(",")+") ":"")+(s[T]!=="none"?s[T]:"")),n.scale=n.rotate=n.translate="none"),B=w1(r,t.svg),t.svg&&(t.uncache?(gr=r.getBBox(),d=t.xOrigin-gr.x+"px "+(t.yOrigin-gr.y)+"px",N=""):N=!e&&r.getAttribute("data-svg-origin"),i1(r,N||d,!!N||t.originIsAbsolute,t.smooth!==!1,B)),m=t.xOrigin||0,v=t.yOrigin||0,B!==me&&(I=B[0],G=B[1],L=B[2],$=B[3],c=z=B[4],p=H=B[5],B.length===6?(h=Math.sqrt(I*I+G*G),_=Math.sqrt($*$+L*L),u=I||G?Yr(G,I)*Pr:0,C=L||$?Yr(L,$)*Pr+u:0,C&&(_*=Math.abs(Math.cos(C*Kr))),t.svg&&(c-=m-(m*I+v*L),p-=v-(m*G+v*$))):(Ur=B[6],v1=B[7],oe=B[8],ae=B[9],Zr=B[10],wr=B[11],c=B[12],p=B[13],f=B[14],F=Yr(Ur,Zr),g=F*Pr,F&&(w=Math.cos(-F),M=Math.sin(-F),N=z*w+oe*M,gr=H*w+ae*M,xe=Ur*w+Zr*M,oe=z*-M+oe*w,ae=H*-M+ae*w,Zr=Ur*-M+Zr*w,wr=v1*-M+wr*w,z=N,H=gr,Ur=xe),F=Yr(-L,Zr),y=F*Pr,F&&(w=Math.cos(-F),M=Math.sin(-F),N=I*w-oe*M,gr=G*w-ae*M,xe=L*w-Zr*M,wr=$*M+wr*w,I=N,G=gr,L=xe),F=Yr(G,I),u=F*Pr,F&&(w=Math.cos(F),M=Math.sin(F),N=I*w+G*M,gr=z*w+H*M,G=G*w-I*M,H=H*w-z*M,I=N,z=gr),g&&Math.abs(g)+Math.abs(u)>359.9&&(g=u=0,y=180-y),h=j(Math.sqrt(I*I+G*G+L*L)),_=j(Math.sqrt(H*H+Ur*Ur)),F=Yr(z,H),C=Math.abs(F)>2e-4?F*Pr:0,k=wr?1/(wr<0?-wr:wr):0),t.svg&&(N=r.getAttribute("transform"),t.forceCSS=r.setAttribute("transform","")||!Pt(sr(r,T)),N&&r.setAttribute("transform",N))),Math.abs(C)>90&&Math.abs(C)<270&&(i?(h*=-1,C+=u<=0?180:-180,u+=u<=0?180:-180):(_*=-1,C+=C<=0?180:-180)),e=e||t.uncache,t.x=c-((t.xPercent=c&&(!e&&t.xPercent||(Math.round(r.offsetWidth/2)===Math.round(-c)?-50:0)))?r.offsetWidth*t.xPercent/100:0)+o,t.y=p-((t.yPercent=p&&(!e&&t.yPercent||(Math.round(r.offsetHeight/2)===Math.round(-p)?-50:0)))?r.offsetHeight*t.yPercent/100:0)+o,t.z=f+o,t.scaleX=j(h),t.scaleY=j(_),t.rotation=j(u)+l,t.rotationX=j(g)+l,t.rotationY=j(y)+l,t.skewX=C+l,t.skewY=x+l,t.transformPerspective=k+o,(t.zOrigin=parseFloat(d.split(" ")[2])||!e&&t.zOrigin||0)&&(n[nr]=Ge(d)),t.xOffset=t.yOffset=0,t.force3D=dr.force3D,t.renderTransform=t.svg?pi:Zt?jt:ui,t.uncache=0,t},Ge=function(r){return(r=r.split(" "))[0]+" "+r[1]},qe=function(r,e,t){var n=W(e);return j(parseFloat(e)+parseFloat(Er(r,"x",t+"px",n)))+n},ui=function(r,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,jt(r,e)},Dr="0deg",le="0px",Tr=") ",jt=function(r,e){var t=e||this,n=t.xPercent,i=t.yPercent,o=t.x,l=t.y,s=t.z,d=t.rotation,c=t.rotationY,p=t.rotationX,f=t.skewX,h=t.skewY,_=t.scaleX,u=t.scaleY,g=t.transformPerspective,y=t.force3D,C=t.target,x=t.zOrigin,k="",m=y==="auto"&&r&&r!==1||y===!0;if(x&&(p!==Dr||c!==Dr)){var v=parseFloat(c)*Kr,B=Math.sin(v),F=Math.cos(v),w;v=parseFloat(p)*Kr,w=Math.cos(v),o=qe(C,o,B*w*-x),l=qe(C,l,-Math.sin(v)*-x),s=qe(C,s,F*w*-x+x)}g!==le&&(k+="perspective("+g+Tr),(n||i)&&(k+="translate("+n+"%, "+i+"%) "),(m||o!==le||l!==le||s!==le)&&(k+=s!==le||m?"translate3d("+o+", "+l+", "+s+") ":"translate("+o+", "+l+Tr),d!==Dr&&(k+="rotate("+d+Tr),c!==Dr&&(k+="rotateY("+c+Tr),p!==Dr&&(k+="rotateX("+p+Tr),(f!==Dr||h!==Dr)&&(k+="skew("+f+", "+h+Tr),(_!==1||u!==1)&&(k+="scale("+_+", "+u+Tr),C.style[T]=k||"translate(0, 0)"},pi=function(r,e){var t=e||this,n=t.xPercent,i=t.yPercent,o=t.x,l=t.y,s=t.rotation,d=t.skewX,c=t.skewY,p=t.scaleX,f=t.scaleY,h=t.target,_=t.xOrigin,u=t.yOrigin,g=t.xOffset,y=t.yOffset,C=t.forceCSS,x=parseFloat(o),k=parseFloat(l),m,v,B,F,w;s=parseFloat(s),d=parseFloat(d),c=parseFloat(c),c&&(c=parseFloat(c),d+=c,s+=c),s||d?(s*=Kr,d*=Kr,m=Math.cos(s)*p,v=Math.sin(s)*p,B=Math.sin(s-d)*-f,F=Math.cos(s-d)*f,d&&(c*=Kr,w=Math.tan(d-c),w=Math.sqrt(1+w*w),B*=w,F*=w,c&&(w=Math.tan(c),w=Math.sqrt(1+w*w),m*=w,v*=w)),m=j(m),v=j(v),B=j(B),F=j(F)):(m=p,F=f,v=B=0),(x&&!~(o+"").indexOf("px")||k&&!~(l+"").indexOf("px"))&&(x=Er(h,"x",o,"px"),k=Er(h,"y",l,"px")),(_||u||g||y)&&(x=j(x+_-(_*m+u*B)+g),k=j(k+u-(_*v+u*F)+y)),(n||i)&&(w=h.getBBox(),x=j(x+n/100*w.width),k=j(k+i/100*w.height)),w="matrix("+m+","+v+","+B+","+F+","+x+","+k+")",h.setAttribute("transform",w),C&&(h.style[T]=w)},fi=function(r,e,t,n,i){var o=360,l=Y(i),s=parseFloat(i)*(l&&~i.indexOf("rad")?Pr:1),d=s-n,c=n+d+"deg",p,f;return l&&(p=i.split("_")[1],p==="short"&&(d%=o,d!==d%(o/2)&&(d+=d<0?o:-o)),p==="cw"&&d<0?d=(d+o*Z1)%o-~~(d/o)*o:p==="ccw"&&d>0&&(d=(d-o*Z1)%o-~~(d/o)*o)),r._pt=f=new tr(r._pt,e,t,n,d,Xn),f.e=c,f.u="deg",r._props.push(t),f},R1=function(r,e){for(var t in e)r[t]=e[t];return r},hi=function(r,e,t){var n=R1({},t._gsap),i="perspective,force3D,transformOrigin,svgOrigin",o=t.style,l,s,d,c,p,f,h,_;n.svg?(d=t.getAttribute("transform"),t.setAttribute("transform",""),o[T]=e,l=ye(t,1),Lr(t,T),t.setAttribute("transform",d)):(d=getComputedStyle(t)[T],o[T]=e,l=ye(t,1),o[T]=d);for(s in br)d=n[s],c=l[s],d!==c&&i.indexOf(s)<0&&(h=W(d),_=W(c),p=h!==_?Er(t,s,d,_):parseFloat(d),f=parseFloat(c),r._pt=new tr(r._pt,l,s,p,f-p,e1),r._pt.u=_||0,r._props.push(s));R1(l,n)};er("padding,margin,Width,Radius",function(a,r){var e="Top",t="Right",n="Bottom",i="Left",o=(r<3?[e,t,n,i]:[e+i,e+t,n+t,n+i]).map(function(l){return r<2?a+l:"border"+l+a});Oe[r>1?"border"+a:a]=function(l,s,d,c,p){var f,h;if(arguments.length<4)return f=o.map(function(_){return Br(l,_,d)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(c+"").split(" "),h={},o.forEach(function(_,u){return h[_]=f[u]=f[u]||f[(u-1)/2|0]}),l.init(s,h,p)}});var Ht={name:"css",register:n1,targetTest:function(r){return r.style&&r.nodeType},init:function(r,e,t,n,i){var o=this._props,l=r.style,s=t.vars.startAt,d,c,p,f,h,_,u,g,y,C,x,k,m,v,B,F,w;y1||n1(),this.styles=this.styles||It(r),F=this.styles.props,this.tween=t;for(u in e)if(u!=="autoRound"&&(c=e[u],!(or[u]&&Bt(u,e,t,n,r,i)))){if(h=typeof c,_=Oe[u],h==="function"&&(c=c.call(t,n,r,i),h=typeof c),h==="string"&&~c.indexOf("random(")&&(c=_e(c)),_)_(this,r,u,c,t)&&(B=1);else if(u.substr(0,2)==="--")d=(getComputedStyle(r).getPropertyValue(u)+"").trim(),c+="",Or.lastIndex=0,Or.test(d)||(g=W(d),y=W(c),y?g!==y&&(d=Er(r,u,d,y)+y):g&&(c+=g)),this.add(l,"setProperty",d,c,n,i,0,0,u),o.push(u),F.push(u,0,l[u]);else if(h!=="undefined"){if(s&&u in s?(d=typeof s[u]=="function"?s[u].call(t,n,r,i):s[u],Y(d)&&~d.indexOf("random(")&&(d=_e(d)),W(d+"")||d==="auto"||(d+=dr.units[u]||W(Br(r,u))||""),(d+"").charAt(1)==="="&&(d=Br(r,u))):d=Br(r,u),f=parseFloat(d),C=h==="string"&&c.charAt(1)==="="&&c.substr(0,2),C&&(c=c.substr(2)),p=parseFloat(c),u in kr&&(u==="autoAlpha"&&(f===1&&Br(r,"visibility")==="hidden"&&p&&(f=0),F.push("visibility",0,l.visibility),Ar(this,l,"visibility",f?"inherit":"hidden",p?"inherit":"hidden",!p)),u!=="scale"&&u!=="transform"&&(u=kr[u],~u.indexOf(",")&&(u=u.split(",")[0]))),x=u in br,x){if(this.styles.save(u),w=c,h==="string"&&c.substring(0,6)==="var(--"){if(c=sr(r,c.substring(4,c.indexOf(")"))),c.substring(0,5)==="calc("){var M=r.style.perspective;r.style.perspective=c,c=sr(r,"perspective"),M?r.style.perspective=M:Lr(r,"perspective")}p=parseFloat(c)}if(k||(m=r._gsap,m.renderTransform&&!e.parseTransform||ye(r,e.parseTransform),v=e.smoothOrigin!==!1&&m.smooth,k=this._pt=new tr(this._pt,l,T,0,1,m.renderTransform,m,0,-1),k.dep=1),u==="scale")this._pt=new tr(this._pt,m,"scaleY",m.scaleY,(C?Wr(m.scaleY,C+p):p)-m.scaleY||0,e1),this._pt.u=0,o.push("scaleY",u),u+="X";else if(u==="transformOrigin"){F.push(nr,0,l[nr]),c=di(c),m.svg?i1(r,c,0,v,0,this):(y=parseFloat(c.split(" ")[2])||0,y!==m.zOrigin&&Ar(this,m,"zOrigin",m.zOrigin,y),Ar(this,l,u,Ge(d),Ge(c)));continue}else if(u==="svgOrigin"){i1(r,c,1,v,0,this);continue}else if(u in Tt){fi(this,m,u,f,C?Wr(f,C+c):c);continue}else if(u==="smoothOrigin"){Ar(this,m,"smooth",m.smooth,c);continue}else if(u==="force3D"){m[u]=c;continue}else if(u==="transform"){hi(this,c,r);continue}}else u in l||(u=ie(u)||u);if(x||(p||p===0)&&(f||f===0)&&!$n.test(c)&&u in l)g=(d+"").substr((f+"").length),p||(p=0),y=W(c)||(u in dr.units?dr.units[u]:g),g!==y&&(f=Er(r,u,d,y)),this._pt=new tr(this._pt,x?m:l,u,f,(C?Wr(f,C+p):p)-f,!x&&(y==="px"||u==="zIndex")&&e.autoRound!==!1?Kn:e1),this._pt.u=y||0,x&&w!==c?(this._pt.b=d,this._pt.e=w,this._pt.r=Jn):g!==y&&y!=="%"&&(this._pt.b=d,this._pt.r=Wn);else if(u in l)si.call(this,r,u,d,C?C+c:c);else if(u in r)this.add(r,u,d||r[u],C?C+c:c,n,i);else if(u!=="parseTransform"){d1(u,c);continue}x||(u in l?F.push(u,0,l[u]):typeof r[u]=="function"?F.push(u,2,r[u]()):F.push(u,1,d||r[u])),o.push(u)}}B&&Vt(this)},render:function(r,e){if(e.tween._time||!k1())for(var t=e._pt;t;)t.r(r,t.d),t=t._next;else e.styles.revert()},get:Br,aliases:kr,getSetter:function(r,e,t){var n=kr[e];return n&&n.indexOf(",")<0&&(e=n),e in br&&e!==nr&&(r._gsap.x||Br(r,"x"))?t&&I1===t?e==="scale"?ti:ei:(I1=t||{})&&(e==="scale"?ni:ii):r.style&&!a1(r.style[e])?Qn:~e.indexOf("-")?ri:C1(r,e)},core:{_removeProperty:Lr,_getMatrix:w1}};ir.utils.checkPrefix=ie;ir.core.getStyleSaver=It;(function(a,r,e,t){var n=er(a+","+r+","+e,function(i){br[i]=1});er(r,function(i){dr.units[i]="deg",Tt[i]=1}),kr[n[13]]=a+","+r,er(t,function(i){var o=i.split(":");kr[o[1]]=n[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");er("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(a){dr.units[a]="px"});ir.registerPlugin(Ht);var S=ir.registerPlugin(Ht)||ir;S.core.Tween;const q1=`<svg viewBox="0 0 2380 1956" fill="none" xmlns="http://www.w3.org/2000/svg">\r
    <g id="skill-tree">\r
        <rect width="2480" height="1956" fill="white" />\r
        <g id="App" clip-path="url(#clip0_63_37)">\r
            <rect width="2480" height="1956" fill="url(#paint0_radial_63_37)" />\r
            <g id="etoile">\r
                <g id="Container" opacity="0.212366" filter="url(#filter0_d_63_37)">\r
                    <path\r
                        d="M1166.66 284.273C1166.66 284.062 1166.83 283.891 1167.04 283.891C1167.25 283.891 1167.42 284.062 1167.42 284.273V285.445C1167.42 285.657 1167.25 285.828 1167.04 285.828C1166.83 285.828 1166.66 285.657 1166.66 285.445V284.273Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_2" opacity="0.226697" filter="url(#filter1_d_63_37)">\r
                    <path\r
                        d="M1244.39 632.438C1244.39 631.773 1244.93 631.234 1245.59 631.234H1245.7C1246.37 631.234 1246.91 631.773 1246.91 632.438C1246.91 633.102 1246.37 633.641 1245.7 633.641H1245.59C1244.93 633.641 1244.39 633.102 1244.39 632.438Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_3" opacity="0.951673" filter="url(#filter2_d_63_37)">\r
                    <path\r
                        d="M129.797 1253.05C129.797 1252.37 130.353 1251.81 131.039 1251.81H131.102C131.788 1251.81 132.344 1252.37 132.344 1253.05C132.344 1253.74 131.788 1254.3 131.102 1254.3H131.039C130.353 1254.3 129.797 1253.74 129.797 1253.05Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_4" opacity="0.303658" filter="url(#filter3_d_63_37)">\r
                    <path\r
                        d="M87.1875 179.727C87.1875 179.291 87.5408 178.938 87.9766 178.938C88.4123 178.938 88.7656 179.291 88.7656 179.727V181.086C88.7656 181.522 88.4123 181.875 87.9766 181.875C87.5408 181.875 87.1875 181.522 87.1875 181.086V179.727Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_5" opacity="0.223916" filter="url(#filter4_d_63_37)">\r
                    <path\r
                        d="M1388.08 320.125C1388.08 320.09 1388.11 320.062 1388.14 320.062C1388.18 320.062 1388.2 320.09 1388.2 320.125V322.219C1388.2 322.253 1388.18 322.281 1388.14 322.281C1388.11 322.281 1388.08 322.253 1388.08 322.219V320.125Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_6" opacity="0.904297" filter="url(#filter5_d_63_37)">\r
                    <path\r
                        d="M616.297 1020.1C616.297 1020.05 616.335 1020.02 616.383 1020.02H618.414C618.462 1020.02 618.5 1020.05 618.5 1020.1C618.5 1020.15 618.462 1020.19 618.414 1020.19H616.383C616.335 1020.19 616.297 1020.15 616.297 1020.1Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_7" opacity="0.27899" filter="url(#filter6_d_63_37)">\r
                    <path\r
                        d="M469.328 335.539C469.328 335.414 469.43 335.312 469.555 335.312H470.883C471.008 335.312 471.109 335.414 471.109 335.539C471.109 335.664 471.008 335.766 470.883 335.766H469.555C469.43 335.766 469.328 335.664 469.328 335.539Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_8" opacity="0.638205" filter="url(#filter7_d_63_37)">\r
                    <path\r
                        d="M1260.88 1103.28C1260.88 1102.82 1261.25 1102.44 1261.72 1102.44H1262.66C1263.12 1102.44 1263.5 1102.82 1263.5 1103.28C1263.5 1103.75 1263.12 1104.12 1262.66 1104.12H1261.72C1261.25 1104.12 1260.88 1103.75 1260.88 1103.28Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_9" opacity="0.82118" filter="url(#filter8_d_63_37)">\r
                    <path\r
                        d="M337.672 110.031C337.672 109.997 337.7 109.969 337.734 109.969H339.75C339.785 109.969 339.812 109.997 339.812 110.031C339.812 110.066 339.785 110.094 339.75 110.094H337.734C337.7 110.094 337.672 110.066 337.672 110.031Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_10" opacity="0.720711" filter="url(#filter9_d_63_37)">\r
                    <path\r
                        d="M674.609 894.195C674.609 893.82 674.914 893.516 675.289 893.516C675.664 893.516 675.969 893.82 675.969 894.195V895.695C675.969 896.071 675.664 896.375 675.289 896.375C674.914 896.375 674.609 896.071 674.609 895.695V894.195Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_11" opacity="0.99927" filter="url(#filter10_d_63_37)">\r
                    <path\r
                        d="M911.391 1234.27C911.391 1234.26 911.398 1234.25 911.406 1234.25H911.641C911.649 1234.25 911.656 1234.26 911.656 1234.27C911.656 1234.27 911.649 1234.28 911.641 1234.28H911.406C911.398 1234.28 911.391 1234.27 911.391 1234.27Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_12" opacity="0.251683" filter="url(#filter11_d_63_37)">\r
                    <path\r
                        d="M902.469 582.133C902.469 581.835 902.71 581.594 903.008 581.594H904.336C904.634 581.594 904.875 581.835 904.875 582.133C904.875 582.431 904.634 582.672 904.336 582.672H903.008C902.71 582.672 902.469 582.431 902.469 582.133Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_13" opacity="0.230546" filter="url(#filter12_d_63_37)">\r
                    <path\r
                        d="M1186.78 990.797C1186.78 990.564 1186.97 990.375 1187.2 990.375C1187.44 990.375 1187.62 990.564 1187.62 990.797V992.484C1187.62 992.717 1187.44 992.906 1187.2 992.906C1186.97 992.906 1186.78 992.717 1186.78 992.484V990.797Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_14" opacity="0.999669" filter="url(#filter13_d_63_37)">\r
                    <path\r
                        d="M17.2656 917.555C17.2656 917.55 17.2691 917.547 17.2734 917.547H17.9922C17.9965 917.547 18 917.55 18 917.555C18 917.559 17.9965 917.562 17.9922 917.562H17.2734C17.2691 917.562 17.2656 917.559 17.2656 917.555Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_15" opacity="0.995884" filter="url(#filter14_d_63_37)">\r
                    <path\r
                        d="M625.922 34.7734C625.922 34.3204 626.289 33.9531 626.742 33.9531H627.195C627.648 33.9531 628.016 34.3204 628.016 34.7734C628.016 35.2265 627.648 35.5938 627.195 35.5938H626.742C626.289 35.5938 625.922 35.2265 625.922 34.7734Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_16" opacity="0.264705" filter="url(#filter15_d_63_37)">\r
                    <path\r
                        d="M981.391 111.344C981.391 110.973 981.691 110.672 982.062 110.672C982.434 110.672 982.734 110.973 982.734 111.344V112.5C982.734 112.871 982.434 113.172 982.062 113.172C981.691 113.172 981.391 112.871 981.391 112.5V111.344Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_17" opacity="0.962926" filter="url(#filter16_d_63_37)">\r
                    <path\r
                        d="M611.875 140.594C611.875 140.266 612.141 140 612.469 140H613.719C614.047 140 614.312 140.266 614.312 140.594C614.312 140.922 614.047 141.188 613.719 141.188H612.469C612.141 141.188 611.875 140.922 611.875 140.594Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_18" opacity="0.559097" filter="url(#filter17_d_63_37)">\r
                    <path\r
                        d="M165.094 1329.4C165.094 1328.63 165.713 1328.02 166.477 1328.02C167.24 1328.02 167.859 1328.63 167.859 1329.4V1329.52C167.859 1330.29 167.24 1330.91 166.477 1330.91C165.713 1330.91 165.094 1330.29 165.094 1329.52V1329.4Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_19" opacity="0.341417" filter="url(#filter18_d_63_37)">\r
                    <path\r
                        d="M714.266 765.258C714.266 765.072 714.416 764.922 714.602 764.922C714.787 764.922 714.938 765.072 714.938 765.258V766.602C714.938 766.787 714.787 766.938 714.602 766.938C714.416 766.938 714.266 766.787 714.266 766.602V765.258Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_20" opacity="0.381909" filter="url(#filter19_d_63_37)">\r
                    <path\r
                        d="M851.484 1135.98C851.484 1135.76 851.666 1135.58 851.891 1135.58C852.115 1135.58 852.297 1135.76 852.297 1135.98V1137.58C852.297 1137.8 852.115 1137.98 851.891 1137.98C851.666 1137.98 851.484 1137.8 851.484 1137.58V1135.98Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_21" opacity="0.775887" filter="url(#filter20_d_63_37)">\r
                    <path\r
                        d="M300.844 545.492C300.844 545.194 301.085 544.953 301.383 544.953H301.68C301.977 544.953 302.219 545.194 302.219 545.492C302.219 545.79 301.977 546.031 301.68 546.031H301.383C301.085 546.031 300.844 545.79 300.844 545.492Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_22" opacity="0.389162" filter="url(#filter21_d_63_37)">\r
                    <path\r
                        d="M1225.78 140.602C1225.78 140.321 1226.01 140.094 1226.29 140.094C1226.57 140.094 1226.8 140.321 1226.8 140.602V141.414C1226.8 141.695 1226.57 141.922 1226.29 141.922C1226.01 141.922 1225.78 141.695 1225.78 141.414V140.602Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_23" opacity="0.626219" filter="url(#filter22_d_63_37)">\r
                    <path\r
                        d="M948.312 130.438C948.312 130.222 948.487 130.047 948.703 130.047H948.859C949.075 130.047 949.25 130.222 949.25 130.438C949.25 130.653 949.075 130.828 948.859 130.828H948.703C948.487 130.828 948.312 130.653 948.312 130.438Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_24" opacity="0.96256" filter="url(#filter23_d_63_37)">\r
                    <path\r
                        d="M1021.02 629.344C1021.02 629.318 1021.04 629.297 1021.06 629.297H1022.64C1022.67 629.297 1022.69 629.318 1022.69 629.344C1022.69 629.37 1022.67 629.391 1022.64 629.391H1021.06C1021.04 629.391 1021.02 629.37 1021.02 629.344Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_25" opacity="0.705205" filter="url(#filter24_d_63_37)">\r
                    <path\r
                        d="M970.438 577.445C970.438 576.871 970.903 576.406 971.477 576.406C972.05 576.406 972.516 576.871 972.516 577.445V578.055C972.516 578.629 972.05 579.094 971.477 579.094C970.903 579.094 970.438 578.629 970.438 578.055V577.445Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_26" opacity="0.357041" filter="url(#filter25_d_63_37)">\r
                    <path\r
                        d="M523.797 588.961C523.797 588.663 524.038 588.422 524.336 588.422C524.634 588.422 524.875 588.663 524.875 588.961V590.539C524.875 590.837 524.634 591.078 524.336 591.078C524.038 591.078 523.797 590.837 523.797 590.539V588.961Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_27" opacity="0.203637" filter="url(#filter26_d_63_37)">\r
                    <path\r
                        d="M1145.16 1360.27C1145.16 1359.97 1145.39 1359.73 1145.69 1359.73H1146.34C1146.64 1359.73 1146.88 1359.97 1146.88 1360.27C1146.88 1360.56 1146.64 1360.8 1146.34 1360.8H1145.69C1145.39 1360.8 1145.16 1360.56 1145.16 1360.27Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_28" opacity="0.453635" filter="url(#filter27_d_63_37)">\r
                    <path\r
                        d="M77 507.625C77 507.211 77.3358 506.875 77.75 506.875H78.0625C78.4767 506.875 78.8125 507.211 78.8125 507.625C78.8125 508.039 78.4767 508.375 78.0625 508.375H77.75C77.3358 508.375 77 508.039 77 507.625Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_29" opacity="0.724612" filter="url(#filter28_d_63_37)">\r
                    <path\r
                        d="M353.641 687.789C353.641 687.785 353.644 687.781 353.648 687.781H355.961C355.965 687.781 355.969 687.785 355.969 687.789C355.969 687.793 355.965 687.797 355.961 687.797H353.648C353.644 687.797 353.641 687.793 353.641 687.789Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_30" opacity="0.95875" filter="url(#filter29_d_63_37)">\r
                    <path\r
                        d="M236.781 603.266C236.781 603.24 236.802 603.219 236.828 603.219H239.531C239.557 603.219 239.578 603.24 239.578 603.266C239.578 603.292 239.557 603.312 239.531 603.312H236.828C236.802 603.312 236.781 603.292 236.781 603.266Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_31" opacity="0.467517" filter="url(#filter30_d_63_37)">\r
                    <path\r
                        d="M339.141 753.648C339.141 753.213 339.494 752.859 339.93 752.859C340.365 752.859 340.719 753.213 340.719 753.648V754.586C340.719 755.022 340.365 755.375 339.93 755.375C339.494 755.375 339.141 755.022 339.141 754.586V753.648Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_32" opacity="0.487275" filter="url(#filter31_d_63_37)">\r
                    <path\r
                        d="M629.016 647.461C629.016 647.439 629.033 647.422 629.055 647.422C629.076 647.422 629.094 647.439 629.094 647.461V647.523C629.094 647.545 629.076 647.562 629.055 647.562C629.033 647.562 629.016 647.545 629.016 647.523V647.461Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_33" opacity="0.676202" filter="url(#filter32_d_63_37)">\r
                    <path\r
                        d="M1311.86 33.9375C1311.86 33.5578 1312.17 33.25 1312.55 33.25C1312.93 33.25 1313.23 33.5578 1313.23 33.9375V34.9219C1313.23 35.3016 1312.93 35.6094 1312.55 35.6094C1312.17 35.6094 1311.86 35.3016 1311.86 34.9219V33.9375Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_34" opacity="0.668161" filter="url(#filter33_d_63_37)">\r
                    <path\r
                        d="M1273 339.023C1273 338.674 1273.28 338.391 1273.63 338.391C1273.98 338.391 1274.27 338.674 1274.27 339.023V340.039C1274.27 340.389 1273.98 340.672 1273.63 340.672C1273.28 340.672 1273 340.389 1273 340.039V339.023Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_35" opacity="0.763615" filter="url(#filter34_d_63_37)">\r
                    <path\r
                        d="M1122.06 1181.7C1122.06 1181.41 1122.3 1181.17 1122.59 1181.17C1122.89 1181.17 1123.12 1181.41 1123.12 1181.7V1183.31C1123.12 1183.61 1122.89 1183.84 1122.59 1183.84C1122.3 1183.84 1122.06 1183.61 1122.06 1183.31V1181.7Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_36" opacity="0.671156" filter="url(#filter35_d_63_37)">\r
                    <path\r
                        d="M1304.59 1038.04C1304.59 1037.57 1304.98 1037.19 1305.45 1037.19H1306.1C1306.57 1037.19 1306.95 1037.57 1306.95 1038.04C1306.95 1038.51 1306.57 1038.89 1306.1 1038.89H1305.45C1304.98 1038.89 1304.59 1038.51 1304.59 1038.04Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_37" opacity="0.999989" filter="url(#filter36_d_63_37)">\r
                    <path\r
                        d="M514.547 788.203C514.547 787.789 514.883 787.453 515.297 787.453H516.484C516.899 787.453 517.234 787.789 517.234 788.203C517.234 788.617 516.899 788.953 516.484 788.953H515.297C514.883 788.953 514.547 788.617 514.547 788.203Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_38" opacity="0.20692" filter="url(#filter37_d_63_37)">\r
                    <path\r
                        d="M117.906 471.391C117.906 471.287 117.99 471.203 118.094 471.203H120.063C120.166 471.203 120.25 471.287 120.25 471.391C120.25 471.494 120.166 471.578 120.063 471.578H118.094C117.99 471.578 117.906 471.494 117.906 471.391Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_39" opacity="0.236209" filter="url(#filter38_d_63_37)">\r
                    <path\r
                        d="M1374.27 732.836C1374.27 732.504 1374.53 732.234 1374.87 732.234H1376.02C1376.36 732.234 1376.62 732.504 1376.62 732.836C1376.62 733.168 1376.36 733.438 1376.02 733.438H1374.87C1374.53 733.438 1374.27 733.168 1374.27 732.836Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_40" opacity="0.279149" filter="url(#filter39_d_63_37)">\r
                    <path\r
                        d="M221.156 1187.69C221.156 1187.39 221.394 1187.16 221.688 1187.16C221.981 1187.16 222.219 1187.39 222.219 1187.69V1188.62C222.219 1188.92 221.981 1189.16 221.688 1189.16C221.394 1189.16 221.156 1188.92 221.156 1188.62V1187.69Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_41" opacity="0.377645" filter="url(#filter40_d_63_37)">\r
                    <path\r
                        d="M1095.48 920.922C1095.48 920.387 1095.92 919.953 1096.45 919.953H1096.53C1097.07 919.953 1097.5 920.387 1097.5 920.922C1097.5 921.457 1097.07 921.891 1096.53 921.891H1096.45C1095.92 921.891 1095.48 921.457 1095.48 920.922Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_42" opacity="0.200598" filter="url(#filter41_d_63_37)">\r
                    <path\r
                        d="M188.969 155.641C188.969 155.14 189.374 154.734 189.875 154.734H190C190.501 154.734 190.906 155.14 190.906 155.641C190.906 156.141 190.501 156.547 190 156.547H189.875C189.374 156.547 188.969 156.141 188.969 155.641Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_43" opacity="0.341588" filter="url(#filter42_d_63_37)">\r
                    <path\r
                        d="M1506.03 947.523C1506.03 947.347 1506.17 947.203 1506.35 947.203H1508.34C1508.51 947.203 1508.66 947.347 1508.66 947.523C1508.66 947.7 1508.51 947.844 1508.34 947.844H1506.35C1506.17 947.844 1506.03 947.7 1506.03 947.523Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_44" opacity="0.704951" filter="url(#filter43_d_63_37)">\r
                    <path\r
                        d="M815.781 993.781C815.781 993.686 815.858 993.609 815.953 993.609H816.984C817.079 993.609 817.156 993.686 817.156 993.781C817.156 993.876 817.079 993.953 816.984 993.953H815.953C815.858 993.953 815.781 993.876 815.781 993.781Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_45" opacity="0.222503" filter="url(#filter44_d_63_37)">\r
                    <path\r
                        d="M73.4375 236.719C73.4375 236.149 73.8992 235.688 74.4688 235.688H74.6406C75.2102 235.688 75.6719 236.149 75.6719 236.719C75.6719 237.288 75.2102 237.75 74.6406 237.75H74.4687C73.8992 237.75 73.4375 237.288 73.4375 236.719Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_46" opacity="0.759513" filter="url(#filter45_d_63_37)">\r
                    <path\r
                        d="M1120.97 1136.5C1120.97 1136.04 1121.34 1135.67 1121.8 1135.67C1122.25 1135.67 1122.62 1136.04 1122.62 1136.5V1136.61C1122.62 1137.07 1122.25 1137.44 1121.8 1137.44C1121.34 1137.44 1120.97 1137.07 1120.97 1136.61V1136.5Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_47" opacity="0.694564" filter="url(#filter46_d_63_37)">\r
                    <path\r
                        d="M476.922 554.969C476.922 554.572 477.244 554.25 477.641 554.25C478.038 554.25 478.359 554.572 478.359 554.969V555.062C478.359 555.459 478.038 555.781 477.641 555.781C477.244 555.781 476.922 555.459 476.922 555.062V554.969Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_48" opacity="0.356565" filter="url(#filter47_d_63_37)">\r
                    <path\r
                        d="M1409.28 659.117C1409.28 658.785 1409.55 658.516 1409.88 658.516C1410.22 658.516 1410.48 658.785 1410.48 659.117V659.648C1410.48 659.981 1410.22 660.25 1409.88 660.25C1409.55 660.25 1409.28 659.981 1409.28 659.648V659.117Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_49" opacity="0.489131" filter="url(#filter48_d_63_37)">\r
                    <path\r
                        d="M912.844 1085.84C912.844 1085.74 912.928 1085.66 913.031 1085.66C913.135 1085.66 913.219 1085.74 913.219 1085.84V1088.03C913.219 1088.13 913.135 1088.22 913.031 1088.22C912.928 1088.22 912.844 1088.13 912.844 1088.03V1085.84Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_50" opacity="0.291058" filter="url(#filter49_d_63_37)">\r
                    <path\r
                        d="M320.922 578.492C320.922 578.065 321.268 577.719 321.695 577.719H321.883C322.31 577.719 322.656 578.065 322.656 578.492C322.656 578.919 322.31 579.266 321.883 579.266H321.695C321.268 579.266 320.922 578.919 320.922 578.492Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_51" opacity="0.205587" filter="url(#filter50_d_63_37)">\r
                    <path\r
                        d="M677.859 128.211C677.859 127.551 678.395 127.016 679.055 127.016C679.715 127.016 680.25 127.551 680.25 128.211V128.57C680.25 129.23 679.715 129.766 679.055 129.766C678.395 129.766 677.859 129.23 677.859 128.57V128.211Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_52" opacity="0.392861" filter="url(#filter51_d_63_37)">\r
                    <path\r
                        d="M10.9219 80.2344C10.9219 79.9928 11.1178 79.7969 11.3594 79.7969H13.1563C13.3979 79.7969 13.5938 79.9928 13.5938 80.2344C13.5938 80.476 13.3979 80.6719 13.1562 80.6719H11.3594C11.1178 80.6719 10.9219 80.476 10.9219 80.2344Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_53" opacity="0.952641" filter="url(#filter52_d_63_37)">\r
                    <path\r
                        d="M1425.05 1105.56C1425.05 1105.44 1425.14 1105.34 1425.27 1105.34C1425.39 1105.34 1425.48 1105.44 1425.48 1105.56V1106.44C1425.48 1106.56 1425.39 1106.66 1425.27 1106.66C1425.14 1106.66 1425.05 1106.56 1425.05 1106.44V1105.56Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_54" opacity="0.243213" filter="url(#filter53_d_63_37)">\r
                    <path\r
                        d="M1089.83 991.242C1089.83 990.919 1090.09 990.656 1090.41 990.656H1091.93C1092.25 990.656 1092.52 990.919 1092.52 991.242C1092.52 991.566 1092.25 991.828 1091.93 991.828H1090.41C1090.09 991.828 1089.83 991.566 1089.83 991.242Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_55" opacity="0.25842" filter="url(#filter54_d_63_37)">\r
                    <path\r
                        d="M192.922 1126.89C192.922 1126.8 192.999 1126.72 193.094 1126.72H195.203C195.298 1126.72 195.375 1126.8 195.375 1126.89C195.375 1126.99 195.298 1127.06 195.203 1127.06H193.094C192.999 1127.06 192.922 1126.99 192.922 1126.89Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_56" opacity="0.518375" filter="url(#filter55_d_63_37)">\r
                    <path\r
                        d="M1442.41 1158.45C1442.41 1158.17 1442.63 1157.95 1442.9 1157.95C1443.17 1157.95 1443.39 1158.17 1443.39 1158.45V1160.05C1443.39 1160.33 1443.17 1160.55 1442.9 1160.55C1442.63 1160.55 1442.41 1160.33 1442.41 1160.05V1158.45Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_57" opacity="0.707861" filter="url(#filter56_d_63_37)">\r
                    <path\r
                        d="M250.094 890.688C250.094 890.455 250.283 890.266 250.516 890.266H250.578C250.811 890.266 251 890.455 251 890.688C251 890.92 250.811 891.109 250.578 891.109H250.516C250.283 891.109 250.094 890.92 250.094 890.688Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_58" opacity="0.268048" filter="url(#filter57_d_63_37)">\r
                    <path\r
                        d="M1407.84 872.414C1407.84 872.358 1407.89 872.312 1407.95 872.312H1410.35C1410.41 872.312 1410.45 872.358 1410.45 872.414C1410.45 872.47 1410.41 872.516 1410.35 872.516H1407.95C1407.89 872.516 1407.84 872.47 1407.84 872.414Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_59" opacity="0.842352" filter="url(#filter58_d_63_37)">\r
                    <path\r
                        d="M795.797 775.391C795.797 775.278 795.888 775.188 796 775.188C796.112 775.188 796.203 775.278 796.203 775.391V775.437C796.203 775.55 796.112 775.641 796 775.641C795.888 775.641 795.797 775.55 795.797 775.437V775.391Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_60" opacity="0.868633" filter="url(#filter59_d_63_37)">\r
                    <path\r
                        d="M1059.12 1288.05C1059.12 1287.81 1059.31 1287.62 1059.55 1287.62C1059.78 1287.62 1059.97 1287.81 1059.97 1288.05V1289.25C1059.97 1289.48 1059.78 1289.67 1059.55 1289.67C1059.31 1289.67 1059.12 1289.48 1059.12 1289.25V1288.05Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_61" opacity="0.998643" filter="url(#filter60_d_63_37)">\r
                    <path\r
                        d="M828.75 1182.6C828.75 1182.49 828.844 1182.39 828.961 1182.39C829.077 1182.39 829.172 1182.49 829.172 1182.6V1183.29C829.172 1183.41 829.077 1183.5 828.961 1183.5C828.844 1183.5 828.75 1183.41 828.75 1183.29V1182.6Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_62" opacity="0.209189" filter="url(#filter61_d_63_37)">\r
                    <path\r
                        d="M381.844 907.758C381.844 907.564 382.001 907.406 382.195 907.406C382.389 907.406 382.547 907.564 382.547 907.758V908.945C382.547 909.139 382.389 909.297 382.195 909.297C382.001 909.297 381.844 909.139 381.844 908.945V907.758Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_63" opacity="0.868222" filter="url(#filter62_d_63_37)">\r
                    <path\r
                        d="M948.734 252.18C948.734 252.098 948.801 252.031 948.883 252.031C948.965 252.031 949.031 252.098 949.031 252.18V252.664C949.031 252.746 948.965 252.812 948.883 252.812C948.801 252.812 948.734 252.746 948.734 252.664V252.18Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_64" opacity="0.967863" filter="url(#filter63_d_63_37)">\r
                    <path\r
                        d="M879.781 302.437C879.781 302.23 879.949 302.062 880.156 302.062C880.363 302.062 880.531 302.23 880.531 302.437V304.422C880.531 304.629 880.363 304.797 880.156 304.797C879.949 304.797 879.781 304.629 879.781 304.422V302.437Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_65" opacity="0.698837" filter="url(#filter64_d_63_37)">\r
                    <path\r
                        d="M316.312 863.047C316.312 862.892 316.438 862.766 316.594 862.766H318.672C318.827 862.766 318.953 862.892 318.953 863.047C318.953 863.202 318.827 863.328 318.672 863.328H316.594C316.438 863.328 316.312 863.202 316.312 863.047Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_66" opacity="0.243229" filter="url(#filter65_d_63_37)">\r
                    <path\r
                        d="M467 291.328C467 291.181 467.119 291.062 467.266 291.062H468.953C469.1 291.062 469.219 291.181 469.219 291.328C469.219 291.475 469.1 291.594 468.953 291.594H467.266C467.119 291.594 467 291.475 467 291.328Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_67" opacity="0.998963" filter="url(#filter66_d_63_37)">\r
                    <path\r
                        d="M1518.62 317.594C1518.62 317.343 1518.83 317.141 1519.08 317.141H1520.2C1520.45 317.141 1520.66 317.343 1520.66 317.594C1520.66 317.844 1520.45 318.047 1520.2 318.047H1519.08C1518.83 318.047 1518.62 317.844 1518.62 317.594Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_68" opacity="0.992478" filter="url(#filter67_d_63_37)">\r
                    <path\r
                        d="M1458.53 787.867C1458.53 787.147 1459.12 786.562 1459.84 786.562C1460.56 786.562 1461.16 787.147 1461.16 787.867C1461.16 788.588 1460.56 789.172 1459.84 789.172C1459.12 789.172 1458.53 788.588 1458.53 787.867Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_69" opacity="0.792241" filter="url(#filter68_d_63_37)">\r
                    <path\r
                        d="M643.438 830.789C643.438 830.707 643.504 830.641 643.586 830.641C643.668 830.641 643.734 830.707 643.734 830.789V832.352C643.734 832.434 643.668 832.5 643.586 832.5C643.504 832.5 643.438 832.434 643.438 832.352V830.789Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_70" opacity="0.947056" filter="url(#filter69_d_63_37)">\r
                    <path\r
                        d="M704.062 273.18C704.062 272.994 704.213 272.844 704.398 272.844C704.584 272.844 704.734 272.994 704.734 273.18V274.617C704.734 274.803 704.584 274.953 704.398 274.953C704.213 274.953 704.062 274.803 704.062 274.617V273.18Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_71" opacity="0.862581" filter="url(#filter70_d_63_37)">\r
                    <path\r
                        d="M760.234 392.219C760.234 391.83 760.549 391.516 760.938 391.516H761.516C761.904 391.516 762.219 391.83 762.219 392.219C762.219 392.607 761.904 392.922 761.516 392.922H760.938C760.549 392.922 760.234 392.607 760.234 392.219Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_72" opacity="0.200071" filter="url(#filter71_d_63_37)">\r
                    <path\r
                        d="M1240.41 722.211C1240.41 722.077 1240.51 721.969 1240.65 721.969H1241.09C1241.22 721.969 1241.33 722.077 1241.33 722.211C1241.33 722.345 1241.22 722.453 1241.09 722.453H1240.65C1240.51 722.453 1240.41 722.345 1240.41 722.211Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_73" opacity="0.359393" filter="url(#filter72_d_63_37)">\r
                    <path\r
                        d="M47.0625 1239.38C47.0625 1239.2 47.2129 1239.05 47.3984 1239.05C47.584 1239.05 47.7344 1239.2 47.7344 1239.38V1240.8C47.7344 1240.99 47.584 1241.14 47.3984 1241.14C47.2129 1241.14 47.0625 1240.99 47.0625 1240.8V1239.38Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_74" opacity="0.992055" filter="url(#filter73_d_63_37)">\r
                    <path\r
                        d="M1258.28 559.352C1258.28 558.933 1258.62 558.594 1259.04 558.594C1259.46 558.594 1259.8 558.933 1259.8 559.352V559.742C1259.8 560.161 1259.46 560.5 1259.04 560.5C1258.62 560.5 1258.28 560.161 1258.28 559.742V559.352Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_75" opacity="0.200186" filter="url(#filter74_d_63_37)">\r
                    <path\r
                        d="M638.094 719.664C638.094 719.582 638.16 719.516 638.242 719.516H638.398C638.48 719.516 638.547 719.582 638.547 719.664C638.547 719.746 638.48 719.812 638.398 719.812H638.242C638.16 719.812 638.094 719.746 638.094 719.664Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_76" opacity="0.903342" filter="url(#filter75_d_63_37)">\r
                    <path\r
                        d="M282.281 987.719C282.281 987.356 282.575 987.062 282.937 987.062H283.609C283.972 987.062 284.266 987.356 284.266 987.719C284.266 988.081 283.972 988.375 283.609 988.375H282.938C282.575 988.375 282.281 988.081 282.281 987.719Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_77" opacity="0.961736" filter="url(#filter76_d_63_37)">\r
                    <path\r
                        d="M1196.5 599.602C1196.5 599.485 1196.59 599.391 1196.71 599.391C1196.83 599.391 1196.92 599.485 1196.92 599.602V600.711C1196.92 600.827 1196.83 600.922 1196.71 600.922C1196.59 600.922 1196.5 600.827 1196.5 600.711V599.602Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_78" opacity="0.609411" filter="url(#filter77_d_63_37)">\r
                    <path\r
                        d="M1206.47 704.812C1206.47 704.467 1206.75 704.188 1207.09 704.188C1207.44 704.188 1207.72 704.467 1207.72 704.813V706.453C1207.72 706.798 1207.44 707.078 1207.09 707.078C1206.75 707.078 1206.47 706.798 1206.47 706.453V704.812Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_79" opacity="0.201094" filter="url(#filter78_d_63_37)">\r
                    <path\r
                        d="M159.812 108.211C159.812 108 159.984 107.828 160.195 107.828C160.407 107.828 160.578 108 160.578 108.211V109.711C160.578 109.922 160.407 110.094 160.195 110.094C159.984 110.094 159.812 109.922 159.812 109.711V108.211Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_80" opacity="0.200495" filter="url(#filter79_d_63_37)">\r
                    <path\r
                        d="M558.781 692.773C558.781 692.709 558.834 692.656 558.898 692.656H560.258C560.323 692.656 560.375 692.709 560.375 692.773C560.375 692.838 560.323 692.891 560.258 692.891H558.898C558.834 692.891 558.781 692.838 558.781 692.773Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_81" opacity="0.200496" filter="url(#filter80_d_63_37)">\r
                    <path\r
                        d="M243.969 419.266C243.969 418.739 244.395 418.312 244.922 418.312H245.656C246.183 418.312 246.609 418.739 246.609 419.266C246.609 419.792 246.183 420.219 245.656 420.219H244.922C244.395 420.219 243.969 419.792 243.969 419.266Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_82" opacity="0.98711" filter="url(#filter81_d_63_37)">\r
                    <path\r
                        d="M852.891 996.898C852.891 996.825 852.95 996.766 853.023 996.766C853.097 996.766 853.156 996.825 853.156 996.898V997.789C853.156 997.862 853.097 997.922 853.023 997.922C852.95 997.922 852.891 997.862 852.891 997.789V996.898Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_83" opacity="0.911206" filter="url(#filter82_d_63_37)">\r
                    <path\r
                        d="M789.219 1305.54C789.219 1305.38 789.348 1305.25 789.508 1305.25C789.667 1305.25 789.797 1305.38 789.797 1305.54V1307.93C789.797 1308.09 789.667 1308.22 789.508 1308.22C789.348 1308.22 789.219 1308.09 789.219 1307.93V1305.54Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_84" opacity="0.993398" filter="url(#filter83_d_63_37)">\r
                    <path\r
                        d="M752.812 431.258C752.812 430.649 753.306 430.156 753.914 430.156H754.477C755.085 430.156 755.578 430.649 755.578 431.258C755.578 431.866 755.085 432.359 754.477 432.359H753.914C753.306 432.359 752.812 431.866 752.812 431.258Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_85" opacity="0.31416" filter="url(#filter84_d_63_37)">\r
                    <path\r
                        d="M666.656 613.758C666.656 613.71 666.695 613.672 666.742 613.672H667.133C667.18 613.672 667.219 613.71 667.219 613.758C667.219 613.805 667.18 613.844 667.133 613.844H666.742C666.695 613.844 666.656 613.805 666.656 613.758Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_86" opacity="0.238708" filter="url(#filter85_d_63_37)">\r
                    <path\r
                        d="M840.094 778.289C840.094 778.009 840.321 777.781 840.602 777.781H841.914C842.195 777.781 842.422 778.009 842.422 778.289C842.422 778.57 842.195 778.797 841.914 778.797H840.602C840.321 778.797 840.094 778.57 840.094 778.289Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_87" opacity="0.995869" filter="url(#filter86_d_63_37)">\r
                    <path\r
                        d="M1080.7 1269.76C1080.7 1269.74 1080.72 1269.72 1080.74 1269.72C1080.76 1269.72 1080.78 1269.74 1080.78 1269.76V1271.68C1080.78 1271.7 1080.76 1271.72 1080.74 1271.72C1080.72 1271.72 1080.7 1271.7 1080.7 1271.68V1269.76Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_88" opacity="0.200034" filter="url(#filter87_d_63_37)">\r
                    <path\r
                        d="M423.203 20.0156C423.203 19.7999 423.378 19.625 423.594 19.625H424.594C424.809 19.625 424.984 19.7999 424.984 20.0156C424.984 20.2314 424.809 20.4062 424.594 20.4062H423.594C423.378 20.4062 423.203 20.2314 423.203 20.0156Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_89" opacity="0.322284" filter="url(#filter88_d_63_37)">\r
                    <path\r
                        d="M893.938 1088.41C893.938 1088.31 894.025 1088.22 894.133 1088.22H894.867C894.975 1088.22 895.062 1088.31 895.062 1088.41C895.062 1088.52 894.975 1088.61 894.867 1088.61H894.133C894.025 1088.61 893.938 1088.52 893.938 1088.41Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_90" opacity="0.351167" filter="url(#filter89_d_63_37)">\r
                    <path\r
                        d="M189.062 818.859C189.062 818.221 189.58 817.703 190.219 817.703C190.857 817.703 191.375 818.221 191.375 818.859V819.344C191.375 819.982 190.857 820.5 190.219 820.5C189.58 820.5 189.062 819.982 189.062 819.344V818.859Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_91" opacity="0.91357" filter="url(#filter90_d_63_37)">\r
                    <path\r
                        d="M132.688 611.039C132.688 611.026 132.698 611.016 132.711 611.016H135.555C135.568 611.016 135.578 611.026 135.578 611.039C135.578 611.052 135.568 611.062 135.555 611.062H132.711C132.698 611.062 132.688 611.052 132.688 611.039Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_92" opacity="0.999981" filter="url(#filter91_d_63_37)">\r
                    <path\r
                        d="M1014.42 156.812C1014.42 156.562 1014.62 156.359 1014.88 156.359C1015.13 156.359 1015.33 156.562 1015.33 156.813V158.359C1015.33 158.61 1015.13 158.812 1014.88 158.812C1014.62 158.812 1014.42 158.61 1014.42 158.359V156.812Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_93" opacity="0.261205" filter="url(#filter92_d_63_37)">\r
                    <path\r
                        d="M1207.02 1030.63C1207.02 1030.47 1207.15 1030.34 1207.3 1030.34C1207.46 1030.34 1207.59 1030.47 1207.59 1030.63V1031.87C1207.59 1032.03 1207.46 1032.16 1207.3 1032.16C1207.15 1032.16 1207.02 1032.03 1207.02 1031.87V1030.63Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_94" opacity="0.495677" filter="url(#filter93_d_63_37)">\r
                    <path\r
                        d="M521.719 1285.13C521.719 1284.62 522.135 1284.2 522.648 1284.2H523.289C523.803 1284.2 524.219 1284.62 524.219 1285.13C524.219 1285.65 523.803 1286.06 523.289 1286.06H522.648C522.135 1286.06 521.719 1285.65 521.719 1285.13Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_95" opacity="0.204624" filter="url(#filter94_d_63_37)">\r
                    <path\r
                        d="M28.0781 81C28.0781 80.6635 28.351 80.3906 28.6875 80.3906H29.6094C29.9459 80.3906 30.2188 80.6635 30.2188 81C30.2188 81.3365 29.9459 81.6094 29.6094 81.6094H28.6875C28.351 81.6094 28.0781 81.3365 28.0781 81Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_96" opacity="0.484329" filter="url(#filter95_d_63_37)">\r
                    <path\r
                        d="M1432.58 216.594C1432.58 216.413 1432.73 216.266 1432.91 216.266C1433.09 216.266 1433.23 216.413 1433.23 216.594V216.953C1433.23 217.134 1433.09 217.281 1432.91 217.281C1432.73 217.281 1432.58 217.134 1432.58 216.953V216.594Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_97" opacity="0.997445" filter="url(#filter96_d_63_37)">\r
                    <path\r
                        d="M105.75 702.07C105.75 701.738 106.019 701.469 106.352 701.469C106.684 701.469 106.953 701.738 106.953 702.07V702.289C106.953 702.621 106.684 702.891 106.352 702.891C106.019 702.891 105.75 702.621 105.75 702.289V702.07Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_98" opacity="0.227153" filter="url(#filter97_d_63_37)">\r
                    <path\r
                        d="M740.625 999.719C740.625 999.693 740.646 999.672 740.672 999.672H743.422C743.448 999.672 743.469 999.693 743.469 999.719C743.469 999.745 743.448 999.766 743.422 999.766H740.672C740.646 999.766 740.625 999.745 740.625 999.719Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_99" opacity="0.714005" filter="url(#filter98_d_63_37)">\r
                    <path\r
                        d="M1035.08 973.969C1035.08 973.408 1035.53 972.953 1036.09 972.953H1036.37C1036.94 972.953 1037.39 973.408 1037.39 973.969C1037.39 974.53 1036.94 974.984 1036.37 974.984H1036.09C1035.53 974.984 1035.08 974.53 1035.08 973.969Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_100" opacity="0.276136" filter="url(#filter99_d_63_37)">\r
                    <path\r
                        d="M1403.69 962.727C1403.69 962.265 1404.06 961.891 1404.52 961.891C1404.99 961.891 1405.36 962.265 1405.36 962.727V962.758C1405.36 963.219 1404.99 963.594 1404.52 963.594C1404.06 963.594 1403.69 963.219 1403.69 962.758V962.727Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_101" opacity="0.208089" filter="url(#filter100_d_63_37)">\r
                    <path\r
                        d="M709.75 5.00781C709.75 4.84817 709.879 4.71875 710.039 4.71875H710.352C710.511 4.71875 710.641 4.84817 710.641 5.00781C710.641 5.16746 710.511 5.29688 710.352 5.29688H710.039C709.879 5.29688 709.75 5.16746 709.75 5.00781Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_102" opacity="0.280196" filter="url(#filter101_d_63_37)">\r
                    <path\r
                        d="M79.5312 514.547C79.5312 514.348 79.6921 514.188 79.8906 514.188C80.0891 514.188 80.25 514.348 80.25 514.547V515.656C80.25 515.855 80.0891 516.016 79.8906 516.016C79.6921 516.016 79.5312 515.855 79.5312 515.656V514.547Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_103" opacity="0.25056" filter="url(#filter102_d_63_37)">\r
                    <path\r
                        d="M1502.89 412.078C1502.89 411.966 1502.98 411.875 1503.09 411.875H1505.62C1505.74 411.875 1505.83 411.966 1505.83 412.078C1505.83 412.19 1505.74 412.281 1505.63 412.281H1503.09C1502.98 412.281 1502.89 412.19 1502.89 412.078Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_104" opacity="0.220822" filter="url(#filter103_d_63_37)">\r
                    <path\r
                        d="M82.5312 723C82.5312 722.793 82.6991 722.625 82.9062 722.625C83.1134 722.625 83.2812 722.793 83.2812 723V724.734C83.2812 724.941 83.1134 725.109 82.9062 725.109C82.6991 725.109 82.5312 724.941 82.5312 724.734V723Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_105" opacity="0.503124" filter="url(#filter104_d_63_37)">\r
                    <path\r
                        d="M960.422 285.852C960.422 285.709 960.537 285.594 960.68 285.594C960.822 285.594 960.938 285.709 960.938 285.852V286.633C960.938 286.775 960.822 286.891 960.68 286.891C960.537 286.891 960.422 286.775 960.422 286.633V285.852Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_106" opacity="0.402704" filter="url(#filter105_d_63_37)">\r
                    <path\r
                        d="M629.719 13.4375C629.719 13.239 629.88 13.0781 630.078 13.0781C630.277 13.0781 630.438 13.239 630.438 13.4375V15.4531C630.438 15.6516 630.277 15.8125 630.078 15.8125C629.88 15.8125 629.719 15.6516 629.719 15.4531V13.4375Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_107" opacity="0.31943" filter="url(#filter106_d_63_37)">\r
                    <path\r
                        d="M909.688 1109.24C909.688 1109.14 909.768 1109.06 909.867 1109.06C909.966 1109.06 910.047 1109.14 910.047 1109.24V1109.43C910.047 1109.53 909.966 1109.61 909.867 1109.61C909.768 1109.61 909.688 1109.53 909.688 1109.43V1109.24Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_108" opacity="0.530435" filter="url(#filter107_d_63_37)">\r
                    <path\r
                        d="M53.8438 76.6406C53.8438 76.1487 54.2425 75.75 54.7344 75.75C55.2263 75.75 55.625 76.1487 55.625 76.6406V77.5156C55.625 78.0075 55.2263 78.4062 54.7344 78.4062C54.2425 78.4062 53.8438 78.0075 53.8438 77.5156V76.6406Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_109" opacity="0.304003" filter="url(#filter108_d_63_37)">\r
                    <path\r
                        d="M1453.91 342.602C1453.91 342.442 1454.04 342.312 1454.2 342.312H1455.98C1456.14 342.312 1456.27 342.442 1456.27 342.602C1456.27 342.761 1456.14 342.891 1455.98 342.891H1454.2C1454.04 342.891 1453.91 342.761 1453.91 342.602Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_110" opacity="0.596684" filter="url(#filter109_d_63_37)">\r
                    <path\r
                        d="M675.812 975.242C675.812 975.126 675.907 975.031 676.023 975.031C676.14 975.031 676.234 975.126 676.234 975.242V976.586C676.234 976.702 676.14 976.797 676.023 976.797C675.907 976.797 675.812 976.702 675.812 976.586V975.242Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_111" opacity="0.689227" filter="url(#filter110_d_63_37)">\r
                    <path\r
                        d="M288.734 887.039C288.734 886.802 288.927 886.609 289.164 886.609H289.242C289.479 886.609 289.672 886.802 289.672 887.039C289.672 887.276 289.479 887.469 289.242 887.469H289.164C288.927 887.469 288.734 887.276 288.734 887.039Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_112" opacity="0.739805" filter="url(#filter111_d_63_37)">\r
                    <path\r
                        d="M674.078 407.898C674.078 407.307 674.557 406.828 675.148 406.828C675.74 406.828 676.219 407.307 676.219 407.898V408.367C676.219 408.958 675.74 409.438 675.148 409.438C674.557 409.438 674.078 408.958 674.078 408.367V407.898Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_113" opacity="0.22472" filter="url(#filter112_d_63_37)">\r
                    <path\r
                        d="M1290.33 578.148C1290.33 578.066 1290.39 578 1290.48 578C1290.56 578 1290.62 578.066 1290.62 578.148V578.586C1290.62 578.668 1290.56 578.734 1290.48 578.734C1290.39 578.734 1290.33 578.668 1290.33 578.586V578.148Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_114" opacity="0.99683" filter="url(#filter113_d_63_37)">\r
                    <path\r
                        d="M135.531 1336.94C135.531 1336.27 136.07 1335.73 136.734 1335.73C137.399 1335.73 137.938 1336.27 137.938 1336.94V1337.16C137.938 1337.82 137.399 1338.36 136.734 1338.36C136.07 1338.36 135.531 1337.82 135.531 1337.16V1336.94Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_115" opacity="0.200193" filter="url(#filter114_d_63_37)">\r
                    <path\r
                        d="M1333.03 156.969C1333.03 156.71 1333.24 156.5 1333.5 156.5C1333.76 156.5 1333.97 156.71 1333.97 156.969V157.188C1333.97 157.446 1333.76 157.656 1333.5 157.656C1333.24 157.656 1333.03 157.446 1333.03 157.188V156.969Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_116" filter="url(#filter115_d_63_37)">\r
                    <path\r
                        d="M1506.28 534.648C1506.28 534.161 1506.68 533.766 1507.16 533.766C1507.65 533.766 1508.05 534.161 1508.05 534.648V535.789C1508.05 536.277 1507.65 536.672 1507.16 536.672C1506.68 536.672 1506.28 536.277 1506.28 535.789V534.648Z"\r
                        fill="white" />\r
                </g>\r
                <g id="Container_117" opacity="0.664274" filter="url(#filter116_d_63_37)">\r
                    <path\r
                        d="M874.562 214.781C874.562 214.678 874.646 214.594 874.75 214.594C874.854 214.594 874.938 214.678 874.938 214.781V215.953C874.938 216.057 874.854 216.141 874.75 216.141C874.646 216.141 874.562 216.057 874.562 215.953V214.781Z"\r
                        fill="white" />\r
                </g>\r
            </g>\r
            <g id="radial-container" opacity="0.2">\r
                <g id="radial" filter="url(#filter117_f_63_37)">\r
                    <path\r
                        d="M926 1090C926 587.973 1332.97 181 1835 181H2266C2768.03 181 3175 587.973 3175 1090C3175 1592.03 2768.03 1999 2266 1999H1835C1332.97 1999 926 1592.03 926 1090Z"\r
                        fill="url(#paint1_radial_63_37)" />\r
                </g>\r
                <g id="radial_2" filter="url(#filter118_f_63_37)">\r
                    <path\r
                        d="M521.893 778.92C521.893 567.232 693.5 395.624 905.189 395.624C1116.88 395.624 1288.48 567.232 1288.48 778.92C1288.48 990.609 1116.88 1162.22 905.189 1162.22C693.5 1162.22 521.893 990.609 521.893 778.92Z"\r
                        fill="url(#paint2_radial_63_37)" />\r
                </g>\r
                <g id="radial_3" filter="url(#filter119_f_63_37)">\r
                    <path\r
                        d="M579.966 945.06C579.966 724.436 758.817 545.585 979.44 545.585C1200.06 545.585 1378.92 724.436 1378.92 945.06C1378.92 1165.68 1200.06 1344.53 979.44 1344.53C758.817 1344.53 579.966 1165.68 579.966 945.06Z"\r
                        fill="url(#paint3_radial_63_37)" />\r
                </g>\r
            </g>\r
            <g id="Icon">\r
                <g id="galaxie">\r
                    <g id="trait_cercle">\r
                        <g id="trait_niveau_1">\r
                            <path id="Vector" opacity="0.25"\r
                                d="M1196.89 1385.58C1401.77 1385.58 1567.85 1219.49 1567.85 1014.61C1567.85 809.732 1401.77 643.644 1196.89 643.644C992.007 643.644 825.919 809.732 825.919 1014.61C825.919 1219.49 992.007 1385.58 1196.89 1385.58Z"\r
                                stroke="#FFD700" stroke-width="2" stroke-dasharray="12 12" />\r
                            <path id="Vector_2" opacity="0.1"\r
                                d="M1196.89 1385.58C1401.77 1385.58 1567.85 1219.49 1567.85 1014.61C1567.85 809.732 1401.77 643.644 1196.89 643.644C992.007 643.644 825.919 809.732 825.919 1014.61C825.919 1219.49 992.007 1385.58 1196.89 1385.58Z"\r
                                stroke="#FFD700" stroke-width="4" />\r
                            <path id="Vector_3" opacity="0.6"\r
                                d="M1566.95 1043.89C1568.77 1043.89 1570.26 1042.41 1570.26 1040.58C1570.26 1038.75 1568.77 1037.27 1566.95 1037.27C1565.12 1037.27 1563.63 1038.75 1563.63 1040.58C1563.63 1042.41 1565.12 1043.89 1566.95 1043.89Z"\r
                                fill="#FFD700" />\r
                            <path id="Vector_4" opacity="0.6"\r
                                d="M1481.01 1256.45C1482.84 1256.45 1484.32 1254.96 1484.32 1253.13C1484.32 1251.31 1482.84 1249.82 1481.01 1249.82C1479.18 1249.82 1477.69 1251.31 1477.69 1253.13C1477.69 1254.96 1479.18 1256.45 1481.01 1256.45Z"\r
                                fill="#FFD700" />\r
                            <path id="Vector_5" opacity="0.6"\r
                                d="M1286.54 1377.89C1288.37 1377.89 1289.86 1376.41 1289.86 1374.58C1289.86 1372.75 1288.37 1371.27 1286.54 1371.27C1284.71 1371.27 1283.23 1372.75 1283.23 1374.58C1283.23 1376.41 1284.71 1377.89 1286.54 1377.89Z"\r
                                fill="#FFD700" />\r
                            <path id="Vector_6" opacity="0.6"\r
                                d="M1057.83 1361.84C1059.66 1361.84 1061.15 1360.36 1061.15 1358.53C1061.15 1356.7 1059.66 1355.22 1057.83 1355.22C1056.01 1355.22 1054.52 1356.7 1054.52 1358.53C1054.52 1360.36 1056.01 1361.84 1057.83 1361.84Z"\r
                                fill="#FFD700" />\r
                            <path id="Vector_7" opacity="0.6"\r
                                d="M882.239 1214.43C884.068 1214.43 885.551 1212.95 885.551 1211.12C885.551 1209.29 884.068 1207.8 882.239 1207.8C880.41 1207.8 878.927 1209.29 878.927 1211.12C878.927 1212.95 880.41 1214.43 882.239 1214.43Z"\r
                                fill="#FFD700" />\r
                            <path id="Vector_8" opacity="0.6"\r
                                d="M826.828 991.955C828.657 991.955 830.14 990.473 830.14 988.643C830.14 986.814 828.657 985.331 826.828 985.331C824.999 985.331 823.516 986.814 823.516 988.643C823.516 990.473 824.999 991.955 826.828 991.955Z"\r
                                fill="#FFD700" />\r
                            <path id="Vector_9" opacity="0.6"\r
                                d="M912.766 779.4C914.596 779.4 916.079 777.917 916.079 776.088C916.079 774.258 914.596 772.775 912.766 772.775C910.937 772.775 909.454 774.258 909.454 776.088C909.454 777.917 910.937 779.4 912.766 779.4Z"\r
                                fill="#FFD700" />\r
                            <path id="Vector_10" opacity="0.6"\r
                                d="M1107.23 657.953C1109.06 657.953 1110.54 656.47 1110.54 654.64C1110.54 652.811 1109.06 651.328 1107.23 651.328C1105.4 651.328 1103.92 652.811 1103.92 654.64C1103.92 656.47 1105.4 657.953 1107.23 657.953Z"\r
                                fill="#FFD700" />\r
                            <path id="Vector_11" opacity="0.6"\r
                                d="M1335.94 674.003C1337.77 674.003 1339.25 672.52 1339.25 670.691C1339.25 668.862 1337.77 667.379 1335.94 667.379C1334.11 667.379 1332.63 668.862 1332.63 670.691C1332.63 672.52 1334.11 674.003 1335.94 674.003Z"\r
                                fill="#FFD700" />\r
                            <path id="Vector_12" opacity="0.6"\r
                                d="M1511.53 821.417C1513.36 821.417 1514.85 819.934 1514.85 818.105C1514.85 816.276 1513.36 814.793 1511.53 814.793C1509.7 814.793 1508.22 816.276 1508.22 818.105C1508.22 819.934 1509.7 821.417 1511.53 821.417Z"\r
                                fill="#FFD700" />\r
                        </g>\r
                        <g id="trait_niveau_2">\r
                            <path id="Vector_13" opacity="0.25"\r
                                d="M1188.92 1575.4C1501.88 1575.4 1755.58 1321.7 1755.58 1008.74C1755.58 695.787 1501.88 442.086 1188.92 442.086C875.967 442.086 622.267 695.787 622.267 1008.74C622.267 1321.7 875.967 1575.4 1188.92 1575.4Z"\r
                                stroke="#00FFFF" stroke-width="2" stroke-dasharray="12 12" />\r
                            <path id="Vector_14" opacity="0.1"\r
                                d="M1188.92 1575.4C1501.88 1575.4 1755.58 1321.7 1755.58 1008.74C1755.58 695.787 1501.88 442.086 1188.92 442.086C875.967 442.086 622.267 695.787 622.267 1008.74C622.267 1321.7 875.967 1575.4 1188.92 1575.4Z"\r
                                stroke="#00FFFF" stroke-width="4" />\r
                            <path id="Vector_15" opacity="0.6"\r
                                d="M1754.96 1038.74C1756.92 1038.74 1758.5 1037.15 1758.5 1035.2C1758.5 1033.24 1756.92 1031.66 1754.96 1031.66C1753.01 1031.66 1751.42 1033.24 1751.42 1035.2C1751.42 1037.15 1753.01 1038.74 1754.96 1038.74Z"\r
                                fill="#00FFFF" />\r
                            <path id="Vector_16" opacity="0.6"\r
                                d="M1631.31 1366.4C1633.26 1366.4 1634.85 1364.81 1634.85 1362.86C1634.85 1360.9 1633.26 1359.31 1631.31 1359.31C1629.35 1359.31 1627.77 1360.9 1627.77 1362.86C1627.77 1364.81 1629.35 1366.4 1631.31 1366.4Z"\r
                                fill="#00FFFF" />\r
                            <path id="Vector_17" opacity="0.6"\r
                                d="M1338.68 1558.79C1340.63 1558.79 1342.22 1557.21 1342.22 1555.25C1342.22 1553.3 1340.63 1551.71 1338.68 1551.71C1336.72 1551.71 1335.13 1553.3 1335.13 1555.25C1335.13 1557.21 1336.72 1558.79 1338.68 1558.79Z"\r
                                fill="#00FFFF" />\r
                            <path id="Vector_18" opacity="0.6"\r
                                d="M988.846 1542.44C990.802 1542.44 992.388 1540.86 992.388 1538.9C992.388 1536.95 990.802 1535.36 988.846 1535.36C986.89 1535.36 985.305 1536.95 985.305 1538.9C985.305 1540.86 986.89 1542.44 988.846 1542.44Z"\r
                                fill="#00FFFF" />\r
                            <path id="Vector_19" opacity="0.6"\r
                                d="M715.438 1323.59C717.394 1323.59 718.98 1322.01 718.98 1320.05C718.98 1318.09 717.394 1316.51 715.438 1316.51C713.482 1316.51 711.896 1318.09 711.896 1320.05C711.896 1322.01 713.482 1323.59 715.438 1323.59Z"\r
                                fill="#00FFFF" />\r
                            <path id="Vector_20" opacity="0.6"\r
                                d="M622.884 985.829C624.84 985.829 626.426 984.244 626.426 982.288C626.426 980.332 624.84 978.746 622.884 978.746C620.928 978.746 619.343 980.332 619.343 982.288C619.343 984.244 620.928 985.829 622.884 985.829Z"\r
                                fill="#00FFFF" />\r
                            <path id="Vector_21" opacity="0.6"\r
                                d="M746.539 658.173C748.495 658.173 750.08 656.587 750.08 654.631C750.08 652.675 748.495 651.09 746.539 651.09C744.583 651.09 742.997 652.675 742.997 654.631C742.997 656.587 744.583 658.173 746.539 658.173Z"\r
                                fill="#00FFFF" />\r
                            <path id="Vector_22" opacity="0.6"\r
                                d="M1039.17 465.776C1041.12 465.776 1042.71 464.19 1042.71 462.234C1042.71 460.278 1041.12 458.692 1039.17 458.692C1037.21 458.692 1035.63 460.278 1035.63 462.234C1035.63 464.19 1037.21 465.776 1039.17 465.776Z"\r
                                fill="#00FFFF" />\r
                            <path id="Vector_23" opacity="0.6"\r
                                d="M1389 482.126C1390.96 482.126 1392.54 480.541 1392.54 478.585C1392.54 476.629 1390.96 475.043 1389 475.043C1387.04 475.043 1385.46 476.629 1385.46 478.585C1385.46 480.541 1387.04 482.126 1389 482.126Z"\r
                                fill="#00FFFF" />\r
                            <path id="Vector_24" opacity="0.6"\r
                                d="M1662.41 700.979C1664.36 700.979 1665.95 699.393 1665.95 697.437C1665.95 695.481 1664.36 693.896 1662.41 693.896C1660.45 693.896 1658.87 695.481 1658.87 697.437C1658.87 699.393 1660.45 700.979 1662.41 700.979Z"\r
                                fill="#00FFFF" />\r
                        </g>\r
                        <g id="trait_niveau_3">\r
                            <path id="Vector_25" opacity="0.25"\r
                                d="M1193.52 1779.8C1618.28 1779.8 1962.62 1435.46 1962.62 1010.69C1962.62 585.927 1618.28 241.587 1193.52 241.587C768.752 241.587 424.412 585.927 424.412 1010.69C424.412 1435.46 768.752 1779.8 1193.52 1779.8Z"\r
                                stroke="#FF00FF" stroke-width="2" stroke-dasharray="12 12" />\r
                            <path id="Vector_26" opacity="0.1"\r
                                d="M1193.52 1779.8C1618.28 1779.8 1962.62 1435.46 1962.62 1010.69C1962.62 585.927 1618.28 241.587 1193.52 241.587C768.752 241.587 424.412 585.927 424.412 1010.69C424.412 1435.46 768.752 1779.8 1193.52 1779.8Z"\r
                                stroke="#FF00FF" stroke-width="4" />\r
                            <path id="Vector_27" opacity="0.6"\r
                                d="M1962.15 1041.32C1964.19 1041.32 1965.85 1039.67 1965.85 1037.63C1965.85 1035.58 1964.19 1033.93 1962.15 1033.93C1960.11 1033.93 1958.45 1035.58 1958.45 1037.63C1958.45 1039.67 1960.11 1041.32 1962.15 1041.32Z"\r
                                fill="#FF00FF" />\r
                            <path id="Vector_28" opacity="0.6"\r
                                d="M1799.52 1487.97C1801.56 1487.97 1803.22 1486.32 1803.22 1484.27C1803.22 1482.23 1801.56 1480.58 1799.52 1480.58C1797.48 1480.58 1795.83 1482.23 1795.83 1484.27C1795.83 1486.32 1797.48 1487.97 1799.52 1487.97Z"\r
                                fill="#FF00FF" />\r
                            <path id="Vector_29" opacity="0.6"\r
                                d="M1405.42 1753.73C1407.46 1753.73 1409.12 1752.07 1409.12 1750.03C1409.12 1747.99 1407.46 1746.33 1405.42 1746.33C1403.38 1746.33 1401.72 1747.99 1401.72 1750.03C1401.72 1752.07 1403.38 1753.73 1405.42 1753.73Z"\r
                                fill="#FF00FF" />\r
                            <path id="Vector_30" opacity="0.6"\r
                                d="M930.379 1737.08C932.421 1737.08 934.077 1735.42 934.077 1733.38C934.077 1731.34 932.421 1729.68 930.379 1729.68C928.337 1729.68 926.682 1731.34 926.682 1733.38C926.682 1735.42 928.337 1737.08 930.379 1737.08Z"\r
                                fill="#FF00FF" />\r
                            <path id="Vector_31" opacity="0.6"\r
                                d="M555.848 1444.39C557.89 1444.39 559.546 1442.73 559.546 1440.69C559.546 1438.65 557.89 1436.99 555.848 1436.99C553.806 1436.99 552.15 1438.65 552.15 1440.69C552.15 1442.73 553.806 1444.39 555.848 1444.39Z"\r
                                fill="#FF00FF" />\r
                            <path id="Vector_32" opacity="0.6"\r
                                d="M424.884 987.454C426.926 987.454 428.582 985.798 428.582 983.756C428.582 981.714 426.926 980.059 424.884 980.059C422.842 980.059 421.187 981.714 421.187 983.756C421.187 985.798 422.842 987.454 424.884 987.454Z"\r
                                fill="#FF00FF" />\r
                            <path id="Vector_33" opacity="0.6"\r
                                d="M587.512 540.806C589.554 540.806 591.21 539.151 591.21 537.109C591.21 535.067 589.554 533.411 587.512 533.411C585.47 533.411 583.814 535.067 583.814 537.109C583.814 539.151 585.47 540.806 587.512 540.806Z"\r
                                fill="#FF00FF" />\r
                            <path id="Vector_34" opacity="0.6"\r
                                d="M981.614 275.051C983.656 275.051 985.311 273.395 985.311 271.353C985.311 269.311 983.656 267.655 981.614 267.655C979.571 267.655 977.916 269.311 977.916 271.353C977.916 273.395 979.571 275.051 981.614 275.051Z"\r
                                fill="#FF00FF" />\r
                            <path id="Vector_35" opacity="0.6"\r
                                d="M1456.65 291.698C1458.7 291.698 1460.35 290.042 1460.35 288C1460.35 285.958 1458.7 284.303 1456.65 284.303C1454.61 284.303 1452.96 285.958 1452.96 288C1452.96 290.042 1454.61 291.698 1456.65 291.698Z"\r
                                fill="#FF00FF" />\r
                            <path id="Vector_36" opacity="0.6"\r
                                d="M1831.19 584.389C1833.23 584.389 1834.88 582.734 1834.88 580.692C1834.88 578.65 1833.23 576.994 1831.19 576.994C1829.14 576.994 1827.49 578.65 1827.49 580.692C1827.49 582.734 1829.14 584.389 1831.19 584.389Z"\r
                                fill="#FF00FF" />\r
                        </g>\r
                    </g>\r
                    <g id="trait_transversaux">\r
                        <g id="trait_comprendre">\r
                            <path id="Vector_37" opacity="0.08" d="M1205.38 999.757V212.113" stroke="#00D9FF"\r
                                stroke-width="4" />\r
                            <path id="Vector_38" opacity="0.3" d="M1205.38 999.757V198.797" stroke="#00D9FF"\r
                                stroke-width="1.5" stroke-dasharray="8 8" />\r
                        </g>\r
                        <g id="trait_concevoir">\r
                            <path id="Vector_39" opacity="0.08" d="M1203 1005L1773.63 819.59" stroke="#B84EFF"\r
                                stroke-width="4" />\r
                            <path id="Vector_40" opacity="0.3" d="M1193.52 1007.81L2037.51 733.58" stroke="#B84EFF"\r
                                stroke-width="1.5" stroke-dasharray="8 8" />\r
                        </g>\r
                        <g id="trait_exprimer">\r
                            <path id="Vector_41" opacity="0.08" d="M1190.84 1016.6L1588.19 1563.5" stroke="#FF2E97"\r
                                stroke-width="4" />\r
                            <path id="Vector_42" opacity="0.3" d="M1190.16 1015.49L1711.77 1733.44" stroke="#FF2E97"\r
                                stroke-width="1.5" stroke-dasharray="8 8" />\r
                        </g>\r
                        <g id="trait_developper">\r
                            <path id="Vector_43" opacity="0.08" d="M1190.84 1016.6L649 1749" stroke="#00FF9F"\r
                                stroke-width="4" />\r
                            <path id="Vector_44" opacity="0.3" d="M1193.52 1010.69L649 1748.5" stroke="#00FF9F"\r
                                stroke-width="1.5" stroke-dasharray="8 8" />\r
                        </g>\r
                        <g id="trait_entreprendre">\r
                            <path id="Vector_45" opacity="0.08" d="M1125.95 989.175L329.928 727.626" stroke="#FFB84E"\r
                                stroke-width="4" />\r
                            <path id="Vector_46" opacity="0.3" d="M1193.52 1010.69L339.878 731.891" stroke="#FFB84E"\r
                                stroke-width="1.5" stroke-dasharray="8 8" />\r
                        </g>\r
                    </g>\r
                    <g id="etiquette_competence">\r
                        <g id="etiquette_comprendre">\r
                            <circle id="etiquette_comprendre-circle" cx="1198.5" cy="141.5" r="76.5" stroke="#00D9FF" />\r
                            <text id="etiquette_comprendre-txt" fill="#00D9FF" xml:space="preserve"\r
                                style="white-space: pre" font-family="Inter" font-size="16" font-weight="bold"\r
                                letter-spacing="0em">\r
                                <tspan x="1141.23" y="147.318">COMPRENDRE</tspan>\r
                            </text>\r
                        </g>\r
                        <g id="etiquette_concevoir">\r
                            <circle id="etiquette_concevoir-circle" cx="2107.5" cy="727.5" r="76" stroke="#B84EFF" />\r
                            <text id="etiquette_concevoir-txt" fill="#B84EFF" xml:space="preserve"\r
                                style="white-space: pre" font-family="Inter" font-size="16" font-weight="bold"\r
                                letter-spacing="0em">\r
                                <tspan x="2059.02" y="733.318">CONCEVOIR</tspan>\r
                            </text>\r
                        </g>\r
                        <g id="etiquette_exprimer">\r
                            <circle id="etiquette_exprimer-circle" cx="1741.5" cy="1792.5" r="76" stroke="#EC4899" />\r
                            <text id="etiquette_exprimer-txt" fill="#FF2E97" xml:space="preserve"\r
                                style="white-space: pre" font-family="Inter" font-size="16" font-weight="bold"\r
                                letter-spacing="0em">\r
                                <tspan x="1700.24" y="1798.32">EXPRIMER</tspan>\r
                            </text>\r
                        </g>\r
                        <g id="etiquette_developper">\r
                            <g id="etiquette_developper-circle">\r
                                <mask id="path-173-inside-1_63_37" fill="white">\r
                                    <path\r
                                        d="M684 1813.5C684 1855.75 649.75 1890 607.5 1890C565.25 1890 531 1855.75 531 1813.5C531 1771.25 565.25 1737 607.5 1737C649.75 1737 684 1771.25 684 1813.5Z" />\r
                                </mask>\r
                                <path\r
                                    d="M684 1813.5C684 1855.75 649.75 1890 607.5 1890C565.25 1890 531 1855.75 531 1813.5C531 1771.25 565.25 1737 607.5 1737C649.75 1737 684 1771.25 684 1813.5Z"\r
                                    stroke="#00FF9F" stroke-width="2" mask="url(#path-173-inside-1_63_37)" />\r
                            </g>\r
                            <text id="etiquette_developper-txt" fill="#00FF9F" xml:space="preserve"\r
                                style="white-space: pre" font-family="Inter" font-size="16" font-weight="bold"\r
                                letter-spacing="0em">\r
                                <tspan x="554.32" y="1819.32">D&#xc9;VELOPPER</tspan>\r
                            </text>\r
                        </g>\r
                        <g id="etiquette_entreprendre">\r
                            <circle id="etiquette_entreprendre-circle" cx="262.5" cy="717.5" r="76.5"\r
                                stroke="#FFD700" />\r
                            <text id="etiquette_entreprendre-txt" fill="#FFB84E" xml:space="preserve"\r
                                style="white-space: pre" font-family="Inter" font-size="16" font-weight="bold"\r
                                letter-spacing="0em">\r
                                <tspan x="199.047" y="723.318">ENTREPRENDRE</tspan>\r
                            </text>\r
                        </g>\r
                    </g>\r
                    <g id="soleil">\r
                        <path id="rond"\r
                            d="M1203 1104.02C1254.54 1104.02 1296.33 1062.24 1296.33 1010.69C1296.33 959.149 1254.54 917.365 1203 917.365C1151.46 917.365 1109.67 959.149 1109.67 1010.69C1109.67 1062.24 1151.46 1104.02 1203 1104.02Z"\r
                            fill="url(#paint4_radial_63_37)" />\r
                        <path id="rond_2" opacity="0.4"\r
                            d="M1243.45 1037.4C1246.93 1037.4 1249.76 1034.58 1249.76 1031.09C1249.76 1027.6 1246.93 1024.77 1243.45 1024.77C1239.96 1024.77 1237.13 1027.6 1237.13 1031.09C1237.13 1034.58 1239.96 1037.4 1243.45 1037.4Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_3" opacity="0.4"\r
                            d="M1236.9 1073.27C1242.89 1073.27 1247.75 1068.41 1247.75 1062.42C1247.75 1056.42 1242.89 1051.56 1236.9 1051.56C1230.91 1051.56 1226.05 1056.42 1226.05 1062.42C1226.05 1068.41 1230.91 1073.27 1236.9 1073.27Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_4" opacity="0.4"\r
                            d="M1205.99 1081.88C1216.09 1081.88 1224.28 1073.7 1224.28 1063.6C1224.28 1053.5 1216.09 1045.31 1205.99 1045.31C1195.9 1045.31 1187.71 1053.5 1187.71 1063.6C1187.71 1073.7 1195.9 1081.88 1205.99 1081.88Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_5" opacity="0.4"\r
                            d="M1190.9 1056.47C1202.92 1056.47 1212.67 1046.72 1212.67 1034.69C1212.67 1022.67 1202.92 1012.92 1190.9 1012.92C1178.87 1012.92 1169.12 1022.67 1169.12 1034.69C1169.12 1046.72 1178.87 1056.47 1190.9 1056.47Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_6" opacity="0.4"\r
                            d="M1196.71 1032.93C1206.72 1032.93 1214.83 1024.82 1214.83 1014.81C1214.83 1004.81 1206.72 996.696 1196.71 996.696C1186.71 996.696 1178.59 1004.81 1178.59 1014.81C1178.59 1024.82 1186.71 1032.93 1196.71 1032.93Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_7" opacity="0.4"\r
                            d="M1190.31 1022.08C1196.21 1022.08 1200.99 1017.3 1200.99 1011.41C1200.99 1005.52 1196.21 1000.74 1190.31 1000.74C1184.42 1000.74 1179.64 1005.52 1179.64 1011.41C1179.64 1017.3 1184.42 1022.08 1190.31 1022.08Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_8" opacity="0.4"\r
                            d="M1169.36 1000.02C1172.83 1000.02 1175.65 997.202 1175.65 993.731C1175.65 990.259 1172.83 987.444 1169.36 987.444C1165.89 987.444 1163.08 990.259 1163.08 993.731C1163.08 997.202 1165.89 1000.02 1169.36 1000.02Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_9" opacity="0.4"\r
                            d="M1218.63 1001.18C1230.51 1001.18 1240.13 991.559 1240.13 979.688C1240.13 967.817 1230.51 958.194 1218.63 958.194C1206.76 958.194 1197.14 967.817 1197.14 979.688C1197.14 991.559 1206.76 1001.18 1218.63 1001.18Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_10" opacity="0.4"\r
                            d="M1212.15 1024.49C1223.08 1024.49 1231.94 1015.63 1231.94 1004.7C1231.94 993.764 1223.08 984.901 1212.15 984.901C1201.21 984.901 1192.35 993.764 1192.35 1004.7C1192.35 1015.63 1201.21 1024.49 1212.15 1024.49Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_11" opacity="0.4"\r
                            d="M1211.54 1022.98C1218.59 1022.98 1224.31 1017.26 1224.31 1010.21C1224.31 1003.16 1218.59 997.44 1211.54 997.44C1204.49 997.44 1198.77 1003.16 1198.77 1010.21C1198.77 1017.26 1204.49 1022.98 1211.54 1022.98Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_12" opacity="0.4"\r
                            d="M1199.72 969.038C1208.72 969.038 1216.02 961.74 1216.02 952.737C1216.02 943.735 1208.72 936.437 1199.72 936.437C1190.72 936.437 1183.42 943.735 1183.42 952.737C1183.42 961.74 1190.72 969.038 1199.72 969.038Z"\r
                            fill="#FF6F00" />\r
                        <path id="rond_13" opacity="0.4"\r
                            d="M1170.4 969.948C1175.37 969.948 1179.4 965.922 1179.4 960.956C1179.4 955.99 1175.37 951.965 1170.4 951.965C1165.44 951.965 1161.41 955.99 1161.41 960.956C1161.41 965.922 1165.44 969.948 1170.4 969.948Z"\r
                            fill="#FF6F00" />\r
                    </g>\r
                </g>\r
                <g id="exprimer_but2-container">\r
                    <g id="planete-but2-exprimer">\r
                        <path id="Vector_47" opacity="0.2"\r
                            d="M1528 1505.26C1547.04 1505.26 1562.48 1489.82 1562.48 1470.78C1562.48 1451.74 1547.04 1436.3 1528 1436.3C1508.95 1436.3 1493.52 1451.74 1493.52 1470.78C1493.52 1489.82 1508.95 1505.26 1528 1505.26Z"\r
                            stroke="#00FFFF" stroke-width="3" />\r
                        <path id="planete-but2-exprimer-stroke" opacity="0.9"\r
                            d="M1528 1505.26C1547.04 1505.26 1562.48 1489.82 1562.48 1470.78C1562.48 1451.74 1547.04 1436.3 1528 1436.3C1508.95 1436.3 1493.52 1451.74 1493.52 1470.78C1493.52 1489.82 1508.95 1505.26 1528 1505.26Z"\r
                            stroke="#00FFFF" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but2-exprimer-radial"\r
                            d="M1528 1501.43C1544.92 1501.43 1558.65 1487.71 1558.65 1470.78C1558.65 1453.85 1544.92 1440.13 1528 1440.13C1511.07 1440.13 1497.35 1453.85 1497.35 1470.78C1497.35 1487.71 1511.07 1501.43 1528 1501.43Z"\r
                            fill="url(#paint5_radial_63_37)" fill-opacity="0.6" stroke="#00FFFF" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_48" opacity="0.3"\r
                            d="M1520.33 1470.78C1526.68 1470.78 1531.83 1467.35 1531.83 1463.12C1531.83 1458.88 1526.68 1455.45 1520.33 1455.45C1513.99 1455.45 1508.84 1458.88 1508.84 1463.12C1508.84 1467.35 1513.99 1470.78 1520.33 1470.78Z"\r
                            fill="white" />\r
                        <text id="planete_text" fill="white" xml:space="preserve" style="white-space: pre"\r
                            font-family="Inter" font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="1512.19" y="1476.89">BUT2</tspan>\r
                        </text>\r
                        <path id="Vector_49" opacity="0.3"\r
                            d="M1528 1482.27C1550.21 1482.27 1568.23 1477.13 1568.23 1470.78C1568.23 1464.43 1550.21 1459.29 1528 1459.29C1505.78 1459.29 1487.77 1464.43 1487.77 1470.78C1487.77 1477.13 1505.78 1482.27 1528 1482.27Z"\r
                            stroke="#00FFFF" stroke-width="2" />\r
                        <path id="Vector_50" opacity="0.2"\r
                            d="M1528 1484.19C1553.39 1484.19 1573.97 1478.18 1573.97 1470.78C1573.97 1463.37 1553.39 1457.37 1528 1457.37C1502.61 1457.37 1482.02 1463.37 1482.02 1470.78C1482.02 1478.18 1502.61 1484.19 1528 1484.19Z"\r
                            stroke="#FF2E97" />\r
                    </g>\r
                    <g id="bulle_ac23-01-container">\r
                        <path id="trait_bulle" opacity="0.15" d="M1528 1470.41L1598.97 1459.29" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac23-01">\r
                            <circle id="cercle" opacity="0.4" cx="1598.97" cy="1459.29" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon" clip-path="url(#clip1_63_37)">\r
                                <path id="Vector_51"\r
                                    d="M1594.18 1467.27C1593.75 1467.27 1593.35 1467.1 1593.05 1466.8C1592.75 1466.5 1592.58 1466.09 1592.58 1465.67V1452.9C1592.58 1452.48 1592.75 1452.07 1593.05 1451.77C1593.35 1451.47 1593.75 1451.3 1594.18 1451.3H1600.56C1600.81 1451.3 1601.06 1451.35 1601.3 1451.45C1601.53 1451.55 1601.74 1451.69 1601.92 1451.87L1604.79 1454.73C1604.97 1454.91 1605.11 1455.12 1605.2 1455.36C1605.3 1455.59 1605.35 1455.84 1605.35 1456.09V1465.67C1605.35 1466.09 1605.18 1466.5 1604.88 1466.8C1604.58 1467.1 1604.18 1467.27 1603.75 1467.27H1594.18Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_52"\r
                                    d="M1600.56 1451.3V1455.29C1600.56 1455.51 1600.65 1455.71 1600.8 1455.86C1600.95 1456.01 1601.15 1456.09 1601.36 1456.09H1605.35"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_53" d="M1597.37 1456.89H1595.77" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_54" d="M1602.16 1460.08H1595.77" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_55" d="M1602.16 1463.28H1595.77" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac23-02-container">\r
                        <path id="trait_bulle_2" opacity="0.15" d="M1528 1470.78L1573.12 1526.68" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac23-02">\r
                            <circle id="cercle_2" opacity="0.4" cx="1573.42" cy="1526.68" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_2">\r
                                <path id="Vector_56"\r
                                    d="M1579.01 1519.49H1567.84C1566.96 1519.49 1566.24 1520.21 1566.24 1521.09V1532.26C1566.24 1533.15 1566.96 1533.86 1567.84 1533.86H1579.01C1579.89 1533.86 1580.61 1533.15 1580.61 1532.26V1521.09C1580.61 1520.21 1579.89 1519.49 1579.01 1519.49Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_57"\r
                                    d="M1571.03 1525.88C1571.91 1525.88 1572.63 1525.16 1572.63 1524.28C1572.63 1523.4 1571.91 1522.69 1571.03 1522.69C1570.15 1522.69 1569.43 1523.4 1569.43 1524.28C1569.43 1525.16 1570.15 1525.88 1571.03 1525.88Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_58"\r
                                    d="M1580.61 1529.07L1578.15 1526.61C1577.85 1526.31 1577.44 1526.14 1577.02 1526.14C1576.59 1526.14 1576.19 1526.31 1575.89 1526.61L1568.64 1533.86"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac23-03-container">\r
                        <path id="trait_bulle_3" opacity="0.15" d="M1528 1470.78L1502.15 1537.8" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac23-03">\r
                            <circle id="cercle_3" opacity="0.4" cx="1502.03" cy="1538.6" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_3" clip-path="url(#clip2_63_37)">\r
                                <path id="Vector_59"\r
                                    d="M1502.03 1546.58C1499.92 1546.58 1497.89 1545.74 1496.39 1544.24C1494.89 1542.75 1494.05 1540.72 1494.05 1538.6C1494.05 1536.48 1494.89 1534.45 1496.39 1532.96C1497.89 1531.46 1499.92 1530.62 1502.03 1530.62C1504.15 1530.62 1506.18 1531.37 1507.68 1532.72C1509.18 1534.07 1510.02 1535.9 1510.02 1537.8C1510.02 1538.86 1509.6 1539.88 1508.85 1540.62C1508.1 1541.37 1507.08 1541.79 1506.03 1541.79H1504.23C1503.97 1541.79 1503.72 1541.86 1503.5 1542C1503.27 1542.14 1503.1 1542.33 1502.98 1542.56C1502.86 1542.8 1502.81 1543.06 1502.84 1543.31C1502.86 1543.57 1502.96 1543.82 1503.11 1544.03L1503.35 1544.35C1503.51 1544.55 1503.6 1544.8 1503.63 1545.06C1503.65 1545.32 1503.6 1545.58 1503.48 1545.81C1503.37 1546.04 1503.19 1546.24 1502.97 1546.37C1502.75 1546.51 1502.49 1546.58 1502.23 1546.58H1502.03Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_60"\r
                                    d="M1503.23 1534.61C1503.45 1534.61 1503.63 1534.43 1503.63 1534.21C1503.63 1533.99 1503.45 1533.81 1503.23 1533.81C1503.01 1533.81 1502.83 1533.99 1502.83 1534.21C1502.83 1534.43 1503.01 1534.61 1503.23 1534.61Z"\r
                                    fill="#0A0A0A" stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_61"\r
                                    d="M1506.42 1537.8C1506.65 1537.8 1506.82 1537.62 1506.82 1537.4C1506.82 1537.18 1506.65 1537 1506.42 1537C1506.2 1537 1506.03 1537.18 1506.03 1537.4C1506.03 1537.62 1506.2 1537.8 1506.42 1537.8Z"\r
                                    fill="#0A0A0A" stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_62"\r
                                    d="M1497.64 1539.4C1497.87 1539.4 1498.04 1539.22 1498.04 1539C1498.04 1538.78 1497.87 1538.6 1497.64 1538.6C1497.42 1538.6 1497.25 1538.78 1497.25 1539C1497.25 1539.22 1497.42 1539.4 1497.64 1539.4Z"\r
                                    fill="#0A0A0A" stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_63"\r
                                    d="M1499.24 1535.41C1499.46 1535.41 1499.64 1535.23 1499.64 1535.01C1499.64 1534.79 1499.46 1534.61 1499.24 1534.61C1499.02 1534.61 1498.84 1534.79 1498.84 1535.01C1498.84 1535.23 1499.02 1535.41 1499.24 1535.41Z"\r
                                    fill="#0A0A0A" stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac23-04-container">\r
                        <path id="trait_bulle_4" opacity="0.15" d="M1528 1470.78L1457.03 1481.9" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac23-04">\r
                            <circle id="cercle_4" opacity="0.4" cx="1457.03" cy="1482.05" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_4">\r
                                <path id="Vector_64"\r
                                    d="M1465.01 1486.04C1465.01 1486.47 1464.84 1486.87 1464.54 1487.17C1464.24 1487.47 1463.84 1487.64 1463.41 1487.64H1452.9C1452.48 1487.64 1452.07 1487.81 1451.77 1488.11L1450.01 1489.87C1449.94 1489.94 1449.83 1490 1449.72 1490.02C1449.61 1490.04 1449.5 1490.03 1449.4 1489.99C1449.29 1489.95 1449.2 1489.87 1449.14 1489.78C1449.08 1489.69 1449.05 1489.58 1449.05 1489.46V1476.47C1449.05 1476.04 1449.22 1475.64 1449.51 1475.34C1449.81 1475.04 1450.22 1474.87 1450.64 1474.87H1463.41C1463.84 1474.87 1464.24 1475.04 1464.54 1475.34C1464.84 1475.64 1465.01 1476.04 1465.01 1476.47V1486.04Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac23-05-container">\r
                        <path id="trait_bulle_5" opacity="0.15" d="M1528 1470.78L1482.88 1414.88" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac23-05">\r
                            <circle id="cercle_5" opacity="0.4" cx="1482.88" cy="1415.01" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_5">\r
                                <path id="Vector_65"\r
                                    d="M1483.54 1407.17C1483.33 1407.07 1483.11 1407.02 1482.88 1407.02C1482.65 1407.02 1482.42 1407.07 1482.21 1407.17L1475.37 1410.28C1475.23 1410.34 1475.11 1410.45 1475.03 1410.58C1474.94 1410.71 1474.9 1410.86 1474.9 1411.01C1474.9 1411.17 1474.94 1411.32 1475.03 1411.45C1475.11 1411.58 1475.23 1411.68 1475.37 1411.74L1482.22 1414.86C1482.43 1414.96 1482.66 1415.01 1482.89 1415.01C1483.11 1415.01 1483.34 1414.96 1483.55 1414.86L1490.4 1411.75C1490.54 1411.69 1490.66 1411.59 1490.74 1411.46C1490.83 1411.33 1490.87 1411.17 1490.87 1411.02C1490.87 1410.86 1490.83 1410.71 1490.74 1410.58C1490.66 1410.45 1490.54 1410.35 1490.4 1410.29L1483.54 1407.17Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_66"\r
                                    d="M1474.9 1415.01C1474.9 1415.16 1474.94 1415.31 1475.02 1415.44C1475.1 1415.57 1475.22 1415.67 1475.36 1415.73L1482.22 1418.85C1482.43 1418.95 1482.66 1419 1482.88 1419C1483.11 1419 1483.33 1418.95 1483.54 1418.85L1490.39 1415.74C1490.53 1415.68 1490.65 1415.57 1490.73 1415.44C1490.82 1415.31 1490.86 1415.16 1490.86 1415.01"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_67"\r
                                    d="M1474.9 1419C1474.9 1419.15 1474.94 1419.3 1475.02 1419.43C1475.1 1419.56 1475.22 1419.66 1475.36 1419.72L1482.22 1422.85C1482.43 1422.94 1482.66 1422.99 1482.88 1422.99C1483.11 1422.99 1483.33 1422.94 1483.54 1422.85L1490.39 1419.73C1490.53 1419.67 1490.65 1419.57 1490.73 1419.44C1490.82 1419.3 1490.86 1419.15 1490.86 1419"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac23-06-container">\r
                        <path id="trait_bulle_6" opacity="0.15" d="M1528 1470.78L1553.85 1403.75" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac23-06">\r
                            <circle id="cercle_6" opacity="0.4" cx="1553.85" cy="1403.73" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_6">\r
                                <path id="Vector_68"\r
                                    d="M1557.04 1404.53L1561.21 1407.31C1561.27 1407.35 1561.34 1407.37 1561.41 1407.37C1561.48 1407.38 1561.55 1407.36 1561.62 1407.33C1561.68 1407.29 1561.74 1407.24 1561.77 1407.18C1561.81 1407.12 1561.83 1407.05 1561.83 1406.98V1400.43C1561.83 1400.36 1561.81 1400.29 1561.78 1400.23C1561.74 1400.17 1561.69 1400.12 1561.63 1400.09C1561.57 1400.05 1561.5 1400.03 1561.43 1400.03C1561.36 1400.03 1561.29 1400.05 1561.23 1400.09L1557.04 1402.53"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_69"\r
                                    d="M1555.44 1398.94H1547.46C1546.58 1398.94 1545.87 1399.66 1545.87 1400.54V1406.92C1545.87 1407.8 1546.58 1408.52 1547.46 1408.52H1555.44C1556.33 1408.52 1557.04 1407.8 1557.04 1406.92V1400.54C1557.04 1399.66 1556.33 1398.94 1555.44 1398.94Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="exprimer_but3-container">\r
                    <g id="planete-but3-exprimer">\r
                        <path id="Vector_70" opacity="0.2"\r
                            d="M1639.12 1661.69C1658.17 1661.69 1673.61 1646.25 1673.61 1627.21C1673.61 1608.16 1658.17 1592.72 1639.12 1592.72C1620.08 1592.72 1604.64 1608.16 1604.64 1627.21C1604.64 1646.25 1620.08 1661.69 1639.12 1661.69Z"\r
                            stroke="#00FFFF" stroke-width="3" />\r
                        <path id="planete-but3-exprimer-stroke" opacity="0.9"\r
                            d="M1639.12 1661.69C1658.17 1661.69 1673.61 1646.25 1673.61 1627.21C1673.61 1608.16 1658.17 1592.72 1639.12 1592.72C1620.08 1592.72 1604.64 1608.16 1604.64 1627.21C1604.64 1646.25 1620.08 1661.69 1639.12 1661.69Z"\r
                            stroke="#FF00FF" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but3-exprimer-radial"\r
                            d="M1639.13 1657.86C1656.05 1657.86 1669.78 1644.13 1669.78 1627.21C1669.78 1610.28 1656.05 1596.56 1639.13 1596.56C1622.2 1596.56 1608.48 1610.28 1608.48 1627.21C1608.48 1644.13 1622.2 1657.86 1639.13 1657.86Z"\r
                            fill="url(#paint6_radial_63_37)" fill-opacity="0.6" stroke="#FF00FF" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_71" opacity="0.3"\r
                            d="M1631.46 1627.2C1637.81 1627.2 1642.96 1623.77 1642.96 1619.54C1642.96 1615.31 1637.81 1611.88 1631.46 1611.88C1625.11 1611.88 1619.97 1615.31 1619.97 1619.54C1619.97 1623.77 1625.11 1627.2 1631.46 1627.2Z"\r
                            fill="white" />\r
                        <text id="planete_text_2" fill="white" xml:space="preserve" style="white-space: pre"\r
                            font-family="Inter" font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="1623.15" y="1633.32">BUT3</tspan>\r
                        </text>\r
                        <path id="Vector_72" opacity="0.3"\r
                            d="M1639.13 1638.7C1661.34 1638.7 1679.35 1633.55 1679.35 1627.21C1679.35 1620.86 1661.34 1615.71 1639.13 1615.71C1616.91 1615.71 1598.9 1620.86 1598.9 1627.21C1598.9 1633.55 1616.91 1638.7 1639.13 1638.7Z"\r
                            stroke="#FF00FF" stroke-width="2" />\r
                        <path id="Vector_73" opacity="0.2"\r
                            d="M1639.13 1640.61C1664.52 1640.61 1685.1 1634.61 1685.1 1627.21C1685.1 1619.8 1664.52 1613.8 1639.13 1613.8C1613.73 1613.8 1593.15 1619.8 1593.15 1627.21C1593.15 1634.61 1613.73 1640.61 1639.13 1640.61Z"\r
                            stroke="#FF2E97" />\r
                    </g>\r
                    <g id="bulle_ac33-01-container">\r
                        <path id="trait_bulle_7" opacity="0.15" d="M1639.12 1626.84L1710.09 1615.71" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac33-01">\r
                            <circle id="cercle_7" opacity="0.4" cx="1710.16" cy="1616.16" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_7" clip-path="url(#clip3_63_37)">\r
                                <path id="Vector_74"\r
                                    d="M1717.23 1609.73L1716.27 1608.77C1716.19 1608.68 1716.09 1608.62 1715.97 1608.57C1715.86 1608.52 1715.75 1608.5 1715.63 1608.5C1715.51 1608.5 1715.39 1608.52 1715.28 1608.57C1715.16 1608.62 1715.06 1608.68 1714.98 1608.77L1702.77 1620.98C1702.68 1621.06 1702.62 1621.16 1702.57 1621.28C1702.52 1621.39 1702.5 1621.51 1702.5 1621.63C1702.5 1621.75 1702.52 1621.86 1702.57 1621.97C1702.62 1622.09 1702.68 1622.19 1702.77 1622.27L1703.73 1623.23C1703.81 1623.32 1703.91 1623.38 1704.03 1623.43C1704.14 1623.48 1704.25 1623.5 1704.38 1623.5C1704.5 1623.5 1704.61 1623.48 1704.73 1623.43C1704.84 1623.38 1704.94 1623.32 1705.02 1623.23L1717.23 1611.02C1717.32 1610.94 1717.38 1610.84 1717.43 1610.73C1717.48 1610.61 1717.5 1610.5 1717.5 1610.38C1717.5 1610.25 1717.48 1610.14 1717.43 1610.03C1717.38 1609.91 1717.32 1609.81 1717.23 1609.73Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_75" d="M1711.5 1612.25L1713.75 1614.5" stroke="#64748B"\r
                                    stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_76" d="M1704.75 1611.5V1614.5" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_77" d="M1715.25 1617.5V1620.5" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_78" d="M1708.5 1608.5V1610" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_79" d="M1706.25 1613H1703.25" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_80" d="M1716.75 1619H1713.75" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_81" d="M1709.25 1609.25H1707.75" stroke="#64748B"\r
                                    stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac33-02-container">\r
                        <path id="trait_bulle_8" opacity="0.15" d="M1642 1624L1687.12 1679.9" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac33-02">\r
                            <circle id="cercle_8" opacity="0.4" cx="1687.16" cy="1680.16" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_8" clip-path="url(#clip4_63_37)">\r
                                <path id="Vector_82"\r
                                    d="M1687 1689.17C1684.57 1689.17 1682.24 1688.2 1680.52 1686.48C1678.8 1684.76 1677.83 1682.43 1677.83 1680C1677.83 1677.57 1678.8 1675.24 1680.52 1673.52C1682.24 1671.8 1684.57 1670.83 1687 1670.83C1689.43 1670.83 1691.76 1671.7 1693.48 1673.25C1695.2 1674.8 1696.17 1676.89 1696.17 1679.08C1696.17 1680.3 1695.68 1681.46 1694.82 1682.32C1693.96 1683.18 1692.8 1683.67 1691.58 1683.67H1689.52C1689.22 1683.67 1688.93 1683.75 1688.68 1683.91C1688.42 1684.06 1688.22 1684.29 1688.09 1684.55C1687.95 1684.82 1687.9 1685.12 1687.92 1685.41C1687.95 1685.71 1688.06 1685.99 1688.24 1686.23L1688.51 1686.6C1688.69 1686.84 1688.8 1687.12 1688.83 1687.42C1688.85 1687.71 1688.8 1688.01 1688.66 1688.28C1688.53 1688.55 1688.33 1688.77 1688.07 1688.93C1687.82 1689.08 1687.53 1689.17 1687.23 1689.17H1687Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_83"\r
                                    d="M1688.37 1675.42C1688.63 1675.42 1688.83 1675.21 1688.83 1674.96C1688.83 1674.71 1688.63 1674.5 1688.37 1674.5C1688.12 1674.5 1687.92 1674.71 1687.92 1674.96C1687.92 1675.21 1688.12 1675.42 1688.37 1675.42Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_84"\r
                                    d="M1692.04 1679.08C1692.29 1679.08 1692.5 1678.88 1692.5 1678.63C1692.5 1678.37 1692.29 1678.17 1692.04 1678.17C1691.79 1678.17 1691.58 1678.37 1691.58 1678.63C1691.58 1678.88 1691.79 1679.08 1692.04 1679.08Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_85"\r
                                    d="M1681.96 1680.92C1682.21 1680.92 1682.42 1680.71 1682.42 1680.46C1682.42 1680.21 1682.21 1680 1681.96 1680C1681.71 1680 1681.5 1680.21 1681.5 1680.46C1681.5 1680.71 1681.71 1680.92 1681.96 1680.92Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_86"\r
                                    d="M1683.79 1676.33C1684.04 1676.33 1684.25 1676.13 1684.25 1675.88C1684.25 1675.62 1684.04 1675.42 1683.79 1675.42C1683.54 1675.42 1683.33 1675.62 1683.33 1675.88C1683.33 1676.13 1683.54 1676.33 1683.79 1676.33Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac33-03-container">\r
                        <path id="trait_bulle_9" opacity="0.15" d="M1600 1686.79L1638.16 1625.93" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac33-03">\r
                            <circle id="cercle_9" opacity="0.4" cx="1599.16" cy="1689.16" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_9">\r
                                <g id="Frame">\r
                                    <path id="Vector_87"\r
                                        d="M1596.75 1682.25H1593.75C1592.92 1682.25 1592.25 1682.92 1592.25 1683.75V1686.75C1592.25 1687.58 1592.92 1688.25 1593.75 1688.25H1596.75C1597.58 1688.25 1598.25 1687.58 1598.25 1686.75V1683.75C1598.25 1682.92 1597.58 1682.25 1596.75 1682.25Z"\r
                                        stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                        stroke-linejoin="round" />\r
                                    <path id="Vector_88"\r
                                        d="M1595.25 1688.25V1691.25C1595.25 1691.65 1595.41 1692.03 1595.69 1692.31C1595.97 1692.59 1596.35 1692.75 1596.75 1692.75H1599.75"\r
                                        stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                        stroke-linejoin="round" />\r
                                    <path id="Vector_89"\r
                                        d="M1604.25 1689.75H1601.25C1600.42 1689.75 1599.75 1690.42 1599.75 1691.25V1694.25C1599.75 1695.08 1600.42 1695.75 1601.25 1695.75H1604.25C1605.08 1695.75 1605.75 1695.08 1605.75 1694.25V1691.25C1605.75 1690.42 1605.08 1689.75 1604.25 1689.75Z"\r
                                        stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                        stroke-linejoin="round" />\r
                                </g>\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac33-04-container">\r
                        <path id="trait_bulle_10" opacity="0.15" d="M1643.28 1634.22L1575 1611.91" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac33-04">\r
                            <circle id="cercle_10" opacity="0.4" cx="1567.16" cy="1608.16" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_10" clip-path="url(#clip5_63_37)">\r
                                <path id="Vector_90" d="M1567 1614V1615.5" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_91" d="M1567 1600.5V1602" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_92" d="M1570.75 1614V1615.5" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_93" d="M1570.75 1600.5V1602" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_94" d="M1559.5 1608H1561" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_95" d="M1559.5 1611.75H1561" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_96" d="M1559.5 1604.25H1561" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_97" d="M1573 1608H1574.5" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_98" d="M1573 1611.75H1574.5" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_99" d="M1573 1604.25H1574.5" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_100" d="M1563.25 1614V1615.5" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_101" d="M1563.25 1600.5V1602" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_102"\r
                                    d="M1571.5 1602H1562.5C1561.67 1602 1561 1602.67 1561 1603.5V1612.5C1561 1613.33 1561.67 1614 1562.5 1614H1571.5C1572.33 1614 1573 1613.33 1573 1612.5V1603.5C1573 1602.67 1572.33 1602 1571.5 1602Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_103"\r
                                    d="M1569.25 1605H1564.75C1564.34 1605 1564 1605.34 1564 1605.75V1610.25C1564 1610.66 1564.34 1611 1564.75 1611H1569.25C1569.66 1611 1570 1610.66 1570 1610.25V1605.75C1570 1605.34 1569.66 1605 1569.25 1605Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac33-05-container">\r
                        <path id="trait_bulle_11" opacity="0.15" d="M1642.97 1562L1635.34 1633.43" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac33-05">\r
                            <circle id="cercle_11" opacity="0.4" cx="1644.16" cy="1562.16" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                        </g>\r
                        <g id="icon_11" clip-path="url(#clip6_63_37)">\r
                            <path id="Vector_104"\r
                                d="M1645.5 1556C1645.77 1556 1646.03 1556.07 1646.27 1556.21C1646.5 1556.35 1646.69 1556.55 1646.82 1556.79L1647.18 1557.46C1647.31 1557.7 1647.5 1557.9 1647.73 1558.04C1647.97 1558.18 1648.23 1558.25 1648.5 1558.25H1650C1650.4 1558.25 1650.78 1558.41 1651.06 1558.69C1651.34 1558.97 1651.5 1559.35 1651.5 1559.75V1566.5C1651.5 1566.9 1651.34 1567.28 1651.06 1567.56C1650.78 1567.84 1650.4 1568 1650 1568H1638C1637.6 1568 1637.22 1567.84 1636.94 1567.56C1636.66 1567.28 1636.5 1566.9 1636.5 1566.5V1559.75C1636.5 1559.35 1636.66 1558.97 1636.94 1558.69C1637.22 1558.41 1637.6 1558.25 1638 1558.25H1639.5C1639.77 1558.25 1640.03 1558.18 1640.27 1558.04C1640.5 1557.9 1640.69 1557.7 1640.82 1557.46L1641.18 1556.79C1641.31 1556.55 1641.5 1556.35 1641.73 1556.21C1641.97 1556.07 1642.23 1556 1642.5 1556H1645.5Z"\r
                                stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                stroke-linejoin="round" />\r
                            <path id="Vector_105"\r
                                d="M1644 1565C1645.24 1565 1646.25 1563.99 1646.25 1562.75C1646.25 1561.51 1645.24 1560.5 1644 1560.5C1642.76 1560.5 1641.75 1561.51 1641.75 1562.75C1641.75 1563.99 1642.76 1565 1644 1565Z"\r
                                stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                stroke-linejoin="round" />\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="exprimer_but1-container">\r
                    <g id="planete-but1-exprimer">\r
                        <path id="Vector_106" opacity="0.2"\r
                            d="M1414.37 1333.82C1432.18 1333.82 1446.62 1319.38 1446.62 1301.57C1446.62 1283.76 1432.18 1269.32 1414.37 1269.32C1396.56 1269.32 1382.12 1283.76 1382.12 1301.57C1382.12 1319.38 1396.56 1333.82 1414.37 1333.82Z"\r
                            stroke="#FFD700" stroke-width="3" />\r
                        <path id="planete-but1-exprimer-stroke" opacity="0.9"\r
                            d="M1414.37 1333.82C1432.18 1333.82 1446.62 1319.38 1446.62 1301.57C1446.62 1283.76 1432.18 1269.32 1414.37 1269.32C1396.56 1269.32 1382.12 1283.76 1382.12 1301.57C1382.12 1319.38 1396.56 1333.82 1414.37 1333.82Z"\r
                            stroke="#FFD700" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but1-exprimer-radial"\r
                            d="M1414.37 1330.23C1430.2 1330.23 1443.04 1317.4 1443.04 1301.57C1443.04 1285.74 1430.2 1272.9 1414.37 1272.9C1398.54 1272.9 1385.71 1285.74 1385.71 1301.57C1385.71 1317.4 1398.54 1330.23 1414.37 1330.23Z"\r
                            fill="url(#paint7_radial_63_37)" fill-opacity="0.6" stroke="#FFD700" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_107" opacity="0.3"\r
                            d="M1407.21 1301.57C1413.14 1301.57 1417.96 1298.36 1417.96 1294.4C1417.96 1290.44 1413.14 1287.24 1407.21 1287.24C1401.27 1287.24 1396.46 1290.44 1396.46 1294.4C1396.46 1298.36 1401.27 1301.57 1407.21 1301.57Z"\r
                            fill="white" />\r
                        <text id="planete_text_3" fill="white" xml:space="preserve" style="white-space: pre"\r
                            font-family="Inter" font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="1399.56" y="1308.06">BUT1</tspan>\r
                        </text>\r
                        <path id="Vector_108" opacity="0.3"\r
                            d="M1414.37 1312.32C1435.15 1312.32 1451.99 1307.51 1451.99 1301.57C1451.99 1295.63 1435.15 1290.82 1414.37 1290.82C1393.59 1290.82 1376.75 1295.63 1376.75 1301.57C1376.75 1307.51 1393.59 1312.32 1414.37 1312.32Z"\r
                            stroke="#FFD700" stroke-width="2" />\r
                        <path id="Vector_109" opacity="0.2"\r
                            d="M1414.37 1314.11C1438.12 1314.11 1457.37 1308.49 1457.37 1301.57C1457.37 1294.64 1438.12 1289.03 1414.37 1289.03C1390.63 1289.03 1371.38 1294.64 1371.38 1301.57C1371.38 1308.49 1390.63 1314.11 1414.37 1314.11Z"\r
                            stroke="#FF2E97" />\r
                    </g>\r
                    <g id="bulle_ac13-01-container">\r
                        <path id="trait_bulle_12" opacity="0.15" d="M1414.37 1301.57L1480.74 1291.16" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac13-01">\r
                            <circle id="cercle_12" opacity="0.4" cx="1481.05" cy="1291.16" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_12" clip-path="url(#clip7_63_37)">\r
                                <path id="Vector_110"\r
                                    d="M1483.82 1298.1C1483.68 1298.24 1483.49 1298.32 1483.29 1298.32C1483.09 1298.32 1482.9 1298.24 1482.76 1298.1L1481.58 1296.92C1481.44 1296.78 1481.36 1296.59 1481.36 1296.39C1481.36 1296.19 1481.44 1296 1481.58 1295.86L1485.75 1291.69C1485.89 1291.55 1486.08 1291.47 1486.28 1291.47C1486.48 1291.47 1486.67 1291.55 1486.81 1291.69L1487.99 1292.88C1488.13 1293.02 1488.21 1293.2 1488.21 1293.4C1488.21 1293.6 1488.13 1293.79 1487.99 1293.93L1483.82 1298.1Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_111"\r
                                    d="M1485.53 1291.91L1484.51 1286.78C1484.48 1286.64 1484.41 1286.51 1484.31 1286.41C1484.21 1286.31 1484.09 1286.23 1483.95 1286.2L1474.51 1283.72C1474.39 1283.69 1474.26 1283.69 1474.13 1283.73C1474.01 1283.76 1473.9 1283.83 1473.81 1283.92C1473.72 1284.01 1473.65 1284.12 1473.62 1284.24C1473.58 1284.37 1473.58 1284.5 1473.61 1284.62L1476.09 1294.06C1476.12 1294.2 1476.19 1294.32 1476.3 1294.42C1476.4 1294.52 1476.53 1294.59 1476.67 1294.62L1481.8 1295.64"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_112" d="M1473.81 1283.92L1479.25 1289.36" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_113"\r
                                    d="M1480.31 1291.91C1481.13 1291.91 1481.8 1291.24 1481.8 1290.42C1481.8 1289.59 1481.13 1288.92 1480.31 1288.92C1479.48 1288.92 1478.81 1289.59 1478.81 1290.42C1478.81 1291.24 1479.48 1291.91 1480.31 1291.91Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac13-02-container">\r
                        <path id="trait_bulle_13" opacity="0.15" d="M1414.37 1301.57L1456.57 1353.85" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac13-02">\r
                            <circle id="cercle_13" opacity="0.4" cx="1456.57" cy="1354.22" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_13" clip-path="url(#clip8_63_37)">\r
                                <path id="Vector_114"\r
                                    d="M1456.57 1361.69C1454.59 1361.69 1452.69 1360.9 1451.29 1359.5C1449.89 1358.1 1449.1 1356.2 1449.1 1354.22C1449.1 1352.24 1449.89 1350.34 1451.29 1348.94C1452.69 1347.54 1454.59 1346.76 1456.57 1346.76C1458.55 1346.76 1460.45 1347.46 1461.85 1348.72C1463.25 1349.98 1464.03 1351.69 1464.03 1353.47C1464.03 1354.46 1463.64 1355.41 1462.94 1356.11C1462.24 1356.81 1461.29 1357.21 1460.3 1357.21H1458.62C1458.38 1357.21 1458.14 1357.27 1457.93 1357.4C1457.73 1357.53 1457.56 1357.71 1457.45 1357.93C1457.34 1358.15 1457.3 1358.39 1457.32 1358.63C1457.34 1358.87 1457.43 1359.1 1457.58 1359.3L1457.8 1359.6C1457.94 1359.79 1458.03 1360.02 1458.05 1360.26C1458.08 1360.5 1458.03 1360.75 1457.92 1360.96C1457.81 1361.18 1457.65 1361.36 1457.44 1361.49C1457.23 1361.62 1457 1361.69 1456.75 1361.69H1456.57Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_115"\r
                                    d="M1457.69 1350.49C1457.89 1350.49 1458.06 1350.32 1458.06 1350.11C1458.06 1349.91 1457.89 1349.74 1457.69 1349.74C1457.48 1349.74 1457.31 1349.91 1457.31 1350.11C1457.31 1350.32 1457.48 1350.49 1457.69 1350.49Z"\r
                                    fill="#0A0A0A" stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_116"\r
                                    d="M1460.67 1353.47C1460.88 1353.47 1461.05 1353.31 1461.05 1353.1C1461.05 1352.89 1460.88 1352.73 1460.67 1352.73C1460.47 1352.73 1460.3 1352.89 1460.3 1353.1C1460.3 1353.31 1460.47 1353.47 1460.67 1353.47Z"\r
                                    fill="#0A0A0A" stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_117"\r
                                    d="M1452.46 1354.97C1452.67 1354.97 1452.83 1354.8 1452.83 1354.59C1452.83 1354.39 1452.67 1354.22 1452.46 1354.22C1452.25 1354.22 1452.09 1354.39 1452.09 1354.59C1452.09 1354.8 1452.25 1354.97 1452.46 1354.97Z"\r
                                    fill="#0A0A0A" stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_118"\r
                                    d="M1453.95 1351.23C1454.16 1351.23 1454.33 1351.07 1454.33 1350.86C1454.33 1350.66 1454.16 1350.49 1453.95 1350.49C1453.75 1350.49 1453.58 1350.66 1453.58 1350.86C1453.58 1351.07 1453.75 1351.23 1453.95 1351.23Z"\r
                                    fill="#0A0A0A" stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac13-03-container">\r
                        <path id="trait_bulle_14" opacity="0.15" d="M1414.37 1301.57L1390.2 1364.25" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac13-03">\r
                            <circle id="cercle_14" opacity="0.4" cx="1390.39" cy="1364.67" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_14">\r
                                <path id="Vector_119"\r
                                    d="M1395.62 1357.95H1385.17C1384.34 1357.95 1383.67 1358.62 1383.67 1359.44V1369.89C1383.67 1370.72 1384.34 1371.39 1385.17 1371.39H1395.62C1396.44 1371.39 1397.11 1370.72 1397.11 1369.89V1359.44C1397.11 1358.62 1396.44 1357.95 1395.62 1357.95Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_120"\r
                                    d="M1388.15 1363.92C1388.98 1363.92 1389.65 1363.25 1389.65 1362.43C1389.65 1361.61 1388.98 1360.94 1388.15 1360.94C1387.33 1360.94 1386.66 1361.61 1386.66 1362.43C1386.66 1363.25 1387.33 1363.92 1388.15 1363.92Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_121"\r
                                    d="M1397.11 1366.91L1394.81 1364.61C1394.53 1364.33 1394.15 1364.17 1393.75 1364.17C1393.36 1364.17 1392.98 1364.33 1392.7 1364.61L1385.91 1371.39"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac13-04-container">\r
                        <path id="trait_bulle_15" opacity="0.15" d="M1414.37 1301.57L1348 1311.97" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac13-04">\r
                            <circle id="cercle_15" opacity="0.4" cx="1348" cy="1311.97" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_15" clip-path="url(#clip9_63_37)">\r
                                <path id="Vector_122"\r
                                    d="M1350.99 1312.72L1354.88 1315.32C1354.94 1315.35 1355.01 1315.38 1355.07 1315.38C1355.14 1315.38 1355.21 1315.37 1355.27 1315.33C1355.33 1315.3 1355.38 1315.26 1355.41 1315.2C1355.45 1315.14 1355.46 1315.07 1355.46 1315.01V1308.89C1355.46 1308.82 1355.45 1308.76 1355.41 1308.7C1355.38 1308.64 1355.33 1308.6 1355.28 1308.56C1355.22 1308.53 1355.16 1308.51 1355.09 1308.51C1355.02 1308.51 1354.96 1308.53 1354.9 1308.57L1350.99 1310.85"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_123"\r
                                    d="M1349.49 1307.49H1342.03C1341.2 1307.49 1340.54 1308.16 1340.54 1308.99V1314.96C1340.54 1315.78 1341.2 1316.45 1342.03 1316.45H1349.49C1350.32 1316.45 1350.99 1315.78 1350.99 1314.96V1308.99C1350.99 1308.16 1350.32 1307.49 1349.49 1307.49Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac13-05-container">\r
                        <path id="trait_bulle_16" opacity="0.15" d="M1414.37 1301.57L1372.18 1249.29" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac13-05">\r
                            <circle id="cercle_16" opacity="0.4" cx="1372.18" cy="1249.29" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_16">\r
                                <path id="Vector_124"\r
                                    d="M1377.4 1242.57H1366.95C1366.13 1242.57 1365.46 1243.24 1365.46 1244.06V1254.51C1365.46 1255.34 1366.13 1256.01 1366.95 1256.01H1377.4C1378.23 1256.01 1378.89 1255.34 1378.89 1254.51V1244.06C1378.89 1243.24 1378.23 1242.57 1377.4 1242.57Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_125" d="M1365.46 1247.05H1378.89" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_126" d="M1369.94 1256.01V1247.05" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac13-06-container">\r
                        <path id="trait_bulle_17" opacity="0.15" d="M1414.37 1301.57L1438.55 1238.89" stroke="#FF2E97"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac13-06">\r
                            <circle id="cercle_17" opacity="0.4" cx="1438.55" cy="1239.36" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_17">\r
                                <path id="Vector_127"\r
                                    d="M1439.17 1232.03C1438.97 1231.94 1438.76 1231.9 1438.55 1231.9C1438.33 1231.9 1438.12 1231.94 1437.93 1232.03L1431.53 1234.94C1431.4 1235 1431.29 1235.1 1431.21 1235.22C1431.13 1235.34 1431.08 1235.48 1431.08 1235.63C1431.08 1235.77 1431.13 1235.91 1431.21 1236.03C1431.29 1236.15 1431.4 1236.25 1431.53 1236.31L1437.94 1239.23C1438.13 1239.32 1438.34 1239.36 1438.55 1239.36C1438.77 1239.36 1438.98 1239.32 1439.17 1239.23L1445.58 1236.32C1445.71 1236.26 1445.82 1236.16 1445.9 1236.04C1445.98 1235.92 1446.02 1235.78 1446.02 1235.63C1446.02 1235.49 1445.98 1235.35 1445.9 1235.23C1445.82 1235.1 1445.71 1235.01 1445.58 1234.95L1439.17 1232.03Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_128"\r
                                    d="M1431.08 1239.36C1431.08 1239.5 1431.12 1239.64 1431.2 1239.76C1431.28 1239.88 1431.39 1239.98 1431.52 1240.04L1437.94 1242.96C1438.13 1243.05 1438.34 1243.09 1438.55 1243.09C1438.76 1243.09 1438.97 1243.05 1439.17 1242.96L1445.57 1240.05C1445.7 1239.99 1445.82 1239.89 1445.89 1239.77C1445.97 1239.65 1446.01 1239.51 1446.01 1239.36"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_129"\r
                                    d="M1431.08 1243.09C1431.08 1243.24 1431.12 1243.38 1431.2 1243.5C1431.28 1243.62 1431.39 1243.71 1431.52 1243.77L1437.94 1246.69C1438.13 1246.78 1438.34 1246.82 1438.55 1246.82C1438.76 1246.82 1438.97 1246.78 1439.17 1246.69L1445.57 1243.78C1445.7 1243.72 1445.82 1243.62 1445.89 1243.5C1445.97 1243.38 1446.01 1243.24 1446.01 1243.09"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="comprendre_but2-container">\r
                    <g id="planete-but2-comprendre">\r
                        <path id="Vector_130" opacity="0.2"\r
                            d="M1204.39 480.005C1223.43 480.005 1238.87 464.567 1238.87 445.524C1238.87 426.481 1223.43 411.043 1204.39 411.043C1185.35 411.043 1169.91 426.481 1169.91 445.524C1169.91 464.567 1185.35 480.005 1204.39 480.005Z"\r
                            stroke="#00FFFF" stroke-width="3" />\r
                        <path id="planete-but2-comprendre-stroke" opacity="0.9"\r
                            d="M1204.39 480.005C1223.43 480.005 1238.87 464.567 1238.87 445.524C1238.87 426.481 1223.43 411.043 1204.39 411.043C1185.35 411.043 1169.91 426.481 1169.91 445.524C1169.91 464.567 1185.35 480.005 1204.39 480.005Z"\r
                            stroke="#00FFFF" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but2-comprendre-radial"\r
                            d="M1204.39 476.174C1221.32 476.174 1235.04 462.451 1235.04 445.524C1235.04 428.596 1221.32 414.874 1204.39 414.874C1187.46 414.874 1173.74 428.596 1173.74 445.524C1173.74 462.451 1187.46 476.174 1204.39 476.174Z"\r
                            fill="url(#paint8_radial_63_37)" stroke="#00FFFF" stroke-opacity="0.6" stroke-width="4" />\r
                        <path id="Vector_131" opacity="0.3"\r
                            d="M1196.73 445.523C1203.08 445.523 1208.22 442.093 1208.22 437.861C1208.22 433.629 1203.08 430.198 1196.73 430.198C1190.38 430.198 1185.24 433.629 1185.24 437.861C1185.24 442.093 1190.38 445.523 1196.73 445.523Z"\r
                            fill="white" />\r
                        <text id="BUT2" fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter"\r
                            font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="1188.72" y="451.64">BUT2</tspan>\r
                        </text>\r
                        <path id="Vector_132" opacity="0.3"\r
                            d="M1204.39 457.018C1226.61 457.018 1244.62 451.872 1244.62 445.524C1244.62 439.176 1226.61 434.03 1204.39 434.03C1182.17 434.03 1164.16 439.176 1164.16 445.524C1164.16 451.872 1182.17 457.018 1204.39 457.018Z"\r
                            stroke="#00FFFF" stroke-width="2" />\r
                        <path id="Vector_133" opacity="0.2"\r
                            d="M1204.39 458.933C1229.78 458.933 1250.37 452.929 1250.37 445.524C1250.37 438.118 1229.78 432.114 1204.39 432.114C1179 432.114 1158.42 438.118 1158.42 445.524C1158.42 452.929 1179 458.933 1204.39 458.933Z"\r
                            stroke="#00D9FF" />\r
                    </g>\r
                    <g id="bulle_ac21-01-container">\r
                        <path id="trait_bulle_18" opacity="0.15" d="M1204.39 445.524L1275.36 434.399" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac21-01">\r
                            <circle id="cercle_18" opacity="0.4" cx="1275.21" cy="434.03" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_18" clip-path="url(#clip10_63_37)">\r
                                <path id="Vector_134" d="M1278.41 430.039H1283.2V434.828" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_135"\r
                                    d="M1283.2 430.039L1276.41 436.824L1272.42 432.833L1267.23 438.021" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac21-02-container">\r
                        <path id="trait_bulle_19" opacity="0.15" d="M1204.39 445.523L1236.9 509.581" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac21-02">\r
                            <circle id="cercle_19" opacity="0.4" cx="1236.9" cy="509.582" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_19">\r
                                <path id="Vector_136" d="M1244.09 516.766L1240.62 513.302" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_137"\r
                                    d="M1236.11 515.169C1239.63 515.169 1242.49 512.31 1242.49 508.784C1242.49 505.257 1239.63 502.398 1236.11 502.398C1232.58 502.398 1229.72 505.257 1229.72 508.784C1229.72 512.31 1232.58 515.169 1236.11 515.169Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac21-03-container">\r
                        <path id="trait_bulle_20" opacity="0.15" d="M1204.39 445.523L1153.52 496.238" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac21-03">\r
                            <circle id="cercle_20" opacity="0.4" cx="1153.52" cy="496.708" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_20">\r
                                <path id="Vector_138"\r
                                    d="M1146.75 489.476V502.246C1146.75 502.67 1146.92 503.076 1147.22 503.375C1147.51 503.674 1147.92 503.843 1148.34 503.843H1161.12"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_139" d="M1149.94 499.852H1156.33" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_140" d="M1149.94 495.861H1159.52" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_141" d="M1149.94 491.87H1152.33" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac21-04-container">\r
                        <path id="trait_bulle_21" opacity="0.15" d="M1204.39 445.523L1140.44 412.809" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac21-04">\r
                            <circle id="cercle_21" opacity="0.4" cx="1140.44" cy="412.903" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_21">\r
                                <path id="Vector_142"\r
                                    d="M1143.63 420.087V418.491C1143.63 417.644 1143.3 416.832 1142.7 416.233C1142.1 415.634 1141.29 415.298 1140.44 415.298H1135.65C1134.8 415.298 1133.99 415.634 1133.39 416.233C1132.79 416.832 1132.46 417.644 1132.46 418.491V420.087"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_143"\r
                                    d="M1143.63 405.822C1144.32 406 1144.92 406.4 1145.35 406.959C1145.79 407.518 1146.02 408.206 1146.02 408.913C1146.02 409.62 1145.79 410.307 1145.35 410.867C1144.92 411.426 1144.32 411.826 1143.63 412.003"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_144"\r
                                    d="M1148.42 420.087V418.49C1148.42 417.783 1148.18 417.096 1147.75 416.537C1147.32 415.978 1146.71 415.578 1146.03 415.401"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_145"\r
                                    d="M1138.04 412.105C1139.81 412.105 1141.24 410.676 1141.24 408.912C1141.24 407.149 1139.81 405.72 1138.04 405.72C1136.28 405.72 1134.85 407.149 1134.85 408.912C1134.85 410.676 1136.28 412.105 1138.04 412.105Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac21-05-container">\r
                        <path id="trait_bulle_22" opacity="0.15" d="M1204.39 445.524L1215.74 374.591" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac21-05">\r
                            <circle id="cercle_22" opacity="0.4" cx="1215.89" cy="374.591" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_22">\r
                                <path id="Vector_146" d="M1216.35 375.059L1221.47 380.178" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_147"\r
                                    d="M1209.25 367.436C1209.18 367.406 1209.1 367.398 1209.02 367.413C1208.94 367.428 1208.87 367.466 1208.82 367.521C1208.76 367.577 1208.72 367.648 1208.71 367.726C1208.69 367.803 1208.7 367.883 1208.73 367.956L1213.92 380.726C1213.95 380.803 1214.01 380.869 1214.08 380.913C1214.15 380.957 1214.23 380.978 1214.32 380.972C1214.4 380.967 1214.48 380.935 1214.54 380.882C1214.61 380.829 1214.65 380.757 1214.68 380.676L1215.93 375.821C1215.99 375.538 1216.14 375.278 1216.34 375.07C1216.54 374.862 1216.8 374.713 1217.08 374.641L1221.97 373.38C1222.05 373.359 1222.13 373.313 1222.18 373.249C1222.23 373.184 1222.26 373.104 1222.27 373.021C1222.27 372.937 1222.25 372.854 1222.21 372.783C1222.17 372.711 1222.1 372.656 1222.02 372.625L1209.25 367.436Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="comprendre_but1-container">\r
                    <g id="planete-but1-comprendre">\r
                        <path id="Vector_148" opacity="0.2"\r
                            d="M1210.08 683.573C1227.89 683.573 1242.33 669.136 1242.33 651.326C1242.33 633.516 1227.89 619.078 1210.08 619.078C1192.27 619.078 1177.84 633.516 1177.84 651.326C1177.84 669.136 1192.27 683.573 1210.08 683.573Z"\r
                            stroke="#FFD700" stroke-width="3" />\r
                        <path id="planete-but1-comprendre-stroke" opacity="0.9"\r
                            d="M1210.08 683.573C1227.89 683.573 1242.33 669.136 1242.33 651.326C1242.33 633.516 1227.89 619.078 1210.08 619.078C1192.27 619.078 1177.84 633.516 1177.84 651.326C1177.84 669.136 1192.27 683.573 1210.08 683.573Z"\r
                            stroke="#FFD700" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but1-comprendre-radial"\r
                            d="M1210.08 679.991C1225.91 679.991 1238.75 667.158 1238.75 651.327C1238.75 635.496 1225.91 622.662 1210.08 622.662C1194.25 622.662 1181.42 635.496 1181.42 651.327C1181.42 667.158 1194.25 679.991 1210.08 679.991Z"\r
                            fill="url(#paint9_radial_63_37)" fill-opacity="0.6" stroke="#FFD700" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_149" opacity="0.3"\r
                            d="M1202.92 651.326C1208.85 651.326 1213.67 648.118 1213.67 644.16C1213.67 640.203 1208.85 636.994 1202.92 636.994C1196.98 636.994 1192.17 640.203 1192.17 644.16C1192.17 648.118 1196.98 651.326 1202.92 651.326Z"\r
                            fill="white" />\r
                        <path id="Vector_150" opacity="0.3"\r
                            d="M1210.08 662.076C1230.86 662.076 1247.71 657.263 1247.71 651.326C1247.71 645.39 1230.86 640.577 1210.08 640.577C1189.31 640.577 1172.46 645.39 1172.46 651.326C1172.46 657.263 1189.31 662.076 1210.08 662.076Z"\r
                            stroke="#FFD700" stroke-width="2" />\r
                        <path id="Vector_151" opacity="0.2"\r
                            d="M1210.08 663.867C1233.83 663.867 1253.08 658.252 1253.08 651.326C1253.08 644.4 1233.83 638.785 1210.08 638.785C1186.34 638.785 1167.09 644.4 1167.09 651.326C1167.09 658.252 1186.34 663.867 1210.08 663.867Z"\r
                            stroke="#00D9FF" />\r
                        <text id="planete_text_4" fill="white" xml:space="preserve" style="white-space: pre"\r
                            font-family="Inter" font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="1195.14" y="657.815">BUT1</tspan>\r
                        </text>\r
                    </g>\r
                    <g id="bulle_ac11-01-container">\r
                        <path id="trait_bulle_23" opacity="0.15" d="M1210.08 651.327L1276.46 640.923" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac11-01">\r
                            <circle id="cercle_23" opacity="0.4" cx="1276.46" cy="640.578" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_23">\r
                                <path id="Vector_152" d="M1274.96 640.577H1277.95" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_153" d="M1274.96 637.591H1277.95" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_154"\r
                                    d="M1277.95 647.295V645.055C1277.95 644.659 1277.79 644.28 1277.51 644C1277.23 643.72 1276.85 643.562 1276.46 643.562C1276.06 643.562 1275.68 643.72 1275.4 644C1275.12 644.28 1274.96 644.659 1274.96 645.055V647.295"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_155"\r
                                    d="M1271.98 639.084H1270.48C1270.09 639.084 1269.71 639.241 1269.43 639.521C1269.15 639.801 1268.99 640.181 1268.99 640.577V645.802C1268.99 646.198 1269.15 646.578 1269.43 646.858C1269.71 647.138 1270.09 647.295 1270.48 647.295H1282.43C1282.82 647.295 1283.2 647.138 1283.48 646.858C1283.76 646.578 1283.92 646.198 1283.92 645.802V638.338C1283.92 637.942 1283.76 637.562 1283.48 637.282C1283.2 637.002 1282.82 636.845 1282.43 636.845H1280.93"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_156"\r
                                    d="M1271.98 647.295V635.351C1271.98 634.955 1272.13 634.576 1272.41 634.296C1272.69 634.016 1273.07 633.858 1273.47 633.858H1279.44C1279.84 633.858 1280.22 634.016 1280.5 634.296C1280.78 634.576 1280.93 634.955 1280.93 635.351V647.295"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac11-02-container">\r
                        <path id="trait_bulle_24" opacity="0.15" d="M1210.08 651.326L1252.28 703.604" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac11-02">\r
                            <circle id="cercle_24" opacity="0.4" cx="1252.17" cy="703.605" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_24">\r
                                <path id="Vector_157" d="M1258.89 710.323L1255.65 707.083" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_158"\r
                                    d="M1251.43 708.829C1254.73 708.829 1257.4 706.156 1257.4 702.858C1257.4 699.559 1254.73 696.886 1251.43 696.886C1248.13 696.886 1245.46 699.559 1245.46 702.858C1245.46 706.156 1248.13 708.829 1251.43 708.829Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac11-03-container">\r
                        <path id="trait_bulle_25" opacity="0.15" d="M1210.08 651.326L1185.91 714.008" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac11-03">\r
                            <circle id="cercle_25" opacity="0.4" cx="1185.66" cy="714.008" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_25">\r
                                <path id="Vector_159"\r
                                    d="M1178.85 707.527V719.471C1178.85 719.867 1179.01 720.247 1179.29 720.527C1179.57 720.807 1179.95 720.964 1180.34 720.964H1192.29"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_160" d="M1181.83 717.231H1187.81" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_161" d="M1181.83 713.499H1190.79" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_162" d="M1181.83 709.767H1184.07" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac11-04-container">\r
                        <path id="trait_bulle_26" opacity="0.15" d="M1210.08 651.326L1143.71 661.73" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac11-04">\r
                            <circle id="cercle_26" opacity="0.4" cx="1143.86" cy="662.076" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_26">\r
                                <path id="Vector_163"\r
                                    d="M1136.23 661.99C1136.17 661.822 1136.17 661.638 1136.23 661.47C1136.84 660.001 1137.87 658.745 1139.19 657.861C1140.51 656.977 1142.06 656.505 1143.65 656.505C1145.24 656.505 1146.79 656.977 1148.11 657.861C1149.44 658.745 1150.46 660.001 1151.07 661.47C1151.13 661.638 1151.13 661.822 1151.07 661.99C1150.46 663.459 1149.44 664.715 1148.11 665.599C1146.79 666.483 1145.24 666.955 1143.65 666.955C1142.06 666.955 1140.51 666.483 1139.19 665.599C1137.87 664.715 1136.84 663.459 1136.23 661.99Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_164"\r
                                    d="M1143.65 663.97C1144.89 663.97 1145.89 662.967 1145.89 661.731C1145.89 660.494 1144.89 659.491 1143.65 659.491C1142.42 659.491 1141.41 660.494 1141.41 661.731C1141.41 662.967 1142.42 663.97 1143.65 663.97Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac11-05-container">\r
                        <path id="trait_bulle_27" opacity="0.15" d="M1210.08 651.326L1167.89 599.048" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac11-05">\r
                            <circle id="cercle_27" opacity="0.4" cx="1167.65" cy="599.048" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_27" clip-path="url(#clip11_63_37)">\r
                                <path id="Vector_165"\r
                                    d="M1167.65 606.512C1171.77 606.512 1175.12 603.17 1175.12 599.048C1175.12 594.925 1171.77 591.583 1167.65 591.583C1163.53 591.583 1160.19 594.925 1160.19 599.048C1160.19 603.17 1163.53 606.512 1167.65 606.512Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_166"\r
                                    d="M1167.65 603.526C1170.12 603.526 1172.13 601.521 1172.13 599.047C1172.13 596.574 1170.12 594.568 1167.65 594.568C1165.18 594.568 1163.17 596.574 1163.17 599.047C1163.17 601.521 1165.18 603.526 1167.65 603.526Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_167"\r
                                    d="M1167.65 600.541C1168.48 600.541 1169.14 599.872 1169.14 599.048C1169.14 598.223 1168.48 597.555 1167.65 597.555C1166.83 597.555 1166.16 598.223 1166.16 599.048C1166.16 599.872 1166.83 600.541 1167.65 600.541Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac11-06-container">\r
                        <path id="trait_bulle_28" opacity="0.15" d="M1210.08 651.327L1234.26 588.646" stroke="#00D9FF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac11-06">\r
                            <circle id="cercle_28" opacity="0.4" cx="1233.79" cy="588.648" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_28" clip-path="url(#clip12_63_37)">\r
                                <path id="Vector_168"\r
                                    d="M1236.78 595.367V593.874C1236.78 593.082 1236.46 592.322 1235.9 591.762C1235.34 591.202 1234.58 590.888 1233.79 590.888H1229.31C1228.52 590.888 1227.76 591.202 1227.2 591.762C1226.64 592.322 1226.33 593.082 1226.33 593.874V595.367"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_169"\r
                                    d="M1236.78 582.025C1237.42 582.191 1237.98 582.565 1238.39 583.088C1238.79 583.612 1239.01 584.254 1239.01 584.916C1239.01 585.577 1238.79 586.22 1238.39 586.743C1237.98 587.266 1237.42 587.64 1236.78 587.806"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_170"\r
                                    d="M1241.25 595.366V593.873C1241.25 593.212 1241.03 592.569 1240.63 592.046C1240.22 591.523 1239.66 591.15 1239.01 590.984"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_171"\r
                                    d="M1231.55 587.901C1233.2 587.901 1234.54 586.565 1234.54 584.916C1234.54 583.267 1233.2 581.93 1231.55 581.93C1229.9 581.93 1228.56 583.267 1228.56 584.916C1228.56 586.565 1229.9 587.901 1231.55 587.901Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="concevoir_but2-container">\r
                    <g id="planete-but2-concevoir">\r
                        <path id="Vector_172" opacity="0.2"\r
                            d="M1729.48 864.355C1748.52 864.355 1763.96 848.917 1763.96 829.874C1763.96 810.83 1748.52 795.393 1729.48 795.393C1710.43 795.393 1694.99 810.83 1694.99 829.874C1694.99 848.917 1710.43 864.355 1729.48 864.355Z"\r
                            stroke="#00FFFF" stroke-width="3" />\r
                        <path id="planete-but2-concevoir-stroke" opacity="0.9"\r
                            d="M1729.48 864.355C1748.52 864.355 1763.96 848.917 1763.96 829.874C1763.96 810.83 1748.52 795.393 1729.48 795.393C1710.43 795.393 1694.99 810.83 1694.99 829.874C1694.99 848.917 1710.43 864.355 1729.48 864.355Z"\r
                            stroke="#00FFFF" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but2-concevoir-radial"\r
                            d="M1729.48 860.524C1746.4 860.524 1760.13 846.802 1760.13 829.874C1760.13 812.947 1746.4 799.225 1729.48 799.225C1712.55 799.225 1698.83 812.947 1698.83 829.874C1698.83 846.802 1712.55 860.524 1729.48 860.524Z"\r
                            fill="url(#paint10_radial_63_37)" fill-opacity="0.6" stroke="#00FFFF" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_173" opacity="0.3"\r
                            d="M1721.81 829.874C1728.16 829.874 1733.31 826.443 1733.31 822.211C1733.31 817.979 1728.16 814.549 1721.81 814.549C1715.47 814.549 1710.32 817.979 1710.32 822.211C1710.32 826.443 1715.47 829.874 1721.81 829.874Z"\r
                            fill="white" />\r
                        <text id="BUT2_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter"\r
                            font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="1712.88" y="835.991">BUT2</tspan>\r
                        </text>\r
                        <path id="Vector_174" opacity="0.3"\r
                            d="M1729.48 841.367C1751.69 841.367 1769.7 836.221 1769.7 829.874C1769.7 823.526 1751.69 818.38 1729.48 818.38C1707.26 818.38 1689.25 823.526 1689.25 829.874C1689.25 836.221 1707.26 841.367 1729.48 841.367Z"\r
                            stroke="#00FFFF" stroke-width="2" />\r
                        <path id="Vector_175" opacity="0.2"\r
                            d="M1729.48 843.283C1754.87 843.283 1775.45 837.28 1775.45 829.874C1775.45 822.468 1754.87 816.465 1729.48 816.465C1704.08 816.465 1683.5 822.468 1683.5 829.874C1683.5 837.28 1704.08 843.283 1729.48 843.283Z"\r
                            stroke="#B84EFF" />\r
                    </g>\r
                    <g id="bulle_ac22-01-container">\r
                        <path id="trait_bulle_29" opacity="0.15" d="M1729.48 829.874L1800.44 818.75" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac22-01">\r
                            <circle id="cercle_29" opacity="0.4" cx="1800.44" cy="818.75" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_29" clip-path="url(#clip13_63_37)">\r
                                <path id="Vector_176"\r
                                    d="M1802.84 820.347C1803 819.548 1803.4 818.99 1804.04 818.351C1804.83 817.633 1805.23 816.595 1805.23 815.558C1805.23 814.287 1804.73 813.069 1803.83 812.171C1802.93 811.273 1801.71 810.769 1800.44 810.769C1799.17 810.769 1797.96 811.273 1797.06 812.171C1796.16 813.069 1795.66 814.287 1795.66 815.558C1795.66 816.356 1795.81 817.314 1796.85 818.351C1797.41 818.91 1797.89 819.548 1798.05 820.347"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_177" d="M1798.05 823.539H1802.84" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_178" d="M1798.85 826.731H1802.04" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac22-02-container">\r
                        <path id="trait_bulle_30" opacity="0.15" d="M1729.48 829.874L1761.99 893.932" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac22-02">\r
                            <circle id="cercle_30" opacity="0.4" cx="1761.99" cy="893.932" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_30">\r
                                <path id="Vector_179"\r
                                    d="M1763.98 885.95V899.918C1763.98 901.036 1763.1 901.914 1761.99 901.914C1760.87 901.914 1759.99 901.036 1759.99 899.918V885.95"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_180" d="M1759.19 885.95H1764.78" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_181" d="M1763.98 897.124H1759.99" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac22-03-container">\r
                        <path id="trait_bulle_31" opacity="0.15" d="M1729.48 829.874L1678.6 880.588" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac22-03">\r
                            <circle id="cercle_31" opacity="0.4" cx="1678.6" cy="880.588" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_31" clip-path="url(#clip14_63_37)">\r
                                <path id="Vector_182"\r
                                    d="M1678.6 888.57C1683.01 888.57 1686.58 884.996 1686.58 880.588C1686.58 876.18 1683.01 872.606 1678.6 872.606C1674.19 872.606 1670.62 876.18 1670.62 880.588C1670.62 884.996 1674.19 888.57 1678.6 888.57Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_183"\r
                                    d="M1678.6 885.377C1681.24 885.377 1683.39 883.233 1683.39 880.588C1683.39 877.943 1681.24 875.799 1678.6 875.799C1675.96 875.799 1673.81 877.943 1673.81 880.588C1673.81 883.233 1675.96 885.377 1678.6 885.377Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_184"\r
                                    d="M1678.6 882.184C1679.48 882.184 1680.2 881.469 1680.2 880.588C1680.2 879.706 1679.48 878.991 1678.6 878.991C1677.72 878.991 1677 879.706 1677 880.588C1677 881.469 1677.72 882.184 1678.6 882.184Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac22-04-container">\r
                        <path id="trait_bulle_32" opacity="0.15" d="M1729.48 829.874L1665.52 797.159" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac22-04">\r
                            <circle id="cercle_32" opacity="0.4" cx="1665.52" cy="797.308" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_32">\r
                                <path id="Vector_185" d="M1672.71 804.492L1669.24 801.028" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_186"\r
                                    d="M1664.72 802.896C1668.25 802.896 1671.11 800.037 1671.11 796.51C1671.11 792.984 1668.25 790.125 1664.72 790.125C1661.2 790.125 1658.34 792.984 1658.34 796.51C1658.34 800.037 1661.2 802.896 1664.72 802.896Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac22-05-container">\r
                        <path id="trait_bulle_33" opacity="0.15" d="M1729.48 829.874L1740.83 758.941" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac22-05">\r
                            <circle id="cercle_33" opacity="0.4" cx="1740.97" cy="758.996" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_33">\r
                                <path id="Vector_187"\r
                                    d="M1745.76 755.804C1747.08 755.804 1748.15 754.732 1748.15 753.409C1748.15 752.087 1747.08 751.015 1745.76 751.015C1744.44 751.015 1743.36 752.087 1743.36 753.409C1743.36 754.732 1744.44 755.804 1745.76 755.804Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_188"\r
                                    d="M1736.18 761.391C1737.5 761.391 1738.57 760.319 1738.57 758.996C1738.57 757.674 1737.5 756.602 1736.18 756.602C1734.86 756.602 1733.79 757.674 1733.79 758.996C1733.79 760.319 1734.86 761.391 1736.18 761.391Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_189"\r
                                    d="M1745.76 766.978C1747.08 766.978 1748.15 765.905 1748.15 764.583C1748.15 763.261 1747.08 762.188 1745.76 762.188C1744.44 762.188 1743.36 763.261 1743.36 764.583C1743.36 765.905 1744.44 766.978 1745.76 766.978Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_190" d="M1738.25 760.201L1743.7 763.378" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_191" d="M1743.69 754.614L1738.25 757.791" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="concevoir_but3-container">\r
                    <g id="planete-but3-concevoir">\r
                        <path id="Vector_192" opacity="0.2"\r
                            d="M1926.11 806.515C1945.15 806.515 1960.59 791.077 1960.59 772.034C1960.59 752.99 1945.15 737.553 1926.11 737.553C1907.07 737.553 1891.63 752.99 1891.63 772.034C1891.63 791.077 1907.07 806.515 1926.11 806.515Z"\r
                            stroke="#00FFFF" stroke-width="3" />\r
                        <path id="planete-but2-concevoir-stroke_2" opacity="0.9"\r
                            d="M1926.11 806.515C1945.15 806.515 1960.59 791.077 1960.59 772.034C1960.59 752.99 1945.15 737.553 1926.11 737.553C1907.07 737.553 1891.63 752.99 1891.63 772.034C1891.63 791.077 1907.07 806.515 1926.11 806.515Z"\r
                            stroke="#FF00FF" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but2-concevoir-radial_2"\r
                            d="M1926.11 802.684C1943.04 802.684 1956.76 788.962 1956.76 772.035C1956.76 755.107 1943.04 741.385 1926.11 741.385C1909.18 741.385 1895.46 755.107 1895.46 772.035C1895.46 788.962 1909.18 802.684 1926.11 802.684Z"\r
                            fill="url(#paint11_radial_63_37)" fill-opacity="0.6" stroke="#FF00FF" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_193" opacity="0.3"\r
                            d="M1918.45 772.034C1924.8 772.034 1929.94 768.603 1929.94 764.371C1929.94 760.14 1924.8 756.709 1918.45 756.709C1912.1 756.709 1906.95 760.14 1906.95 764.371C1906.95 768.603 1912.1 772.034 1918.45 772.034Z"\r
                            fill="white" />\r
                        <text id="BUT3" fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter"\r
                            font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="1909.34" y="778.151">BUT3</tspan>\r
                        </text>\r
                        <path id="Vector_194" opacity="0.3"\r
                            d="M1926.11 783.527C1948.33 783.527 1966.34 778.382 1966.34 772.034C1966.34 765.686 1948.33 760.54 1926.11 760.54C1903.89 760.54 1885.88 765.686 1885.88 772.034C1885.88 778.382 1903.89 783.527 1926.11 783.527Z"\r
                            stroke="#FF00FF" stroke-width="2" />\r
                        <path id="Vector_195" opacity="0.2"\r
                            d="M1926.11 785.444C1951.5 785.444 1972.08 779.44 1972.08 772.034C1972.08 764.629 1951.5 758.625 1926.11 758.625C1900.72 758.625 1880.13 764.629 1880.13 772.034C1880.13 779.44 1900.72 785.444 1926.11 785.444Z"\r
                            stroke="#B84EFF" />\r
                    </g>\r
                    <g id="bulle_ac32-01-container">\r
                        <path id="trait_bulle_34" opacity="0.15" d="M1929.54 775.077L1980.42 724.363" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac32-01">\r
                            <circle id="cercle_34" opacity="0.4" cx="1980.65" cy="722.156" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_34">\r
                                <path id="Vector_196"\r
                                    d="M1983.04 723.753C1983.2 722.955 1983.6 722.396 1984.24 721.757C1985.04 721.039 1985.44 720.001 1985.44 718.964C1985.44 717.694 1984.93 716.476 1984.03 715.577C1983.14 714.679 1981.92 714.175 1980.65 714.175C1979.38 714.175 1978.16 714.679 1977.26 715.577C1976.36 716.476 1975.86 717.694 1975.86 718.964C1975.86 719.762 1976.02 720.72 1977.06 721.757C1977.61 722.316 1978.09 722.955 1978.25 723.753"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_197" d="M1978.25 726.945H1983.04" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_198" d="M1979.05 730.138H1982.24" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac32-02-container">\r
                        <path id="trait_bulle_35" opacity="0.15" d="M1930 760.755L1975.12 816.654" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac32-02">\r
                            <circle id="cercle_35" opacity="0.4" cx="1980.16" cy="821.156" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="Frame_2">\r
                                <path id="Vector_199"\r
                                    d="M1977.75 814.25H1974.75C1973.92 814.25 1973.25 814.922 1973.25 815.75V818.75C1973.25 819.578 1973.92 820.25 1974.75 820.25H1977.75C1978.58 820.25 1979.25 819.578 1979.25 818.75V815.75C1979.25 814.922 1978.58 814.25 1977.75 814.25Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_200"\r
                                    d="M1976.25 820.25V823.25C1976.25 823.648 1976.41 824.029 1976.69 824.311C1976.97 824.592 1977.35 824.75 1977.75 824.75H1980.75"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_201"\r
                                    d="M1985.25 821.75H1982.25C1981.42 821.75 1980.75 822.422 1980.75 823.25V826.25C1980.75 827.078 1981.42 827.75 1982.25 827.75H1985.25C1986.08 827.75 1986.75 827.078 1986.75 826.25V823.25C1986.75 822.422 1986.08 821.75 1985.25 821.75Z"\r
                                    stroke="#64748B" stroke-width="1.83333" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac32-03-container">\r
                        <path id="trait_bulle_36" opacity="0.15" d="M1928.11 773.034L1877.23 823.748" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac32-03">\r
                            <circle id="cercle_36" opacity="0.4" cx="1877.23" cy="823.748" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_35" clip-path="url(#clip15_63_37)">\r
                                <path id="Vector_202"\r
                                    d="M1877.23 831.73C1881.64 831.73 1885.22 828.157 1885.22 823.748C1885.22 819.34 1881.64 815.767 1877.23 815.767C1872.83 815.767 1869.25 819.34 1869.25 823.748C1869.25 828.157 1872.83 831.73 1877.23 831.73Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_203"\r
                                    d="M1877.23 828.537C1879.88 828.537 1882.02 826.393 1882.02 823.748C1882.02 821.103 1879.88 818.959 1877.23 818.959C1874.59 818.959 1872.44 821.103 1872.44 823.748C1872.44 826.393 1874.59 828.537 1877.23 828.537Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_204"\r
                                    d="M1877.23 825.344C1878.12 825.344 1878.83 824.629 1878.83 823.748C1878.83 822.866 1878.12 822.151 1877.23 822.151C1876.35 822.151 1875.64 822.866 1875.64 823.748C1875.64 824.629 1876.35 825.344 1877.23 825.344Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac32-04-container">\r
                        <g id="bulle_ac32-04">\r
                            <circle id="cercle_37" opacity="0.4" cx="1878.16" cy="724.156" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_36">\r
                                <path id="Vector_205" d="M1872.75 730.75V726.25" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_206" d="M1878 730.75V717.25" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_207" d="M1883.25 730.75V721.75" stroke="#64748B" stroke-width="1.83333"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                        <path id="trait_bulle_37" opacity="0.15" d="M1926.66 783.303L1879.62 729.013" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                    </g>\r
                </g>\r
                <g id="concevoir_but1-container">\r
                    <g id="planete-but1-concevoir">\r
                        <path id="Vector_208" opacity="0.2"\r
                            d="M1544.27 927.523C1562.08 927.523 1576.52 913.085 1576.52 895.275C1576.52 877.465 1562.08 863.027 1544.27 863.027C1526.46 863.027 1512.02 877.465 1512.02 895.275C1512.02 913.085 1526.46 927.523 1544.27 927.523Z"\r
                            stroke="#FFD700" stroke-width="3" />\r
                        <path id="planete-but1-concevoir-stroke" opacity="0.9"\r
                            d="M1544.27 927.523C1562.08 927.523 1576.52 913.085 1576.52 895.275C1576.52 877.465 1562.08 863.027 1544.27 863.027C1526.46 863.027 1512.02 877.465 1512.02 895.275C1512.02 913.085 1526.46 927.523 1544.27 927.523Z"\r
                            stroke="#FFD700" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but1-concevoir-radial"\r
                            d="M1544.27 923.94C1560.1 923.94 1572.93 911.106 1572.93 895.275C1572.93 879.444 1560.1 866.61 1544.27 866.61C1528.44 866.61 1515.61 879.444 1515.61 895.275C1515.61 911.106 1528.44 923.94 1544.27 923.94Z"\r
                            fill="url(#paint12_radial_63_37)" fill-opacity="0.6" stroke="#FFD700" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_209" opacity="0.3"\r
                            d="M1537.1 895.275C1543.04 895.275 1547.85 892.066 1547.85 888.109C1547.85 884.151 1543.04 880.942 1537.1 880.942C1531.17 880.942 1526.36 884.151 1526.36 888.109C1526.36 892.066 1531.17 895.275 1537.1 895.275Z"\r
                            fill="white" />\r
                        <text id="BUT1" fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter"\r
                            font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="1529.13" y="901.764">BUT1</tspan>\r
                        </text>\r
                        <path id="Vector_210" opacity="0.3"\r
                            d="M1544.27 906.024C1565.05 906.024 1581.89 901.211 1581.89 895.275C1581.89 889.338 1565.05 884.525 1544.27 884.525C1523.49 884.525 1506.65 889.338 1506.65 895.275C1506.65 901.211 1523.49 906.024 1544.27 906.024Z"\r
                            stroke="#FFD700" stroke-width="2" />\r
                        <path id="Vector_211" opacity="0.2"\r
                            d="M1544.27 907.816C1568.02 907.816 1587.27 902.201 1587.27 895.275C1587.27 888.349 1568.02 882.734 1544.27 882.734C1520.52 882.734 1501.27 888.349 1501.27 895.275C1501.27 902.201 1520.52 907.816 1544.27 907.816Z"\r
                            stroke="#B84EFF" />\r
                    </g>\r
                    <g id="bulle_ac12-01-container">\r
                        <path id="trait_bulle_38" opacity="0.15" d="M1544.27 895.274L1610.64 884.87" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac12-01">\r
                            <circle id="cercle_38" opacity="0.4" cx="1610.64" cy="885.117" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_37" clip-path="url(#clip16_63_37)">\r
                                <path id="Vector_212"\r
                                    d="M1612.88 886.609C1613.03 885.863 1613.4 885.34 1614 884.743C1614.75 884.071 1615.12 883.101 1615.12 882.13C1615.12 880.942 1614.65 879.803 1613.81 878.963C1612.97 878.123 1611.83 877.651 1610.64 877.651C1609.45 877.651 1608.32 878.123 1607.48 878.963C1606.64 879.803 1606.16 880.942 1606.16 882.13C1606.16 882.877 1606.31 883.772 1607.28 884.743C1607.81 885.265 1608.25 885.863 1608.4 886.609"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_213" d="M1608.4 889.595H1612.88" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_214" d="M1609.15 892.581H1612.14" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac12-02-container">\r
                        <path id="trait_bulle_39" opacity="0.15" d="M1544.37 895.275L1554.78 961.648" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac12-02">\r
                            <circle id="cercle_39" opacity="0.4" cx="1554.78" cy="961.793" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_38" clip-path="url(#clip17_63_37)">\r
                                <path id="Vector_215" d="M1557.76 958.062H1562.24V962.54" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_216"\r
                                    d="M1562.24 958.062L1555.89 964.407L1552.16 960.674L1547.31 965.526"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac12-02-container_2">\r
                        <path id="trait_bulle_40" opacity="0.15" d="M1544.27 895.274L1477.9 905.678" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac12-03">\r
                            <circle id="cercle_40" opacity="0.4" cx="1477.9" cy="905.678" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_39" clip-path="url(#clip18_63_37)">\r
                                <path id="Vector_217"\r
                                    d="M1480.88 911.649V899.706C1480.88 899.31 1480.73 898.93 1480.45 898.65C1480.17 898.37 1479.79 898.213 1479.39 898.213H1476.41C1476.01 898.213 1475.63 898.37 1475.35 898.65C1475.07 898.93 1474.91 899.31 1474.91 899.706V911.649"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_218"\r
                                    d="M1483.87 901.198H1471.93C1471.1 901.198 1470.43 901.867 1470.43 902.691V910.156C1470.43 910.98 1471.1 911.649 1471.93 911.649H1483.87C1484.69 911.649 1485.36 910.98 1485.36 910.156V902.691C1485.36 901.867 1484.69 901.198 1483.87 901.198Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac12-02-container_3">\r
                        <path id="trait_bulle_41" opacity="0.15" d="M1544.27 895.275L1533.87 828.902" stroke="#B84EFF"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac12-04">\r
                            <circle id="cercle_41" opacity="0.4" cx="1533.87" cy="829.274" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_40" clip-path="url(#clip19_63_37)">\r
                                <path id="Vector_219"\r
                                    d="M1541.33 833.006C1541.33 833.402 1541.17 833.782 1540.89 834.062C1540.61 834.342 1540.23 834.499 1539.84 834.499H1530.01C1529.61 834.499 1529.23 834.657 1528.95 834.937L1527.31 836.58C1527.23 836.655 1527.14 836.705 1527.04 836.725C1526.93 836.746 1526.83 836.735 1526.73 836.695C1526.63 836.655 1526.55 836.587 1526.49 836.5C1526.43 836.413 1526.4 836.311 1526.4 836.206V824.049C1526.4 823.653 1526.56 823.273 1526.84 822.993C1527.12 822.713 1527.5 822.556 1527.9 822.556H1539.84C1540.23 822.556 1540.61 822.713 1540.89 822.993C1541.17 823.273 1541.33 823.653 1541.33 824.049V833.006Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="entreprendre_but3-container">\r
                    <g id="planete-but3-entreprendre">\r
                        <path id="Vector_220" opacity="0.2"\r
                            d="M465.449 797.104C485.331 797.104 501.449 780.986 501.449 761.104C501.449 741.221 485.331 725.104 465.449 725.104C445.567 725.104 429.449 741.221 429.449 761.104C429.449 780.986 445.567 797.104 465.449 797.104Z"\r
                            stroke="#FF00FF" stroke-width="3" />\r
                        <path id="planete-but3-entreprendre-stroke" opacity="0.9"\r
                            d="M465.449 797.104C485.331 797.104 501.449 780.986 501.449 761.104C501.449 741.221 485.331 725.104 465.449 725.104C445.567 725.104 429.449 741.221 429.449 761.104C429.449 780.986 445.567 797.104 465.449 797.104Z"\r
                            stroke="#FF00FF" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but3-entreprendre-radial"\r
                            d="M465.449 793.104C483.122 793.104 497.449 778.777 497.449 761.104C497.449 743.43 483.122 729.104 465.449 729.104C447.776 729.104 433.449 743.43 433.449 761.104C433.449 778.777 447.776 793.104 465.449 793.104Z"\r
                            fill="url(#paint13_radial_63_37)" fill-opacity="0.6" stroke="#FF00FF" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_221" opacity="0.3"\r
                            d="M457.449 761.104C464.077 761.104 469.449 757.522 469.449 753.104C469.449 748.685 464.077 745.104 457.449 745.104C450.822 745.104 445.449 748.685 445.449 753.104C445.449 757.522 450.822 761.104 457.449 761.104Z"\r
                            fill="white" />\r
                        <text id="BUT3_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter"\r
                            font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="449.143" y="766.967">BUT3</tspan>\r
                        </text>\r
                        <path id="Vector_222" opacity="0.3"\r
                            d="M465.449 773.104C488.645 773.104 507.449 767.731 507.449 761.104C507.449 754.476 488.645 749.104 465.449 749.104C442.253 749.104 423.449 754.476 423.449 761.104C423.449 767.731 442.253 773.104 465.449 773.104Z"\r
                            stroke="#FF00FF" stroke-width="2" />\r
                        <path id="Vector_223" opacity="0.2"\r
                            d="M465.449 775.104C491.959 775.104 513.449 768.836 513.449 761.104C513.449 753.372 491.959 747.104 465.449 747.104C438.94 747.104 417.449 753.372 417.449 761.104C417.449 768.836 438.94 775.104 465.449 775.104Z"\r
                            stroke="#FFB84E" />\r
                    </g>\r
                    <g id="bulle_ac35-01-container">\r
                        <path id="trait_bulle_42" opacity="0.15" d="M465.449 761.104L539.544 749.489" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac35-01">\r
                            <circle id="cercle_42" opacity="0.4" cx="539.544" cy="749.489" r="19.5" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_41">\r
                                <path id="Vector_224"\r
                                    d="M539.544 757.823C544.147 757.823 547.878 754.092 547.878 749.49C547.878 744.887 544.147 741.156 539.544 741.156C534.942 741.156 531.211 744.887 531.211 749.49C531.211 754.092 534.942 757.823 539.544 757.823Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_225"\r
                                    d="M539.544 754.489C542.305 754.489 544.544 752.251 544.544 749.489C544.544 746.728 542.305 744.489 539.544 744.489C536.783 744.489 534.544 746.728 534.544 749.489C534.544 752.251 536.783 754.489 539.544 754.489Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_226"\r
                                    d="M539.544 751.156C540.464 751.156 541.21 750.409 541.21 749.489C541.21 748.568 540.464 747.822 539.544 747.822C538.623 747.822 537.877 748.568 537.877 749.489C537.877 750.409 538.623 751.156 539.544 751.156Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac35-02-container">\r
                        <path id="trait_bulle_43" opacity="0.15" d="M465.45 761.104L477.064 835.199" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac35-02">\r
                            <circle id="cercle_43" opacity="0.4" cx="477.064" cy="835.391" r="19.5" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_42" clip-path="url(#clip20_63_37)">\r
                                <path id="Vector_227" d="M477.064 842.058V834.558" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_228"\r
                                    d="M478.731 831.224C479.615 831.224 480.463 831.575 481.088 832.2C481.713 832.825 482.064 833.673 482.064 834.557V837.057C482.064 838.383 481.538 839.655 480.6 840.593C479.662 841.53 478.391 842.057 477.064 842.057C475.738 842.057 474.467 841.53 473.529 840.593C472.591 839.655 472.064 838.383 472.064 837.057V834.557C472.064 833.673 472.416 832.825 473.041 832.2C473.666 831.575 474.514 831.224 475.398 831.224H478.731Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_229" d="M478.831 828.624L480.398 827.058" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_230"\r
                                    d="M484.565 842.891C484.566 842.034 484.236 841.209 483.645 840.588C483.054 839.967 482.246 839.598 481.39 839.558"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_231"\r
                                    d="M484.565 829.558C484.564 830.376 484.262 831.166 483.716 831.776C483.171 832.386 482.42 832.774 481.606 832.866"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_232" d="M485.398 836.224H482.064" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_233"\r
                                    d="M469.564 842.891C469.563 842.034 469.893 841.209 470.484 840.588C471.075 839.967 471.883 839.598 472.739 839.558"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_234"\r
                                    d="M469.564 829.558C469.565 830.376 469.867 831.166 470.413 831.776C470.959 832.386 471.71 832.774 472.523 832.866"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_235" d="M472.065 836.224H468.731" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_236" d="M473.731 827.058L475.298 828.624" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_237"\r
                                    d="M474.564 831.332V830.391C474.564 829.728 474.828 829.092 475.297 828.623C475.766 828.154 476.401 827.891 477.064 827.891C477.727 827.891 478.363 828.154 478.832 828.623C479.301 829.092 479.564 829.728 479.564 830.391V831.332"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac35-03-container">\r
                        <path id="trait_bulle_44" opacity="0.15" d="M465.45 761.104L391.354 772.718" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac35-03">\r
                            <circle id="cercle_44" opacity="0.4" cx="391.354" cy="772.717" r="19.5" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_43">\r
                                <path id="Vector_238"\r
                                    d="M385.104 776.467C383.854 777.517 383.438 780.633 383.438 780.633C383.438 780.633 386.554 780.217 387.604 778.967C388.196 778.267 388.187 777.192 387.529 776.542C387.205 776.232 386.779 776.054 386.331 776.04C385.883 776.026 385.447 776.178 385.104 776.467Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_239"\r
                                    d="M391.354 775.216L388.854 772.716C389.298 771.566 389.856 770.463 390.521 769.425C391.492 767.872 392.844 766.594 394.449 765.711C396.053 764.829 397.857 764.372 399.688 764.383C399.688 766.65 399.038 770.633 394.688 773.55C393.635 774.215 392.519 774.774 391.354 775.216Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_240"\r
                                    d="M388.854 772.717H384.688C384.688 772.717 385.146 770.192 386.354 769.383C387.704 768.483 390.521 769.383 390.521 769.383"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_241"\r
                                    d="M391.354 775.216V779.383C391.354 779.383 393.879 778.925 394.688 777.716C395.588 776.366 394.688 773.55 394.688 773.55"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac35-04-container">\r
                        <path id="trait_bulle_45" opacity="0.15" d="M465.45 761.103L453.836 687.008" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac35-04">\r
                            <circle id="cercle_45" opacity="0.4" cx="453.836" cy="687.008" r="19.5" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_44" clip-path="url(#clip21_63_37)">\r
                                <path id="Vector_242" d="M445.503 679.508H462.17" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_243"\r
                                    d="M461.336 679.508V688.674C461.336 689.117 461.16 689.54 460.848 689.853C460.535 690.166 460.111 690.341 459.669 690.341H448.003C447.561 690.341 447.137 690.166 446.824 689.853C446.512 689.54 446.336 689.117 446.336 688.674V679.508"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_244" d="M449.669 694.507L453.836 690.341L458.002 694.507"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="entreprendre_but2-container">\r
                    <g id="planete-but2-entreprendre">\r
                        <path id="Vector_245" opacity="0.2"\r
                            d="M659.955 868.923C678.998 868.923 694.436 853.485 694.436 834.442C694.436 815.399 678.998 799.961 659.955 799.961C640.911 799.961 625.474 815.399 625.474 834.442C625.474 853.485 640.911 868.923 659.955 868.923Z"\r
                            stroke="#00FFFF" stroke-width="3" />\r
                        <path id="planete-but2-entreprendre-stroke" opacity="0.9"\r
                            d="M659.955 868.923C678.998 868.923 694.436 853.485 694.436 834.442C694.436 815.399 678.998 799.961 659.955 799.961C640.911 799.961 625.474 815.399 625.474 834.442C625.474 853.485 640.911 868.923 659.955 868.923Z"\r
                            stroke="#00FFFF" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but2-entreprendre-radial"\r
                            d="M659.955 865.092C676.883 865.092 690.605 851.369 690.605 834.442C690.605 817.514 676.883 803.792 659.955 803.792C643.028 803.792 629.306 817.514 629.306 834.442C629.306 851.369 643.028 865.092 659.955 865.092Z"\r
                            fill="url(#paint14_radial_63_37)" fill-opacity="0.6" stroke="#00FFFF" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_246" opacity="0.3"\r
                            d="M652.293 834.442C658.64 834.442 663.786 831.011 663.786 826.78C663.786 822.548 658.64 819.117 652.293 819.117C645.945 819.117 640.799 822.548 640.799 826.78C640.799 831.011 645.945 834.442 652.293 834.442Z"\r
                            fill="white" />\r
                        <text id="BUT2_3" fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter"\r
                            font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="642.629" y="840.558">BUT2</tspan>\r
                        </text>\r
                        <path id="Vector_247" opacity="0.3"\r
                            d="M659.955 845.936C682.173 845.936 700.183 840.79 700.183 834.442C700.183 828.094 682.173 822.948 659.955 822.948C637.738 822.948 619.728 828.094 619.728 834.442C619.728 840.79 637.738 845.936 659.955 845.936Z"\r
                            stroke="#00FFFF" stroke-width="2" />\r
                        <path id="Vector_248" opacity="0.2"\r
                            d="M659.955 847.851C685.346 847.851 705.93 841.847 705.93 834.442C705.93 827.036 685.346 821.032 659.955 821.032C634.564 821.032 613.98 827.036 613.98 834.442C613.98 841.847 634.564 847.851 659.955 847.851Z"\r
                            stroke="#FFB84E" />\r
                    </g>\r
                    <g id="bulle_ac25-01-container">\r
                        <path id="trait_bulle_46" opacity="0.15" d="M659.955 834.442L730.924 823.317" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac25-01">\r
                            <circle id="cercle_46" opacity="0.4" cx="730.924" cy="823.317" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_45">\r
                                <path id="Vector_249"\r
                                    d="M724.937 826.909C723.74 827.915 723.341 830.9 723.341 830.9C723.341 830.9 726.326 830.501 727.332 829.304C727.898 828.634 727.89 827.604 727.26 826.981C726.95 826.685 726.541 826.514 726.112 826.501C725.684 826.488 725.265 826.633 724.937 826.909Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_250"\r
                                    d="M730.924 825.711L728.529 823.317C728.954 822.215 729.489 821.159 730.126 820.164C731.056 818.677 732.351 817.453 733.887 816.608C735.424 815.762 737.152 815.324 738.906 815.335C738.906 817.506 738.283 821.321 734.117 824.115C733.108 824.753 732.039 825.287 730.924 825.711Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_251"\r
                                    d="M728.529 823.317H724.538C724.538 823.317 724.977 820.899 726.134 820.124C727.427 819.262 730.125 820.124 730.125 820.124"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_252"\r
                                    d="M730.924 825.712V829.702C730.924 829.702 733.342 829.263 734.117 828.106C734.979 826.813 734.117 824.115 734.117 824.115"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac25-02-container">\r
                        <path id="trait_bulle_47" opacity="0.15" d="M659.955 834.441L705.073 890.34" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac25-02">\r
                            <circle id="cercle_47" opacity="0.4" cx="704.962" cy="890.677" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_46">\r
                                <path id="Vector_253"\r
                                    d="M708.155 897.86V896.264C708.155 895.417 707.819 894.605 707.22 894.006C706.621 893.408 705.809 893.071 704.962 893.071H700.173C699.326 893.071 698.514 893.408 697.916 894.006C697.317 894.605 696.98 895.417 696.98 896.264V897.86"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_254"\r
                                    d="M708.154 883.596C708.839 883.773 709.445 884.173 709.878 884.732C710.311 885.292 710.546 885.979 710.546 886.686C710.546 887.393 710.311 888.081 709.878 888.64C709.445 889.199 708.839 889.599 708.154 889.777"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_255"\r
                                    d="M712.943 897.86V896.264C712.943 895.556 712.707 894.869 712.274 894.31C711.841 893.751 711.234 893.352 710.549 893.175"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_256"\r
                                    d="M702.568 889.879C704.331 889.879 705.76 888.449 705.76 886.686C705.76 884.923 704.331 883.493 702.568 883.493C700.804 883.493 699.375 884.923 699.375 886.686C699.375 888.449 700.804 889.879 702.568 889.879Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac25-03-container">\r
                        <path id="trait_bulle_48" opacity="0.15" d="M659.955 834.441L634.104 901.464" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac25-03">\r
                            <circle id="cercle_48" opacity="0.4" cx="634.108" cy="901.638" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_47" clip-path="url(#clip22_63_37)">\r
                                <path id="Vector_257"\r
                                    d="M638.897 898.445C640.22 898.445 641.292 897.373 641.292 896.051C641.292 894.728 640.22 893.656 638.897 893.656C637.575 893.656 636.503 894.728 636.503 896.051C636.503 897.373 637.575 898.445 638.897 898.445Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_258"\r
                                    d="M629.319 904.032C630.642 904.032 631.714 902.96 631.714 901.638C631.714 900.315 630.642 899.243 629.319 899.243C627.997 899.243 626.925 900.315 626.925 901.638C626.925 902.96 627.997 904.032 629.319 904.032Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_259"\r
                                    d="M638.897 909.619C640.22 909.619 641.292 908.547 641.292 907.225C641.292 905.902 640.22 904.83 638.897 904.83C637.575 904.83 636.503 905.902 636.503 907.225C636.503 908.547 637.575 909.619 638.897 909.619Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_260" d="M631.387 902.843L636.838 906.019" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_261" d="M636.83 897.256L631.387 900.433" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac25-04-container">\r
                        <path id="trait_bulle_49" opacity="0.15" d="M659.955 834.441L588.986 845.566" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac25-04">\r
                            <circle id="cercle_49" opacity="0.4" cx="588.986" cy="845.566" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_48">\r
                                <path id="Vector_262"\r
                                    d="M592.115 853.228V851.632C592.115 850.785 591.778 849.973 591.18 849.375C590.581 848.776 589.769 848.439 588.922 848.439H584.133C583.286 848.439 582.474 848.776 581.876 849.375C581.277 849.973 580.94 850.785 580.94 851.632V853.228"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_263"\r
                                    d="M592.114 838.964C592.799 839.141 593.405 839.541 593.838 840.101C594.271 840.66 594.506 841.347 594.506 842.054C594.506 842.762 594.271 843.449 593.838 844.008C593.405 844.568 592.799 844.967 592.114 845.145"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_264"\r
                                    d="M596.903 853.228V851.632C596.903 850.924 596.667 850.237 596.234 849.678C595.801 849.119 595.194 848.72 594.509 848.543"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_265"\r
                                    d="M586.528 845.247C588.291 845.247 589.72 843.817 589.72 842.054C589.72 840.291 588.291 838.861 586.528 838.861C584.764 838.861 583.335 840.291 583.335 842.054C583.335 843.817 584.764 845.247 586.528 845.247Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac25-05-container">\r
                        <path id="trait_bulle_50" opacity="0.15" d="M659.955 834.442L614.837 778.543" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac25-05">\r
                            <circle id="cercle_50" opacity="0.4" cx="614.837" cy="778.595" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_49">\r
                                <path id="Vector_266" d="M606.855 771.411H622.819" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_267"\r
                                    d="M622.02 771.411V780.191C622.02 780.614 621.852 781.02 621.553 781.32C621.253 781.619 620.847 781.787 620.424 781.787H609.25C608.826 781.787 608.42 781.619 608.121 781.32C607.822 781.02 607.653 780.614 607.653 780.191V771.411"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_268" d="M610.846 785.778L614.837 781.787L618.827 785.778"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac25-06-container">\r
                        <path id="trait_bulle_51" opacity="0.15" d="M659.955 834.442L685.806 767.419" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac25-06">\r
                            <circle id="cercle_51" opacity="0.4" cx="685.806" cy="767.421" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_50" clip-path="url(#clip23_63_37)">\r
                                <path id="Vector_269"\r
                                    d="M692.191 768.219C692.191 772.21 689.397 774.205 686.077 775.362C685.903 775.421 685.714 775.418 685.542 775.354C682.214 774.205 679.42 772.21 679.42 768.219V762.632C679.42 762.42 679.504 762.217 679.654 762.067C679.803 761.917 680.006 761.833 680.218 761.833C681.814 761.833 683.81 760.876 685.199 759.662C685.368 759.518 685.583 759.438 685.805 759.438C686.028 759.438 686.243 759.518 686.412 759.662C687.809 760.884 689.796 761.833 691.393 761.833C691.604 761.833 691.807 761.917 691.957 762.067C692.107 762.217 692.191 762.42 692.191 762.632V768.219Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="entreprendre_but1-container">\r
                    <g id="planete-but1-entreprendre">\r
                        <path id="Vector_270" opacity="0.2"\r
                            d="M862.718 936.844C880.528 936.844 894.966 922.406 894.966 904.596C894.966 886.786 880.528 872.349 862.718 872.349C844.908 872.349 830.471 886.786 830.471 904.596C830.471 922.406 844.908 936.844 862.718 936.844Z"\r
                            stroke="#FFD700" stroke-width="3" />\r
                        <path id="planete-but1-entreprendre-stroke" opacity="0.9"\r
                            d="M862.718 936.844C880.528 936.844 894.966 922.406 894.966 904.596C894.966 886.786 880.528 872.349 862.718 872.349C844.908 872.349 830.471 886.786 830.471 904.596C830.471 922.406 844.908 936.844 862.718 936.844Z"\r
                            stroke="#FFD700" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but1-entreprendre-radial"\r
                            d="M862.718 933.262C878.549 933.262 891.383 920.428 891.383 904.597C891.383 888.766 878.549 875.933 862.718 875.933C846.887 875.933 834.054 888.766 834.054 904.597C834.054 920.428 846.887 933.262 862.718 933.262Z"\r
                            fill="url(#paint15_radial_63_37)" fill-opacity="0.6" stroke="#FFD700" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_271" opacity="0.3"\r
                            d="M855.552 904.597C861.489 904.597 866.301 901.389 866.301 897.431C866.301 893.473 861.489 890.265 855.552 890.265C849.615 890.265 844.803 893.473 844.803 897.431C844.803 901.389 849.615 904.597 855.552 904.597Z"\r
                            fill="white" />\r
                        <text id="BUT1_2" fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter"\r
                            font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="847.762" y="911.085">BUT1</tspan>\r
                        </text>\r
                        <path id="Vector_272" opacity="0.3"\r
                            d="M862.718 915.346C883.496 915.346 900.34 910.534 900.34 904.597C900.34 898.66 883.496 893.848 862.718 893.848C841.94 893.848 825.096 898.66 825.096 904.597C825.096 910.534 841.94 915.346 862.718 915.346Z"\r
                            stroke="#FFD700" stroke-width="2" />\r
                        <path id="Vector_273" opacity="0.2"\r
                            d="M862.719 917.137C886.465 917.137 905.715 911.523 905.715 904.596C905.715 897.67 886.465 892.056 862.719 892.056C838.972 892.056 819.722 897.67 819.722 904.596C819.722 911.523 838.972 917.137 862.719 917.137Z"\r
                            stroke="#FFB84E" />\r
                    </g>\r
                    <g id="bulle_ac15-01-container">\r
                        <path id="trait_bulle_52" opacity="0.15" d="M862.719 904.597L929.091 894.193" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac15-01">\r
                            <circle id="cercle_52" opacity="0.4" cx="929.091" cy="894.193" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_51" clip-path="url(#clip24_63_37)">\r
                                <path id="Vector_274"\r
                                    d="M929.092 901.658C933.214 901.658 936.556 898.316 936.556 894.193C936.556 890.071 933.214 886.729 929.092 886.729C924.969 886.729 921.627 890.071 921.627 894.193C921.627 898.316 924.969 901.658 929.092 901.658Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_275"\r
                                    d="M929.091 898.672C931.565 898.672 933.57 896.666 933.57 894.193C933.57 891.719 931.565 889.714 929.091 889.714C926.618 889.714 924.612 891.719 924.612 894.193C924.612 896.666 926.618 898.672 929.091 898.672Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_276"\r
                                    d="M929.092 895.686C929.916 895.686 930.585 895.018 930.585 894.193C930.585 893.369 929.916 892.7 929.092 892.7C928.267 892.7 927.599 893.369 927.599 894.193C927.599 895.018 928.267 895.686 929.092 895.686Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac15-02-container">\r
                        <path id="trait_bulle_53" opacity="0.15" d="M862.719 904.597L912.235 950.002" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac15-02">\r
                            <circle id="cercle_53" opacity="0.4" cx="912.882" cy="949.78" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_52" clip-path="url(#clip25_63_37)">\r
                                <path id="Vector_277" d="M912.882 942.315V957.245" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_278"\r
                                    d="M916.614 944.555H911.015C910.322 944.555 909.658 944.83 909.168 945.32C908.678 945.81 908.402 946.474 908.402 947.167C908.402 947.86 908.678 948.525 909.168 949.015C909.658 949.505 910.322 949.78 911.015 949.78H914.747C915.44 949.78 916.105 950.055 916.595 950.545C917.085 951.035 917.36 951.7 917.36 952.393C917.36 953.086 917.085 953.75 916.595 954.24C916.105 954.73 915.44 955.005 914.747 955.005H908.402"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac15-03-container">\r
                        <path id="trait_bulle_54" opacity="0.15" d="M862.719 904.597L858.093 971.62" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac15-03">\r
                            <circle id="cercle_54" opacity="0.4" cx="858.092" cy="972.174" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_53" clip-path="url(#clip26_63_37)">\r
                                <path id="Vector_279"\r
                                    d="M860.332 973.667C860.481 972.92 860.854 972.398 861.451 971.8C862.198 971.129 862.571 970.158 862.571 969.188C862.571 968 862.099 966.861 861.259 966.021C860.419 965.181 859.28 964.709 858.092 964.709C856.904 964.709 855.765 965.181 854.925 966.021C854.085 966.861 853.613 968 853.613 969.188C853.613 969.934 853.763 970.83 854.733 971.8C855.256 972.323 855.703 972.92 855.853 973.667"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_280" d="M855.854 976.652H860.332" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_281" d="M856.6 979.639H859.586" stroke="#64748B" stroke-width="1.66667"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac15-04-container">\r
                        <path id="trait_bulle_55" opacity="0.15" d="M862.718 904.597L807.433 942.768" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac15-04">\r
                            <circle id="cercle_55" opacity="0.4" cx="807.433" cy="942.768" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_54">\r
                                <path id="Vector_282" d="M810.418 939.035H814.897V943.514" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_283" d="M814.897 939.035L808.552 945.38L804.82 941.648L799.968 946.5"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac15-05-container">\r
                        <path id="trait_bulle_56" opacity="0.15" d="M862.719 904.597L798.405 885.173" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac15-05">\r
                            <circle id="cercle_56" opacity="0.4" cx="798.326" cy="884.752" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_55" clip-path="url(#clip27_63_37)">\r
                                <path id="Vector_284"\r
                                    d="M802.805 881.767C804.042 881.767 805.044 880.764 805.044 879.528C805.044 878.291 804.042 877.288 802.805 877.288C801.568 877.288 800.565 878.291 800.565 879.528C800.565 880.764 801.568 881.767 802.805 881.767Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_285"\r
                                    d="M793.847 886.993C795.084 886.993 796.086 885.99 796.086 884.753C796.086 883.516 795.084 882.514 793.847 882.514C792.61 882.514 791.607 883.516 791.607 884.753C791.607 885.99 792.61 886.993 793.847 886.993Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_286"\r
                                    d="M802.805 892.217C804.042 892.217 805.044 891.215 805.044 889.978C805.044 888.741 804.042 887.738 802.805 887.738C801.568 887.738 800.565 888.741 800.565 889.978C800.565 891.215 801.568 892.217 802.805 892.217Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_287" d="M795.78 885.88L800.879 888.851" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_288" d="M800.871 880.654L795.78 883.625" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac15-06-container">\r
                        <path id="trait_bulle_57" opacity="0.15" d="M862.719 904.596L837.807 842.203" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac15-06">\r
                            <circle id="cercle_57" opacity="0.4" cx="837.443" cy="842.228" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_56">\r
                                <path id="Vector_289"\r
                                    d="M840.429 848.947V847.454C840.429 846.662 840.115 845.902 839.555 845.342C838.995 844.782 838.235 844.468 837.443 844.468H832.964C832.173 844.468 831.413 844.782 830.853 845.342C830.293 845.902 829.979 846.662 829.979 847.454V848.947"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_290"\r
                                    d="M840.429 835.605C841.069 835.771 841.636 836.145 842.041 836.668C842.446 837.192 842.665 837.834 842.665 838.496C842.665 839.157 842.446 839.8 842.041 840.323C841.636 840.846 841.069 841.22 840.429 841.386"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_291"\r
                                    d="M844.907 848.946V847.453C844.907 846.792 844.687 846.149 844.281 845.626C843.876 845.103 843.309 844.73 842.668 844.564"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_292"\r
                                    d="M835.204 841.482C836.853 841.482 838.19 840.145 838.19 838.496C838.19 836.847 836.853 835.51 835.204 835.51C833.555 835.51 832.218 836.847 832.218 838.496C832.218 840.145 833.555 841.482 835.204 841.482Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac15-07-container">\r
                        <path id="trait_bulle_58" opacity="0.15" d="M862.719 904.596L895.967 846.218" stroke="#FFB84E"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac15-07">\r
                            <circle id="cercle_58" opacity="0.4" cx="895.755" cy="845.968" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_57" clip-path="url(#clip28_63_37)">\r
                                <path id="Vector_293"\r
                                    d="M903.22 842.236L896.509 846.511C896.281 846.644 896.023 846.713 895.759 846.713C895.496 846.713 895.237 846.644 895.009 846.511L888.291 842.236"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_294"\r
                                    d="M901.728 839.997H889.784C888.959 839.997 888.291 840.665 888.291 841.49V850.448C888.291 851.272 888.959 851.941 889.784 851.941H901.728C902.552 851.941 903.22 851.272 903.22 850.448V841.49C903.22 840.665 902.552 839.997 901.728 839.997Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="developper_but3-container">\r
                    <g id="planete-but3-developper">\r
                        <path id="Vector_295" opacity="0.2"\r
                            d="M735.771 1664.06C755.654 1664.06 771.771 1647.94 771.771 1628.06C771.771 1608.18 755.654 1592.06 735.771 1592.06C715.889 1592.06 699.771 1608.18 699.771 1628.06C699.771 1647.94 715.889 1664.06 735.771 1664.06Z"\r
                            stroke="#FF00FF" stroke-width="3" />\r
                        <path id="planete-but3-developper-stroke" opacity="0.9"\r
                            d="M735.771 1664.06C755.654 1664.06 771.771 1647.94 771.771 1628.06C771.771 1608.18 755.654 1592.06 735.771 1592.06C715.889 1592.06 699.771 1608.18 699.771 1628.06C699.771 1647.94 715.889 1664.06 735.771 1664.06Z"\r
                            stroke="#FF00FF" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but3-developper-radial"\r
                            d="M735.771 1660.06C753.445 1660.06 767.771 1645.73 767.771 1628.06C767.771 1610.38 753.445 1596.06 735.771 1596.06C718.098 1596.06 703.771 1610.38 703.771 1628.06C703.771 1645.73 718.098 1660.06 735.771 1660.06Z"\r
                            fill="url(#paint16_radial_63_37)" fill-opacity="0.6" stroke="#FF00FF" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_296" opacity="0.3"\r
                            d="M727.771 1628.06C734.399 1628.06 739.771 1624.48 739.771 1620.06C739.771 1615.64 734.399 1612.06 727.771 1612.06C721.144 1612.06 715.771 1615.64 715.771 1620.06C715.771 1624.48 721.144 1628.06 727.771 1628.06Z"\r
                            fill="white" />\r
                        <text id="BUT3_3" fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter"\r
                            font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="719.39" y="1633.92">BUT3</tspan>\r
                        </text>\r
                        <path id="Vector_297" opacity="0.3"\r
                            d="M735.771 1640.06C758.967 1640.06 777.771 1634.69 777.771 1628.06C777.771 1621.43 758.967 1616.06 735.771 1616.06C712.576 1616.06 693.771 1621.43 693.771 1628.06C693.771 1634.69 712.576 1640.06 735.771 1640.06Z"\r
                            stroke="#FF00FF" stroke-width="2" />\r
                        <path id="Vector_298" opacity="0.2"\r
                            d="M735.771 1642.06C762.281 1642.06 783.771 1635.79 783.771 1628.06C783.771 1620.33 762.281 1614.06 735.771 1614.06C709.262 1614.06 687.771 1620.33 687.771 1628.06C687.771 1635.79 709.262 1642.06 735.771 1642.06Z"\r
                            stroke="#00FF9F" />\r
                    </g>\r
                    <g id="bulle_ac34-01-container">\r
                        <path id="trait_bulle_59" opacity="0.15" d="M758.119 1631.67L832.214 1620.06" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac34-01">\r
                            <circle id="cercle_59" opacity="0.4" cx="832.215" cy="1620.06" r="19.5" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_58">\r
                                <path id="Vector_299" d="M835.548 1625.06L840.548 1620.06L835.548 1615.06"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_300" d="M828.882 1615.06L823.882 1620.06L828.882 1625.06"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac34-02-container">\r
                        <path id="trait_bulle_60" opacity="0.15" d="M735.771 1628.06L769.714 1694.94" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac34-02">\r
                            <circle id="cercle_60" opacity="0.4" cx="769.714" cy="1694.94" r="19.5" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_59" clip-path="url(#clip29_63_37)">\r
                                <path id="Vector_301"\r
                                    d="M776.381 1686.6H763.048C762.127 1686.6 761.381 1687.35 761.381 1688.27V1691.6C761.381 1692.52 762.127 1693.27 763.048 1693.27H776.381C777.301 1693.27 778.048 1692.52 778.048 1691.6V1688.27C778.048 1687.35 777.301 1686.6 776.381 1686.6Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_302"\r
                                    d="M776.381 1696.6H763.048C762.127 1696.6 761.381 1697.35 761.381 1698.27V1701.6C761.381 1702.52 762.127 1703.27 763.048 1703.27H776.381C777.301 1703.27 778.048 1702.52 778.048 1701.6V1698.27C778.048 1697.35 777.301 1696.6 776.381 1696.6Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_303" d="M764.714 1689.94H764.722" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_304" d="M764.714 1699.94H764.722" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac34-03-container">\r
                        <path id="trait_bulle_61" opacity="0.15" d="M735.771 1628.06L682.653 1681.01" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac34-03">\r
                            <circle id="cercle_61" opacity="0.4" cx="682.653" cy="1681.06" r="19.5" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_60" clip-path="url(#clip30_63_37)">\r
                                <path id="Vector_305" d="M682.853 1688.06V1689.72" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_306" d="M682.853 1673.06V1674.72" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_307" d="M687.02 1688.06V1689.72" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_308" d="M687.02 1673.06V1674.72" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_309" d="M674.52 1681.39H676.186" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_310" d="M674.52 1685.56H676.186" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_311" d="M674.52 1677.22H676.186" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_312" d="M689.52 1681.39H691.186" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_313" d="M689.52 1685.56H691.186" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_314" d="M689.52 1677.22H691.186" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_315" d="M678.686 1688.06V1689.72" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_316" d="M678.686 1673.06V1674.72" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_317"\r
                                    d="M687.852 1674.72H677.852C676.932 1674.72 676.186 1675.47 676.186 1676.39V1686.39C676.186 1687.31 676.932 1688.06 677.852 1688.06H687.852C688.773 1688.06 689.519 1687.31 689.519 1686.39V1676.39C689.519 1675.47 688.773 1674.72 687.852 1674.72Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_318"\r
                                    d="M685.353 1678.06H680.353C679.893 1678.06 679.52 1678.43 679.52 1678.89V1683.89C679.52 1684.35 679.893 1684.72 680.353 1684.72H685.353C685.813 1684.72 686.186 1684.35 686.186 1683.89V1678.89C686.186 1678.43 685.813 1678.06 685.353 1678.06Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac34-04-container">\r
                        <path id="trait_bulle_62" opacity="0.15" d="M735.771 1628.06L669 1593.9" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac34-04">\r
                            <circle id="cercle_62" opacity="0.4" cx="669" cy="1593.9" r="19.5" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_61" clip-path="url(#clip31_63_37)">\r
                                <path id="Vector_319"\r
                                    d="M668.167 1602.01C668.42 1602.16 668.707 1602.23 669 1602.23C669.293 1602.23 669.58 1602.16 669.833 1602.01L675.667 1598.68C675.92 1598.53 676.13 1598.32 676.276 1598.07C676.423 1597.81 676.5 1597.53 676.5 1597.23V1590.57C676.5 1590.28 676.423 1589.99 676.276 1589.74C676.13 1589.48 675.92 1589.27 675.667 1589.13L669.833 1585.79C669.58 1585.65 669.293 1585.57 669 1585.57C668.707 1585.57 668.42 1585.65 668.167 1585.79L662.333 1589.13C662.08 1589.27 661.87 1589.48 661.724 1589.74C661.577 1589.99 661.5 1590.28 661.5 1590.57V1597.23C661.5 1597.53 661.577 1597.81 661.724 1598.07C661.87 1598.32 662.08 1598.53 662.333 1598.68L668.167 1602.01Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_320" d="M669 1602.23V1593.9" stroke="#64748B" stroke-width="1.66667"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_321" d="M661.741 1589.73L669 1593.9L676.258 1589.73" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_322" d="M665.25 1587.46L672.75 1591.75" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac34-05-container">\r
                        <path id="trait_bulle_63" opacity="0.15" d="M735.771 1628.06L747.621 1554" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac34-05">\r
                            <circle id="cercle_63" opacity="0.4" cx="747.621" cy="1554" r="19.5" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_62">\r
                                <path id="Vector_323"\r
                                    d="M752.204 1559.83H745.121C744.039 1559.83 742.979 1559.53 742.058 1558.96C741.138 1558.4 740.393 1557.58 739.908 1556.62C739.423 1555.65 739.217 1554.57 739.312 1553.49C739.406 1552.41 739.799 1551.38 740.446 1550.51C741.092 1549.65 741.967 1548.98 742.973 1548.58C743.979 1548.18 745.075 1548.07 746.141 1548.26C747.206 1548.45 748.197 1548.93 749.005 1549.65C749.812 1550.37 750.403 1551.3 750.713 1552.33H752.204C753.199 1552.33 754.153 1552.73 754.856 1553.43C755.559 1554.14 755.954 1555.09 755.954 1556.08C755.954 1557.08 755.559 1558.03 754.856 1558.74C754.153 1559.44 753.199 1559.83 752.204 1559.83Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="developper_but2-container">\r
                    <g id="planete-but2-developper">\r
                        <path id="Vector_324" opacity="0.2"\r
                            d="M859.617 1495.66C878.66 1495.66 894.098 1480.22 894.098 1461.18C894.098 1442.14 878.66 1426.7 859.617 1426.7C840.573 1426.7 825.136 1442.14 825.136 1461.18C825.136 1480.22 840.573 1495.66 859.617 1495.66Z"\r
                            stroke="#00FFFF" stroke-width="3" />\r
                        <path id="planete-but2-developper-stroke" opacity="0.9"\r
                            d="M859.617 1495.66C878.66 1495.66 894.098 1480.22 894.098 1461.18C894.098 1442.14 878.66 1426.7 859.617 1426.7C840.573 1426.7 825.136 1442.14 825.136 1461.18C825.136 1480.22 840.573 1495.66 859.617 1495.66Z"\r
                            stroke="#00FFFF" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but2-developper-radial"\r
                            d="M859.618 1491.83C876.545 1491.83 890.267 1478.11 890.267 1461.18C890.267 1444.25 876.545 1430.53 859.618 1430.53C842.69 1430.53 828.968 1444.25 828.968 1461.18C828.968 1478.11 842.69 1491.83 859.618 1491.83Z"\r
                            fill="url(#paint17_radial_63_37)" fill-opacity="0.6" stroke="#00FFFF" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_325" opacity="0.3"\r
                            d="M851.955 1461.18C858.302 1461.18 863.448 1457.75 863.448 1453.52C863.448 1449.29 858.302 1445.85 851.955 1445.85C845.607 1445.85 840.461 1449.29 840.461 1453.52C840.461 1457.75 845.607 1461.18 851.955 1461.18Z"\r
                            fill="white" />\r
                        <text id="planete_text_5" fill="white" xml:space="preserve" style="white-space: pre"\r
                            font-family="Inter" font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="845.757" y="1467.3">BUT2</tspan>\r
                        </text>\r
                        <path id="Vector_326" opacity="0.3"\r
                            d="M859.618 1472.67C881.835 1472.67 899.845 1467.53 899.845 1461.18C899.845 1454.83 881.835 1449.69 859.618 1449.69C837.4 1449.69 819.39 1454.83 819.39 1461.18C819.39 1467.53 837.4 1472.67 859.618 1472.67Z"\r
                            stroke="#00FFFF" stroke-width="2" />\r
                        <path id="Vector_327" opacity="0.2"\r
                            d="M859.617 1474.59C885.008 1474.59 905.592 1468.58 905.592 1461.18C905.592 1453.77 885.008 1447.77 859.617 1447.77C834.226 1447.77 813.643 1453.77 813.643 1461.18C813.643 1468.58 834.226 1474.59 859.617 1474.59Z"\r
                            stroke="#00FF9F" />\r
                    </g>\r
                    <g id="bulle_ac24-01-container">\r
                        <path id="trait_bulle_64" opacity="0.15" d="M859.617 1461.18L930.586 1450.05" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac24-01">\r
                            <circle id="cercle_64" opacity="0.4" cx="930.594" cy="1450.05" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_63">\r
                                <path id="Vector_328"\r
                                    d="M934.157 1441.89H926.175C925.294 1441.89 924.579 1442.6 924.579 1443.48V1456.25C924.579 1457.13 925.294 1457.85 926.175 1457.85H934.157C935.039 1457.85 935.754 1457.13 935.754 1456.25V1443.48C935.754 1442.6 935.039 1441.89 934.157 1441.89Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_329" d="M930.166 1454.66H930.174" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac24-02-container">\r
                        <path id="trait_bulle_65" opacity="0.15" d="M859.617 1461.18L904.735 1517.08" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac24-02">\r
                            <circle id="cercle_65" opacity="0.4" cx="904.623" cy="1517.45" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_64" clip-path="url(#clip32_63_37)">\r
                                <path id="Vector_330"\r
                                    d="M911.009 1509.47H898.238C897.356 1509.47 896.642 1510.18 896.642 1511.07V1514.26C896.642 1515.14 897.356 1515.85 898.238 1515.85H911.009C911.89 1515.85 912.605 1515.14 912.605 1514.26V1511.07C912.605 1510.18 911.89 1509.47 911.009 1509.47Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_331"\r
                                    d="M911.009 1519.05H898.238C897.356 1519.05 896.642 1519.76 896.642 1520.64V1523.84C896.642 1524.72 897.356 1525.43 898.238 1525.43H911.009C911.89 1525.43 912.605 1524.72 912.605 1523.84V1520.64C912.605 1519.76 911.89 1519.05 911.009 1519.05Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_332" d="M899.834 1512.66H899.842" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_333" d="M899.834 1522.24H899.842" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac24-03-container">\r
                        <path id="trait_bulle_66" opacity="0.15" d="M859.617 1461.18L833.767 1528.2" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac24-03">\r
                            <circle id="cercle_66" opacity="0.4" cx="833.655" cy="1528.62" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="Frame_3" clip-path="url(#clip33_63_37)">\r
                                <path id="Vector_334"\r
                                    d="M827.27 1530.22C827.119 1530.22 826.971 1530.18 826.843 1530.1C826.715 1530.02 826.612 1529.9 826.547 1529.77C826.482 1529.63 826.457 1529.48 826.474 1529.33C826.492 1529.18 826.552 1529.04 826.647 1528.92L834.549 1520.78C834.608 1520.71 834.689 1520.66 834.778 1520.65C834.867 1520.63 834.959 1520.65 835.039 1520.69C835.119 1520.73 835.182 1520.8 835.217 1520.88C835.253 1520.97 835.259 1521.06 835.235 1521.15L833.703 1525.95C833.658 1526.07 833.643 1526.2 833.659 1526.33C833.675 1526.46 833.722 1526.58 833.796 1526.69C833.869 1526.79 833.968 1526.88 834.082 1526.94C834.197 1527 834.324 1527.03 834.453 1527.03H840.04C840.191 1527.03 840.34 1527.07 840.467 1527.15C840.595 1527.23 840.698 1527.35 840.763 1527.48C840.828 1527.62 840.853 1527.77 840.836 1527.92C840.818 1528.07 840.758 1528.21 840.663 1528.33L832.761 1536.47C832.702 1536.54 832.621 1536.59 832.532 1536.6C832.443 1536.62 832.351 1536.6 832.271 1536.56C832.191 1536.52 832.128 1536.45 832.093 1536.37C832.057 1536.28 832.051 1536.19 832.075 1536.1L833.607 1531.3C833.652 1531.18 833.667 1531.05 833.651 1530.92C833.635 1530.79 833.588 1530.67 833.514 1530.56C833.441 1530.46 833.342 1530.37 833.228 1530.31C833.113 1530.25 832.986 1530.22 832.857 1530.22H827.27Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac24-04-container">\r
                        <path id="trait_bulle_67" opacity="0.15" d="M859.617 1461.18L788.648 1472.3" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac24-04">\r
                            <circle id="cercle_67" opacity="0.4" cx="789.156" cy="1472.67" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_65">\r
                                <path id="Vector_335" d="M784.817 1465.49V1475.07" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_336"\r
                                    d="M794.395 1470.28C795.718 1470.28 796.79 1469.21 796.79 1467.88C796.79 1466.56 795.718 1465.49 794.395 1465.49C793.073 1465.49 792.001 1466.56 792.001 1467.88C792.001 1469.21 793.073 1470.28 794.395 1470.28Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_337"\r
                                    d="M784.817 1479.86C786.14 1479.86 787.212 1478.78 787.212 1477.46C787.212 1476.14 786.14 1475.07 784.817 1475.07C783.495 1475.07 782.423 1476.14 782.423 1477.46C782.423 1478.78 783.495 1479.86 784.817 1479.86Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_338"\r
                                    d="M794.395 1470.28C794.395 1472.18 793.639 1474.01 792.291 1475.36C790.944 1476.71 789.117 1477.46 787.212 1477.46"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac24-05-container">\r
                        <path id="trait_bulle_68" opacity="0.15" d="M859.617 1461.18L814.499 1405.28" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac24-05">\r
                            <circle id="cercle_68" opacity="0.4" cx="814.61" cy="1405.54" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_66" clip-path="url(#clip34_63_37)">\r
                                <path id="Vector_339" d="M817.803 1401.54H822.592V1406.33" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_340"\r
                                    d="M822.592 1401.54L815.808 1408.33L811.817 1404.34L806.629 1409.53"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac24-06-container">\r
                        <path id="trait_bulle_69" opacity="0.15" d="M859.617 1461.18L885.468 1394.16" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac24-06">\r
                            <circle id="cercle_69" opacity="0.4" cx="885.579" cy="1394.16" r="18.6561" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_67" opacity="0.7">\r
                                <path id="Vector_341"\r
                                    d="M889.968 1399.74H883.183C882.147 1399.74 881.132 1399.46 880.25 1398.91C879.368 1398.37 878.655 1397.59 878.191 1396.66C877.726 1395.74 877.528 1394.7 877.619 1393.67C877.71 1392.63 878.086 1391.65 878.706 1390.82C879.325 1389.99 880.163 1389.34 881.126 1388.96C882.089 1388.58 883.14 1388.47 884.16 1388.66C885.18 1388.84 886.13 1389.3 886.903 1389.99C887.677 1390.68 888.243 1391.57 888.539 1392.56H889.968C890.92 1392.56 891.834 1392.94 892.508 1393.61C893.181 1394.29 893.56 1395.2 893.56 1396.15C893.56 1397.1 893.181 1398.02 892.508 1398.69C891.834 1399.37 890.92 1399.74 889.968 1399.74Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
                <g id="developper_but1-container">\r
                    <g id="planete-but1-developper">\r
                        <path id="Vector_342" opacity="0.2"\r
                            d="M980.206 1325.84C998.016 1325.84 1012.45 1311.41 1012.45 1293.6C1012.45 1275.79 998.016 1261.35 980.206 1261.35C962.396 1261.35 947.958 1275.79 947.958 1293.6C947.958 1311.41 962.396 1325.84 980.206 1325.84Z"\r
                            stroke="#FFD700" stroke-width="3" />\r
                        <path id="planete-but1-developper-stroke" opacity="0.9"\r
                            d="M980.206 1325.5C998.016 1325.5 1012.45 1311.06 1012.45 1293.25C1012.45 1275.44 998.016 1261 980.206 1261C962.396 1261 947.958 1275.44 947.958 1293.25C947.958 1311.06 962.396 1325.5 980.206 1325.5Z"\r
                            stroke="#FFD700" stroke-opacity="0.6" stroke-width="3" />\r
                        <path id="planete-but1-developper-radial"\r
                            d="M980.206 1322.26C996.037 1322.26 1008.87 1309.43 1008.87 1293.6C1008.87 1277.77 996.037 1264.93 980.206 1264.93C964.375 1264.93 951.541 1277.77 951.541 1293.6C951.541 1309.43 964.375 1322.26 980.206 1322.26Z"\r
                            fill="url(#paint18_radial_63_37)" fill-opacity="0.6" stroke="#FFD700" stroke-opacity="0.6"\r
                            stroke-width="4" />\r
                        <path id="Vector_343" opacity="0.3"\r
                            d="M973.04 1293.6C978.977 1293.6 983.789 1290.39 983.789 1286.43C983.789 1282.47 978.977 1279.26 973.04 1279.26C967.104 1279.26 962.291 1282.47 962.291 1286.43C962.291 1290.39 967.104 1293.6 973.04 1293.6Z"\r
                            fill="white" />\r
                        <text id="BUT1_3" fill="white" xml:space="preserve" style="white-space: pre" font-family="Inter"\r
                            font-size="12" font-weight="bold" letter-spacing="0em">\r
                            <tspan x="965.028" y="1300.09">BUT1</tspan>\r
                        </text>\r
                        <path id="Vector_344" opacity="0.3"\r
                            d="M980.206 1304.35C1000.98 1304.35 1017.83 1299.53 1017.83 1293.6C1017.83 1287.66 1000.98 1282.85 980.206 1282.85C959.428 1282.85 942.584 1287.66 942.584 1293.6C942.584 1299.53 959.428 1304.35 980.206 1304.35Z"\r
                            stroke="#FFD700" stroke-width="2" />\r
                        <path id="Vector_345" opacity="0.2"\r
                            d="M980.206 1306.14C1003.95 1306.14 1023.2 1300.52 1023.2 1293.6C1023.2 1286.67 1003.95 1281.06 980.206 1281.06C956.459 1281.06 937.209 1286.67 937.209 1293.6C937.209 1300.52 956.459 1306.14 980.206 1306.14Z"\r
                            stroke="#00FF9F" />\r
                    </g>\r
                    <g id="bulle_ac14-01-container">\r
                        <g id="bulle_ac14-01">\r
                            <circle id="cercle_70" opacity="0.4" cx="1046.68" cy="1282.99" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="Frame_4" clip-path="url(#clip35_63_37)">\r
                                <path id="Vector_346"\r
                                    d="M1044.94 1277.12C1044.98 1276.69 1045.18 1276.29 1045.51 1276C1045.83 1275.71 1046.25 1275.54 1046.68 1275.54C1047.12 1275.54 1047.53 1275.71 1047.86 1276C1048.18 1276.29 1048.38 1276.69 1048.42 1277.12C1048.44 1277.4 1048.54 1277.67 1048.69 1277.91C1048.84 1278.15 1049.04 1278.34 1049.29 1278.48C1049.53 1278.62 1049.8 1278.7 1050.08 1278.72C1050.36 1278.73 1050.64 1278.67 1050.9 1278.55C1051.29 1278.37 1051.74 1278.35 1052.15 1278.48C1052.57 1278.61 1052.92 1278.9 1053.13 1279.27C1053.35 1279.65 1053.42 1280.09 1053.33 1280.51C1053.24 1280.94 1052.99 1281.31 1052.64 1281.56C1052.41 1281.73 1052.22 1281.94 1052.09 1282.19C1051.96 1282.44 1051.89 1282.71 1051.89 1282.99C1051.89 1283.27 1051.96 1283.55 1052.09 1283.8C1052.22 1284.05 1052.41 1284.26 1052.64 1284.42C1052.99 1284.68 1053.24 1285.05 1053.33 1285.48C1053.42 1285.9 1053.35 1286.34 1053.13 1286.72C1052.92 1287.09 1052.57 1287.38 1052.15 1287.51C1051.74 1287.64 1051.29 1287.61 1050.9 1287.43C1050.64 1287.32 1050.36 1287.26 1050.08 1287.27C1049.8 1287.29 1049.53 1287.36 1049.29 1287.51C1049.04 1287.65 1048.84 1287.84 1048.69 1288.08C1048.54 1288.32 1048.44 1288.58 1048.42 1288.86C1048.38 1289.3 1048.18 1289.7 1047.86 1289.99C1047.53 1290.28 1047.12 1290.45 1046.68 1290.45C1046.25 1290.45 1045.83 1290.28 1045.51 1289.99C1045.18 1289.7 1044.98 1289.3 1044.94 1288.86C1044.92 1288.58 1044.83 1288.32 1044.67 1288.08C1044.52 1287.84 1044.32 1287.64 1044.08 1287.5C1043.83 1287.36 1043.56 1287.28 1043.28 1287.27C1043 1287.26 1042.72 1287.32 1042.46 1287.43C1042.07 1287.61 1041.62 1287.64 1041.21 1287.51C1040.8 1287.38 1040.45 1287.09 1040.23 1286.72C1040.01 1286.34 1039.94 1285.9 1040.03 1285.48C1040.13 1285.05 1040.37 1284.68 1040.72 1284.42C1040.95 1284.26 1041.14 1284.05 1041.27 1283.8C1041.4 1283.55 1041.47 1283.27 1041.47 1282.99C1041.47 1282.71 1041.4 1282.44 1041.27 1282.19C1041.14 1281.94 1040.95 1281.73 1040.72 1281.56C1040.37 1281.31 1040.13 1280.94 1040.04 1280.51C1039.94 1280.09 1040.01 1279.65 1040.23 1279.27C1040.45 1278.9 1040.8 1278.62 1041.21 1278.48C1041.62 1278.35 1042.07 1278.38 1042.46 1278.55C1042.72 1278.67 1043 1278.73 1043.28 1278.72C1043.56 1278.7 1043.83 1278.62 1044.07 1278.48C1044.32 1278.34 1044.52 1278.15 1044.67 1277.91C1044.82 1277.67 1044.92 1277.4 1044.94 1277.12"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_347"\r
                                    d="M1046.68 1285.23C1047.92 1285.23 1048.92 1284.23 1048.92 1283C1048.92 1281.76 1047.92 1280.76 1046.68 1280.76C1045.44 1280.76 1044.44 1281.76 1044.44 1283C1044.44 1284.23 1045.44 1285.23 1046.68 1285.23Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                        <path id="trait_bulle_70" opacity="0.15" d="M980.206 1293.6L1046.58 1283.19" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                    </g>\r
                    <g id="bulle_ac14-02-container">\r
                        <path id="trait_bulle_71" opacity="0.15" d="M980.206 1293.6L1022.4 1345.87" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac14-02">\r
                            <circle id="cercle_71" opacity="0.4" cx="1022.4" cy="1345.47" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_68">\r
                                <path id="Vector_348" d="M1025.39 1349.95L1029.87 1345.47L1025.39 1341" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_349" d="M1019.42 1341L1014.94 1345.47L1019.42 1349.95" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac14-03-container">\r
                        <g id="bulle_ac14-03">\r
                            <circle id="cercle_72" opacity="0.4" cx="956.03" cy="1356.55" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_69">\r
                                <path id="Vector_350"\r
                                    d="M956.03 1353.56C959.74 1353.56 962.748 1352.56 962.748 1351.32C962.748 1350.09 959.74 1349.08 956.03 1349.08C952.319 1349.08 949.312 1350.09 949.312 1351.32C949.312 1352.56 952.319 1353.56 956.03 1353.56Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_351"\r
                                    d="M949.312 1351.32V1361.77C949.312 1362.37 950.019 1362.94 951.279 1363.36C952.539 1363.78 954.248 1364.01 956.03 1364.01C957.812 1364.01 959.52 1363.78 960.78 1363.36C962.04 1362.94 962.748 1362.37 962.748 1361.77V1351.32"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_352"\r
                                    d="M949.312 1356.55C949.312 1357.14 950.019 1357.71 951.279 1358.13C952.539 1358.55 954.248 1358.79 956.03 1358.79C957.812 1358.79 959.52 1358.55 960.78 1358.13C962.04 1357.71 962.748 1357.14 962.748 1356.55"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                        <path id="trait_bulle_72" opacity="0.15" d="M980.206 1293.6L956.029 1356.28" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                    </g>\r
                    <g id="bulle_ac14-04-container">\r
                        <path id="trait_bulle_73" opacity="0.15" d="M980.206 1293.6L913.834 1304" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac14-04">\r
                            <circle id="cercle_73" opacity="0.4" cx="913.834" cy="1304" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_70" clip-path="url(#clip36_63_37)">\r
                                <path id="Vector_353"\r
                                    d="M913.835 1311.46C917.958 1311.46 921.3 1308.12 921.3 1304C921.3 1299.88 917.958 1296.54 913.835 1296.54C909.712 1296.54 906.37 1299.88 906.37 1304C906.37 1308.12 909.712 1311.46 913.835 1311.46Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_354"\r
                                    d="M913.835 1296.54C911.918 1298.55 910.849 1301.22 910.849 1304C910.849 1306.78 911.918 1309.45 913.835 1311.46C915.751 1309.45 916.82 1306.78 916.82 1304C916.82 1301.22 915.751 1298.55 913.835 1296.54Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_355" d="M906.37 1304H921.3" stroke="#64748B" stroke-width="1.66667"\r
                                    stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac14-05-container">\r
                        <path id="trait_bulle_74" opacity="0.15" d="M980.207 1293.6L938.011 1241.32" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac14-05">\r
                            <circle id="cercle_74" opacity="0.4" cx="938.115" cy="1240.81" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_71" clip-path="url(#clip37_63_37)">\r
                                <path id="Vector_356"\r
                                    d="M937.368 1248.07C937.595 1248.2 937.853 1248.27 938.115 1248.27C938.377 1248.27 938.634 1248.2 938.861 1248.07L944.087 1245.09C944.313 1244.95 944.502 1244.77 944.633 1244.54C944.764 1244.31 944.833 1244.06 944.833 1243.79V1237.82C944.833 1237.56 944.764 1237.3 944.633 1237.08C944.502 1236.85 944.313 1236.66 944.087 1236.53L938.861 1233.54C938.634 1233.41 938.377 1233.34 938.115 1233.34C937.853 1233.34 937.595 1233.41 937.368 1233.54L932.143 1236.53C931.916 1236.66 931.728 1236.85 931.597 1237.08C931.466 1237.3 931.397 1237.56 931.396 1237.82V1243.79C931.397 1244.06 931.466 1244.31 931.597 1244.54C931.728 1244.77 931.916 1244.95 932.143 1245.09L937.368 1248.07Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_357" d="M938.115 1248.27V1240.81" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_358" d="M931.613 1237.08L938.115 1240.81L944.617 1237.08"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_359" d="M934.756 1235.04L941.474 1238.88" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                    <g id="bulle_ac14-06-container">\r
                        <path id="trait_bulle_75" opacity="0.15" d="M980.206 1293.6L1004.38 1230.91" stroke="#00FF9F"\r
                            stroke-dasharray="2 4" />\r
                        <g id="bulle_ac14-06">\r
                            <circle id="cercle_75" opacity="0.4" cx="1004.38" cy="1230.91" r="17.4154" fill="#1E293B"\r
                                fill-opacity="0.8" stroke="#334155" />\r
                            <g id="icon_72" clip-path="url(#clip38_63_37)">\r
                                <path id="Vector_360"\r
                                    d="M1010.35 1223.45H998.411C997.586 1223.45 996.918 1224.12 996.918 1224.94V1227.93C996.918 1228.75 997.586 1229.42 998.411 1229.42H1010.35C1011.18 1229.42 1011.85 1228.75 1011.85 1227.93V1224.94C1011.85 1224.12 1011.18 1223.45 1010.35 1223.45Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_361"\r
                                    d="M1010.35 1232.41H998.411C997.586 1232.41 996.918 1233.07 996.918 1233.9V1236.89C996.918 1237.71 997.586 1238.38 998.411 1238.38H1010.35C1011.18 1238.38 1011.85 1237.71 1011.85 1236.89V1233.9C1011.85 1233.07 1011.18 1232.41 1010.35 1232.41Z"\r
                                    stroke="#64748B" stroke-width="1.66667" stroke-linecap="round"\r
                                    stroke-linejoin="round" />\r
                                <path id="Vector_362" d="M999.903 1226.43H999.912" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                                <path id="Vector_363" d="M999.903 1235.39H999.912" stroke="#64748B"\r
                                    stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />\r
                            </g>\r
                        </g>\r
                    </g>\r
                </g>\r
            </g>\r
            <g id="fusee_container">\r
                <g id="fumee_fusee" opacity="0.930741" filter="url(#filter120_f_63_37)">\r
                    <path\r
                        d="M1202.89 1049.9C1197.67 1049.62 1193.65 1045.16 1193.92 1039.94L1194.43 1030.36C1194.7 1025.14 1199.16 1021.12 1204.39 1021.4C1209.61 1021.67 1213.63 1026.13 1213.35 1031.36L1212.85 1040.93C1212.58 1046.16 1208.12 1050.17 1202.89 1049.9Z"\r
                        fill="url(#paint19_linear_63_37)" />\r
                </g>\r
                <g id="fusee">\r
                    <mask id="path-700-inside-2_63_37" fill="white">\r
                        <path\r
                            d="M1214.57 984.759C1216.83 984.759 1218.66 986.591 1218.66 988.85L1218.66 1021.58C1218.66 1023.84 1216.83 1025.67 1214.57 1025.67L1192.06 1025.67C1189.8 1025.67 1187.97 1023.84 1187.97 1021.58L1187.97 988.85C1187.97 986.591 1189.8 984.759 1192.06 984.759L1214.57 984.759Z" />\r
                    </mask>\r
                    <path\r
                        d="M1214.57 984.759C1216.83 984.759 1218.66 986.591 1218.66 988.85L1218.66 1021.58C1218.66 1023.84 1216.83 1025.67 1214.57 1025.67L1192.06 1025.67C1189.8 1025.67 1187.97 1023.84 1187.97 1021.58L1187.97 988.85C1187.97 986.591 1189.8 984.759 1192.06 984.759L1214.57 984.759Z"\r
                        fill="url(#paint20_linear_63_37)" />\r
                    <path\r
                        d="M1218.66 988.85L1217.98 988.85L1217.98 1021.58L1218.66 1021.58L1219.34 1021.58L1219.34 988.85L1218.66 988.85ZM1214.57 1025.67L1214.57 1024.99L1192.06 1024.99L1192.06 1025.67L1192.06 1026.36L1214.57 1026.36L1214.57 1025.67ZM1187.97 1021.58L1188.66 1021.58L1188.66 988.85L1187.97 988.85L1187.29 988.85L1187.29 1021.58L1187.97 1021.58ZM1192.06 984.759L1192.06 985.441L1214.57 985.441L1214.57 984.759L1214.57 984.077L1192.06 984.077L1192.06 984.759ZM1187.97 988.85L1188.66 988.85C1188.66 986.967 1190.18 985.441 1192.06 985.441L1192.06 984.759L1192.06 984.077C1189.43 984.077 1187.29 986.214 1187.29 988.85L1187.97 988.85ZM1192.06 1025.67L1192.06 1024.99C1190.18 1024.99 1188.66 1023.47 1188.66 1021.58L1187.97 1021.58L1187.29 1021.58C1187.29 1024.22 1189.43 1026.36 1192.06 1026.36L1192.06 1025.67ZM1218.66 1021.58L1217.98 1021.58C1217.98 1023.47 1216.45 1024.99 1214.57 1024.99L1214.57 1025.67L1214.57 1026.36C1217.2 1026.36 1219.34 1024.22 1219.34 1021.58L1218.66 1021.58ZM1218.66 988.85L1219.34 988.85C1219.34 986.214 1217.2 984.077 1214.57 984.077L1214.57 984.759L1214.57 985.441C1216.45 985.441 1217.98 986.967 1217.98 988.85L1218.66 988.85Z"\r
                        fill="#6A7282" mask="url(#path-700-inside-2_63_37)" />\r
                    <g id="fenetre">\r
                        <mask id="path-702-inside-3_63_37" fill="white">\r
                            <path\r
                                d="M1202.91 990.248C1206.71 990.248 1209.79 993.332 1209.79 997.135C1209.79 1000.94 1206.71 1004.02 1202.91 1004.02C1199.1 1004.02 1196.02 1000.94 1196.02 997.135C1196.02 993.332 1199.1 990.248 1202.91 990.248Z" />\r
                        </mask>\r
                        <path\r
                            d="M1202.91 990.248C1206.71 990.248 1209.79 993.332 1209.79 997.135C1209.79 1000.94 1206.71 1004.02 1202.91 1004.02C1199.1 1004.02 1196.02 1000.94 1196.02 997.135C1196.02 993.332 1199.1 990.248 1202.91 990.248Z"\r
                            fill="url(#paint21_linear_63_37)" />\r
                        <path\r
                            d="M1196.02 997.135L1197.38 997.135C1197.38 994.085 1199.86 991.612 1202.91 991.612L1202.91 990.248L1202.91 988.884C1198.35 988.884 1194.66 992.578 1194.66 997.135L1196.02 997.135ZM1202.91 1004.02L1202.91 1002.66C1199.86 1002.66 1197.38 1000.19 1197.38 997.135L1196.02 997.135L1194.66 997.135C1194.66 1001.69 1198.35 1005.39 1202.91 1005.39L1202.91 1004.02ZM1209.79 997.135L1208.43 997.135C1208.43 1000.19 1205.96 1002.66 1202.91 1002.66L1202.91 1004.02L1202.91 1005.39C1207.46 1005.39 1211.16 1001.69 1211.16 997.135L1209.79 997.135ZM1209.79 997.135L1211.16 997.135C1211.16 992.578 1207.46 988.884 1202.91 988.884L1202.91 990.248L1202.91 991.612C1205.96 991.612 1208.43 994.085 1208.43 997.135L1209.79 997.135Z"\r
                            fill="#4A5565" mask="url(#path-702-inside-3_63_37)" />\r
                        <g id="Container_118">\r
                            <path\r
                                d="M1202.91 995.413C1203.86 995.413 1204.63 996.184 1204.63 997.135C1204.63 998.086 1203.86 998.857 1202.91 998.857C1201.96 998.857 1201.19 998.086 1201.19 997.135C1201.19 996.184 1201.96 995.413 1202.91 995.413Z"\r
                                fill="url(#paint22_linear_63_37)" />\r
                        </g>\r
                    </g>\r
                    <g id="trait2">\r
                        <rect x="1211.16" y="1015.44" width="-0.340956" height="15.684" rx="-0.170478"\r
                            transform="rotate(90 1211.16 1015.44)" fill="#6A7282" />\r
                    </g>\r
                    <g id="Container_119">\r
                        <rect x="1210.48" y="1007.94" width="0.340956" height="15.0021" rx="0.170478"\r
                            transform="rotate(90 1210.48 1007.94)" fill="#6A7282" />\r
                    </g>\r
                    <path id="pate_gauche" d="M1196.16 1013.4L1189.34 1028.26L1196.16 1024.55L1196.16 1013.4Z"\r
                        fill="url(#paint23_linear_63_37)" stroke="#666666" stroke-width="0.430452" />\r
                    <path id="pate_droite" d="M1210.48 1013.4L1217.3 1028.26L1210.48 1024.55L1210.48 1013.4Z"\r
                        fill="url(#paint24_linear_63_37)" stroke="#666666" stroke-width="0.430452" />\r
                    <path id="Polygon 1" d="M1216.06 984.929L1190.58 984.929L1203.32 958.938L1216.06 984.929Z"\r
                        fill="#FF4444" stroke="#6A7282" stroke-width="0.681912" />\r
                </g>\r
            </g>\r
        </g>\r
    </g>\r
    <defs>\r
        <filter id="filter0_d_63_37" x="1162.66" y="279.891" width="8.76562" height="9.9375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter1_d_63_37" x="1240.39" y="627.234" width="10.5156" height="10.4062"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter2_d_63_37" x="125.797" y="1247.81" width="10.5469" height="10.4844"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter3_d_63_37" x="83.1875" y="174.938" width="9.57812" height="10.9375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter4_d_63_37" x="1384.08" y="316.062" width="8.125" height="10.2188" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter5_d_63_37" x="612.297" y="1016.02" width="10.2031" height="8.17188"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter6_d_63_37" x="465.328" y="331.312" width="9.78125" height="8.45312"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter7_d_63_37" x="1256.88" y="1098.44" width="10.625" height="9.6875" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter8_d_63_37" x="333.672" y="105.969" width="10.1406" height="8.125" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter9_d_63_37" x="670.609" y="889.516" width="9.35938" height="10.8594"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter10_d_63_37" x="907.391" y="1230.25" width="8.26562" height="8.03125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter11_d_63_37" x="898.469" y="577.594" width="10.4062" height="9.07812"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter12_d_63_37" x="1182.78" y="986.375" width="8.84375" height="10.5312"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter13_d_63_37" x="13.2656" y="913.547" width="8.73438" height="8.01562"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter14_d_63_37" x="621.922" y="29.9531" width="10.0938" height="9.64062"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter15_d_63_37" x="977.391" y="106.672" width="9.34375" height="10.5" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter16_d_63_37" x="607.875" y="136" width="10.4375" height="9.1875" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter17_d_63_37" x="161.094" y="1324.02" width="10.7656" height="10.8906"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter18_d_63_37" x="710.266" y="760.922" width="8.67188" height="10.0156"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter19_d_63_37" x="847.484" y="1131.58" width="8.8125" height="10.4062"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter20_d_63_37" x="296.844" y="540.953" width="9.375" height="9.07812"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter21_d_63_37" x="1221.78" y="136.094" width="9.01562" height="9.82812"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter22_d_63_37" x="944.312" y="126.047" width="8.9375" height="8.78125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter23_d_63_37" x="1017.02" y="625.297" width="9.67188" height="8.09375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter24_d_63_37" x="966.438" y="572.406" width="10.0781" height="10.6875"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter25_d_63_37" x="519.797" y="584.422" width="9.07812" height="10.6562"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter26_d_63_37" x="1141.16" y="1355.73" width="9.71875" height="9.0625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter27_d_63_37" x="73" y="502.875" width="9.8125" height="9.5" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter28_d_63_37" x="349.641" y="683.781" width="10.3281" height="8.01562"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter29_d_63_37" x="232.781" y="599.219" width="10.7969" height="8.09375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter30_d_63_37" x="335.141" y="748.859" width="9.57812" height="10.5156"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter31_d_63_37" x="625.016" y="643.422" width="8.07812" height="8.14062"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter32_d_63_37" x="1307.86" y="29.25" width="9.375" height="10.3594" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter33_d_63_37" x="1269" y="334.391" width="9.26562" height="10.2812" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter34_d_63_37" x="1118.06" y="1177.17" width="9.0625" height="10.6719"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter35_d_63_37" x="1300.59" y="1033.19" width="10.3594" height="9.70312"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter36_d_63_37" x="510.547" y="783.453" width="10.6875" height="9.5" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter37_d_63_37" x="113.906" y="467.203" width="10.3438" height="8.375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter38_d_63_37" x="1370.27" y="728.234" width="10.3594" height="9.20312"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter39_d_63_37" x="217.156" y="1183.16" width="9.0625" height="10" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter40_d_63_37" x="1091.48" y="915.953" width="10.0156" height="9.9375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter41_d_63_37" x="184.969" y="150.734" width="9.9375" height="9.8125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter42_d_63_37" x="1502.03" y="943.203" width="10.625" height="8.64062"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter43_d_63_37" x="811.781" y="989.609" width="9.375" height="8.34375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter44_d_63_37" x="69.4375" y="231.688" width="10.2344" height="10.0625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter45_d_63_37" x="1116.97" y="1131.67" width="9.65625" height="9.76562"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter46_d_63_37" x="472.922" y="550.25" width="9.4375" height="9.53125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter47_d_63_37" x="1405.28" y="654.516" width="9.20312" height="9.73438"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter48_d_63_37" x="908.844" y="1081.66" width="8.375" height="10.5625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter49_d_63_37" x="316.922" y="573.719" width="9.73438" height="9.54688"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter50_d_63_37" x="673.859" y="123.016" width="10.3906" height="10.75"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter51_d_63_37" x="6.92188" y="75.7969" width="10.6719" height="8.875"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter52_d_63_37" x="1421.05" y="1101.34" width="8.4375" height="9.3125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter53_d_63_37" x="1085.83" y="986.656" width="10.6875" height="9.17188"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter54_d_63_37" x="188.922" y="1122.72" width="10.4531" height="8.34375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter55_d_63_37" x="1438.41" y="1153.95" width="8.98438" height="10.5938"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter56_d_63_37" x="246.094" y="886.266" width="8.90625" height="8.84375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter57_d_63_37" x="1403.84" y="868.312" width="10.6094" height="8.20312"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter58_d_63_37" x="791.797" y="771.188" width="8.40625" height="8.45312"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter59_d_63_37" x="1055.12" y="1283.62" width="8.84375" height="10.0469"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter60_d_63_37" x="824.75" y="1178.39" width="8.42188" height="9.10938"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter61_d_63_37" x="377.844" y="903.406" width="8.70312" height="9.89062"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter62_d_63_37" x="944.734" y="248.031" width="8.29688" height="8.78125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter63_d_63_37" x="875.781" y="298.062" width="8.75" height="10.7344" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter64_d_63_37" x="312.312" y="858.766" width="10.6406" height="8.5625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter65_d_63_37" x="463" y="287.062" width="10.2188" height="8.53125" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter66_d_63_37" x="1514.62" y="313.141" width="10.0312" height="8.90625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter67_d_63_37" x="1454.53" y="782.562" width="10.625" height="10.6094"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter68_d_63_37" x="639.438" y="826.641" width="8.29688" height="9.85938"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter69_d_63_37" x="700.062" y="268.844" width="8.67188" height="10.1094"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter70_d_63_37" x="756.234" y="387.516" width="9.98438" height="9.40625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter71_d_63_37" x="1236.41" y="717.969" width="8.92188" height="8.48438"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter72_d_63_37" x="43.0625" y="1235.05" width="8.67188" height="10.0938"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter73_d_63_37" x="1254.28" y="554.594" width="9.51562" height="9.90625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter74_d_63_37" x="634.094" y="715.516" width="8.45312" height="8.29688"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter75_d_63_37" x="278.281" y="983.062" width="9.98438" height="9.3125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter76_d_63_37" x="1192.5" y="595.391" width="8.42188" height="9.53125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter77_d_63_37" x="1202.47" y="700.188" width="9.25" height="10.8906" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter78_d_63_37" x="155.812" y="103.828" width="8.76562" height="10.2656"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter79_d_63_37" x="554.781" y="688.656" width="9.59375" height="8.23438"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter80_d_63_37" x="239.969" y="414.312" width="10.6406" height="9.90625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter81_d_63_37" x="848.891" y="992.766" width="8.26562" height="9.15625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter82_d_63_37" x="785.219" y="1301.25" width="8.57812" height="10.9688"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter83_d_63_37" x="748.812" y="426.156" width="10.7656" height="10.2031"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter84_d_63_37" x="662.656" y="609.672" width="8.5625" height="8.17188"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter85_d_63_37" x="836.094" y="773.781" width="10.3281" height="9.01562"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter86_d_63_37" x="1076.7" y="1265.72" width="8.07812" height="10" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter87_d_63_37" x="419.203" y="15.625" width="9.78125" height="8.78125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter88_d_63_37" x="889.938" y="1084.22" width="9.125" height="8.39062"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter89_d_63_37" x="185.062" y="813.703" width="10.3125" height="10.7969"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter90_d_63_37" x="128.688" y="607.016" width="10.8906" height="8.04688"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter91_d_63_37" x="1010.42" y="152.359" width="8.90625" height="10.4531"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter92_d_63_37" x="1203.02" y="1026.34" width="8.57812" height="9.8125"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter93_d_63_37" x="517.719" y="1280.2" width="10.5" height="9.85938" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter94_d_63_37" x="24.0781" y="76.3906" width="10.1406" height="9.21875"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter95_d_63_37" x="1428.58" y="212.266" width="8.65625" height="9.01562"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter96_d_63_37" x="101.75" y="697.469" width="9.20312" height="9.42188"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter97_d_63_37" x="736.625" y="995.672" width="10.8438" height="8.09375"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter98_d_63_37" x="1031.08" y="968.953" width="10.3125" height="10.0312"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter99_d_63_37" x="1399.69" y="957.891" width="9.67188" height="9.70312"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter100_d_63_37" x="705.75" y="0.71875" width="8.89062" height="8.57812"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter101_d_63_37" x="75.5312" y="510.188" width="8.71875" height="9.82812"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter102_d_63_37" x="1498.89" y="407.875" width="10.9375" height="8.40625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter103_d_63_37" x="78.5312" y="718.625" width="8.75" height="10.4844"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter104_d_63_37" x="956.422" y="281.594" width="8.51562" height="9.29688"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter105_d_63_37" x="625.719" y="9.07812" width="8.71875" height="10.7344"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter106_d_63_37" x="905.688" y="1105.06" width="8.35938" height="8.54688"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter107_d_63_37" x="49.8438" y="71.75" width="9.78125" height="10.6562"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter108_d_63_37" x="1449.91" y="338.312" width="10.3594" height="8.57812"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter109_d_63_37" x="671.812" y="971.031" width="8.42188" height="9.76562"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter110_d_63_37" x="284.734" y="882.609" width="8.9375" height="8.85938"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter111_d_63_37" x="670.078" y="402.828" width="10.1406" height="10.6094"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter112_d_63_37" x="1286.33" y="574" width="8.29688" height="8.73438" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter113_d_63_37" x="131.531" y="1331.73" width="10.4062" height="10.625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter114_d_63_37" x="1329.03" y="152.5" width="8.9375" height="9.15625"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter115_d_63_37" x="1502.28" y="529.766" width="9.76562" height="10.9062"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter116_d_63_37" x="870.562" y="210.594" width="8.375" height="9.54688"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"\r
                result="hardAlpha" />\r
            <feOffset />\r
            <feGaussianBlur stdDeviation="2" />\r
            <feComposite in2="hardAlpha" operator="out" />\r
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />\r
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_37" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_37" result="shape" />\r
        </filter>\r
        <filter id="filter117_f_63_37" x="798" y="53" width="2505" height="2074" filterUnits="userSpaceOnUse"\r
            color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />\r
            <feGaussianBlur stdDeviation="64" result="effect1_foregroundBlur_63_37" />\r
        </filter>\r
        <filter id="filter118_f_63_37" x="393.893" y="267.624" width="1022.59" height="1022.59"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />\r
            <feGaussianBlur stdDeviation="64" result="effect1_foregroundBlur_63_37" />\r
        </filter>\r
        <filter id="filter119_f_63_37" x="451.966" y="417.585" width="1054.95" height="1054.95"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />\r
            <feGaussianBlur stdDeviation="64" result="effect1_foregroundBlur_63_37" />\r
        </filter>\r
        <filter id="filter120_f_63_37" x="1190.7" y="1018.17" width="25.8772" height="34.9494"\r
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\r
            <feFlood flood-opacity="0" result="BackgroundImageFix" />\r
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />\r
            <feGaussianBlur stdDeviation="1.36382" result="effect1_foregroundBlur_63_37" />\r
        </filter>\r
        <radialGradient id="paint0_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1240 978) rotate(-90) scale(1472.49 1658.71)">\r
            <stop stop-color="#1A1F35" />\r
            <stop offset="0.5" stop-color="#0A0E1A" />\r
            <stop offset="1" />\r
        </radialGradient>\r
        <radialGradient id="paint1_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(2050.5 1090) rotate(-90) scale(1285.52 1590.28)">\r
            <stop stop-color="#00D9FF" stop-opacity="0.3" />\r
            <stop offset="0.7" stop-opacity="0" />\r
        </radialGradient>\r
        <radialGradient id="paint2_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(905.189 778.92) rotate(-90) scale(542.062)">\r
            <stop stop-color="#B84EFF" stop-opacity="0.3" />\r
            <stop offset="0.7" stop-opacity="0" />\r
        </radialGradient>\r
        <radialGradient id="paint3_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(979.441 945.06) rotate(-90) scale(564.943)">\r
            <stop stop-color="#00FF9F" stop-opacity="0.2" />\r
            <stop offset="0.7" stop-opacity="0" />\r
        </radialGradient>\r
        <radialGradient id="paint4_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1203 1010.69) scale(93.3271)">\r
            <stop stop-color="#FFF4E6" />\r
            <stop offset="0.3" stop-color="#FFD700" />\r
            <stop offset="0.7" stop-color="#FF8C00" stop-opacity="0.95" />\r
            <stop offset="1" stop-color="#FF6F00" stop-opacity="0.85" />\r
        </radialGradient>\r
        <radialGradient id="paint5_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1528 1470.78) scale(30.6498)">\r
            <stop stop-color="#00FFFF" />\r
            <stop offset="0.5" stop-color="#00FFFF" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint6_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1639.13 1627.21) scale(30.6498)">\r
            <stop stop-color="#FF00FF" />\r
            <stop offset="0.5" stop-color="#FF00FF" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint7_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1414.37 1301.57) scale(28.6646)">\r
            <stop stop-color="#FFD700" />\r
            <stop offset="0.5" stop-color="#FFD700" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint8_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1204.39 445.524) scale(30.6498)">\r
            <stop stop-color="#00FFFF" />\r
            <stop offset="0.5" stop-color="#00FFFF" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint9_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1210.08 651.327) scale(28.6646)">\r
            <stop stop-color="#FFD700" />\r
            <stop offset="0.5" stop-color="#FFD700" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint10_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1729.48 829.874) scale(30.6498 30.6498)">\r
            <stop stop-color="#00FFFF" />\r
            <stop offset="0.5" stop-color="#00FFFF" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint11_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1926.11 772.035) scale(30.6498 30.6498)">\r
            <stop stop-color="#FF00FF" />\r
            <stop offset="0.5" stop-color="#FF00FF" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint12_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(1544.27 895.275) scale(28.6646)">\r
            <stop stop-color="#FFD700" />\r
            <stop offset="0.5" stop-color="#FFD700" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint13_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(465.449 761.104) scale(32 32)">\r
            <stop stop-color="#FF00FF" />\r
            <stop offset="0.5" stop-color="#FF00FF" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint14_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(659.955 834.442) scale(30.6498 30.6498)">\r
            <stop stop-color="#00FFFF" />\r
            <stop offset="0.5" stop-color="#00FFFF" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint15_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(862.718 904.597) scale(28.6646)">\r
            <stop stop-color="#FFD700" />\r
            <stop offset="0.5" stop-color="#FFD700" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint16_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(735.771 1628.06) scale(32)">\r
            <stop stop-color="#FF00FF" />\r
            <stop offset="0.5" stop-color="#FF00FF" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint17_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(859.618 1461.18) scale(30.6498)">\r
            <stop stop-color="#00FFFF" />\r
            <stop offset="0.5" stop-color="#00FFFF" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <radialGradient id="paint18_radial_63_37" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"\r
            gradientTransform="translate(980.206 1293.6) scale(28.6646)">\r
            <stop stop-color="#FFD700" />\r
            <stop offset="0.5" stop-color="#FFD700" stop-opacity="0.8" />\r
            <stop offset="1" stop-color="#0A0F1A" stop-opacity="0.9" />\r
        </radialGradient>\r
        <linearGradient id="paint19_linear_63_37" x1="1194.18" y1="1035.15" x2="1213.1" y2="1036.14"\r
            gradientUnits="userSpaceOnUse">\r
            <stop stop-color="#FF6600" />\r
            <stop offset="0.3" stop-color="#FF9900" />\r
            <stop offset="0.6" stop-color="#FFCC00" />\r
        </linearGradient>\r
        <linearGradient id="paint20_linear_63_37" x1="1218.66" y1="1005.22" x2="1187.97" y2="1005.22"\r
            gradientUnits="userSpaceOnUse">\r
            <stop stop-color="#E5E7EB" />\r
            <stop offset="0.5" stop-color="#D1D5DC" />\r
            <stop offset="1" stop-color="#99A1AF" />\r
        </linearGradient>\r
        <linearGradient id="paint21_linear_63_37" x1="1209.79" y1="990.248" x2="1196.02" y2="1004.02"\r
            gradientUnits="userSpaceOnUse">\r
            <stop stop-color="#53EAFD" />\r
            <stop offset="1" stop-color="#2B7FFF" />\r
        </linearGradient>\r
        <linearGradient id="paint22_linear_63_37" x1="1204.63" y1="995.413" x2="1201.19" y2="998.857"\r
            gradientUnits="userSpaceOnUse">\r
            <stop stop-color="white" stop-opacity="0.8" />\r
            <stop offset="1" stop-opacity="0" />\r
        </linearGradient>\r
        <linearGradient id="paint23_linear_63_37" x1="1189.34" y1="1013.4" x2="1871.97" y2="1013.4"\r
            gradientUnits="userSpaceOnUse">\r
            <stop stop-color="#CC0000" />\r
            <stop offset="1" stop-color="#990000" />\r
        </linearGradient>\r
        <linearGradient id="paint24_linear_63_37" x1="1210.48" y1="1013.4" x2="1893.11" y2="1013.4"\r
            gradientUnits="userSpaceOnUse">\r
            <stop stop-color="#CC0000" />\r
            <stop offset="1" stop-color="#990000" />\r
        </linearGradient>\r
        <clipPath id="clip0_63_37">\r
            <rect width="2480" height="1956" fill="white" />\r
        </clipPath>\r
        <clipPath id="clip1_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(1589.39 1449.71)" />\r
        </clipPath>\r
        <clipPath id="clip2_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(1492.46 1529.02)" />\r
        </clipPath>\r
        <clipPath id="clip3_63_37">\r
            <rect width="18" height="18" fill="white" transform="translate(1701 1607)" />\r
        </clipPath>\r
        <clipPath id="clip4_63_37">\r
            <rect width="22" height="22" fill="white" transform="translate(1676 1669)" />\r
        </clipPath>\r
        <clipPath id="clip5_63_37">\r
            <rect width="18" height="18" fill="white" transform="translate(1558 1599)" />\r
        </clipPath>\r
        <clipPath id="clip6_63_37">\r
            <rect width="18" height="18" fill="white" transform="translate(1635 1553)" />\r
        </clipPath>\r
        <clipPath id="clip7_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1472.09 1282.21)" />\r
        </clipPath>\r
        <clipPath id="clip8_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1447.61 1345.26)" />\r
        </clipPath>\r
        <clipPath id="clip9_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1339.04 1303.01)" />\r
        </clipPath>\r
        <clipPath id="clip10_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(1265.64 424.452)" />\r
        </clipPath>\r
        <clipPath id="clip11_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1158.69 590.09)" />\r
        </clipPath>\r
        <clipPath id="clip12_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1224.83 579.69)" />\r
        </clipPath>\r
        <clipPath id="clip13_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(1790.87 809.172)" />\r
        </clipPath>\r
        <clipPath id="clip14_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(1669.02 871.01)" />\r
        </clipPath>\r
        <clipPath id="clip15_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(1867.66 814.17)" />\r
        </clipPath>\r
        <clipPath id="clip16_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1601.68 876.158)" />\r
        </clipPath>\r
        <clipPath id="clip17_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1545.82 952.836)" />\r
        </clipPath>\r
        <clipPath id="clip18_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1468.94 896.72)" />\r
        </clipPath>\r
        <clipPath id="clip19_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1524.91 820.316)" />\r
        </clipPath>\r
        <clipPath id="clip20_63_37">\r
            <rect width="20" height="20" fill="white" transform="translate(467.064 825.391)" />\r
        </clipPath>\r
        <clipPath id="clip21_63_37">\r
            <rect width="20" height="20" fill="white" transform="translate(443.836 677.008)" />\r
        </clipPath>\r
        <clipPath id="clip22_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(624.53 892.06)" />\r
        </clipPath>\r
        <clipPath id="clip23_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(676.228 757.843)" />\r
        </clipPath>\r
        <clipPath id="clip24_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(920.134 885.235)" />\r
        </clipPath>\r
        <clipPath id="clip25_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(903.924 940.822)" />\r
        </clipPath>\r
        <clipPath id="clip26_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(849.135 963.216)" />\r
        </clipPath>\r
        <clipPath id="clip27_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(789.368 875.795)" />\r
        </clipPath>\r
        <clipPath id="clip28_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(886.798 837.011)" />\r
        </clipPath>\r
        <clipPath id="clip29_63_37">\r
            <rect width="20" height="20" fill="white" transform="translate(759.714 1684.94)" />\r
        </clipPath>\r
        <clipPath id="clip30_63_37">\r
            <rect width="20" height="20" fill="white" transform="translate(672.853 1671.39)" />\r
        </clipPath>\r
        <clipPath id="clip31_63_37">\r
            <rect width="20" height="20" fill="white" transform="translate(659 1583.9)" />\r
        </clipPath>\r
        <clipPath id="clip32_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(895.045 1507.87)" />\r
        </clipPath>\r
        <clipPath id="clip33_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(824.077 1519.05)" />\r
        </clipPath>\r
        <clipPath id="clip34_63_37">\r
            <rect width="19.1561" height="19.1561" fill="white" transform="translate(805.032 1395.96)" />\r
        </clipPath>\r
        <clipPath id="clip35_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(1037.72 1274.04)" />\r
        </clipPath>\r
        <clipPath id="clip36_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(904.877 1295.04)" />\r
        </clipPath>\r
        <clipPath id="clip37_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(929.157 1231.85)" />\r
        </clipPath>\r
        <clipPath id="clip38_63_37">\r
            <rect width="17.9154" height="17.9154" fill="white" transform="translate(995.425 1221.96)" />\r
        </clipPath>\r
    </defs>\r
</svg>`;class _i{constructor(){this.root=Cr(q1)}html(){return q1}dom(){return this.root}getInteractions(){const r=this.root.querySelectorAll('g[id$="-container"]'),e=[];return r.forEach(t=>{const n=t.querySelector('[id^="planete-but"]'),i=t.querySelectorAll('[id^="bulle_ac"]');n&&i.length>0&&e.push({planet:n,bubbles:i})}),e}getGalaxy(){return this.root.querySelector("#etoile")}getSystem(){return this.root.querySelector("#Icon")}getRocket(){return this.root.querySelector("#fusee_container")}getRocketFire(){return this.root.querySelector("#fumee_fusee")}getSun(){return this.root.querySelector("#soleil")}getPlanets(){return this.root.querySelectorAll('[id^="planete-but"]')}getSunBubbles(){const r=this.getSun();return r?r.querySelectorAll('[id^="rond_"]'):[]}getPlanetGroups(){const r=this.root.querySelectorAll('g[id$="-container"]'),e=[];return r.forEach(t=>{t.querySelector('[id^="planete-but"]')&&e.push(t)}),e}getOrbits(){return[this.root.querySelector("#trait_niveau_1"),this.root.querySelector("#trait_niveau_2"),this.root.querySelector("#trait_niveau_3")]}}const gi=`<div>\r
  <!-- <h1 class="svg-demo1-title">\r
    Charger un SVG dans une page\r
  </h1> -->\r
  <section class="svg-demo1-container">\r
    <slot name="svg"></slot>\r
    <!-- <p>Chargement simple d'un composant SVG (flower), sans interaction, sans animation.</p> -->\r
  </section>\r
</div>`;let A={};A.showBubbles=function(a,r=!0){S.killTweensOf(a),r?S.to(a,{autoAlpha:1,scale:1,duration:.4,stagger:.05,ease:"back.out(1.5)",transformOrigin:"center center",overwrite:"auto"}):S.to(a,{autoAlpha:0,scale:0,duration:.3,stagger:.05,ease:"power2.in",transformOrigin:"center center",overwrite:"auto"})};A.animateGalaxy=function(a){a&&S.to(a,{rotation:360,duration:240,repeat:-1,ease:"linear",transformOrigin:"center center"})};A.animateSystem=function(a){a&&a.forEach(r=>{r&&S.to(r,{rotation:360,duration:300,repeat:-1,ease:"linear",transformOrigin:"center center"})})};A.floatElement=function(a,r=10,e=3){if(!a)return;(a.length?a:[a]).forEach(n=>{if(!n._floatAnim){const i=Math.random()*2,o=e+(Math.random()-.5);n._floatAnim=S.to(n,{y:`+=${r}`,duration:o,yoyo:!0,repeat:-1,ease:"sine.inOut",delay:i,transformOrigin:"center center"})}})};A.pulseElement=function(a,r=.9,e=1.1,t=2){if(!a)return;(a.length?a:[a]).forEach(i=>{S.fromTo(i,{scale:r},{scale:e,duration:t,yoyo:!0,repeat:-1,ease:"sine.inOut",transformOrigin:"center center"})})};A.wanderElement=function(a,r=20,e=3){if(!a)return;(a.length?a:[a]).forEach(n=>{const i=()=>{S.to(n,{x:(Math.random()-.5)*r*2,y:(Math.random()-.5)*r*2,duration:e+(Math.random()-.5),ease:"sine.inOut",onComplete:i,overwrite:"auto"})};i()})};A.animateRocketIdle=function(a,r){if(!a)return;if(a._currentAnimation&&(a._currentAnimation.kill(),a._currentAnimation=null),S.killTweensOf(a),r&&S.killTweensOf(r),!a._origin){let t=1216,n=1020;try{const i=a.getBBox();i.width>10&&(t=i.x+i.width/2,n=i.y+i.height/2)}catch{}a._origin={x:t,y:n}}const e=()=>{const l=200+Math.random()*1900,s=200+Math.random()*1500,d=l-a._origin.x,c=s-a._origin.y,p=S.getProperty(a,"x")||0,f=S.getProperty(a,"y")||0,h=d-p,_=c-f,u=Math.sqrt(h*h+_*_),y=Math.max(2,u/150),x=Math.atan2(_,h)*(180/Math.PI)+90,k=S.timeline({onComplete:e});a._currentAnimation=k,k.to(a,{rotation:x+"_short",duration:1,ease:"sine.inOut"}),r&&k.to(r,{scaleY:1.5,opacity:.9,duration:.5},"<"),k.to(a,{x:d,y:c,duration:y,ease:"sine.inOut"},">-0.5"),r&&(k.to(r,{scaleY:1.2,opacity:.7,duration:.5},"<0.5"),k.to(r,{scaleY:.8,opacity:.4,duration:1},"-=1.0"))};e(),r&&S.to(r,{scaleX:1.2,duration:.08,yoyo:!0,repeat:-1,ease:"linear"})};A.animateRocketLanding=function(a,r,e){if(!a||!r)return;a._currentAnimation&&(a._currentAnimation.kill(),a._currentAnimation=null),S.killTweensOf(a);const t=a.querySelector("#fumee_fusee");t&&S.killTweensOf(t);const n=a._origin||{x:1216,y:1020};let i=r;if(r.querySelector){const x=r.querySelector('[id*="radial"], circle');x&&(i=x)}const o=a.ownerSVGElement;function l(x){const k=o.createSVGPoint(),m=x.getBBox(),v=x.getCTM();return k.x=m.x+m.width/2,k.y=m.y+m.height/2,k.matrixTransform(v)}const s=l(i),d=a.parentNode.getCTM().inverse(),c=s.matrixTransform(d),p=c.x-n.x+20,f=c.y-n.y,h=S.getProperty(a,"x")||0,_=S.getProperty(a,"y")||0,u=p-h,g=f-300-_,y=Math.atan2(g,u)*(180/Math.PI)+90,C=S.timeline();a._currentAnimation=C,C.to(a,{rotation:y+"_short",duration:1,ease:"power2.out"}),t&&C.to(t,{scaleY:2.5,opacity:1,duration:.5},"<"),C.to(a,{x:p,y:f-300,duration:1.5,ease:"power2.inOut"},"<0.2"),C.to(a,{rotation:0,duration:.8,ease:"back.out(1.2)"}),C.to(a,{y:f,duration:1.2,ease:"power2.out"}),t&&C.to(t,{scaleY:0,opacity:0,duration:.2},">-0.2"),C.to(a,{y:"+=5",scaleY:.95,duration:.1,yoyo:!0,repeat:1}),C.add(()=>{e&&e()}),C.add(()=>{},"+=4"),C.add(()=>A.animateRocketIdle(a,t))};A.updateBubbleStyle=function(a,r){const e=a.querySelector("circle")||a.querySelector('path[id*="cercle"]');if(e){let n="#1E293B",i="0.4";r===1?(n="#f5b70bff",i="0.9"):r===2&&(n="#4dff88",i="1"),S.to(e,{fill:n,fillOpacity:i,duration:.3,overwrite:"auto"})}const t=a.querySelectorAll('[id*="icon"] path, [id*="Vector"]');if(t.length>0){let n="#64748B";r>0&&(n="#FFFFFF"),S.to(t,{stroke:n,duration:.3,overwrite:"auto"})}};A.animateHover=function(a,r){S.to(a,{scale:r?1.1:1,duration:.2,transformOrigin:"center center",overwrite:"auto"})};A.animatePlanetAmbient=function(a){if(!a)return;a.querySelectorAll("path").forEach(e=>{const t=e.id||"",n=t.includes("stroke")||t.includes("radial"),i=parseFloat(e.getAttribute("opacity")||"1");!n&&(i<.6||t.includes("Vector"))&&(e._ambientAnim||(e._ambientAnim=S.to(e,{rotation:360,duration:25+Math.random()*20,repeat:-1,ease:"linear",transformOrigin:"center center"})))})};A.updatePlanetVisuals=function(a,r){a&&(a._stateAnim&&(a._stateAnim.kill(),a._stateAnim=null),r===0?(S.to(a,{filter:"grayscale(100%) brightness(60%) contrast(110%)",duration:1,overwrite:"auto"}),a._stateAnim=S.to(a,{scale:.98,duration:3,yoyo:!0,repeat:-1,ease:"sine.inOut",transformOrigin:"center center"})):r>=1?(a._stateAnim=S.timeline({repeat:-1,yoyo:!0}),a._stateAnim.fromTo(a,{filter:"brightness(130%) saturate(140%) drop-shadow(0 0 20px rgba(255, 100, 0, 0.8))",scale:1},{filter:"brightness(170%) saturate(200%) drop-shadow(0 0 60px rgba(255, 120, 0, 1))",duration:.8,ease:"sine.inOut"}),A.animatePlanetAmbient(a),a._floatAnim&&(a._floatAnim.kill(),a._floatAnim=null),S.killTweensOf(a,"y"),S.set(a,{y:0})):(S.to(a,{filter:"none",scale:1,duration:1,overwrite:"auto"}),A.animatePlanetAmbient(a)))};const Ci=`<nav\r
    class="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 p-4 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 pointer-events-auto">\r
    <!-- History - Cyan -->\r
    <button id="btn-history"\r
        class="group w-12 h-12 flex items-center justify-center border rounded-xl hover:bg-opacity-10 transition-all duration-300 cursor-pointer border-[rgba(6, 182, 212, 0.3)]"\r
        style="color: var(--color-cyan-500);" title="Historique">\r
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"\r
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"\r
            class="group-hover:-translate-y-1 transition-transform duration-300">\r
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />\r
            <path d="M3 3v5h5" />\r
        </svg>\r
    </button>\r
\r
    <!-- Stats - Purple -->\r
    <button id="btn-stats"\r
        class="group w-12 h-12 flex items-center justify-center border rounded-xl hover:bg-opacity-10 t ransition-all duration-300 cursor-pointer border-[rgba(168, 85, 247, 0.3)]"\r
        style="color: var(--color-purple-500);" title="Statistiques">\r
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"\r
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"\r
            class="group-hover:-translate-y-1 transition-transform duration-300">\r
            <line x1="18" y1="20" x2="18" y2="10" />\r
            <line x1="12" y1="20" x2="12" y2="4" />\r
            <line x1="6" y1="20" x2="6" y2="14" />\r
        </svg>\r
    </button>\r
\r
    <!-- Export - Green -->\r
    <button id="btn-export"\r
        class="group w-12 h-12 flex items-center justify-center border rounded-xl hover:bg-opacity-10 transition-all duration-300 cursor-pointer border-[rgba(16, 185, 129, 0.3)]"\r
        style="color: var(--color-green-500);" title="Exporter le profil (JSON)">\r
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"\r
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"\r
            class="group-hover:-translate-y-1 transition-transform duration-300">\r
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />\r
            <polyline points="7 10 12 15 17 10" />\r
            <line x1="12" y1="15" x2="12" y2="3" />\r
        </svg>\r
    </button>\r
\r
    <!-- Share - Orange -->\r
    <!-- Import - Orange -->\r
    <button id="btn-import"\r
        class="group w-12 h-12 flex items-center justify-center border rounded-xl hover:bg-opacity-10 transition-all duration-300 cursor-pointer border-[rgba(249, 115, 22, 0.3)]"\r
        style="color: var(--color-orange-500);" title="Importer un profil">\r
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"\r
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"\r
            class="group-hover:-translate-y-1 transition-transform duration-300">\r
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />\r
            <polyline points="17 8 12 3 7 8" />\r
            <line x1="12" y1="3" x2="12" y2="15" />\r
        </svg>\r
    </button>\r
\r
    <!-- Hidden Input for Import -->\r
    <input type="file" id="input-import" accept=".json" class="hidden">\r
</nav>`;class mi{constructor(){this.root=Cr(Ci),this.statsBtn=this.root.querySelector("#btn-stats"),this.exportBtn=this.root.querySelector("#btn-export"),this.importBtn=this.root.querySelector("#btn-import"),this.importInput=this.root.querySelector("#input-import")}dom(){return this.root}onClickStats(r){this.statsBtn&&this.statsBtn.addEventListener("click",e=>{r()})}onClickExport(r){this.exportBtn&&this.exportBtn.addEventListener("click",()=>r())}onImportFile(r){this.importBtn&&this.importInput&&(this.importBtn.addEventListener("click",()=>{this.importInput.click()}),this.importInput.addEventListener("change",e=>{const t=e.target.files[0];t&&r(t),this.importInput.value=""}))}}const yi=`<aside id="stats-panel"\r
    class="fixed top-1/2 right-8 -translate-y-1/2 translate-offscreen w-80 bg-[#0B1121]/95 backdrop-blur-2xl border-l border-cyan-500/30 rounded-l-2xl p-6 text-white shadow-2xl transition-transform duration-500 ease-out z-50 pointer-events-auto flex flex-col h-auto max-h-[90vh] overflow-y-auto">\r
\r
    <header class="flex justify-between items-start mb-6 shrink-0">\r
        <section>\r
            <h2\r
                class="inline-block px-4 py-1.5 mb-3 text-sm font-bold tracking-wide uppercase border rounded-lg bg-opacity-30 text-[var(--color-cyan-500)] border-[var(--color-cyan-500)] bg-[color-mix(in_srgb,var(--color-cyan-500),transparent_90%)]">\r
                Statistiques\r
            </h2>\r
            <h3 class="text-lg font-medium text-gray-100">Progression des compétences</h3>\r
        </section>\r
        <button id="btn-close"\r
            class="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer">\r
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"\r
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                <line x1="18" y1="6" x2="6" y2="18" />\r
                <line x1="6" y1="6" x2="18" y2="18" />\r
            </svg>\r
        </button>\r
    </header>\r
\r
    <section class="mb-6 shrink-0 flex justify-center">\r
        <div class="relative w-full max-w-[280px] aspect-square bg-gray-900/50 rounded-2xl border border-gray-800 p-2">\r
\r
            <svg viewBox="0 0 300 280" class="w-full h-full overflow-visible">\r
                <g class="stroke-gray-700/50 stroke-1 fill-none" transform="translate(150, 150)">\r
                    <line x1="0" y1="0" x2="0" y2="-100" />\r
                    <line x1="0" y1="0" x2="95" y2="-31" />\r
                    <line x1="0" y1="0" x2="59" y2="81" />\r
                    <line x1="0" y1="0" x2="-59" y2="81" />\r
                    <line x1="0" y1="0" x2="-95" y2="-31" />\r
\r
                    <polygon points="0,-25 24,-8 15,20 -15,20 -24,-8" class="stroke-gray-800" />\r
                    <polygon points="0,-50 48,-15 29,40 -29,40 -48,-15" class="stroke-gray-700/30" />\r
                    <polygon points="0,-75 71,-23 44,61 -44,61 -71,-23" class="stroke-gray-700/30" />\r
                    <polygon points="0,-100 95,-31 59,81 -59,81 -95,-31" class="stroke-gray-600" />\r
                </g>\r
\r
                <g class="text-[0.6rem] fill-gray-400 font-medium text-center" style="text-anchor: middle;">\r
                    <text x="150" y="35" class="fill-[var(--color-ue-comprendre)] font-bold">Comprendre</text>\r
                    <text x="260" y="115" class="fill-[var(--color-ue-concevoir)] font-bold">Concevoir</text>\r
                    <text x="220" y="250" class="fill-[var(--color-ue-exprimer)] font-bold">Exprimer</text>\r
                    <text x="80" y="250" class="fill-[var(--color-ue-developper)] font-bold">Développer</text>\r
                    <text x="40" y="115" class="fill-[var(--color-ue-entreprendre)] font-bold">Entreprendre</text>\r
                </g>\r
\r
                <g transform="translate(150, 150)">\r
                    <polygon id="radar-data" points="0,0 0,0 0,0 0,0 0,0"\r
                        class="fill-[var(--color-cyan-500)]/20 stroke-[var(--color-cyan-500)] stroke-2 transition-all duration-1000 ease-out" />\r
                </g>\r
            </svg>\r
        </div>\r
    </section>\r
\r
    <h4 class="text-xs font-semibold text-gray-400 border-b border-gray-800 pb-3 mb-5 shrink-0">\r
        Détails par compétence\r
    </h4>\r
\r
    <ul class="space-y-4 grow font-sans mb-4">\r
        <li data-competence="Comprendre"\r
            class="p-4 rounded-xl border bg-opacity-10 hover:bg-opacity-20 transition-colors border-[color-mix(in_srgb,var(--color-ue-comprendre),transparent_50%)] bg-[color-mix(in_srgb,var(--color-ue-comprendre),transparent_90%)]">\r
            <header class="flex justify-between items-baseline mb-1">\r
                <h5 class="font-bold text-sm text-[var(--color-ue-comprendre)]">Comprendre</h5>\r
                <span class="value font-bold text-sm text-[var(--color-ue-comprendre)]">0%</span>\r
            </header>\r
            <p class="details text-[0.6875rem] text-gray-400 mb-3">0 / 0 points</p>\r
            <div class="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden" role="progressbar"\r
                aria-label="Progression Comprendre">\r
                <div\r
                    class="progress-bar h-full w-0 rounded-full shadow-[0_0_0.5rem_currentColor] transition-all duration-700 ease-out bg-[var(--color-ue-comprendre)] text-[var(--color-ue-comprendre)]">\r
                </div>\r
            </div>\r
        </li>\r
\r
        <li data-competence="Concevoir"\r
            class="p-4 rounded-xl border bg-opacity-10 hover:bg-opacity-20 transition-colors border-[color-mix(in_srgb,var(--color-ue-concevoir),transparent_50%)] bg-[color-mix(in_srgb,var(--color-ue-concevoir),transparent_90%)]">\r
            <header class="flex justify-between items-baseline mb-1">\r
                <h5 class="font-bold text-sm text-[var(--color-ue-concevoir)]">Concevoir</h5>\r
                <span class="value font-bold text-sm text-[var(--color-ue-concevoir)]">0%</span>\r
            </header>\r
            <p class="details text-[0.6875rem] text-gray-400 mb-3">0 / 0 points</p>\r
            <div class="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden" role="progressbar"\r
                aria-label="Progression Concevoir">\r
                <div\r
                    class="progress-bar h-full w-0 rounded-full shadow-[0_0_0.5rem_currentColor] transition-all duration-700 ease-out bg-[var(--color-ue-concevoir)] text-[var(--color-ue-concevoir)]">\r
                </div>\r
            </div>\r
        </li>\r
\r
        <li data-competence="Exprimer"\r
            class="p-4 rounded-xl border bg-opacity-10 hover:bg-opacity-20 transition-colors border-[color-mix(in_srgb,var(--color-ue-exprimer),transparent_50%)] bg-[color-mix(in_srgb,var(--color-ue-exprimer),transparent_90%)]">\r
            <header class="flex justify-between items-baseline mb-1">\r
                <h5 class="font-bold text-sm text-[var(--color-ue-exprimer)]">Exprimer</h5>\r
                <span class="value font-bold text-sm text-[var(--color-ue-exprimer)]">0%</span>\r
            </header>\r
            <p class="details text-[0.6875rem] text-gray-400 mb-3">0 / 0 points</p>\r
            <div class="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden" role="progressbar"\r
                aria-label="Progression Exprimer">\r
                <div\r
                    class="progress-bar h-full w-0 rounded-full shadow-[0_0_0.5rem_currentColor] transition-all duration-700 ease-out bg-[var(--color-ue-exprimer)] text-[var(--color-ue-exprimer)]">\r
                </div>\r
            </div>\r
        </li>\r
\r
        <li data-competence="Développer"\r
            class="p-4 rounded-xl border bg-opacity-10 hover:bg-opacity-20 transition-colors border-[color-mix(in_srgb,var(--color-ue-developper),transparent_50%)] bg-[color-mix(in_srgb,var(--color-ue-developper),transparent_90%)]">\r
            <header class="flex justify-between items-baseline mb-1">\r
                <h5 class="font-bold text-sm text-[var(--color-ue-developper)]">Développer</h5>\r
                <span class="value font-bold text-sm text-[var(--color-ue-developper)]">0%</span>\r
            </header>\r
            <p class="details text-[0.6875rem] text-gray-400 mb-3">0 / 0 points</p>\r
            <div class="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden" role="progressbar"\r
                aria-label="Progression Développer">\r
                <div\r
                    class="progress-bar h-full w-0 rounded-full shadow-[0_0_0.5rem_currentColor] transition-all duration-700 ease-out bg-[var(--color-ue-developper)] text-[var(--color-ue-developper)]">\r
                </div>\r
            </div>\r
        </li>\r
\r
        <li data-competence="Entreprendre"\r
            class="p-4 rounded-xl border bg-opacity-10 hover:bg-opacity-20 transition-colors border-[color-mix(in_srgb,var(--color-ue-entreprendre),transparent_50%)] bg-[color-mix(in_srgb,var(--color-ue-entreprendre),transparent_90%)]">\r
            <header class="flex justify-between items-baseline mb-1">\r
                <h5 class="font-bold text-sm text-[var(--color-ue-entreprendre)]">Entreprendre</h5>\r
                <span class="value font-bold text-sm text-[var(--color-ue-entreprendre)]">0%</span>\r
            </header>\r
            <p class="details text-[0.6875rem] text-gray-400 mb-3">0 / 0 points</p>\r
            <div class="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden" role="progressbar"\r
                aria-label="Progression Entreprendre">\r
                <div\r
                    class="progress-bar h-full w-0 rounded-full shadow-[0_0_0.5rem_currentColor] transition-all duration-700 ease-out bg-[var(--color-ue-entreprendre)] text-[var(--color-ue-entreprendre)]">\r
                </div>\r
            </div>\r
        </li>\r
    </ul>\r
\r
    <footer class="shrink-0 pt-4 border-t border-gray-800">\r
        <button id="btn-reset-data"\r
            class="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">\r
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"\r
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                <path d="M3 6h18"></path>\r
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>\r
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>\r
            </svg>\r
            Réinitialiser\r
        </button>\r
    </footer>\r
</aside>`;class ki{constructor(){this.root=Cr(yi),this.closeBtn=this.root.querySelector("#btn-close"),this.resetBtn=this.root.querySelector("#btn-reset-data"),this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.hide())}dom(){return this.root}onReset(r){this.resetBtn&&this.resetBtn.addEventListener("click",()=>{confirm("Attention : Voulez-vous vraiment effacer toute votre progression ?")&&r()})}show(){this.root.classList.remove("translate-offscreen"),this.root.classList.add("translate-x-0")}hide(){this.root.classList.remove("translate-x-0"),this.root.classList.add("translate-offscreen")}toggle(){this.root.classList.contains("translate-offscreen")?this.show():this.hide()}update(r){if(r){this.updateRadar(r);for(const[e,t]of Object.entries(r)){const n=this.root.querySelector(`li[data-competence="${e}"]`);if(n){const i=n.querySelector(".value"),o=n.querySelector(".details"),l=n.querySelector(".progress-bar");i&&(i.textContent=`${t.percent}%`),o&&(o.textContent=`${t.current} / ${t.total} points`),l&&(l.style.width=`${t.percent}%`)}}}}updateRadar(r){const e=this.root.querySelector("#radar-data");if(!e)return;const t=["Comprendre","Concevoir","Exprimer","Développer","Entreprendre"],n=[-90,-18,54,126,198],i=t.map((o,l)=>{const s=r[o],c=(s?s.percent:0)/100*100,p=n[l]*(Math.PI/180),f=c*Math.cos(p),h=c*Math.sin(p);return`${f},${h}`});e.setAttribute("points",i.join(" "))}}const xi=`<dialog id="popup-ac"\r
    class="backdrop:bg-black/80 rounded-2xl shadow-2xl p-0 bg-[color-mix(in_srgb,var(--color-dark-bg),transparent_5%)] text-white border border-cyan-500/30 w-[95vw] max-w-lg open:animate-fade-in focus:outline-none backdrop-blur-xl">\r
    <section class="flex flex-col h-full">\r
        <header class="p-6 pb-2 border-b border-white/5">\r
            <section class="flex items-start justify-between mb-4">\r
                <section>\r
                    <h2 id="ac-code" class="text-3xl font-black tracking-tight mb-2 text-[var(--color-cyan-500)]">\r
                        AC00.00</h2>\r
                    <h3 id="ac-label" class="text-lg font-medium text-gray-300 leading-snug">Libellé de l'AC</h3>\r
                </section>\r
                <section class="flex flex-col items-end gap-2">\r
                    <span id="badge-year"\r
                        class="px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-800 text-gray-400 border border-gray-700 tracking-wider">\r
                        BUT1\r
                    </span>\r
                    <span id="badge-ue"\r
                        class="text-[0.625rem] text-right text-gray-500 font-medium uppercase tracking-widest max-w-[7.5rem]">\r
                        Comprendre\r
                    </span>\r
                </section>\r
            </section>\r
        </header>\r
\r
        <article class="p-6 space-y-8">\r
            <section class="space-y-3">\r
                <header class="flex justify-between items-end">\r
                    <span class="text-xs uppercase tracking-widest text-gray-500 font-bold">Niveau Actuel</span>\r
                    <span id="status-text" class="text-sm font-bold text-white">Non acquis</span>\r
                </header>\r
                <span\r
                    class="block h-4 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50 p-[0.125rem]"\r
                    role="progressbar">\r
                    <span id="progress-bar"\r
                        class="block h-full rounded-full w-0 transition-all duration-500 ease-out bg-[var(--color-status-inactive)]">\r
                    </span>\r
                </span>\r
            </section>\r
\r
            <section class="grid grid-cols-1 gap-3">\r
                <header class="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Modifier le statut\r
                </header>\r
                <label\r
                    class="group relative flex items-center p-4 rounded-xl border border-gray-700/50 bg-gray-800/20 cursor-pointer hover:bg-gray-800/50 hover:border-gray-600 transition-all">\r
                    <input type="radio" name="ac-status" value="0" class="peer sr-only">\r
                    <span\r
                        class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 border border-gray-600 group-hover:border-gray-500 peer-checked:bg-[var(--color-red-500)] peer-checked:border-[var(--color-red-500)] peer-checked:text-white text-gray-500 transition-all">\r
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"\r
                            stroke-width="3" stroke-linecap="round" stroke-linejoin="round">\r
                            <line x1="18" y1="6" x2="6" y2="18"></line>\r
                            <line x1="6" y1="6" x2="18" y2="18"></line>\r
                        </svg>\r
                    </span>\r
                    <span class="flex-1 block">\r
                        <span\r
                            class="block font-bold text-gray-300 group-hover:text-white peer-checked:text-white transition-colors">\r
                            Non acquis</span>\r
                        <span class="block text-xs text-gray-500">Je ne maîtrise pas encore cette compétence.</span>\r
                    </span>\r
                    <span\r
                        class="absolute inset-0 border-2 border-transparent peer-checked:border-[var(--color-red-500)] peer-checked:border-opacity-50 rounded-xl transition-colors pointer-events-none">\r
                    </span>\r
                </label>\r
                <label\r
                    class="group relative flex items-center p-4 rounded-xl border border-gray-700/50 bg-gray-800/20 cursor-pointer hover:bg-gray-800/50 hover:border-gray-600 transition-all">\r
                    <input type="radio" name="ac-status" value="1" class="peer sr-only">\r
                    <span\r
                        class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 border border-gray-600 group-hover:border-gray-500 peer-checked:bg-[var(--color-orange-500)] peer-checked:border-[var(--color-orange-500)] peer-checked:text-white text-gray-500 transition-all">\r
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"\r
                            stroke-width="3" stroke-linecap="round" stroke-linejoin="round">\r
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>\r
                        </svg>\r
                    </span>\r
                    <span class="flex-1 block">\r
                        <span\r
                            class="block font-bold text-gray-300 group-hover:text-white peer-checked:text-white transition-colors">\r
                            En cours d'acquisition</span>\r
                        <span class="block text-xs text-gray-500">Je commence à comprendre mais j'ai besoin\r
                            d'aide.</span>\r
                    </span>\r
                    <span\r
                        class="absolute inset-0 border-2 border-transparent peer-checked:border-[var(--color-orange-500)] peer-checked:border-opacity-50 rounded-xl transition-colors pointer-events-none">\r
                    </span>\r
                </label>\r
\r
                <label\r
                    class="group relative flex items-center p-4 rounded-xl border border-gray-700/50 bg-gray-800/20 cursor-pointer hover:bg-gray-800/50 hover:border-gray-600 transition-all">\r
                    <input type="radio" name="ac-status" value="2" class="peer sr-only">\r
                    <span\r
                        class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 border border-gray-600 group-hover:border-gray-500 peer-checked:bg-[var(--color-green-500)] peer-checked:border-[var(--color-green-500)] peer-checked:text-white text-gray-500 transition-all">\r
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"\r
                            stroke-width="3" stroke-linecap="round" stroke-linejoin="round">\r
                            <polyline points="20 6 9 17 4 12"></polyline>\r
                        </svg>\r
                    </span>\r
                    <span class="flex-1 block">\r
                        <span\r
                            class="block font-bold text-gray-300 group-hover:text-white peer-checked:text-white transition-colors">\r
                            Acquis</span>\r
                        <span class="block text-xs text-gray-500">Je maîtrise cette compétence en autonomie.</span>\r
                    </span>\r
                    <span\r
                        class="absolute inset-0 border-2 border-transparent peer-checked:border-[var(--color-green-500)] peer-checked:border-opacity-50 rounded-xl transition-colors pointer-events-none">\r
                    </span>\r
                </label>\r
            </section>\r
\r
            <!-- Justificatif Section -->\r
            <section class="space-y-3">\r
                <header class="text-xs uppercase tracking-widest text-gray-500 font-bold">Justificatif</header>\r
\r
                <!-- Commentaire -->\r
                <textarea id="ac-comment"\r
                    class="w-full bg-[color-mix(in_srgb,var(--color-dark-bg),transparent_20%)] border border-gray-700 rounded-xl p-3 text-sm text-[var(--color-text-main)] placeholder-gray-600 focus:outline-none focus:border-[var(--color-cyan-500)] transition-colors resize-none h-24"\r
                    placeholder="Ajouter un commentaire..."></textarea>\r
\r
                <!-- Fichier -->\r
                <label class="flex items-center gap-3 cursor-pointer">\r
                    <button id="btn-file" type="button"\r
                        class="px-4 py-2 bg-[var(--color-card-bg)] border border-gray-700 rounded-lg text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2">\r
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">\r
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\r
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>\r
                        </svg>\r
                        Importer un fichier\r
                    </button>\r
                    <span id="file-name" class="text-xs text-gray-500 italic truncate max-w-[12.5rem]">Aucun fichier\r
                        selectionné</span>\r
                    <input type="file" id="input-file" class="hidden">\r
                    <button id="btn-file-delete" type="button"\r
                        class="hidden text-[var(--color-red-500)] hover:text-red-400 p-1">\r
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">\r
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\r
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">\r
                            </path>\r
                        </svg>\r
                    </button>\r
                </label>\r
            </section>\r
        </article>\r
        <footer class="p-6 pt-0 flex justify-end gap-3 mt-auto">\r
            <button id="btn-cancel"\r
                class="px-6 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all">\r
                Annuler\r
            </button>\r
            <button id="btn-save"\r
                class="px-8 py-3 rounded-xl text-sm font-bold text-white bg-[var(--color-blue-500)] hover:bg-blue-600 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0">\r
                Sauvegarder\r
            </button>\r
        </footer>\r
    </section>\r
</dialog>`;class wi{constructor(){this.root=Cr(xi),this.dialog=this.root,this.codeEl=this.root.querySelector("#ac-code"),this.labelEl=this.root.querySelector("#ac-label"),this.yearBadge=this.root.querySelector("#badge-year"),this.ueBadge=this.root.querySelector("#badge-ue"),this.statusText=this.root.querySelector("#status-text"),this.progressBar=this.root.querySelector("#progress-bar"),this.radios=this.root.querySelectorAll('input[name="ac-status"]'),this.btnCancel=this.root.querySelector("#btn-cancel"),this.btnSave=this.root.querySelector("#btn-save"),this.commentEl=this.root.querySelector("#ac-comment"),this.btnFile=this.root.querySelector("#btn-file"),this.inputFile=this.root.querySelector("#input-file"),this.fileName=this.root.querySelector("#file-name"),this.btnFileDelete=this.root.querySelector("#btn-file-delete"),this.currentFile=null,this.onSave=null,this.init()}dom(){return this.root}init(){this.btnCancel.addEventListener("click",()=>this.close()),this.dialog.addEventListener("click",r=>{r.target===this.dialog&&this.close()}),this.radios.forEach(r=>{r.addEventListener("change",()=>{this.updateStatus(parseInt(r.value))})}),this.btnFile.addEventListener("click",()=>this.inputFile.click()),this.inputFile.addEventListener("change",r=>{if(r.target.files.length>0){const e=r.target.files[0];this.currentFile=e.name,this.fileName.textContent=e.name,this.fileName.className="text-xs text-white truncate max-w-[200px]",this.btnFileDelete.classList.remove("hidden")}}),this.btnFileDelete.addEventListener("click",()=>{this.currentFile=null,this.inputFile.value="",this.fileName.textContent="Aucun fichier selectionné",this.fileName.className="text-xs text-gray-500 italic truncate max-w-[200px]",this.btnFileDelete.classList.add("hidden")}),this.btnSave.addEventListener("click",()=>{const r=Array.from(this.radios).find(e=>e.checked);r&&this.onSave&&this.onSave({status:parseInt(r.value),comment:this.commentEl.value,file:this.currentFile}),this.close()})}open(r,e,t){const{ac:n,niveau:i,competence:o}=r;this.codeEl.textContent=n.code,this.labelEl.textContent=n.libelle,this.yearBadge.textContent=i.annee,this.ueBadge.textContent=o.nom_court;let l=0,s="",d=null;typeof e=="object"&&e!==null?(l=e.status||0,s=e.comment||"",d=e.file||null):typeof e=="number"&&(l=e),this.radios.forEach(c=>{c.checked=parseInt(c.value)===l}),this.commentEl.value=s,this.currentFile=d,d?(this.fileName.textContent=d,this.fileName.className="text-xs text-white truncate max-w-[12.5rem]",this.btnFileDelete.classList.remove("hidden")):(this.fileName.textContent="Aucun fichier selectionné",this.fileName.className="text-xs text-gray-500 italic truncate max-w-[12.5rem]",this.btnFileDelete.classList.add("hidden")),this.onSave=t,this.updateColors(o.nom_court),this.updateStatus(l),this.dialog.showModal?this.dialog.showModal():this.dialog.setAttribute("open","")}close(){this.dialog.close?this.dialog.close():this.dialog.removeAttribute("open")}updateStatus(r){let e="Non acquis",t="w-0",n="bg-[var(--color-red-500)]";r===1?(e="En cours",t="w-1/2",n="bg-[var(--color-orange-500)]"):r===2&&(e="Acquis",t="w-full",n="bg-[var(--color-green-500)]"),this.statusText.textContent=e,this.progressBar.className=`h-full rounded-full transition-all duration-500 ease-out ${t} ${n}`}updateColors(r){let e="text-gray-400",t="border-gray-700";const n=r.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");n==="comprendre"?(e="text-[var(--color-ue-comprendre)]",t="border-[var(--color-ue-comprendre)]"):n==="concevoir"?(e="text-[var(--color-ue-concevoir)]",t="border-[var(--color-ue-concevoir)]"):n==="exprimer"?(e="text-[var(--color-ue-exprimer)]",t="border-[var(--color-ue-exprimer)]"):n==="developper"?(e="text-[var(--color-ue-developper)]",t="border-[var(--color-ue-developper)]"):n==="entreprendre"&&(e="text-[var(--color-ue-entreprendre)]",t="border-[var(--color-ue-entreprendre)]"),this.codeEl.className=`text-3xl font-black tracking-tight mb-2 ${e}`,this.yearBadge.className=`px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-800 tracking-wider border ${e} ${t}`}}const vi=`<aside id="ac-tooltip"\r
    class="fixed hidden z-50 pointer-events-none bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl border border-slate-700 transition-opacity duration-200">\r
    <p class="text-xs font-bold text-cyan-400 mb-0.5" id="tooltip-code">AC00.00</p>\r
    <p class="text-xs text-slate-200 max-w-[12.5rem]" id="tooltip-label">Description...</p>\r
    <p class="text-[0.625rem] uppercase tracking-wider font-bold mt-1.5" id="tooltip-status">Non acquis</p>\r
</aside>`;class Bi{constructor(){this.root=Cr(vi),this.codeEl=this.root.querySelector("#tooltip-code"),this.labelEl=this.root.querySelector("#tooltip-label"),this.statusEl=this.root.querySelector("#tooltip-status")}dom(){return this.root}show(r,e,t=0){this.codeEl.textContent=r.code,this.labelEl.textContent=r.libelle;let n="Non acquis",i="text-[var(--color-status-inactive)]";t===1?(n="En cours d'acquisition",i="text-[var(--color-status-progress)]"):t===2&&(n="Acquis",i="text-[var(--color-status-active)]"),this.statusEl.textContent=n,this._lastStatusClass&&this.statusEl.classList.remove(this._lastStatusClass),this.statusEl.classList.add(i),this._lastStatusClass=i,this.codeEl.classList.contains("text-cyan-400")&&this.codeEl.classList.remove("text-cyan-400"),this._lastUEClass&&this.codeEl.classList.remove(this._lastUEClass);const o=this.getUEColorClass(r.code);this.codeEl.classList.add(o),this._lastUEClass=o,this.codeEl.style.color="",this.root.classList.remove("hidden"),this.move(e)}getUEColorClass(r){const e=r.match(/AC\d(\d)\./i);if(!e)return"text-cyan-400";switch(parseInt(e[1])){case 1:return"text-[var(--color-ue-comprendre)]";case 2:return"text-[var(--color-ue-concevoir)]";case 3:return"text-[var(--color-ue-exprimer)]";case 4:return"text-[var(--color-ue-developper)]";case 5:return"text-[var(--color-ue-entreprendre)]";default:return"text-cyan-400"}}hide(){this.root.classList.add("hidden")}move(r){const e=r.clientX+15,t=r.clientY+15;this.root.style.left=`${e}px`,this.root.style.top=`${t}px`}}const Fi=`<aside id="history-panel"\r
    class="fixed top-1/2 right-8 -translate-y-1/2 translate-offscreen w-[24rem] bg-[color-mix(in_srgb,var(--color-dark-bg),transparent_5%)] backdrop-blur-2xl border-l border-cyan-500/30 rounded-l-2xl p-6 text-white shadow-2xl transition-transform duration-500 ease-out z-50 pointer-events-auto flex flex-col h-auto max-h-[85vh]">\r
    <!-- Header -->\r
    <header class="flex justify-between items-start mb-6 shrink-0">\r
        <section>\r
            <h2\r
                class="inline-block px-4 py-1.5 mb-3 text-sm font-bold tracking-wide uppercase border rounded-lg text-[var(--color-cyan-500)] border-[var(--color-cyan-500)] bg-[color-mix(in_srgb,var(--color-cyan-500),transparent_90%)]">\r
                Historique\r
            </h2>\r
            <h3 class="text-lg font-medium text-gray-100">Historique des modifications</h3>\r
            <span id="history-count"\r
                class="inline-block mt-2 px-3 py-1 text-xs font-medium bg-cyan-900/40 text-cyan-300 rounded-full border border-cyan-700/30">\r
                Total: 0 modifications\r
            </span>\r
        </section>\r
        <button id="btn-close-history" aria-label="Fermer l'historique"\r
            class="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer">\r
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"\r
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\r
                <line x1="18" y1="6" x2="6" y2="18" />\r
                <line x1="6" y1="6" x2="18" y2="18" />\r
            </svg>\r
        </button>\r
    </header>\r
\r
    <!-- History List -->\r
    <section class="overflow-y-auto grow custom-scrollbar pr-2">\r
        <ul id="history-list" class="space-y-3 font-sans">\r
            <!-- Items will be injected here via JS -->\r
        </ul>\r
\r
        <p id="empty-history" class="hidden text-center py-10 text-gray-500 text-sm italic">\r
            Aucune modification récente.\r
        </p>\r
    </section>\r
\r
    <!-- Footer -->\r
    <footer class="shrink-0 pt-4 mt-2 border-t border-gray-800 text-center">\r
        <p class="text-[0.625rem] text-gray-600 italic">L'historique est sauvegardé localement sur cet appareil.</p>\r
    </footer>\r
</aside>`,bi=`<li class="history-item">\r
    <article\r
        class="bg-[color-mix(in_srgb,var(--color-cyan-500),transparent_95%)] border border-[color-mix(in_srgb,var(--color-cyan-500),transparent_80%)] rounded-xl p-4 hover:bg-[color-mix(in_srgb,var(--color-cyan-500),transparent_90%)] transition-colors group">\r
        <header class="flex justify-between items-start mb-2">\r
            <span\r
                class="font-bold text-sm text-[var(--color-pink-500)] group-hover:text-[var(--color-pink-500)] transition-colors">{{code}}</span>\r
            <time datetime="{{isoDate}}" class="text-[0.625rem] text-gray-500 font-mono">{{dateStr}}</time>\r
        </header>\r
        <p class="text-xs text-gray-300 mb-3 line-clamp-2 leading-relaxed" title="{{label}}">{{label}}</p>\r
        <footer class="flex items-center gap-2 text-[0.625rem] uppercase font-bold tracking-widest">\r
            <span class="px-2 py-1 rounded-md {{oldStatusClass}}">{{oldStatusText}}</span>\r
            <svg class="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">\r
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">\r
                </path>\r
            </svg>\r
            <span class="px-2 py-1 rounded-md {{newStatusClass}}">{{newStatusText}}</span>\r
        </footer>\r
    </article>\r
</li>`;class Mi{constructor(){this.root=Cr(Fi),this.closeBtn=this.root.querySelector("#btn-close-history"),this.listEl=this.root.querySelector("#history-list"),this.countEl=this.root.querySelector("#history-count"),this.emptyEl=this.root.querySelector("#empty-history"),this.closeBtn&&this.closeBtn.addEventListener("click",()=>this.hide())}dom(){return this.root}show(){this.root.classList.remove("translate-offscreen"),this.root.classList.add("translate-x-0")}hide(){this.root.classList.remove("translate-x-0"),this.root.classList.add("translate-offscreen")}toggle(){this.root.classList.contains("translate-offscreen")?this.show():this.hide()}update(r,e){if(!r||r.length===0){this.listEl.innerHTML="",this.countEl.textContent="Total: 0 modifications",this.emptyEl.classList.remove("hidden");return}this.emptyEl.classList.add("hidden"),this.countEl.textContent=`Total: ${r.length} modifications`,this.listEl.innerHTML="",r.forEach(t=>{const n=this.createItem(t,e);this.listEl.appendChild(n)})}createItem(r,e){let t="Compétence inconnue";e&&typeof e.getACLibelle=="function"&&(t=e.getACLibelle(r.code));const n=new Date(r.date),i=n.toLocaleDateString("fr-FR")+" "+n.toLocaleTimeString("fr-FR"),o={0:{text:"Non acquis",class:"bg-[color-mix(in_srgb,var(--color-red-500),transparent_90%)] text-[var(--color-red-500)] border-[color-mix(in_srgb,var(--color-red-500),transparent_80%)] border"},1:{text:"En cours",class:"bg-[color-mix(in_srgb,var(--color-orange-500),transparent_90%)] text-[var(--color-orange-500)] border-[color-mix(in_srgb,var(--color-orange-500),transparent_80%)] border"},2:{text:"Acquis",class:"bg-[color-mix(in_srgb,var(--color-green-500),transparent_90%)] text-[var(--color-green-500)] border-[color-mix(in_srgb,var(--color-green-500),transparent_80%)] border"}},l=o[r.oldStatus]||o[0],s=o[r.newStatus]||o[0];let d=bi.replace("{{code}}",r.code).replace("{{isoDate}}",r.date).replace("{{dateStr}}",i).replaceAll("{{label}}",t).replace("{{oldStatusClass}}",l.class).replace("{{oldStatusText}}",l.text).replace("{{newStatusClass}}",s.class).replace("{{newStatusText}}",s.text);return Cr(d)}}class Si{constructor(){this.data={},this.history=[],this.load()}load(){const r=localStorage.getItem("sae303-profile");if(r)try{const e=JSON.parse(r);e.history&&Array.isArray(e.history)?(this.data=e.data||{},this.history=e.history):(this.data=e,this.history=[])}catch(e){console.error("Erreur chargement profil",e),this.data={},this.history=[]}}reset(){this.data={},this.history=[],this.save()}save(){const r={data:this.data,history:this.history};localStorage.setItem("sae303-profile",JSON.stringify(r))}getStatus(r){const e=this.data[r];return e&&typeof e=="object"?e.status||0:e||0}getData(r){const e=this.data[r];return e&&typeof e=="object"?e:{status:e||0,comment:"",file:null}}setStatus(r,e){let t=0,n={};const i=this.getData(r),o=i.status;typeof e=="object"?(t=e.status,n=e):(t=e,n={...i,status:t}),(t!==o||JSON.stringify(n)!==JSON.stringify(i))&&(this.data[r]=n,t!==o&&this.history.unshift({date:new Date().toISOString(),code:r,oldStatus:o,newStatus:t}),this.save())}exportData(){const r={acs:this.data,history:this.history};return JSON.stringify(r,null,2)}importData(r){const e=JSON.parse(r);return e&&typeof e=="object"?(e.acs?(this.data=e.acs,this.history=Array.isArray(e.history)?e.history:[]):this.data=e,this.save(),!0):(console.error("Erreur import JSON"),!1)}calculateStats(r){if(!r)return{};const e={};for(const t in r){const n=r[t];if(!n||!n.niveaux)continue;const i=n.nom_court;let o=0,l=0;for(const d of n.niveaux)for(const c of d.acs)l+=2,o+=this.getStatus(c.code);const s=l===0?0:Math.round(o/l*1e3)/10;e[i]={current:o,total:l,percent:s}}return e}getLevelStats(r){const e={};return!r||!Array.isArray(r)||r.forEach(t=>{if(!t.niveaux)return;const n=t.nom_court.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");t.niveaux.forEach((i,o)=>{const l=o+1;let s=0,d=0;i.acs.forEach(p=>{s+=2,d+=this.getStatus(p.code)});const c=s===0?0:d/s;e[`but${l}-${n}`]=c})}),e}}const Ai=JSON.parse(`[{"nom_court":"Comprendre","numero":1,"numero_identifiant":1,"libelle_long":"Comprendre les écosystèmes, les besoins des utilisateurs et les dispositifs de communication numérique","couleur":"c1","situations":["Prestataire : Les livrables constituent la première étape de la mission, qui se poursuit avec du conseil et de la production (agence de communication digitale, consultant...).","Organisation traditionnelle : Les livrables sont produits par les services de l’organisation qui peut être une entreprise, une administration ou une association.","Start-up : Les livrables sont utilisés de façon itérative pour améliorer le produit créé par l’organisation, amélioration pilotée par un product owner."],"composantes_essentielles":["en intégrant les enjeux humains, écologiques et éthiques","en écoutant et observant les utilisateurs","en s’appuyant sur des données quantitatives pertinentes et des outils statistiques adaptés","en sollicitant des modèles théoriques issus des sciences humaines et sociales"],"niveaux":[{"ordre":1,"libelle":"Comprendre les éléments de communication et les attentes utilisateurs","annee":"BUT1","acs":[{"code":"AC11.01","libelle":"Présenter une organisation, ses activités et son environnement (économique, sociologique, culturel, juridique, technologique, communicationnel et médiatique)"},{"code":"AC11.02","libelle":"Évaluer un site web, un produit multimédia ou un dispositif interactif existant en s’appuyant sur des guides de bonnes pratiques"},{"code":"AC11.03","libelle":"Produire des analyses statistiques descriptives et les interpréter pour évaluer un contexte socio-économique"},{"code":"AC11.04","libelle":"Analyser des formes médiatiques et leur sémiotique"},{"code":"AC11.05","libelle":"Identifier les cibles (critères socio-économiques, démographiques, géographiques, culturels...)"},{"code":"AC11.06","libelle":"Réaliser des entretiens utilisateurs pour construire des personae et des récits utilisateurs (user stories)"}]},{"ordre":2,"libelle":"Comprendre la stratégie de communication et l’expérience utilisateur","annee":"BUT2","acs":[{"code":"AC21.01","libelle":"Analyser la stratégie de communication ou marketing d’un acteur, d’une organisation au regard d’un secteur ou d’un marché (stratégie, mission, valeurs...)"},{"code":"AC21.02","libelle":"Auditer un site web, une marque ou un service, en termes de trafic et de référencement"},{"code":"AC21.03","libelle":"Traiter des données avec des outils statistiques pour faciliter leur analyse et leur exploitation"},{"code":"AC21.04","libelle":"Identifier et décrire les parcours client à partir d’enquêtes de terrain"},{"code":"AC21.05","libelle":"Cartographier les expériences utilisateur : points de contact, points de friction et de satisfaction, carte d’empathie."}]}]},{"nom_court":"Concevoir","numero":2,"numero_identifiant":2,"libelle_long":"Concevoir ou co-concevoir une réponse stratégique pertinente à une problématique complexe","couleur":"c2","situations":["Prestataire : Livrables sous forme de recommandation stratégique, dans une approche de communication ou de conception de produit / service.","Organisation traditionnelle : Direction marketing, communication, DPO, CRM… dans une entreprise, une administration ou une association.","Start-up : Les livrables sont utilisés de façon itérative pour améliorer le produit créé par l’organisation, amélioration pilotée par un product owner."],"composantes_essentielles":["en optimisant la responsabilité sociale et environnementale de l’organisation","en s’intégrant aux écosystèmes physiques et numériques des parties prenantes","en s’appuyant sur les usages et les modes de communication observés","en enrichissant sa démarche de connaissances sociologiques, esthétiques, culturelles et inter-culturelles","en présentant de façon convaincante la réponse proposée, en français, en anglais ou dans d’autres langues"],"niveaux":[{"ordre":1,"libelle":"Concevoir une réponse stratégique","annee":"BUT1","acs":[{"code":"AC12.01","libelle":"Concevoir un produit ou un service en terme d’usage et de fonctionnalité"},{"code":"AC12.02","libelle":"Construire la proposition de valeur d’un produit ou d’un service"},{"code":"AC12.03","libelle":"Proposer une recommandation marketing (cibles, objectifs, points de contact)"},{"code":"AC12.04","libelle":"Proposer une stratégie de communication"}]},{"ordre":2,"libelle":"Co-concevoir une réponse stratégique","annee":"BUT2","acs":[{"code":"AC22.01","libelle":"Co-concevoir un produit ou un service (proposition de valeur, fonctionnalités...)"},{"code":"AC22.02","libelle":"Produire une recommandation ergonomique à partir des tests utilisateurs (sur système fonctionnel, prototype ou maquette interactive)"},{"code":"AC22.03","libelle":"Co-construire une recommandation stratégique (en structurant un plan d’action)"},{"code":"AC22.04","libelle":"Optimiser le référencement d’un site web, d’un produit ou d’un service"},{"code":"AC22.05","libelle":"Mettre en place une présence sur les réseaux sociaux"}]},{"ordre":3,"libelle":"Co-concevoir une réponse stratégique complexe et prospective","annee":"BUT3","acs":[{"code":"AC32.01","libelle":"Projeter les futurs possibles d’une organisation, d’une marque, d’un service, produit ou secteur (tendances, évolutions, scénarios prospectifs)"},{"code":"AC32.02","libelle":"Co-construire un produit ou service de manière itérative (ateliers de créativité, idéation, définition de l’expérience utilisateur, exploitation des résultats de test)"},{"code":"AC32.03","libelle":"Concevoir et mettre en oeuvre une communication 360, plurimédia ou transmédia"},{"code":"AC32.04","libelle":"Construire des outils de validation et de suivi (flux, indicateurs de performance, tableaux de bord, référencement, engagement...)"}]}]},{"nom_court":"Exprimer","numero":3,"numero_identifiant":3,"libelle_long":"Exprimer un message avec les médias numériques pour informer et communiquer","couleur":"c3","situations":["Prestataire : Création et réalisation de contenu multimédia dans une agence généraliste ou spécialisée (agence de communication digitale, studio graphique, studio digital, production de jeu vidéo, production vidéo…).","Organisation traditionnelle : Service intégré dans une entreprise, une administration ou une association : production interne et gestion des utilisateurs.","Start-up : Itérations continues : le discours s’adapte aux évolutions de l’entreprise, de son marché et de sa communauté."],"composantes_essentielles":["en veillant à la qualité esthétique des créations et en la justifiant par des références culturelles et artistiques","en produisant un discours de qualité, appuyé sur les théories du récit et les traditions narratives","en respectant la stratégie de communication établie","en veillant à la qualité orthographique, grammaticale et typographique des productions","en communiquant en français, en anglais ou dans d’autres langues"],"niveaux":[{"ordre":1,"libelle":"Exprimer un message par des productions simples","annee":"BUT1","acs":[{"code":"AC13.01","libelle":"Ecrire pour les médias numériques"},{"code":"AC13.02","libelle":"Produire des pistes graphiques et des planches d’inspiration"},{"code":"AC13.03","libelle":"Créer, composer et retoucher des visuels"},{"code":"AC13.04","libelle":"Tourner et monter une vidéo (scénario, captation image et son...)"},{"code":"AC13.05","libelle":"Designer une interface web (wireframes, UI)"},{"code":"AC13.06","libelle":"Optimiser les médias en fonction de leurs usages et supports de diffusion"}]},{"ordre":2,"libelle":"Exprimer une identité visuelle et éditoriale transmédia","annee":"BUT2","acs":[{"code":"AC23.01","libelle":"Produire un écrit journalistique sourcé et documenté"},{"code":"AC23.02","libelle":"Définir une iconographie (illustrations, photographies, vidéos)"},{"code":"AC23.03","libelle":"Créer et décliner une identité visuelle (charte graphique)"},{"code":"AC23.04","libelle":"Imaginer, écrire et scénariser en vue d’une communication multimédia ou transmédia"},{"code":"AC23.05","libelle":"Réaliser, composer et produire pour une communication plurimédia"},{"code":"AC23.06","libelle":"Élaborer et produire des animations, des designs sonores, des effets spéciaux, de la visualisation de données ou de la 3D"}]},{"ordre":3,"libelle":"Exprimer un récit interactif et une direction artistique","annee":"BUT3","acs":[{"code":"AC33.01","libelle":"Adopter et justifier une démarche originale et personnelle dans ses productions"},{"code":"AC33.02","libelle":"Concevoir un design system et en produire les éléments visuels, graphiques ou sonores"},{"code":"AC33.03","libelle":"Maitriser les étapes de production d'un projet multimédia"},{"code":"AC33.04","libelle":"Produire les éléments pour une expérience sophistiquée (notamment immersive, en réalité virtuelle, augmentée...)"},{"code":"AC33.05","libelle":"Apprehender les enjeux liés à la direction artistique"}]}]},{"nom_court":"Développer","numero":4,"numero_identifiant":4,"libelle_long":"Développer pour le web et les médias numériques","couleur":"c4","situations":["Petite structure : Développement à partir de 0, avec une grande liberté en termes d’outils, de technologies, de méthodologie et de décision.","Grande organisation : Développement dans une grande organisation en respectant des processus structurés et contraignants.","Maintenance logicielle : Support, maintenance corrective et évolutive, gestion de la dette technique."],"composantes_essentielles":["en se conformant aux standards du Web et aux normes d’accessibilité","en s’appuyant sur des concepts théoriques issus de l’informatique et des sciences de l’information","en produisant du code fonctionnel, sobre et réutilisable","en utilisant les outils favorisant un développement itératif et collaboratif","en veillant à la sécurité des systèmes et des données"],"niveaux":[{"ordre":1,"libelle":"Développer un site web simple et le met en ligne","annee":"BUT1","acs":[{"code":"AC14.01","libelle":"Exploiter de manière autonome un environnement de développement efficace et productif"},{"code":"AC14.02","libelle":"Produire des pages Web fluides incluant un balisage sémantique efficace et des interactions simples"},{"code":"AC14.03","libelle":"Générer des pages Web à partir de données structurées"},{"code":"AC14.04","libelle":"Mettre en ligne une application Web en utilisant une solution d’hébergement standard"},{"code":"AC14.05","libelle":"Modéliser les données d’une application Web"},{"code":"AC14.06","libelle":"Déployer et personnaliser une application Web en utilisant un CMS ou un framework MVC"}]},{"ordre":2,"libelle":"Développer une application Web interactive","annee":"BUT2","acs":[{"code":"AC24.01","libelle":"Produire des pages et applications Web responsives"},{"code":"AC24.02","libelle":"Mettre en place ou développer un back office"},{"code":"AC24.03","libelle":"Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs"},{"code":"AC24.04","libelle":"Modéliser les traitements d’une application Web"},{"code":"AC24.05","libelle":"Optimiser une application web en termes de référencement et de temps de chargement"},{"code":"AC24.06","libelle":"Configurer une solution d’hébergement adaptée aux besoins"}]},{"ordre":3,"libelle":"Développer un écosystème numérique complexe","annee":"BUT3","acs":[{"code":"AC34.01","libelle":"Développer à l’aide d’un framework de développement côté client"},{"code":"AC34.02","libelle":"Développer à l’aide d’un framework de développement côté serveur"},{"code":"AC34.03","libelle":"Développer des dispositifs interactifs sophistiqués"},{"code":"AC34.04","libelle":"Concevoir et développer des composants logiciels, plugins ou extensions"},{"code":"AC34.05","libelle":"Maitriser l'hébergement et le déploiement d'applications"}]}]},{"nom_court":"Entreprendre","numero":5,"numero_identifiant":5,"libelle_long":"Entreprendre dans le secteur du numérique","couleur":"c5","id":"689e945289af4e30650a910291c38e8a","situations":["Prestataire : Gestion de projet classique pour un client, dans une agence généraliste ou spécialisée (studio graphique, studio digital, production de jeu vidéo, production vidéo…).","Organisation traditionnelle : Accompagnement du changement et intrapreneuriat dans une entreprise, une administration ou une association.","Start-up: Entrepreneuriat et gestion de projet avec une méthode d’amélioration continue."],"composantes_essentielles":["en s’appuyant sur une veille technologique et des modèles de l’innovation","en favorisant la collaboration entre les parties prenantes du projet","en respectant le droit et la vie privée","en favorisant la sobriété numérique","en exploitant des cadres de réflexion français et internationaux"],"niveaux":[{"ordre":1,"libelle":"Entreprendre un projet numérique","annee":"BUT1","acs":[{"code":"AC15.01","libelle":"Gérer un projet avec une méthode classique"},{"code":"AC15.02","libelle":"Budgéter un projet et suivre sa rentabilité"},{"code":"AC15.03","libelle":"Découvrir les écosystèmes d’innovation numérique (fab labs, living labs, tiers-lieux, incubateurs…)"},{"code":"AC15.04","libelle":"Analyser un produit ou un service innovant en identifiant les propositions de valeurs et en évaluant les solutions proposées"},{"code":"AC15.05","libelle":"Construire une présence en ligne professionnelle (personal branding)"},{"code":"AC15.06","libelle":"Interagir au sein des organisations"},{"code":"AC15.07","libelle":"Produire un message écrit ou oral professionnel"}]},{"ordre":2,"libelle":"Entreprendre un projet au sein d’un écosystème numérique","annee":"BUT2","acs":[{"code":"AC25.01","libelle":"Gérer un projet avec une méthode d’amélioration continue par exemple une méthode agile"},{"code":"AC25.02","libelle":"Cartographier un écosystème (identification des acteurs, synthèse des propositions de valeur)"},{"code":"AC25.03","libelle":"Initier la constitution d’un réseau professionnel"},{"code":"AC25.04","libelle":"Collaborer au sein des organisations"},{"code":"AC25.05","libelle":"Maitriser les codes des productions écrites et orales professionnelles"},{"code":"AC25.06","libelle":"Prendre en compte les contraintes juridiques"}]},{"ordre":3,"libelle":"Entreprendre dans le numérique","annee":"BUT3","acs":[{"code":"AC35.01","libelle":"Piloter un produit, un service ou une équipe"},{"code":"AC35.02","libelle":"Maîtriser la qualité en projet Web ou multimédia"},{"code":"AC35.03","libelle":"Concevoir un projet d’entreprise innovante en définissant le nom, l’identité, la forme juridique et le ton de la marque"},{"code":"AC35.04","libelle":"Défendre un projet de manière convaincante"}]}]}]`);let E=[];for(let a of Ai)E.push(a);E.getLevelIndex=function(a){return a.charAt(2)};E.getSkillIndex=function(a){return a.charAt(3)};E.getACIndex=function(a){return a.charAt(6)};E.getACLibelle=function(a){let r=E.getSkillIndex(a)-1,e=E.getLevelIndex(a)-1,t=E.getACIndex(a)-1;return E[r]&&E[r].niveaux[e]&&E[r].niveaux[e].acs[t]?E[r].niveaux[e].acs[t].libelle:"Inconnu"};E.getInfos=function(a){let r=E.getSkillIndex(a)-1,e=E.getLevelIndex(a)-1,t=E.getACIndex(a)-1;return E[r]&&E[r].niveaux[e]&&E[r].niveaux[e].acs[t]?{ac:E[r].niveaux[e].acs[t],niveau:E[r].niveaux[e],competence:E[r]}:null};let Q={dataAC:null,profile:null};Q.init=async function(){this.profile=new Si};Q.getInfosAC=function(a){return E.getInfos(a)};let _r={};_r.init=async function(){return await Q.init(),q.init()};_r.handleClickPlanet=function(a,r){const t=!(a.dataset.opened==="true");A.showBubbles(r,t),a.dataset.opened=t;const n=q.planete.getRocket();if(t)A.animateRocketLanding(n,a,()=>{});else{const i=q.planete.getRocketFire();A.animateRocketIdle(n,i)}};_r.handleClickAC=function(a){const r=a.id,e=r.match(/ac(\d{2})-(\d{2})/i);if(e){const t=`AC${e[1]}.${e[2]}`;console.log("Clic AC:",t);const n=Q.getInfosAC(t);if(n){const i=Q.profile.getData(t);q.popupAC.open(n,i,o=>{Q.profile.setStatus(t,o),q.updateBubbleStyle(a,o.status),q.updateStats()})}}else console.warn("Impossible d'extraire le code AC de l'ID:",r)};_r.handleHoverAC=function(a,r){const t=a.id.match(/ac(\d{2})-(\d{2})/i);if(t){const n=`AC${t[1]}.${t[2]}`,i=Q.getInfosAC(n);if(i){const o=Q.profile.getStatus(n);q.tooltip.show(i.ac,r,o)}}};_r.handleExport=function(){const a=Q.profile.exportData(),r=new Blob([a],{type:"application/json"}),e=URL.createObjectURL(r),t=document.createElement("a");t.href=e,t.download=`sae303-profile-${Date.now()}.json`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(e)};_r.handleImport=function(a){const r=new FileReader;r.onload=e=>{Q.profile.importData(e.target.result)?(q.updateBubblesState(),q.updateStats(),alert("Profil chargé !")):alert("Erreur format fichier")},r.readAsText(a)};let q={rootPage:null,planete:null,tooltip:null,popupAC:null,historyView:null};q.init=function(){return this.build(),this.animate(),this.interactions(),this.ui(),this.rootPage};q.build=function(){this.rootPage=Cr(gi),this.planete=new _i,this.rootPage.querySelector('slot[name="svg"]').replaceWith(this.planete.dom())};q.animate=function(){A.animateGalaxy(this.planete.getGalaxy());const a=this.planete.getSun();A.floatElement(a,25,4);const r=this.planete.getSunBubbles();A.pulseElement(r,.8,1.2,2),A.wanderElement(r,30,4);const e=this.planete.getPlanetGroups();A.floatElement(e,20,3);const t=this.planete.getRocket(),n=this.planete.getRocketFire();A.animateRocketIdle(t,n),A.animateSystem(this.planete.getOrbits())};q.interactions=function(){this.planete.getInteractions().forEach(({planet:e,bubbles:t})=>{S.set(t,{autoAlpha:0,scale:0,transformOrigin:"center center"}),e.style.cursor="pointer",e.dataset.opened="false",e.addEventListener("click",n=>{n.stopPropagation(),_r.handleClickPlanet(e,t)})}),this.rootPage.querySelectorAll('[id^="bulle_ac"]').forEach(e=>{e.style.cursor="pointer",e.style.pointerEvents="bounding-box",e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),_r.handleClickAC(e)}),e.addEventListener("mouseenter",t=>{A.animateHover(e,!0),_r.handleHoverAC(e,t)}),e.addEventListener("mouseleave",()=>{A.animateHover(e,!1),q.tooltip.hide()}),e.addEventListener("mousemove",t=>{q.tooltip.move(t)})})};q.ui=function(){const a=new mi;this.statsView=new ki,this.tooltip=new Bi,this.popupAC=new wi,this.historyView=new Mi,this.rootPage.appendChild(a.dom()),this.rootPage.appendChild(this.statsView.dom()),this.rootPage.appendChild(this.historyView.dom()),this.rootPage.appendChild(this.tooltip.dom()),this.rootPage.appendChild(this.popupAC.dom()),a.onClickStats(()=>{this.statsView.toggle()}),a.onClickExport(()=>{_r.handleExport()}),a.onImportFile(e=>{_r.handleImport(e)});const r=a.dom().querySelector("#btn-history");r&&r.addEventListener("click",()=>this.historyView.toggle()),this.statsView.onReset(()=>{Q.profile.reset(),this.updateBubblesState(),this.updateStats()}),this.updateBubblesState(),this.updateStats()};q.updateStats=function(){const a=Q.profile.calculateStats(E);this.statsView.update(a),this.historyView&&this.historyView.update(Q.profile.history,E),this.updatePlanetsVisuals()};q.updateBubblesState=function(){this.rootPage.querySelectorAll('[id^="bulle_ac"]').forEach(r=>{const t=r.id.match(/ac(\d{2})-(\d{2})/i);if(t){const n=`AC${t[1]}.${t[2]}`,i=Q.profile.getStatus(n);this.updateBubbleStyle(r,i)}})};q.updateBubbleStyle=function(a,r){A.updateBubbleStyle(a,r)};q.updatePlanetsVisuals=function(){const a=Q.profile.getLevelStats(E);for(const[r,e]of Object.entries(a)){const t=`planete-${r}`,n=this.rootPage.querySelector(`#${t}`);n&&A.updatePlanetVisuals(n,e)}};function Vi(){return _r.init()}const Ze=new Rt("app");Ze.addLayout("/",Yt);Ze.addRoute("/",Vi);Ze.addRoute("*",Xt);Ze.start();
