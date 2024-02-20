import gql from "graphql-tag";

const typeDefs = gql`
  type Review {
    id: ID
    name: String!
    user: User
    userId: ID
    songs: [Song]
  }

  input ReviewInput {
    name: String!
  }

  type Query {
    review(id: ID!): Review
    review: [Review]
  }

  type Mutation {
    createPlaylist(userId: ID!, input: PlaylistInput!): Playlist
    addSong(playlistId: ID!, songId: ID!): Boolean
  }
`;
export default typeDefs;
