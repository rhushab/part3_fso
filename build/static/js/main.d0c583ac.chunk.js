(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(27)},25:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var a=n(9),o=n.n(a),c=n(2),r=n.n(c),l=n(10),u=n(3),i=function(e){var t=e.note,n=e.toggleImportance,a=t.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},t.content,r.a.createElement("button",{onClick:n},a))},m=n(28),s=function(){return m.a.get("/api/notes").then(function(e){return e.data})},f=function(e){return m.a.post("/api/notes",e).then(function(e){return e.data})},p=function(e,t){return m.a.put("".concat("/api/notes","/").concat(e),t).then(function(e){return e.data})},d=(n(25),function(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),a=n[0],o=n[1],m=Object(c.useState)("a new note..."),d=Object(u.a)(m,2),g=d[0],h=d[1],E=Object(c.useState)(!0),b=Object(u.a)(E,2),v=b[0],j=b[1],O=v?a:a.filter(function(e){return e.important}),w=Object(c.useState)("some error happened..."),k=Object(u.a)(w,2),S=k[0],y=k[1];Object(c.useEffect)(function(){console.log("effect"),s().then(function(e){console.log("promise fulfilled"),o(e)})},[]),console.log("render",a.length,"notes");return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement(function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},{message:S}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return j(!v)}},"show ",v?"important":"all")),r.a.createElement("ul",null,r.a.createElement("ul",null,O.map(function(e){return r.a.createElement(i,{key:e.id,note:e,toggleImportance:function(){return function(e){console.log("importance of ".concat(e," needs to be toggled")),"http://localhost:3001/notes/".concat(e);var t=a.find(function(t){return t.id===e}),n=Object(l.a)({},t,{important:!t.important});p(e,n).then(function(t){o(a.map(function(n){return n.id!==e?n:t}))}).catch(function(e){y("Note '".concat(t.content,"' was already removed from server")),setTimeout(function(){y(null)},5e3)})}(e.id)}})})),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={content:g,important:Math.random()<.5};f(t).then(function(e){o(a.concat(e)),h("")})}},r.a.createElement("input",{value:g,onChange:function(e){console.log(e.target.value),h(e.target.value)}}),r.a.createElement("button",{type:"submit"},"save"))),r.a.createElement(function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Rhushabh Bontapalle 2023"))},null))});m.a.get("http://localhost:3001/notes").then(function(e){var t=e.data;console.log(t)}),o.a.createRoot(document.getElementById("root")).render(r.a.createElement(d,null))}},[[12,2,1]]]);
//# sourceMappingURL=main.d0c583ac.chunk.js.map