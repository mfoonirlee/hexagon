'use strict';

//显示数字组件

let NumberShower = React.createClass({
    displayName: 'NumberShower',

    getInitialState: function () {
        return { isActive: false, currentValue: '' };
    },
    //在组件间通信改变状态之前,记录下上一次的值
    componentWillReceiveProps: function () {
        this.setState({ isActive: !this.state.isActive, currentValue: this.props.targetValue });
        console.log(this.state.currentValue + ' ' + this.props.targetValue);
    },
    render: function () {
        let firstClassName, firstTextName, lastClassName, lastTextName;

        //如果两次变化的值相等，则不产生动画变化
        if (this.state.currentValue == this.props.targetValue) {
            firstClassName = '';
            firstTextName = this.state.currentValue;
            lastClassName = '';
            lastTextName = '';
        } else {
            //处理正常更迭的情况
            if (this.state.isActive) {
                firstClassName = 'scaleout';
                firstTextName = this.state.currentValue;
                lastClassName = '';
                lastTextName = this.props.targetValue;
            } else {
                firstClassName = '';
                firstTextName = this.props.targetValue;
                lastClassName = 'scaleout';
                lastTextName = this.state.currentValue;
            }
        }

        return React.createElement(
            'span',
            { className: 'num' },
            React.createElement(
                'i',
                { className: firstClassName },
                firstTextName
            ),
            React.createElement(
                'i',
                { className: lastClassName },
                lastTextName
            )
        );
    }
});

//menu组件
let MenuComponent = React.createClass({
    displayName: 'MenuComponent',

    getInitialState: function () {
        //避免在初始化时使用props,造成反模式
        return { time: 0, timeTitle: 'Time: ', ScoreTitle: 'Score: ' };
    },
    componentWillMount: function () {
        this.interval = setInterval(this.tick, 1000);
    },
    tick: function () {
        // this.setState({passedtime: this.state.time, time: ++this.state.time});
        this.setState({ time: ++this.state.time });
    },
    render: function () {
        return React.createElement(
            'ul',
            { className: 'menu' },
            React.createElement(
                'li',
                null,
                this.props.title
            ),
            React.createElement(
                'li',
                null,
                this.state.timeTitle,
                React.createElement(NumberShower, { targetValue: this.state.time })
            ),
            React.createElement(
                'li',
                null,
                this.state.ScoreTitle,
                React.createElement(NumberShower, { targetValue: this.props.score })
            )
        );
    }
});

// ReactDOM.render(<MenuComponent />, document.getElementById('j_menucontainer'));