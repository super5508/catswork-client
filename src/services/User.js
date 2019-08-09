import GraphQL, { gql } from './GraphQL'

const SET_UP = gql`
	mutation AddNewPersonalInfo($parameter: userCreationInputType) {
		AddNewPersonalInfo(parameter: $parameter) {
			userId
		}
	}
`

class User {
	 static setUp (name, desiredIndustry, gradMonth, gradYear, degree, major) {
		return GraphQL.query(SET_UP, {
			parameter: {name, desiredIndustry, gradMonth: gradMonth, gradYear: gradYear, degree, major }
		})
	}

}

export default User
