
let HexagonApp = React.createClass({
    getInitialState: function () {
        return {score: 0, title: 'Demo Game'};
    },
    addScore: function (score) {
        var originScore = this.state.score;

        this.setState({score: originScore + (score || 1)});
    },
    render: function () {
        return (
            <div>
                <HexagonComponent score={this.state.score} addScore={this.addScore} />
                <MenuComponent score={this.state.score} title={this.state.title}/>
            </div>
        );
    }
});

ReactDOM.render(<HexagonApp />, document.getElementById('j_app'));