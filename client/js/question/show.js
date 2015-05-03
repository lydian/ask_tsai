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
});
