import React from 'react';
import * as axios from "axios";

class Test extends React.Component {
    constructor() {
        super(null);
        this.response = null;
    }

    async componentDidMount() {
        this.response = await axios
            .get('/login')
    }

    render () {
        return (
            <div>
                {this.response ? this.response.data : ""}
            </div>
        )
    }
}

export default Test;