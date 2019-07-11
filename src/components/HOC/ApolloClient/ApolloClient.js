import React from 'react';
import { ApolloConsumer } from "react-apollo";

function ApolloClient (WrappedComponent) {
    return class extends React.Component {
      render() {
        // Wraps the input component in a container, without mutating it. Good!
        return (
            <ApolloConsumer>
                {client => <WrappedComponent client={client} {...this.props} />}
            </ApolloConsumer>
        
        )
      }
    }
  }

  export default ApolloClient