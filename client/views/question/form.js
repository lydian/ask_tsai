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
            Questions.insert({
                category_id: event.target.category_id.value,
                subject: event.target.subject.value,
                content: event.target.content.value
            }, function(err, question_id){
                if(err){
                    console.log(err.message);
                    Session.set('error', err.message);
                }
                else{
                    Router.go('question_show', {_id: question_id});
                }
            });
        }
    }
});
