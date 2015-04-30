Meteor.startup(function () {
    layout = new Iron.Layout({});

});

Template.layout.helpers({
    template_name: function() {
       return Session.get("templateName")
    }
});
