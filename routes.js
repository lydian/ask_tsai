Router.route('/question_list', function () {
    Session.set("templateName", "question_list");
    this.render("layout");
});

Router.route('/question_ask', function () {
    Session.set("templateName", "question_ask");
    this.render("layout");
});
