Meteor.publish("UserPublic", function(){
    return Meteor.users.find({}, {
        fields: {
            'services.facebook.name': 1,
            'services.facebook.link': 1
        }
    });
});
Meteor.publish("Categories", function(){
    return Categories.find({});
});
Meteor.publish("VotesOnQuestion", function(question_id){
    return Votes.find({question_id: question_id});
});
Meteor.publish("CategoryOfQuestion", function(category_id){
    return Categories.find({_id: category_id});
});
Meteor.publish("AllQuestions", function(){
    return Questions.find({});
});
Meteor.publish("CategoryQuestions", function(category_id){
    return Questions.find({category_id: category_id});
});
Meteor.publish("Question", function(question_id){
    return Questions.find({_id: question_id}, {limit: 1});
})
Meteor.publish("MyQuestions", function(){
    return Questions.find({user_id: this.userId});
})
Meteor.publish("MyVotes", function(){
    return Votes.find({user_id: this.userId});
})
