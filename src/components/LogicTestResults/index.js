import React from "react"
import {H2} from "../H2"
import "./style.css"

class LogicTestResults extends React.Component {

    render() {
        let data = this.props.data;

        let results = data.organization.teams.edges.map((teamEdge) => {
            let logicTestResults = teamEdge.node.employments.edges.map((employmentEdge) => {
                let logicTestEdges = employmentEdge.node.employment.user.logicTest.edges;
                let score = "N/A";

                // If this person has done more than one test, use the last one
                if (logicTestEdges.length > 0) {
                    score = logicTestEdges[logicTestEdges.length - 1].node.score;
                }

                return (
                    <tr key={'logic_result_' + employmentEdge.node.employment.user.id}>
                        <td>{employmentEdge.node.employment.user.firstName}</td>
                        <td>{score}</td>
                    </tr>
                );
            })

            if (logicTestResults.length === 0) {
                return (
                    <div key={'logic_result_team_' + teamEdge.node.id}>
                        <H2>Team: {teamEdge.node.name}</H2>
                        <p>No Data Available</p>
                    </div>
                )
            }

            return (
                <div key={'logic_result_team_' + teamEdge.node.id}>
                    <H2>Team: {teamEdge.node.name}</H2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logicTestResults}
                        </tbody>
                    </table>
                </div>
            )
        })

        return (
            <div className="logicResults">
                <H2>Logic Test Results by Team</H2>
                {results}
            </div>
        );
    }

}

export default LogicTestResults
