import React, { Component } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Link from '../Link/Link'
import ApolloClient from '../HOC/ApolloClient/ApolloClient'

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

class LinkList extends Component {
  componentDidMount() {
    this.props.client
      .query({
        query: gql`
          {
            feed {
              links {
                id
                createdAt
                url
                description
              }
            }
          }
        `
      })
      .then(response => console.log(response.data.feed.links))
  }

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const linksToRender = data.feed.links

          return (
            <div>
              {linksToRender.map(link => (
                <Link key={link.id} link={link} />
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default ApolloClient(LinkList)
