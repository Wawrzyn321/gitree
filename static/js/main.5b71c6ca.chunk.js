(this.webpackJsonpgitree=this.webpackJsonpgitree||[]).push([[0],{19:function(e,t,a){e.exports=a(39)},25:function(e,t,a){},26:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(15),c=a.n(i),o=a(3),s=a.n(o),l=a(7),u=a(17);function h(e,t){return e.getItem(t)}function d(e,t,a){e.setItem(t,a)}var p=a(18),f=a(11),v=a(4),b=a(5),m=function(){function e(t,a,n,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,c=arguments.length>5&&void 0!==arguments[5]&&arguments[5];Object(v.a)(this,e),this.path=void 0,this.dirPath=void 0,this.parent=void 0,this.size=void 0,this.elements=void 0,this.isLeaf=void 0,this.type=void 0,this.firstFlag=!1,this.path=t,this.dirPath=a,this.parent=n,this.type=r,this.size=i,this.isLeaf=c,this.elements=[]}return Object(b.a)(e,[{key:"skipSingleDirs",value:function(){if(this.isLeaf)return this;for(var e=this;1===e.elements.length;)e=e.elements[0];return e}}]),e}(),w=function(e){var t=function(e){var t,a=new m("","/",null,"dirs"),n=Object(f.a)(e);try{for(n.s();!(t=n.n()).done;){for(var r=t.value,i=r.path.split("/"),c=a,o="/",s=function(e){var t=i[e],a=c.elements.find((function(e){return e.path===t}));a||(a=new m(t,o,c,"dir"),c.elements.push(a)),c=a,o+=t+"/"},l=0;l<i.length-1;l++)s(l);c.elements.push(new m(i[i.length-1],r.path,c,"file",r.size,!0))}}catch(u){n.e(u)}finally{n.f()}return a}(e);return function e(t){var a=t.elements.reduce((function(t,a){return t+(a.isLeaf?a.size:e(a))}),0);return t.size=a,a}(t),t},y="https://api.github.com",O=function(e,t){return t?{headers:{Authorization:"Basic "+btoa("".concat(e,":").concat(t))}}:{}},g=function(){var e=Object(l.a)(s.a.mark((function e(t,a){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.ok){e.next=8;break}return e.t0=a,e.next=4,t.json();case 4:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 8:return e.t2=JSON,e.next=11,t.text();case 11:throw e.t3=e.sent,n=e.t2.parse.call(e.t2,e.t3),Error(n.message);case 14:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),x=function(){var e=Object(l.a)(s.a.mark((function e(t,a){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(y,"/users/").concat(t,"/repos"),e.next=3,fetch(n,O(t,a));case 3:return r=e.sent,e.abrupt("return",g(r,(function(e){return e.map((function(e){return e.name}))})));case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),E=function(){var e=Object(l.a)(s.a.mark((function e(t,a,n){var r,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="".concat(y,"/repos/").concat(t,"/").concat(n,"/branches"),e.next=3,fetch(r,O(t,a));case 3:return i=e.sent,e.abrupt("return",g(i,(function(e){return e.map((function(e){return{name:e.name,commitSha:e.commit.sha}}))})));case 5:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),j=function(){var e=Object(l.a)(s.a.mark((function e(t,a,n,r){var i,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i="".concat(y,"/repos/").concat(t,"/").concat(n,"/git/trees/").concat(r,"?recursive=true"),e.next=3,fetch(i,O(t,a));case 3:return c=e.sent,e.abrupt("return",g(c,(function(e){return{files:e.tree.filter((function(e){return"blob"===e.type})).map((function(e){return{path:e.path,size:e.size}})),truncated:e.truncated}})));case 5:case"end":return e.stop()}}),e)})));return function(t,a,n,r){return e.apply(this,arguments)}}(),k="SET_OWNER_FORM_COLLAPSED",D="SET_OWNER",N="SET_TOKEN",C="FETCH_REPOS",P="SET_REPOS",S="SET_REPO_FORM_COLLAPSED",T="SET_REPO",R="FETCH_BRANCHES",L="SET_BRANCHES",M="SET_BRANCH_FORM_COLLAPSED",_="SET_BRANCH",z="FETCH_FILES",F="BUILD_TREE",A="SET_RENDERER",H="SET_HOVERED_NODE",B="SET_MAIN_NODE",I=a(1),G=function(e,t){switch(t.type){case k:var a=t.collapsed;return Object(I.a)(Object(I.a)({},e),{},{ownerData:Object(I.a)(Object(I.a)({},e.ownerData),{},{collapsed:a})});case D:var n=t.owner;return Object(I.a)(Object(I.a)({},e),{},{ownerData:Object(I.a)(Object(I.a)({},e.ownerData),{},{collapsed:!1,owner:n})});case N:var r=t.token;return Object(I.a)(Object(I.a)({},e),{},{ownerData:Object(I.a)(Object(I.a)({},e.ownerData),{},{token:r})});case C:return Object(I.a)(Object(I.a)({},e),{},{ownerData:Object(I.a)(Object(I.a)({},e.ownerData),{},{loading:!0}),repoData:Object(I.a)(Object(I.a)({},e.repoData),{},{repos:[],repo:null}),branchData:Object(I.a)(Object(I.a)({},e.branchData),{},{branches:[],branch:null})});case P:var i=t.error,c=t.repos;return Object(I.a)(Object(I.a)({},e),{},{ownerData:Object(I.a)(Object(I.a)({},e.ownerData),{},{error:i,loading:!1,collapsed:!i}),repoData:Object(I.a)(Object(I.a)({},e.repoData),{},{repos:c,collapsed:!!i})});case S:var o=t.collapsed;return Object(I.a)(Object(I.a)({},e),{},{repoData:Object(I.a)(Object(I.a)({},e.repoData),{},{collapsed:o})});case T:var s=t.repo;return Object(I.a)(Object(I.a)({},e),{},{repoData:Object(I.a)(Object(I.a)({},e.repoData),{},{repo:s}),treeData:Object(I.a)(Object(I.a)({},e.treeData),s!==e.repoData.repo?{files:[]}:{})});case R:return Object(I.a)(Object(I.a)({},e),{},{repoData:Object(I.a)(Object(I.a)({},e.repoData),{},{loading:!0,error:""}),branchData:Object(I.a)(Object(I.a)({},e.branchData),{},{branches:[],branch:null})});case L:var l=t.error,u=t.branches,h=t.branch;return Object(I.a)(Object(I.a)({},e),{},{repoData:Object(I.a)(Object(I.a)({},e.repoData),{},{error:l,loading:!1,collapsed:!l}),branchData:Object(I.a)(Object(I.a)({},e.branchData),{},{loading:!1,branches:u,branch:h,collapsed:!!l})});case M:var d=t.collapsed;return Object(I.a)(Object(I.a)({},e),{},{branchData:Object(I.a)(Object(I.a)({},e.branchData),{},{collapsed:d})});case _:var p=t.branch;return Object(I.a)(Object(I.a)({},e),{},{branchData:Object(I.a)(Object(I.a)({},e.branchData),{},{branch:p})});case z:return Object(I.a)(Object(I.a)({},e),{},{branchData:Object(I.a)(Object(I.a)({},e.branchData),{},{loading:!0,error:""}),treeData:{files:[],tree:null}});case F:var f=t.tree,v=t.files,b=t.error,m=t.truncated;return Object(I.a)(Object(I.a)({},e),{},{branchData:Object(I.a)(Object(I.a)({},e.branchData),{},{loading:!1,error:b,collapsed:!b&&!m}),treeData:{files:v,tree:f,truncated:m,mainNode:f,hoveredNode:null}});case H:var w=t.hoveredNode;return Object(I.a)(Object(I.a)({},e),{},{treeData:Object(I.a)(Object(I.a)({},e.treeData),{},{hoveredNode:w})});case B:var y=t.mainNode;return Object(I.a)(Object(I.a)({},e),{},{treeData:Object(I.a)(Object(I.a)({},e.treeData),{},{mainNode:y})});case A:var O=t.renderer;return Object(I.a)(Object(I.a)({},e),{},{treeData:Object(I.a)(Object(I.a)({},e.treeData),{},{renderer:O})});default:return console.warn("unhandled state: ",t),e}},W={ownerData:{owner:h(localStorage,"owner")||"",token:h(sessionStorage,"token")||"",loading:!1,error:"",collapsed:!1},repoData:{repos:[],repo:"",error:"",loading:!1,collapsed:!0},branchData:{branches:[],branch:null,loading:!1,error:"",collapsed:!0},treeData:{files:[],truncated:!1,tree:null,hoveredNode:null,renderer:null}},K=r.a.createContext(null),U=function(e){var t=e.children,a=r.a.useReducer(G,W),n=Object(u.a)(a,2),i=n[0],c=n[1],o={state:i,setOwnerFormCollapsed:function(e){c({type:k,collapsed:e})},setOwner:function(e){c({type:D,owner:e})},setToken:function(e){c({type:N,token:e})},getRepos:function(){var e=Object(l.a)(s.a.mark((function e(){var t,a,n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c({type:C}),t=i.ownerData,a=t.owner,n=t.token,e.prev=2,e.next=5,x(a,n);case 5:(r=e.sent).length?(c({type:P,error:"",repos:r}),d(localStorage,"owner",a),d(sessionStorage,"token",n)):c({type:P,error:"This user appears to have no repos. Why don't you try another one?",repos:r}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),c({type:P,error:"Can't fetch repos: ".concat(e.t0.message,"."),repos:[]});case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(){return e.apply(this,arguments)}}(),setRepoFormCollapsed:function(e){c({type:S,collapsed:e})},setRepo:function(e){c({type:T,repo:e})},getBranches:function(){var e=Object(l.a)(s.a.mark((function e(){var t,a,n,r,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c({type:R}),t=i.ownerData,a=t.owner,n=t.token,r=i.repoData.repo,e.prev=3,e.next=6,E(a,n,r);case 6:(o=e.sent).length?c({type:L,error:"",branches:o,branch:o.find((function(e){return e.name="master"}))}):c({type:L,error:"This repo appears to have no branches. Why don't you try another one?",branches:o}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),c({type:L,error:"Can't fetch branches: ".concat(e.t0.message,"."),branches:[]});case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(){return e.apply(this,arguments)}}(),setBranchFormCollapsed:function(e){c({type:M,collapsed:e})},setBranch:function(e){c({type:_,branch:e})},buildTree:function(){var e=Object(l.a)(s.a.mark((function e(){var t,a,n,r,o,l,u,h;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c({type:z}),t=i.ownerData,a=t.owner,n=t.token,r=i.repoData.repo,o=i.branchData.branch,e.prev=4,e.next=7,j(a,n,r,o.commitSha);case 7:l=e.sent,u=l.files,h=l.truncated,c({type:F,error:"",files:u,tree:w(u),truncated:h}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(4),c({type:F,error:"Can't fetch files: ".concat(e.t0.message,"."),files:[],tree:null});case 16:case"end":return e.stop()}}),e,null,[[4,13]])})));return function(){return e.apply(this,arguments)}}(),setRenderer:function(e){c({type:A,renderer:e})},setHoveredNode:function(e){c({type:H,hoveredNode:e})},setMainNode:function(e){c({type:B,mainNode:e})},getUrl:function(e){var t=i.ownerData.owner,a=i.repoData.repo,n=i.branchData.branch;if(n)return"https://github.com/".concat(t,"/").concat(a,"/tree/").concat(n.name,"/").concat(e.dirPath)}};return r.a.createElement(K.Provider,{value:o}," ",t," ")},J=function(){function e(t){Object(v.a)(this,e),this.ctx=t,this.minTextSize=16,this.textMargin=1.2,this.maxTextScale=2,this.rotationClamp=1.3,this.ctx.textAlign="center",this.ctx.textBaseline="middle"}return Object(b.a)(e,[{key:"drawLine",value:function(e,t){this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(t.x,t.y),this.ctx.stroke()}},{key:"measureText",value:function(e){return this.ctx.measureText(e)}},{key:"drawSelectionText",value:function(e,t,a){this.fitText(e,t,a,"40px Arial","white",1)}},{key:"drawNodeText",value:function(e,t,a){this.fitText(e,t,a,"10px Arial","black",this.maxTextScale)}},{key:"drawRectPath",value:function(e,t){var a=new Path2D;return this.ctx.beginPath(),this.ctx.fillStyle="transparent",a.rect(e.x,e.y,t.x-e.x,t.y-e.y),this.ctx.fill(a),a}},{key:"drawOutline",value:function(e,t){this.ctx.strokeStyle="white",this.ctx.lineWidth=5;var a=t.sub(e);this.ctx.strokeRect(e.x,e.y,a.x,a.y)}},{key:"fillArea",value:function(e,t,a){var n=t.sub(e);this.ctx.fillStyle=a,this.ctx.fillRect(e.x,e.y,n.x,n.y)}},{key:"clear",value:function(){var e=this.ctx.canvas;this.ctx.clearRect(0,0,e.width,e.height)}},{key:"fitText",value:function(e,t,a,n,r,i){this.ctx.font=n;var c=t.sub(e);if(!(c.x<this.minTextSize||c.y<this.minTextSize)){var o=this.measureText(a).width*this.textMargin,s=0,l=1;if(c.x<o){if(c.y<o){var u=c.length;if(u<o)return;l=Math.min(u/o,i)}else l=Math.min(c.y/o,i);(s=Math.atan2(c.y,c.x))>this.rotationClamp&&(s=Math.PI/2)}else l=Math.min(c.x/o,i);var h=e.lerp(t,.5);this.ctx.save(),this.ctx.fillStyle=r,this.ctx.translate(h.x,h.y),this.ctx.rotate(s),this.ctx.scale(l,l),this.ctx.fillText(a,0,0),this.ctx.restore()}}}]),e}(),Y=function(){function e(t,a){Object(v.a)(this,e),this.callback=void 0,this.drawing=void 0,this.callback=a,this.drawing=new J(t.getContext("2d"))}return Object(b.a)(e,[{key:"hide",value:function(){this.drawing.clear(),this.callback(null)}},{key:"show",value:function(e){var t=e.start,a=e.end,n=e.isMainPath,r=e.elem;this.drawing.clear(),this.drawing.drawOutline(t,a),n&&this.tryDisplayText(r.path,t,a),this.callback(r)}},{key:"tryDisplayText",value:function(e,t,a){var n=this.drawing.measureText(e).width;a.x-t.x>=n&&this.drawing.drawSelectionText(t,a,e)}}]),e}(),q=function(){function e(t,a){Object(v.a)(this,e),this.x=t,this.y=a}return Object(b.a)(e,[{key:"length",get:function(){return Math.sqrt(this.x*this.x+this.y*this.y)}}],[{key:"zero",get:function(){return new e(0,0)}}]),Object(b.a)(e,[{key:"add",value:function(t){return new e(this.x+t.x,this.y+t.y)}},{key:"sub",value:function(t){return new e(this.x-t.x,this.y-t.y)}},{key:"mul",value:function(t){return new e(this.x*t,this.y*t)}},{key:"lerp",value:function(e,t){return this.add(e.sub(this).mul(t))}}]),e}(),V=function e(t,a,n,r,i){Object(v.a)(this,e),this.shape=void 0,this.elem=void 0,this.start=void 0,this.end=void 0,this.isMainPath=void 0,this.shape=t,this.elem=a,this.start=n,this.end=r,this.isMainPath=i};function X(e,t,a){return e+(t-e)*a}var Q=function(){function e(t,a,n,r,i){Object(v.a)(this,e),this.canvas=void 0,this.linkRef=void 0,this.selection=void 0,this.drawing=void 0,this.currentNode=void 0,this.allPaths=[],this.firstLevelPaths=[],this.subdivPaths=[],this.currentPath=null,this.maxLevels=25,this.setCurrentNode=void 0,this.canvas=t,this.linkRef=n,this.selection=new Y(a,r),this.drawing=new J(this.canvas.getContext("2d")),this.currentNode=null,this.setCurrentNode=i}return Object(b.a)(e,[{key:"getPathOverType",value:function(e){return e.shiftKey?e.ctrlKey?this.subdivPaths:this.allPaths:this.firstLevelPaths}},{key:"mouseMove",value:function(e){var t=this.getPathOverType(e),a=this.findPathOver(e,t);this.currentPath!==a&&(this.currentPath=a,null===a?this.selection.hide():this.selection.show(a))}},{key:"click",value:function(e){e.preventDefault(),null!==this.currentPath&&this.draw(this.currentPath.elem)}},{key:"hideSelection",value:function(){this.selection.hide(),this.currentPath=null}},{key:"draw",value:function(e){if(this.currentNode!==e){this.currentNode=e,this.setCurrentNode(e),this.selection.hide(),this.allPaths=[],this.firstLevelPaths=[],this.subdivPaths=[],this.drawing.clear(),e.firstFlag=!1;var t,a=Object(f.a)(e.elements);try{for(a.s();!(t=a.n()).done;){t.value.firstFlag=!0}}catch(r){a.e(r)}finally{a.f()}var n=new q(this.canvas.width,this.canvas.height);this.drawSegment(e,q.zero,n,0)}}},{key:"drawSegment",value:function(e,t,a,n){if(!(++n>this.maxLevels))if((e=e.skipSingleDirs()).isLeaf)if(this.drawing.drawNodeText(t,a,e.path),1!==n){this.linkRef.style.display="none";var r=this.drawing.drawRectPath(t,a);this.allPaths.push(new V(r,e,t,a,!1))}else{var i=e.path,c=this.drawing.measureText(i),o=X(0,this.canvas.width,.5)+c.width,s=X(0,this.canvas.height,.5);this.linkRef.style.display="inline",this.linkRef.style.left="".concat(o+8,"px"),this.linkRef.style.top="".concat(s-14,"px")}else{if(e.firstFlag){var l=this.drawing.drawRectPath(t,a);this.firstLevelPaths.push(new V(l,e,t,a,!0))}var u,h,d=function(e){if(e.isLeaf)throw Error("Tried to partition a leaf node ".concat(e.path," ").concat(e.size));var t=Array(2).fill(0).map((function(){return new m("PARTITION OF "+e.path,"",e,"dirs",0,!1)})),a=e.elements;a.sort((function(e,t){return t.size-e.size}));var n,r=Object(f.a)(a);try{for(r.s();!(n=r.n()).done;){var i=n.value,c=t.find((function(e){return e.size===Math.min.apply(Math,Object(p.a)(t.map((function(e){return e.size}))))}));c.elements.push(i),c.size+=i.size,c.path=""}}catch(o){r.e(o)}finally{r.f()}return t}(e),v=this.calculatePartsRatio(d);if(a.x-t.x>a.y-t.y){var b=X(t.x,a.x,v);u=new q(b,a.y),h=new q(b,t.y)}else{var w=X(t.y,a.y,v);u=new q(a.x,w),h=new q(t.x,w)}if(this.drawing.drawLine(u,h),1===n){if(!d[0].isLeaf){var y=this.drawing.drawRectPath(t,u);this.subdivPaths.push(new V(y,d[0],t,u,!0))}if(!d[1].isLeaf){var O=this.drawing.drawRectPath(h,a);this.subdivPaths.push(new V(O,d[1],h,a,!0))}}var g="rgba(0, 0, 63, ".concat(.15/n,")");this.drawing.fillArea(t,u,g),this.drawing.fillArea(h,a,g),this.drawSegment(d[0],t,u,n),this.drawSegment(d[1],h,a,n)}}},{key:"calculatePartsRatio",value:function(e){console.assert(2===e.length);var t=e[0].size/(e[0].size+e[1].size);return t>.9?.9:t<.1?.1:t}},{key:"findPathOver",value:function(e,t){var a=e.nativeEvent,n=a.offsetX,r=a.offsetY,i=this.canvas.getContext("2d");return t.find((function(e){return i.isPointInPath(e.shape,n,r)}))||null}}]),e}();a(25);function Z(){var e=r.a.useContext(K),t=e.state.treeData.mainNode,a=e.setMainNode;if(!t)return null;var n=function(e){var t=[],a=e;do{t.unshift(a),a=a.parent}while(null!==a);return t}(t);return r.a.createElement("div",{className:"tree-path"},n.map((function(e){return r.a.createElement("button",{className:"link",key:"".concat(e.dirPath,"/").concat(e.path),onClick:function(){return a(e)}},e.path||"root")})),r.a.createElement("p",null,"Tip: Press SHIFT to select individual files."))}a(26);var $=a(8),ee=a(6);function te(e){var t=e.node,a=e._ref,n=r.a.useContext(K).getUrl;return r.a.createElement("a",{href:n(t),target:"_blank",rel:"noopener noreferrer","aria-label":"Open on GitHub",ref:a},r.a.createElement($.a,{color:"#0090FF",icon:ee.c}))}a(32);var ae=["kubernetes","apache","microsoft","rust-lang","dotnet","nodejs","tensorflow","wordpress","facebook","gatsbyjs","angular","kyma-project"],ne={margin:0,padding:0,width:"unset"};function re(){var e=r.a.useContext(K),t=e.state,a=e.setOwner,n=t.ownerData.owner;return r.a.createElement("button",{style:ne,className:"link",onClick:function(e){var t;e.preventDefault();do{t=ae[Math.floor(Math.random()*ae.length)]}while(n===t);a(t)}},r.a.createElement($.a,{icon:ee.b}))}function ie(){return r.a.createElement("div",{className:"help-banner"},r.a.createElement("h1",null,"Hi!"),r.a.createElement("p",null,"This is",r.a.createElement("span",{role:"img","aria-label":""}," ","\ud83c\udf33"," "),"Gitree."),r.a.createElement("p",null,"You can map a GitHub repository like in WinDirStat or SpaceSniffer."),r.a.createElement("p",null,"Please set a GitHub username or organisation name on the right panel, then follow the steps!"),r.a.createElement("p",null,"You can always press the ",r.a.createElement(re,null)," to choose a popular random repo."))}function ce(e){var t=e.width,a=e.height,n=r.a.useContext(K),i=n.state,c=n.setHoveredNode,o=n.setMainNode,s=n.setRenderer,l=i.branchData.loading,u=i.treeData,h=u.tree,d=u.mainNode,p=u.renderer,f=r.a.useRef(null),v=r.a.useRef(null),b=r.a.useRef(null);return r.a.useEffect((function(){h&&f.current&&s(new Q(f.current,v.current,b.current,c,o))}),[f,h]),r.a.useEffect((function(){return null===p||void 0===p?void 0:p.draw(d)}),[d,p]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"tree-view-container"},!d&&!l&&r.a.createElement(ie,null),d&&r.a.createElement(te,{node:d,_ref:b}),r.a.createElement("canvas",{ref:v,width:t,height:a}),r.a.createElement("canvas",{ref:f,width:t,height:a,onMouseLeave:function(){return null===p||void 0===p?void 0:p.hideSelection()},onClick:function(e){return null===p||void 0===p?void 0:p.click(e)},onMouseMove:function(e){return null===p||void 0===p?void 0:p.mouseMove(e)}})),r.a.createElement(Z,null))}function oe(e){var t=e.type;if("None"===t)return null;var a="",n=null;switch(t){case"OK":a="green",n=ee.a;break;case"Error":a="red",n=ee.g;break;case"Loading":a="black",n=ee.f;break;default:throw Error("Unrecognized badge ".concat(t,"."))}return r.a.createElement($.a,{style:{color:a},icon:n})}a(33);function se(e){var t=e.collapsed,a=e.setCollapsed,n=e.title,i=e.type,c=e.children;return r.a.createElement("div",{className:"collapsible-panel"},r.a.createElement("h4",{className:"title",onClick:function(){return a(!t)}},n,r.a.createElement(oe,{type:i})),r.a.createElement("div",{className:t?"content collapsed":"content expanded"},c))}function le(e){var t,a=e.title,n=e.isOk,i=e.collapsed,c=e.setCollapsed,o=e.loading,s=e.error,l=e.children;return t=s?"Error":o?"Loading":n?"OK":"None",r.a.createElement(se,{collapsed:i,setCollapsed:c,type:t,title:a},l,s&&r.a.createElement("p",{className:"error"},s))}function ue(){var e=r.a.useContext(K),t=e.state,a=e.setOwner,n=e.setOwnerFormCollapsed,i=e.setToken,c=e.getRepos,o=t.ownerData,s=o.owner,l=o.token,u=o.loading,h=o.collapsed,d=o.error,p=t.repoData.repos,f=r.a.createElement("section",null,r.a.createElement("label",null,"User/organisation ",r.a.createElement(re,null),r.a.createElement("input",{required:!0,type:"text",value:s,onChange:function(e){return a(e.target.value)}})),r.a.createElement("label",null,"GitHub token (optional)",r.a.createElement("input",{type:"password",value:l,onChange:function(e){return i(e.target.value)}})),r.a.createElement("button",{type:"button",disabled:!s,onClick:c},"Get repos"));return r.a.createElement(le,{collapsed:h,setCollapsed:n,loading:u,error:d,isOk:p&&p.length,title:"Owner data"},f)}function he(){var e=r.a.useContext(K),t=e.state,a=e.setRepo,n=e.setRepoFormCollapsed,i=e.getBranches,c=t.repoData,o=c.repos,s=c.repo,l=c.loading,u=c.collapsed,h=c.error,d=t.branchData.branches,p=r.a.createElement("section",null,r.a.createElement("label",null,"Choose repo:",r.a.createElement("select",{disabled:!o,value:s||".none",onChange:function(e){return a(e.target.value)}},r.a.createElement("option",{value:".none",disabled:!0,hidden:!0},"Select repo"),o&&o.map((function(e){return r.a.createElement("option",{key:e,value:e},e)})))),r.a.createElement("button",{type:"button",disabled:!s,onClick:i},"Get branches"));return r.a.createElement(le,{collapsed:u,setCollapsed:n,loading:l,error:h,isOk:d&&d.length,title:"Repository"},p)}function de(){var e=r.a.useContext(K),t=e.state,a=e.setBranch,n=e.setBranchFormCollapsed,i=e.buildTree,c=t.branchData,o=c.branches,s=c.branch,l=c.loading,u=c.collapsed,h=c.error,d=t.treeData,p=d.files,f=d.truncated,v=r.a.createElement(r.a.Fragment,null,r.a.createElement("section",null,r.a.createElement("label",null,"Choose branch:",r.a.createElement("select",{disabled:!o,value:s?s.name:".none",onChange:function(e){return a(o.find((function(t){return t.name===e.target.value})))}},r.a.createElement("option",{value:".none",disabled:!0,hidden:!0},"Select branch"),o&&o.map((function(e){return r.a.createElement("option",{key:e.commitSha,value:e.name},e.name)})))),r.a.createElement("button",{type:"button",disabled:!s,onClick:i},"Build tree")),f&&r.a.createElement("p",null,"It looks like GitHub API response is truncated. Provide your API token to fetch all the data."));return r.a.createElement(le,{collapsed:u,setCollapsed:n,loading:l,error:h,isOk:p&&p.length,title:"Branch"},v)}var pe=a(16),fe=a.n(pe);a(34);function ve(e){var t=e.node,a=e.showLink;if(!t)return null;var n="file"===t.type?ee.d:ee.e;return r.a.createElement("section",{className:"node-panel"},r.a.createElement("h5",null,r.a.createElement($.a,{color:"#0090FF",icon:n}),"Name: ",t.path||"root",a&&r.a.createElement(te,{node:t})),r.a.createElement("p",null,"Size: ",fe()(t.size)))}a(35);function be(){var e=r.a.useContext(K),t=e.state,a=e.setMainNode,n=t.treeData,i=n.tree,c=n.mainNode,o=n.hoveredNode;return r.a.createElement("div",{className:"tree-panel"},r.a.createElement("section",{className:"controls"},r.a.createElement("button",{disabled:!i,onClick:function(){return a(i)}},"Reset"),r.a.createElement("button",{disabled:!i||!c.parent,onClick:function(){return a(c.parent)}},"Navigate up")),r.a.createElement(ve,{node:c,showLink:!0}),r.a.createElement(ve,{node:o}))}a(36);function me(e){var t=e.children;return r.a.createElement("aside",{className:"sidebar expanded"},t)}function we(){return r.a.createElement(U,null,r.a.createElement(ce,{width:960,height:640}),r.a.createElement(me,null,r.a.createElement("form",null,r.a.createElement(ue,null),r.a.createElement(he,null),r.a.createElement(de,null)),r.a.createElement(be,null)))}a(37),a(38);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(we,null)),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.5b71c6ca.chunk.js.map