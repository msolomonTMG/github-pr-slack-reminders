# Github Pull Request Reminders in Slack
get a message in Slack about open pull requests in the repos of your choosing :)

![screenshot](https://user-images.githubusercontent.com/8402278/43326382-b66895da-9186-11e8-8714-28444cb69c6b.png)

## How to get open pull request reminders in your slack channel
1. Add an [incoming webhook](https://api.slack.com/incoming-webhooks) to your slack channel (requires slack admin permissions)
2. Add the URL for the webhook as a config variable in this app's [heroku settings](https://dashboard.heroku.com/apps/github-pr-slack-reminders/settings) (requires heroku contributor permissions)  
3. Make a PR that adds an object to the subscriptions array in the [config file](https://github.com/msolomonTMG/github-pr-slack-reminders/blob/master/config/index.js)  

```
{
  slackchannel: process.env.NAME_OF_YOUR_HEROKU_CONFIG_VARIABLE_FROM_STEP_2,
  githubRepos: [
    {
      owner: "name of repo owner",
      name: "name of repo"
    },
    {
      owner: "name of repo owner",
      name: "name of repo,
      authors: [
        "github username 1",
        "github username 2"
      ]
    }
  ]
}
```
