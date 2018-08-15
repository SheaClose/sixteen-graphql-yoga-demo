const { GraphQLServer } = require("graphql-yoga");
const people = require("./people.json");

const typeDefs = `
  type Query {
    message: String!
    people: [Person]!
    person(id: ID, first_name: String, last_name:String, email:String): [Person]
  }
  type Person {
    id: ID!
    first_name: String
    last_name: String
    email:String
  }
  type Mutation {
    person(id: ID!, first_name: String, last_name:String, email:String): [Person]
  }
`;

const resolvers = {
  Query: {
    message() {
      return "Hello World!";
    },
    people() {
      return people;
    },
    person(_, { id, first_name }, req) {
      // const db = req.app.get('db')
      // db.people.find({id: id})
      if (id) {
        return people.filter(person => person.id == id);
      }
    }
  },
  Mutation: {
    person(_, args) {
      people.push(args);
      return people;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: ctx => ctx.request
});

// massive(process.env.Connection).then(db=>{
// server.express.set('db', db)
// })

server.start(
  {
    endpoint: "/graphql",
    playground: "/graphiql"
    // port: 3001
  },
  ({ port }) => console.log(`listening on port: ${port}`)
);
