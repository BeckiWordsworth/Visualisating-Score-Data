import React from "react"
import {H2} from "../H2"
import './style.css';

class LogicTestResultsSummary extends React.Component {

    render() {
        let data = this.props.data;

        let teamScores = data.organization.teams.edges.map((teamEdge) => {
            let maxScore = 0
            let minScore = 1
            let teamSize = 0
            let totalScore = 0
            let scoreCount = 0
            let averageScore = 0

            teamEdge.node.employments.edges.forEach((employmentEdge) => {
                employmentEdge.node.employment.user.logicTest.edges.forEach((testEdge) => {
                    if (testEdge.node.score > maxScore) {
                        maxScore = testEdge.node.score;
                    }

                    if (testEdge.node.score < minScore) {
                        minScore = testEdge.node.score
                    }

                    totalScore += testEdge.node.score;
                    scoreCount += 1;
                })

                teamSize += 1;
            });

            if (scoreCount > 0) {
                averageScore = totalScore / scoreCount
                averageScore = Math.round(averageScore * 1000) / 1000;
            }

            if (teamSize === 0) {
                minScore = "-";
                maxScore = "-";
                averageScore = "-";
            }

            return (
                <tr key={'results_summary_' + teamEdge.node.id}>
                    <td>{teamEdge.node.name}</td>
                    <td>{minScore}</td>
                    <td>{maxScore}</td>
                    <td>{averageScore}</td>
                    <td>{teamSize}</td>
                </tr>
            )
        })

        return (
            <div className="logicResultsSummary">
                <H2>Scores by Team</H2>
                <table>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Minimum Score</th>
                            <th>Maximum Score</th>
                            <th>Average Score</th>
                            <th>Team Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamScores}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default LogicTestResultsSummary
