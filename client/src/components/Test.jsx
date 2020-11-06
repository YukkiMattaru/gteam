import React from 'react';
import * as axios from "axios";

class Test extends React.Component {
    constructor() {
        super(null);
        this.response = null;
    }

    async componentDidMount() {
        this.response = await axios
            .get('login?id=yukkim&password=123123')
    }

    render () {
        return (
            <div>
                {this.response ? this.response.data.id : ""}
            </div>
        )
    }
}

export default Test;