AskTsai = {
    formatQuestionQuery: function(match, options){
        if('category_id' in match && match.category_id == 'all')
            delete match['category_id'];

        var accepted_options = ['sort', 'limit', 'skip'];
        for(key in options){
            if(key === 'sort')
                options.sort = [[options.sort, 'desc']]
            if(!_.contains(accepted_options, key))
                delete options[key];
        }
        return {match: match, options: options};
    },

    getCategory: function(category_id){
        try{
            return Categories.findOne({_id: new Mongo.ObjectID(category_id)});
        }catch(err){
            return;
        }
    },
    getQuestion: function(question){
        if(question){
            question.user = Meteor.users.findOne({_id: question.user_id});
            question.category = Categories.findOne({_id: new Mongo.ObjectID(question.category_id)});
            question.votes = Votes.find({question_id: question._id}).map(function(vote){
                vote.user = Meteor.users.findOne({_id: vote.user_id});
                return vote;
            });
            question.meAsked = question.user_id === Meteor.userId();
            question.voted = _.contains(_.map(question.votes, function(vote){
                return vote.user_id;
            }), Meteor.userId());
            return question;
        }
        return question;
    }
};
