
Router.configure({
    layoutTemplate: 'layout'  //can be any template name
});
Router.route("homepage", {
    path: "/",
    template: "index"
});


Router.route('questions_ask', {
    path: 'questions/ask',
    template: 'question_ask',
    onBeforeAction: function(pause) {
        if (!(Meteor.user() || Meteor.loggingIn())) {
            Router.go('homepage');
        }
        this.next();
    },
});
Router.route('questions', {
    path: '/questions',
    data: function(){
        Router.go('/questions/all');
    },
    template: 'question_list'
});

Router.route('questions_category', {
    path: '/questions/:category_id',
    template: 'question_list',
    data: function(){
        var query = (this.params.category_id != 'all')?{'category_id': this.params.category_id}:{};
        var options = this.params.query;
        var return_options = {}
        if('sort' in options) return_options['sort'] = [[options.sort, 'desc']];
        var  other_accepted_options = ['limit', 'skip'];
        for(key in options){
            if(_.contains(other_accepted_options, key)){
                return_options[key] = options[value]
            }
        }
        var questions = Questions.find(query, return_options).map(function(question){
            question.user = Meteor.users.findOne({_id: question.user_id});
            question.category = Categories.findOne({_id: new Mongo.ObjectID(question.category_id)});
            question.votes = Votes.find({question_id: question._id}).map(function(vote){
                vote.user = Meteor.users.findOne({_id: vote.user_id});
                return vote;
            })
            return question;
        });
        var category = (this.params.category_id == 'all')?null:Categories.findOne(
                {_id: new Mongo.ObjectID(this.params.category_id)});
        return {questions: questions, category: category};
    }
});

Router.route('question_show', {
    path: 'question/:_id',
    template: 'question_show',
    data: function(){
        var question = Questions.findOne({_id: this.params._id});
        if(question){
            question.user = Meteor.users.findOne({_id: question.user_id});
            question.category = Categories.findOne({_id: new Mongo.ObjectID(question.category_id)});
            question.votes = Votes.find({question_id: this.params._id}).map(function(vote){
                vote.user = Meteor.users.findOne({_id: vote.user_id});
                return vote;
            });
            question.meAsked = question.user_id === Meteor.userId();
            question.voted = _.contains(_.map(question.votes, function(vote){
                return vote.user_id;
            }), Meteor.userId());
            return question;
        }
    }
});
