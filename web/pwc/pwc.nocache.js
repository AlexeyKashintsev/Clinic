function pwc(){var Q='bootstrap',R='begin',S='gwt.codesvr.pwc=',T='gwt.codesvr=',U='pwc',V='startup',W='DUMMY',X=0,Y=1,Z='iframe',$='javascript:""',_='position:absolute; width:0; height:0; border:none; left: -1000px;',ab=' top: -1000px;',bb='CSS1Compat',cb='<!doctype html>',db='',eb='<html><head><\/head><body><\/body><\/html>',fb='undefined',gb='DOMContentLoaded',hb=50,ib='Chrome',jb='eval("',kb='");',lb='script',mb='javascript',nb='moduleStartup',ob='moduleRequested',pb='Failed to load ',qb='head',rb='meta',sb='name',tb='pwc::',ub='::',vb='gwt:property',wb='content',xb='=',yb='gwt:onPropertyErrorFn',zb='Bad handler "',Ab='" for "gwt:onPropertyErrorFn"',Bb='gwt:onLoadErrorFn',Cb='" for "gwt:onLoadErrorFn"',Db='#',Eb='?',Fb='/',Gb='img',Hb='clear.cache.gif',Ib='baseUrl',Jb='pwc.nocache.js',Kb='base',Lb='//',Mb='locale',Nb='default',Ob='locale=',Pb=7,Qb='&',Rb='__gwt_Locale',Sb='_',Tb='Unexpected exception in locale detection, using default: ',Ub='user.agent',Vb='webkit',Wb='safari',Xb='msie',Yb=10,Zb=11,$b='ie10',_b=9,ac='ie9',bc=8,cc='ie8',dc='gecko',ec='gecko1_8',fc=2,gc=3,hc=4,ic='selectingPermutation',jc='pwc.devmode.js',kc='ru',lc='268A527215BCE981ECD7B747176C9449',mc='5B4192FD6B24B64D53266BAB70279DAD',nc='79838BDFCB9156C97A98B9086AB68EA2',oc='7E7085BA089BAD2D7CB4AF0427DB7C5C',pc='9D9C9620D546F5E944B7B3E5447379C3',qc='A2A3F303E7E2C444E02B8EF1CEAFA399',rc='B4F2E0BCCBBC4C5F5A552AD4A2F30853',sc='C066457F39270D5DDB1F4B77D24C0191',tc='DEE8DAD3AA0DD073816F499753EF2A36',uc='E810CAC475A8F76F24284E29FEBC4556',vc=':',wc='.cache.js',xc='link',yc='rel',zc='stylesheet',Ac='href',Bc='loadExternalRefs',Cc='gwt/standard/standard.css',Dc='end',Ec='http:',Fc='file:',Gc='_gwt_dummy_',Hc='__gwtDevModeHook:pwc',Ic='Ignoring non-whitelisted Dev Mode URL: ',Jc=':moduleBase';var q=window;var r=document;t(Q,R);function s(){var a=q.location.search;return a.indexOf(S)!=-1||a.indexOf(T)!=-1}
function t(a,b){if(q.__gwtStatsEvent){q.__gwtStatsEvent({moduleName:U,sessionId:q.__gwtStatsSessionId,subSystem:V,evtGroup:a,millis:(new Date).getTime(),type:b})}}
pwc.__sendStats=t;pwc.__moduleName=U;pwc.__errFn=null;pwc.__moduleBase=W;pwc.__softPermutationId=X;pwc.__computePropValue=null;pwc.__getPropMap=null;pwc.__installRunAsyncCode=function(){};pwc.__gwtStartLoadingFragment=function(){return null};pwc.__gwt_isKnownPropertyValue=function(){return false};pwc.__gwt_getMetaProperty=function(){return null};var u=null;var v=q.__gwt_activeModules=q.__gwt_activeModules||{};v[U]={moduleName:U};pwc.__moduleStartupDone=function(e){var f=v[U].bindings;v[U].bindings=function(){var a=f?f():{};var b=e[pwc.__softPermutationId];for(var c=X;c<b.length;c++){var d=b[c];a[d[X]]=d[Y]}return a}};var w;function A(){B();return w}
function B(){if(w){return}var a=r.createElement(Z);a.src=$;a.id=U;a.style.cssText=_+ab;a.tabIndex=-1;r.body.appendChild(a);w=a.contentDocument;if(!w){w=a.contentWindow.document}w.open();var b=document.compatMode==bb?cb:db;w.write(b+eb);w.close()}
function C(k){function l(a){function b(){if(typeof r.readyState==fb){return typeof r.body!=fb&&r.body!=null}return /loaded|complete/.test(r.readyState)}
var c=b();if(c){a();return}function d(){if(!c){c=true;a();if(r.removeEventListener){r.removeEventListener(gb,d,false)}if(e){clearInterval(e)}}}
if(r.addEventListener){r.addEventListener(gb,d,false)}var e=setInterval(function(){if(b()){d()}},hb)}
function m(c){function d(a,b){a.removeChild(b)}
var e=A();var f=e.body;var g;if(navigator.userAgent.indexOf(ib)>-1&&window.JSON){var h=e.createDocumentFragment();h.appendChild(e.createTextNode(jb));for(var i=X;i<c.length;i++){var j=window.JSON.stringify(c[i]);h.appendChild(e.createTextNode(j.substring(Y,j.length-Y)))}h.appendChild(e.createTextNode(kb));g=e.createElement(lb);g.language=mb;g.appendChild(h);f.appendChild(g);d(f,g)}else{for(var i=X;i<c.length;i++){g=e.createElement(lb);g.language=mb;g.text=c[i];f.appendChild(g);d(f,g)}}}
pwc.onScriptDownloaded=function(a){l(function(){m(a)})};t(nb,ob);var n=r.createElement(lb);n.src=k;if(pwc.__errFn){n.onerror=function(){pwc.__errFn(U,new Error(pb+code))}}r.getElementsByTagName(qb)[X].appendChild(n)}
pwc.__startLoadingFragment=function(a){return G(a)};pwc.__installRunAsyncCode=function(a){var b=A();var c=b.body;var d=b.createElement(lb);d.language=mb;d.text=a;c.appendChild(d);c.removeChild(d)};function D(){var c={};var d;var e;var f=r.getElementsByTagName(rb);for(var g=X,h=f.length;g<h;++g){var i=f[g],j=i.getAttribute(sb),k;if(j){j=j.replace(tb,db);if(j.indexOf(ub)>=X){continue}if(j==vb){k=i.getAttribute(wb);if(k){var l,m=k.indexOf(xb);if(m>=X){j=k.substring(X,m);l=k.substring(m+Y)}else{j=k;l=db}c[j]=l}}else if(j==yb){k=i.getAttribute(wb);if(k){try{d=eval(k)}catch(a){alert(zb+k+Ab)}}}else if(j==Bb){k=i.getAttribute(wb);if(k){try{e=eval(k)}catch(a){alert(zb+k+Cb)}}}}}__gwt_getMetaProperty=function(a){var b=c[a];return b==null?null:b};u=d;pwc.__errFn=e}
function F(){function e(a){var b=a.lastIndexOf(Db);if(b==-1){b=a.length}var c=a.indexOf(Eb);if(c==-1){c=a.length}var d=a.lastIndexOf(Fb,Math.min(c,b));return d>=X?a.substring(X,d+Y):db}
function f(a){if(a.match(/^\w+:\/\//)){}else{var b=r.createElement(Gb);b.src=a+Hb;a=e(b.src)}return a}
function g(){var a=__gwt_getMetaProperty(Ib);if(a!=null){return a}return db}
function h(){var a=r.getElementsByTagName(lb);for(var b=X;b<a.length;++b){if(a[b].src.indexOf(Jb)!=-1){return e(a[b].src)}}return db}
function i(){var a=r.getElementsByTagName(Kb);if(a.length>X){return a[a.length-Y].href}return db}
function j(){var a=r.location;return a.href==a.protocol+Lb+a.host+a.pathname+a.search+a.hash}
var k=g();if(k==db){k=h()}if(k==db){k=i()}if(k==db&&j()){k=e(r.location.href)}k=f(k);return k}
function G(a){if(a.match(/^\//)){return a}if(a.match(/^[a-zA-Z]+:\/\//)){return a}return pwc.__moduleBase+a}
function H(){var i=[];var j=X;function k(a,b){var c=i;for(var d=X,e=a.length-Y;d<e;++d){c=c[a[d]]||(c[a[d]]=[])}c[a[e]]=b}
var l=[];var m=[];function n(a){var b=m[a](),c=l[a];if(b in c){return b}var d=[];for(var e in c){d[c[e]]=e}if(u){u(a,d,b)}throw null}
m[Mb]=function(){var b=null;var c=Nb;try{if(!b){var d=location.search;var e=d.indexOf(Ob);if(e>=X){var f=d.substring(e+Pb);var g=d.indexOf(Qb,e);if(g<X){g=d.length}b=d.substring(e+Pb,g)}}if(!b){b=__gwt_getMetaProperty(Mb)}if(!b){b=q[Rb]}if(b){c=b}while(b&&!__gwt_isKnownPropertyValue(Mb,b)){var h=b.lastIndexOf(Sb);if(h<X){b=null;break}b=b.substring(X,h)}}catch(a){alert(Tb+a)}q[Rb]=c;return b||Nb};l[Mb]={'default':X,ru:Y};m[Ub]=function(){var a=navigator.userAgent.toLowerCase();var b=r.documentMode;if(function(){return a.indexOf(Vb)!=-1}())return Wb;if(function(){return a.indexOf(Xb)!=-1&&(b>=Yb&&b<Zb)}())return $b;if(function(){return a.indexOf(Xb)!=-1&&(b>=_b&&b<Zb)}())return ac;if(function(){return a.indexOf(Xb)!=-1&&(b>=bc&&b<Zb)}())return cc;if(function(){return a.indexOf(dc)!=-1||b>=Zb}())return ec;return db};l[Ub]={gecko1_8:X,ie10:Y,ie8:fc,ie9:gc,safari:hc};__gwt_isKnownPropertyValue=function(a,b){return b in l[a]};pwc.__getPropMap=function(){var a={};for(var b in l){if(l.hasOwnProperty(b)){a[b]=n(b)}}return a};pwc.__computePropValue=n;q.__gwt_activeModules[U].bindings=pwc.__getPropMap;t(Q,ic);if(s()){return G(jc)}var o;try{k([kc,Wb],lc);k([Nb,Wb],mc);k([kc,ac],nc);k([Nb,$b],oc);k([kc,ec],pc);k([Nb,cc],qc);k([Nb,ec],rc);k([Nb,ac],sc);k([kc,$b],tc);k([kc,cc],uc);o=i[n(Mb)][n(Ub)];var p=o.indexOf(vc);if(p!=-1){j=parseInt(o.substring(p+Y),Yb);o=o.substring(X,p)}}catch(a){}pwc.__softPermutationId=j;return G(o+wc)}
function I(){if(!q.__gwt_stylesLoaded){q.__gwt_stylesLoaded={}}function c(a){if(!__gwt_stylesLoaded[a]){var b=r.createElement(xc);b.setAttribute(yc,zc);b.setAttribute(Ac,G(a));r.getElementsByTagName(qb)[X].appendChild(b);__gwt_stylesLoaded[a]=true}}
t(Bc,R);c(Cc);t(Bc,Dc)}
D();pwc.__moduleBase=F();v[U].moduleBase=pwc.__moduleBase;var J=H();if(q){var K=!!(q.location.protocol==Ec||q.location.protocol==Fc);q.__gwt_activeModules[U].canRedirect=K;function L(){var b=Gc;try{q.sessionStorage.setItem(b,b);q.sessionStorage.removeItem(b);return true}catch(a){return false}}
if(K&&L()){var M=Hc;var N=q.sessionStorage[M];if(!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/.*$/.test(N)){if(N&&(window.console&&console.log)){console.log(Ic+N)}N=db}if(N&&!q[M]){q[M]=true;q[M+Jc]=F();var O=r.createElement(lb);O.src=N;var P=r.getElementsByTagName(qb)[X];P.insertBefore(O,P.firstElementChild||P.children[X]);return false}}}I();t(Q,Dc);C(J);return true}
pwc.succeeded=pwc();