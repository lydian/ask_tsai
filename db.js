Questions = new Mongo.Collection("questions");
Votes = new Mongo.Collection("votes");
Categories = new Mongo.Collection("categories");

Questions.allow({
    insert: function(userId, doc){
        try{
            check(doc, Questions.simpleSchema());
        }
        catch(err){
            throw new Meteor.Error(err.error, err.reason);
        }
        return (userId && doc.user_id === userId);
    },
});

Questions.before.insert(function(userId, doc){
    doc.user_id = userId;
    doc.createdAt = new Date();
});

Votes.before.insert(function(userId, doc){
    doc.user_id = userId;
    doc.createdAt = new Date();
});

Votes.allow({
    insert: function(userId, doc){
        var question = Questions.findOne({_id: doc.question_id});
        var voted = Votes.find({
            question_id: doc.question_id,
            user_id: userId
        }).count() > 0;
        if(question.user_id == this.userId) throw new Meteor.Error(
            '400', 'You cannot vote your own question.');
        if(voted) throw new Meteor.Error(
            '400', "You already vote on this question");
        return true;
    },
});
