
let HexagonApp = React.createClass({
    displayName: 'HexagonApp',

    getInitialState: function () {
        return { score: 0, title: 'Demo Game' };
    },
    addScore: function (score) {
        var originScore = this.state.score;

        this.setState({ score: originScore + (score || 1) });
    },
    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement(HexagonComponent, { score: this.state.score, addScore: this.addScore }),
            React.createElement(MenuComponent, { score: this.state.score, title: this.state.title })
        );
    }
});

ReactDOM.render(React.createElement(HexagonApp, null), document.getElementById('j_app'));