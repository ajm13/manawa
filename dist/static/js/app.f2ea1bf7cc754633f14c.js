webpackJsonp([0],{"1uuo":function(t,e){},EeIY:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("nav",[e("ul",[e("router-link",{attrs:{tag:"li",to:"/"}},[this._v("Home")]),this._v(" "),e("router-link",{attrs:{tag:"li",to:"/insights"}},[this._v("Insights")]),this._v(" "),e("router-link",{attrs:{tag:"li",to:"/timeline"}},[this._v("Timeline")])],1)])},staticRenderFns:[]};var i={components:{Navbar:n("VU/8")({},a,!1,function(t){n("EeIY")},null,null).exports},name:"App"},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view"),this._v(" "),e("navbar")],1)},staticRenderFns:[]};var o=n("VU/8")(i,s,!1,function(t){n("ht6b")},null,null).exports,l=n("/ocq"),c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),n("br"),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var u=n("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},c,!1,function(t){n("1uuo")},"data-v-d8ec41bc",null).exports,v={data:function(){return{date:this.getDate(),categories:[{time:0,name:"sleep"},{time:0,name:"eat"},{time:0,name:"work"},{time:0,name:"class"},{time:0,name:"study"},{time:0,name:"exercise"},{time:0,name:"travel"},{time:0,name:"extracurriculars"},{time:0,name:"fun"}]}},methods:{getDate:function(){return(new Date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"home"}},[n("div",{attrs:{id:"date"}},[t._v(t._s(t.date))]),t._v(" "),n("div",{attrs:{id:"tracking"}},t._l(t.categories,function(e){return n("div",{key:e.name},[n("div",{staticClass:"circle",on:{click:function(t){e.time++}}},[t._v("\n        "+t._s(t._f("time")(e.time))+"\n      ")]),t._v(" "),n("div",{staticClass:"cat"},[t._v("\n        "+t._s(e.name)+"\n      ")])])}))])},staticRenderFns:[]};var m=n("VU/8")(v,h,!1,function(t){n("Vlz4")},null,null).exports,_=Math.sin,d=Math.cos,f=Math.PI,p=2*f,g={data:function(){return{circle:200*f,date:(new Date).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}).replace(",","\n"),data:[{name:"sleep",color:"hsl(220, 80%, 60%)",t:7},{name:"eat",color:"hsl(60, 80%, 60%)",t:.5},{name:"travel",color:"hsl(90, 80%, 60%)",t:.5},{name:"work",color:"hsl(30, 80%, 60%)",t:8},{name:"fun",color:"hsl(270, 80%, 60%)",t:6},{name:"nothing",color:"hsl(0, 80%, 60%)",t:2}]}},computed:{total:function(){return this.data.reduce(function(t,e){return t+e.t},0)},times:function(){var t=-f/2,e=this.total;return this.data.map(function(n){var r=n.t/e*p,a=t;return t+=r,r-=.025,a+=.0125,{color:n.color,a:r,o:a}})}},methods:{arc:function(t,e,n,r,a){var i=t+n*d(r),s=e+n*_(r),o=t+n*d(r+a),l=e+n*_(r+a);return"M "+i+" "+s+" A "+n+" "+n+" 0 "+(a<f?0:1)+" 1 "+o+" "+l},log:function(t){console.log(t)}}},k={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"insights"}},[t._m(0),t._v(" "),n("svg",{staticClass:"donut"},[n("text",{attrs:{id:"date",x:"50%",y:"50%","text-anchor":"middle","alignment-baseline":"central"}},[t._v(t._s(t.date))]),t._v(" "),t._l(t.times,function(e){return n("path",{key:e.color,attrs:{d:t.arc(150,150,100,e.o,e.a),stroke:e.color},on:{click:function(n){t.log(e)}}})})],2),t._v(" "),t._m(1),t._v(" "),n("div",{attrs:{id:"legend"}},t._l(t.data,function(e){return n("div",{key:e.name},[n("div",{staticClass:"blip",style:{backgroundColor:e.color}}),t._v("\n      "+t._s(e.name)+"\n    ")])}))])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("ul",{attrs:{id:"timespan"}},[e("li",{staticClass:"active"},[this._v("day")]),this._v(" "),e("li",[this._v("week")]),this._v(" "),e("li",[this._v("month")]),this._v(" "),e("li",[this._v("year")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"recommendation"}},[this._v("\n    You have 3 hours of unaccounted time."),e("br"),this._v("Go outside or something, idk.\n  ")])}]};var b=n("VU/8")(g,k,!1,function(t){n("RZPR")},null,null).exports,w={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  TIMELINE\n")])},staticRenderFns:[]},y=n("VU/8")(null,w,!1,null,null,null).exports;r.a.use(l.a);var E=new l.a({routes:[{path:"/hello",name:"HelloWorld",component:u},{path:"/",name:"Home",component:m},{path:"/insights",name:"Insights",component:b},{path:"/timeline",name:"Timeline",component:y}]}),x={time:function(t){return Math.floor(t/60)+":"+("00"+t%60).substr(-2)}};for(var j in x)x.hasOwnProperty(j)&&r.a.filter(j,x[j]);r.a.config.productionTip=!1,new r.a({el:"#app",router:E,components:{App:o},template:"<App/>"})},RZPR:function(t,e){},Vlz4:function(t,e){},ht6b:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f2ea1bf7cc754633f14c.js.map