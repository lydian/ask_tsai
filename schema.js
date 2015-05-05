var Schemas = {};

Schemas.Questions = new SimpleSchema({
    category_id: {
            type: String,
            label: "Category"
        },
    user_id: {
            type: String,
            label: "User",
        },
    subject: {
            type: String,
            label: "Subject",
            min: 10
        },
    content: {
            type: String,
            label: "Content",
            min: 300
        },
    createdAt: {
        type: Date,
        label: "Create Time",
    }
});
Questions.attachSchema(Schemas.Questions);

Schemas.Votes = new SimpleSchema({
    question_id: {
        type: String,
        label: "question_id",
    },
    user_id: {
        type: String,
        label: "user_id",
    },
    createdAt: {
        type: Date,
        label: "Create Time",
    }
});
Votes.attachSchema(Schemas.Votes);

Schemas.Categories = new SimpleSchema({
    name: {
        type: String,
        label: 'name',
        max: 10
    }
});
Categories.attachSchema(Schemas.Categories);
