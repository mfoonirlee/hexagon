'use strict';
// import classNames

//随机数取值范围下限

const CONST_MIN_NUM = 1;
//随机数取值范围上限
const CONST_MAX_NUM = 19;
//difficult level 最大为2，最小为最大上线数-下限数
const CONST_DIFFICULT_LEVEL = 4;

//六边形主体组件
let HexagonComponent = React.createClass({
    displayName: 'HexagonComponent',

    //get game data
    getGameData: function () {
        //随机产生若干方块
        var arr = [];

        _.mixin({
            arrayCopy: function (arr) {
                return arr.concat(arr);
            }
        });

        arr = _.times(_.random(CONST_MIN_NUM, CONST_MAX_NUM), function () {
            return _.random(CONST_MIN_NUM, CONST_MAX_NUM);
        });

        arr = _.chain(arr).uniq().arrayCopy().shuffle().map(function (n, i) {
            return { id: 'item' + i.toString(), type: n, text: n, isChosed: false, isHide: false, className: 'hexagon2' };
        }).value();

        return arr;
    },
    //设置当前被选择的item状态
    setChosedStatus: function (id, localState) {
        let chosedItemsList = localState.items.filter(function (n) {
            return n.isChosed && !n.isHide;
        }),
            chosedArr = localState.chosedArr,
            item = localState.items.find(function (n) {
            return n.id == id;
        });

        //如果当前能选择的数量到了上限，需要将最先选择的从数组中移除
        if (chosedItemsList.length == CONST_DIFFICULT_LEVEL) {
            chosedArr[0].isChosed = false;
            chosedArr.shift();
        }

        //进行一次插入队列的操作
        if (item.isChosed) {
            item.isChosed = false;
            //选择已选择的item表示取消选择
            let index;
            chosedArr.forEach(function (n, i) {
                if (n.id == item.id) {
                    index = i;
                }
            });
            chosedArr.splice(index, 1);
        } else {
            item.isChosed = true;
            chosedArr.push(item);
        }

        return localState;
    },
    getInitialState: function () {
        return { items: this.getGameData(), chosedArr: [] };
    },
    //检测选中状态，更改成功匹配的item状态
    checkChosedStatus: function (id, itemsList) {
        var self = this;

        itemsList.forEach(function (n) {
            if (n.id == id && !n.isHide) {
                self.state.items.forEach(function (k) {
                    if (n.type == k.type && k.isChosed && n.id != k.id) {
                        n.isHide = true;
                        k.isHide = true;
                        self.props.addScore();
                        // $('[data-id=' + n.id + ']').addClass('disabled');
                        // $('[data-id=' + k.id + ']').addClass('disabled');
                    }
                });
            }
        });
        return itemsList;
    },
    handleClick: function (index, target) {
        var target = target.currentTarget,
            id = target.getAttribute('data-id'),
            item = this.state.items.find(function (n) {
            return n.id == id;
        }),
            localState = { items: this.state.items, chosedArr: this.state.chosedArr };

        if (item.isHide) {
            return;
        }

        localState.items = this.checkChosedStatus(id, localState.items);
        localState = this.setChosedStatus(id, localState);

        this.setState(localState);
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'hexagon-container' },
            this.state.items.map(function (item, i) {
                let className = classNames({
                    'hexagon2': true,
                    'current': item.isChosed,
                    'disabled': item.isHide
                });
                return React.createElement(
                    'div',
                    { className: className, onClick: this.handleClick.bind(this, i), key: i, 'data-text': item.text, 'data-type': item.type, 'data-id': item.id },
                    React.createElement(
                        'div',
                        { className: 'circle' },
                        React.createElement(
                            'p',
                            null,
                            item.text
                        )
                    )
                );
            }, this)
        );
    }
});

// ReactDOM.render(<HexagonComponent />, document.getElementById('j_container'));