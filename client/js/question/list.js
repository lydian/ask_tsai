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
