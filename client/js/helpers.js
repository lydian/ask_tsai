Meteor.subscribe('AllQuestions');
Meteor.subscribe('CategoryQuestions');
Meteor.subscribe('CategoryOfQuestion');
Meteor.subscribe('VotesOnQuestion');
Meteor.subscribe('userPublic');
Meteor.subscribe('categories');

Template.registerHelper('userLink', function(user){
   return $("<a></a>")
    .attr('href', user.services.facebook.link)
    .attr('target', '_blank')
    .text(user.services.facebook.name)[0]
    .outerHTML;
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm');
});

Template.registerHelper('formatContent', function(content) {
    return content.replace(/\r?\n/g, '<br />')
});
