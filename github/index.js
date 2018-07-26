const request = require('request')
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const helpers = {
  makeGraphqlRequest: function(query) {
    return new Promise(function(resolve, reject) {
      
      let options = {
        method: 'post',
        url: `https://api.github.com/graphql`,
        body: JSON.stringify({
          query: query
        }),
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'User-Agent': `msolomonTMG`
        }
      }
      
      request(options, function(err, response, body) {
        if(err) { console.log(err); return reject(err);}
        return resolve(body)
      })
      
    });
  }
}

module.exports = {
  getOpenPullRequests: function(repos) {
    return new Promise(function(resolve, reject) {
      
      let query = `query {`
      
      repos.forEach((repo, index) => {
        query = query.concat(`
          query${index}: repository(owner: "${repo.owner}", name: "${repo.name}") {
            pullRequests(first: 50, states:OPEN) {
              edges{
                node{
                  title,
                  url,
                  author {
                    login,
                    url
                  },
                  mergeable,
                  createdAt,
                  reviews(first: 1) {
                    edges {
                      node {
                        author {
                          login
                        },
                        state
                      }
                    }
                  }
                  reviewRequests(first:10) {
                    edges {
                      node {
                        requestedReviewer {
                          __typename
                        }
                      }
                    }
                  }
                  suggestedReviewers {
                    reviewer {
                      login,
                      name
                    }
                  }
                }
              }
            }
          }
        `)
        if (index + 1 == repos.length) {
          query += '}'
          
          helpers.makeGraphqlRequest(query)
          .then(response => {
            return resolve(JSON.parse(response))
          }).catch(err => {
            return reject(err)
          })
        }
      })
      
    });
  }
}