import React from "react"
import {H2} from "../H2"

class OrganizationHeader extends React.Component {

    render() {
        return(
            <div>
                <H2>{this.props.name}</H2>
                <p>(Id: {this.props.id})</p>
            </div>
        )
    }

}

export default OrganizationHeader
