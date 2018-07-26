const request = require('request')

const helpers = {
  sendSlackMessage: function(url, data) {
    return new Promise(function(resolve, reject) {
      
      let options = {
        method: 'post',
        body: data,
        json: true,
        url: url
      }
      
      request(options, function(err, response, body) {
        if (err) { console.log(err); return; }
        return resolve(body)
      })
      
    });
  }
}

module.exports = {
  sendPullRequestsToChannel: function(channel, repos) {
    console.log('sending to slack...')
    return new Promise(function(resolve, reject) {
      
      let slackAttachments = []
      
      Object.keys(repos).forEach((repo, index) => {
        
        repos[repo].forEach(pullRequest => {
          
          let slackAttachment = {
            fallback: pullRequest.title,
            author_name: pullRequest.authorLogin,
            author_link: pullRequest.authorUrl,
            title: pullRequest.title,
            title_link: pullRequest.url,
            color: pullRequest.color,
            footer: repo,
            ts: pullRequest.createdAt,
            footer_icon: 'https://camo.githubusercontent.com/7710b43d0476b6f6d4b4b2865e35c108f69991f3/68747470733a2f2f7777772e69636f6e66696e6465722e636f6d2f646174612f69636f6e732f6f637469636f6e732f313032342f6d61726b2d6769746875622d3235362e706e67',
            fields: [
              {
                title: "Reviewer",
                value: pullRequest.reviewer,
                short: true
              },
              {
                title: "Mergeable",
                value: pullRequest.mergeable,
                short: true
              },
              {
                title: "Review Status",
                value: pullRequest.reviewStatus,
                short: true
              },
              {
                title: "Review Requested",
                value: pullRequest.reviewRequested,
                short: true
              }
            ]
          }
          
          slackAttachments.push(slackAttachment)
          
        })
        
        if (Object.keys(repos).length == index + 1) {
          let postData = {
            text: `:wave: Here are your open pull requests!`,
            attachments: slackAttachments
          }
          
          helpers.sendSlackMessage(channel, postData)
          .then(success => {
            return resolve(success)
          })
          .catch(err => {
            return reject(err)
          })
        }
        
      })
      
    });
  }
}