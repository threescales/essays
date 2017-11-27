import * as React from 'react';
import { Link } from 'react-router-dom';
export default class Welcome extends React.Component<any, any> {
    render() {
        return (
            <div>
                <p>Hello World</p>
                <img
                    src="https://git-scm.com/book/en/v2/images/remote-branches-3.png" />
            </div>
        )
    }
}