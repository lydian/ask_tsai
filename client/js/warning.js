Template.warning.helpers({
    error: function(){
        var obj = Session.get('error');
        delete Session.keys['error'];
        return {'message': obj};
    }
});
