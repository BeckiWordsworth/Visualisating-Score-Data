import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

export const GET_LOGICTESTRESULT = gql`
query getLogicTestResult($id: ID!) {
    organization(id: $id) {
        id
        name
        teams {
            edges {
                node {
                    id
                    name
                    employments {
                        edges {
                            node{
                                employment{
                                    user{
                                        id
                                        firstName
                                        lastName
                                        logicTest {
                                            edges {
                                                node {
                                                    score
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`;

export class WithLogicTestResult extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
        organizationId: PropTypes.string.isRequired
    };

    render() {
        const variables = {id: this.props.organizationId};

        return (
            <Query query={GET_LOGICTESTRESULT} notifyOnNetworkStatusChange={true} variables={variables}>
                {({data, loading, error}) => error ? this.props.onError(error) : this.props.children({loading, data})}
            </Query>
        );
    }
}

export default WithLogicTestResult;
