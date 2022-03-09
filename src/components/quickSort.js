import React from "react";

class QuickSort extends React.Component {
    constructor(props) {
        super(props);
    }
    mySort = (arr) => {
        if (arr.length <= 1) {
            return arr
        }
        let pivotIndex = Math.floor(arr.length / 2);
        let pivot = arr.splice(pivotIndex, 1)[0]
        let left = [];
        let right = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return this.mySort(left).concat([pivot], this.mySort(right))
    }

    mySort2 = (arr) => {
        if (arr.length <= 1) {
            return arr
        }
        let target = arr[0];
        let left = [];
        let right = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < target ) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return this.mySort2(left).concat(target, this.mySort2((right)));
    }

    quickSortAgain = (arr) => {
        if (arr.length <= 1) { // 当数组的长度为0或者1的时候， 就不用排了， 不用分割， 直接返回
            return arr
        }
        const target = arr.splice( Math.floor(arr.length / 2), 1)[0] // 从中间切割一个数， 来当作中数 arr.splice(index, nums), 从下标为index的位置开始 截取nums个数
        // 返回切割下来的数组成一个新的数组， 会改变原数组， splice翻译成拼接的意思
        const left = [];
        const right = [];
        for (let i = 0; i< arr.length; i++) {
            if (arr[i] < target) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return this.quickSortAgain(left).concat(target, this.quickSortAgain(right));
    }

    render() {
        return (
            <div>
                <h5>获取sort的结果</h5>
                <button onClick={ () => {
                  console.log(this.quickSortAgain([4, 5, 1, 6, 7, 3, 9, 2, 11, 45, 67, 2, 34, 1]))
                } }>获取sort的结果</button>
            </div>
        )
    }

}

export default QuickSort