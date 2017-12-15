import * as React from 'react'
import './userCard.less';
import map = require('lodash/map')
import * as AccountTypes from "../../constants/accountType"
interface IUserCardProps {
    user
}
export default class UserCard extends React.Component<IUserCardProps, any> {
    constructor(props) {
        super(props)
    }
    render() {
        let user = this.props.user
        let accounts = user.accounts
        let accoutIconList = map(accounts, (account: any, index) => {
            return  <AccountIcon key={index} info={account.info} type={account.type}/>
        })
        return (
            <div className="user-profile">
                <div>
                    <img src={user.avatar} />
                </div>
                <h4>{user.name}</h4>
                <p>{user.introduction}</p>
                <div className="account-icons">
                    {accoutIconList}
                </div>
            </div>
        )
    }
}
interface IAccountIconProps {
    type
    info
}
class AccountIcon extends React.PureComponent<IAccountIconProps, any> {
    constructor(props) {
        super(props)
    }
    click = () => {
        if (AccountTypes.GITHUB == this.props.type) {
            window.open(this.props.info,'_blank')
        } else if(AccountTypes.EMAIL == this.props.type) {

        }
    }
    getIconName(type) {
        switch(type) {
            case AccountTypes.GITHUB:
                return 'icon-github'
            case AccountTypes.EMAIL:
                return 'icon-email'
            default :
                return ''
        }
    }
    render() {
        let iconName = this.getIconName(this.props.type)
        return <a className={`account-icon ${this.props.type}`} onClick={this.click}>
            <i className={`iconfont ${iconName}`}></i>
        </a>
    }
}