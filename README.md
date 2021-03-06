# Ask Tsai (小英給問嗎？北美版)

## INSTALL
### Setup Facebook:

copy and edit `config/settings.json.example` to `config/settings.json`

```
{
    "facebook_app_id": "YOUR_APP_ID",
    "facebook_secret": "YOUR_APP_SECRET"
}
```
You can get the app_id and secret from [facebook developers](https://developers.facebook.com/)

### Run
`meteor --settings config/settings.json`


### Deploy to Heroku

Follow direction in [heroku-buildpack-meteor](https://github.com/jordansissel/heroku-buildpack-meteor)

- mongolab: `heroku config | grep MONGOLAB_URI`
- facebook login: 
```heroku config:set FACEBOOK_APP_ID=<FACEBOOK_APP_ID FACEBOOK_SECRET=<FACEBOOK_SECRET>```


## Features
* Login with Facebook (You have to login to vote/ask question)
* Add Question
* List Questions (All/by Category)
* Add Vote
* My Dashboard

## Todo
* Send email if subscribed questions are answered or achieve vote goal
* Share question on Facebook


## Demo
Check our site on [小英給問嗎？北美版](http://ask-tsai.meteor.com)

