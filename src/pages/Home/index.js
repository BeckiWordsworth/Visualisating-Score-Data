import React from 'react';
import styled from 'styled-components';
import {H1} from '../../components/H1';
import {WithLogicTestResult} from '../../containers/WithLogicTestResult';
import OrganizationHeader from '../../components/OrganizationHeader';
import LogicTestResults from '../../components/LogicTestResults';
import LogicTestResultsSummary from '../../components/LogicTestResultsSummary';

import {CONFIG} from '../../config';
import './style.css';


class Home extends React.Component {

    renderError = (error) => {
        console.log(error);

        return (
            <div>
                <h1>Something went wrong</h1>
            </div>
        );
    };

    render() {
        return (
            <Wrapper>
                <H1>Home</H1>
                <WithLogicTestResult onError={this.renderError} organizationId={CONFIG.ORGANIZATION_ID}>
                    {({loading, data}) => {
                        if (loading) {
                            return <p>Loading</p>;
                        }

                        return (
                            <div>
                                <OrganizationHeader name={data.organization.name} id={data.organization.id} />
                                <LogicTestResultsSummary data={data} />
                                <LogicTestResults data={data} />
                            </div>
                        )
                    }}
                </WithLogicTestResult>
            </Wrapper>
        );
    }
}


const Wrapper = styled.div`
   padding: 24px;
`;

export default Home;
