(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,a){},103:function(e,t,a){},192:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(16),o=a.n(l),i=(a(101),a(26)),c=a(27),s=a(32),u=a(28),m=a(33),d=(a(103),a(208)),h=a(197),E=a(207),g=a(22),p=a(87),f=a.n(p),w=a(209),v=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).onlyFollower=function(e){return a.state.user.following.some(function(t){return t.login===e.login})?[r.a.createElement(g.Node,{id:e.login,label:e.login,shape:"circularImage",image:e.avatarUrl,color:"#33ff33"}),r.a.createElement(g.Edge,{id:e.login,from:a.state.user.userId,to:e.login,arrows:"to;from",color:{inherit:"to"}})]:[r.a.createElement(g.Node,{id:e.login,label:e.login,shape:"circularImage",image:e.avatarUrl,color:"#3333ff"}),r.a.createElement(g.Edge,{id:e.login,from:a.state.user.userId,to:e.login,arrows:"from",color:{inherit:"to"}})]},a.onlyFollowing=function(e){return a.state.user.followers.some(function(t){return t.login===e.login})?r.a.createElement(r.a.Fragment,null):[r.a.createElement(g.Node,{id:e.login,label:e.login,shape:"circularImage",image:e.avatarUrl,color:"#ff6633"}),r.a.createElement(g.Edge,{id:e.login,from:a.state.user.userId,to:e.login,arrows:"to",color:{inherit:"to"}})]},a.handleDoubleClick=function(e){e.nodes[0]&&e.nodes[0]!==a.state.user.userId&&(window.location.pathname=e.nodes[0])},a.state={user:{userId:"",name:"",avatarUrl:"",url:"",followers:[],following:[]},options:{edges:{smooth:{type:"dynamic",forceDirection:"none"},length:100}}},a.networkRef=r.a.createRef(),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;(function(e){try{return f.a.get("http://vanillacraft.cn:3001"+e)}catch(t){return console.log(t),null}})(window.location.pathname).then(function(t){console.log(t),200===t.status&&t.data.data.user?(t=t.data.data,e.setState({user:{userId:t.user.login,name:t.user.name,avatarUrl:t.user.avatarUrl,url:t.user.url,followers:t.user.followers.nodes,following:t.user.following.nodes}}),e.networkRef.current.network.on("doubleClick",e.handleDoubleClick)):e.setState({error:t.data.error})})}},{key:"render",value:function(){return this.state.user.userId&&!this.state.error?r.a.createElement(g.Network,{className:"network",ref:this.networkRef,options:this.state.options},r.a.createElement(g.Node,{id:this.state.user.userId,label:this.state.user.userId,shape:"circularImage",image:this.state.user.avatarUrl}),this.state.user.following.map(this.onlyFollowing),this.state.user.followers.map(this.onlyFollower)):this.state.error?r.a.createElement("div",{id:"Page"},r.a.createElement(w.a,{bsStyle:"danger",onDismiss:function(){window.location.pathname=""}},r.a.createElement("h4",null,"Oh snap! You got an error!"),r.a.createElement("p",null,"Your query cannot be fulfilled."),r.a.createElement("p",null,"These are the possible reasons:"),r.a.createElement("ul",null,"The user does not exist."),r.a.createElement("ul",null,"The server is not available."))):r.a.createElement(r.a.Fragment,null)}}]),t}(n.Component),b=a(205),y=a(198),k=a(199),I=a(204),O=a(200),j=a(201),C=a(202),R=a(85),S=a(203),T=a(194),x=a(195),K=a(206),U=a(196),D=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("form",null,r.a.createElement(T.a,null,r.a.createElement(x.a,null,"Enter a Github username"),r.a.createElement(K.a,{type:"text",value:this.props.value,placeholder:"Enter text",onChange:this.props.onChange}),r.a.createElement(K.a.Feedback,null),r.a.createElement(U.a,null,"You can also use your own Github private token. TODO")))}}]),t}(n.Component);function F(e){var t=e.match;return r.a.createElement(v,{userid:t.params.id})}var N=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={userId:""},a.userRedirect=function(){a.state.userId&&(window.location.href="/"+a.state.userId)},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"home"},r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(j.a,null,"Github User Mapping ",r.a.createElement("small",null,"see your following and followers!")),r.a.createElement(C.a,null,r.a.createElement("p",null,"This app enables you to visualize your github user mapping, including followers and followings."),r.a.createElement("p",null,r.a.createElement(D,{value:this.state.userId,onChange:function(t){return e.setState({userId:t.target.value})},onPressEnter:this.userRedirect}),r.a.createElement(R.a,{bsStyle:"info",onClick:this.userRedirect},"Show me the graph! "))),r.a.createElement(S.a,{id:"example"},r.a.createElement(S.a.Heading,null,r.a.createElement(S.a.Title,{componentClass:"h3"},"Example")),r.a.createElement(S.a.Body,null,r.a.createElement("img",{id:"exampleImg",src:"example.png",alt:"graph"}))),r.a.createElement(S.a,{id:"about"},r.a.createElement(S.a.Heading,null,r.a.createElement(S.a.Title,{componentClass:"h3"},"About")),r.a.createElement(S.a.Body,null,r.a.createElement("p",null,r.a.createElement("a",{href:"http://somewhere"},"GitRepo")),r.a.createElement("p",null,"Made by ",r.a.createElement(h.a,{to:"/TianqiCS/"},"Tianqi Wang")),r.a.createElement("p",null,"Last Updated on 2019-01-26"))))}}]),t}(r.a.Component),B=function(){return r.a.createElement(d.a,null,r.a.createElement("div",{className:"page"},r.a.createElement(b.a,{id:"nav",inverse:!0,collapseOnSelect:!0},r.a.createElement(b.a.Header,null,r.a.createElement(b.a.Brand,null,r.a.createElement(h.a,{to:"/"},"GitMap")),r.a.createElement(b.a.Toggle,null)),r.a.createElement(b.a.Collapse,null,r.a.createElement(y.a,null,r.a.createElement(k.a,{eventKey:1,href:"#"},"Link"),r.a.createElement(k.a,{eventKey:2,href:"#"},"Link"),r.a.createElement(I.a,{eventKey:3,title:"Dropdown",id:"basic-nav-dropdown"},r.a.createElement(O.a,{eventKey:3.1},"Action"),r.a.createElement(O.a,{eventKey:3.2},"Another action"),r.a.createElement(O.a,{eventKey:3.3},"Something else here"),r.a.createElement(O.a,{divider:!0}),r.a.createElement(O.a,{eventKey:3.3},"Separated link"))),r.a.createElement(y.a,{pullRight:!0},r.a.createElement(k.a,{eventKey:1,href:"#"},"Link Right"),r.a.createElement(k.a,{eventKey:2,href:"#"},"Link Right")))),r.a.createElement(E.a,{exact:!0,path:"/",component:N}),r.a.createElement(E.a,{path:"/:id",component:F})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},95:function(e,t,a){e.exports=a(192)}},[[95,2,1]]]);
//# sourceMappingURL=main.f48243cc.chunk.js.map