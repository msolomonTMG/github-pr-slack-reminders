module.exports = {
  subscriptions: function() {
    return [
      {
        slackChannel: process.env.AUTOMATED_TESTING_SLACK_URL,
        githubRepos: [
          {
            owner: "groupninemedia",
            name: "auto-parcel"
          },
          {
            owner: "groupninemedia",
            name: "auto-pinnacle"
          },
          {
            owner: "groupninemedia",
            name: "auto-pylon"
          }
        ]
      }
    ] 
  }
}