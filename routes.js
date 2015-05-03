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
        var formatedQuery = AskTsai.formatQuestionQuery(
            {category_id: this.params.category_id},
            this.params.query
        );
        var questions = Questions.find(
            formatedQuery.match,
            formatedQuery.options
        ).map(AskTsai.getQuestion);

        var category = AskTsai.getCategory(this.params.category_id);
        return {questions: questions, category: category};
    }
});

Router.route('question_show', {
    path: 'question/:_id',
    template: 'question_show',
    data: function(){
        return AskTsai.getQuestion(Questions.findOne({_id: this.params._id}));
    }
});

Router.route("myDashBoard", {
    path: 'my',
    template: 'myDashBoard',
    data: function(){}
});
