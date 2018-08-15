import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query, Mutation } from "react-apollo";

let client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

// let GET_PEOPLE = gql`
//   {
//     people {
//       id
//       first_name
//       last_name
//     }
//   }
// `;
let ADD_PERSON = gql`
  mutation($id: ID!, $first_name: String) {
    person(id: $id, first_name: $first_name) {
      id
      first_name
    }
  }
`;
let GET_PEOPLE = gql`
  query($id: ID!) {
    person(id: $id) {
      id
      first_name
      email
    }
  }
`;

class App extends Component {
  state = {
    name: ""
  };
  onChange = e => {
    this.setState({ name: e.target.value });
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Mutation
            mutation={ADD_PERSON}
            variables={{ id: 20, first_name: this.state.name }}
          >
            {(addPerson, { data, error, loading }) => {
              console.log("data: ", data);
              return (
                <div>
                  <input
                    onChange={this.onChange}
                    type="text"
                    placeholder="Name"
                  />
                  <button onClick={addPerson}>Submit</button>
                </div>
              );
            }}
          </Mutation>
          {/* <Query
            query={GET_PEOPLE}
            variables={{
              id: 4
            }}
          >
            {({ loading, error, data }) => {
              console.log("data: ", data);
              if (loading) return <div>loading...</div>;
              else {
                return <div>name: {data.person[0].first_name}</div>;
              }
            }}
          </Query> */}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
