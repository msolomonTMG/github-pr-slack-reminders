module.exports = {
  subscriptions: function() {
    return [
      {
        slackChannel: process.env.PINNACLE_3_SLACK_URL,
        githubRepos: [
          {
            owner: "groupninemedia",
            name: "conex"
          }
        ]
      }
    ] 
  }
}
