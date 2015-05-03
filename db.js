Questions = new Mongo.Collection("questions");
Votes = new Mongo.Collection("votes");
Categories = new Mongo.Collection("categories");

Questions.allow({
    insert: function(userId, doc){
        return (userId && doc.user_id === userId);
    },
});

Questions.before.insert(function(userId, doc){
    doc.user_id = userId;
    doc.createdAt = new Date();
    doc.updatedAt = new Date();
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
        if(voted) throw new Meteor.Error(404, "你投過啦!");
        return true;
    },
});

