define(["underscore","jquery","backbone","text!../templates/troupes-list.html","parse","../collections/Troupes","../helpers/PromiseFailReport"],function(e,t,i,r,n,o,l){var s=i.View.extend({initialize:function(){e.bindAll(this,"render","register"),this.collection=new o,this.listenTo(this.collection,"add remove reset",this.render)},register:function(t,i){var r,o=this;if(t=t||"#troupe/<%= troupe_id %>",e.eq(t,o.base_url)||(o.base_url=t,r=!0),i=i||function(){},!e.eq(i,o.filter)){var s=[],c=new n.Query("Troupe");return c.select("id","name","portrait","shortdescription","location","staffemail"),c.include("portrait"),i(c),c.each(function(e){s.push(e)}).then(function(){o.collection.reset(s)}).fail(l)}return n.Promise.as([])},events:{"click .troupe-listing":"clicked"},clicked:function(i){var r=this;i.preventDefault(),t.mobile.loading("show");var n=t(i.currentTarget).attr("backendId"),o=e.template(r.base_url)({troupe_id:n});window.location.hash=o},render:function(){var t=this;return this.template=e.template(r)({collection:t.collection.models}),this.$el.find("div[role='troupe-list']").html(this.template),this.$el.enhanceWithin(),this}});return s});