ServiceConfiguration.configurations.remove({
        service: 'facebook'
});

ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: Meteor.settings.facebook_app_id || process.env.FACEBOOK_APP_ID,
        secret: Meteor.settings.facebook_secret || process.env.FACEBOOK_SECRET
});
