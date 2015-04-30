
Template.question_ask.events({
    "submit form": function (event){
        event.preventDefault();
        id = Questions.insert({
          subject: event.target.subject.value,
          question: event.target.question.value
        });
    }
});


Template.question_list.helpers({
  questions: function (){
    // Show newest tasks first
    return Questions.find();
  }
})
