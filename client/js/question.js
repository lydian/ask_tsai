Template.question_ask.helpers({
    categories: function(){
        return Categories.find({}).fetch();
    }
})

Template.question_ask.events({
    "submit form": function (event){
        event.preventDefault();
        if(!Meteor.user()){
            Session.set("error", "要先登入才能發問唷");
        }
        else{
            var question_id = Questions.insert({
                category_id: event.target.category_id.value,
                subject: event.target.subject.value,
                content: event.target.content.value
            });
            Router.go('question_show', {_id: question_id});
        }
    }
});

Template.question_list.events({
    'click .sort': function(event) {
        var sort = $(event.target).data('sort');
        var routeName = Router.current().route.getName();
        var category_id = Router.current().params.category_id;
        Router.go(
            routeName,
            {category_id: Router.current().getParams().category_id},
            {query: 'sort=' + sort}
        );
    },
    'click .card': function(event) {
        Router.go("question_show", {_id: this._id});
    }
});

Template.question_show.events({
    'click .vote': function(event){
        if(!Meteor.user()){
            Session.set("error", "要先登入才能投票");
        }
        else{
            var vid = Votes.insert({question_id: this._id});
            console.log(vid);
        }
    }
})
