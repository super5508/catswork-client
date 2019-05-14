import GraphQL, { gql } from './GraphQL'

const SET_UP = gql`
	mutation SetUpMutation($input: SetUpInput!) {
		setUp(input: $input) {
			ok
		}
	}
`

class User {

	static setUp(desiredIndustry, graduationMonth, graduationYear, degree, major) {
		return GraphQL.query(SET_UP, {
			input: { desiredIndustry, graduationMonth, graduationYear, degree, major }
		})
	}

}

export default User
