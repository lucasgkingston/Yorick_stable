define([
    "jquery",
    "underscore",
    "parse",
    "backbone",
    "marionette",
    "../collections/Users",
], function( $, _, Parse, Backbone, Marionette, Users ) {

    var UserHelper = Backbone.Model.extend({
        initialize: function() {
            var self = this;

            self.channel = Backbone.Wreqr.radio.channel('user');
            self.users = new Users;

            Backbone.Wreqr.radio.reqres.setHandler("user", "get", function (id) {
                return self.users.get(id);
            })
            Backbone.Wreqr.radio.reqres.setHandler("user", "all", function () {
                return self.users;
            })
        },
        get_users: function() {
            var self = this;
            var options = options || {};
            _.defaults(options, {update: true});
            return self.users.fetch();
        },

        get_latest_patronage: function(user) {
            var q = new Parse.Query("Patronage")
                .equalTo("owner", user)
                .descending("expiresOn");
            var patronage;
            return q.first().then(function (p) {
                patronage = p;
            }).always(function () {
                return Parse.Promise.as(patronage);
            })
        },
    });

    return new UserHelper;
} );
