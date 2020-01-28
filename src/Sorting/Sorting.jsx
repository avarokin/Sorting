
import React from 'react';
import './Sorting.css';
import {doBubbleSort, doSelSort, doInsertionSort} from './SortingAlgorithms.js'

export default class Sorting extends React.Component {

  // Constructor for Sorting class
  constructor(props) {
    super(props);
    this.state = {
      array: [],    // Array to hold values
    };
  }

  // Runs when  the webpage first loads up
  componentDidMount() {
    this.resetArray();
  }

  // Funciton to randomize array at startup
  resetArray () {

    const array = [];
    for (let i = 0 ; i < 240  ; i++  ) {
      array.push(0);
    }
    this.setState({array});

    this.initiate();
  }

  initiate() {

    const array = [];
    for (let i = 0 ; i < 240  ; i++  ) {
      array.push(randomIntFromInterval(5,600));
    }

    const arrayBars = document.getElementsByClassName('array-bar');

      for ( let i = 0 ; i < array.length ; i++ ) {

          setTimeout(() => {

            const barStyle = arrayBars[i].style;
            barStyle.height = `${array[i]}px`;

            if ( i === array.length-1 ) {
              enableButtons();
              this.setState({array});
            }

          }, i*(5));
      }

  }

  bubbleSort() {

    disableButtons();

    var speed = parseInt(document.getElementById('input-speed').value);
    speed = (1/speed) * 1000;

    const [animations,swap,array] = doBubbleSort(this.state.array);
    var j = 0;

    for (let i = 0; i < animations.length; i++) {

      const arrayBars = document.getElementsByClassName('array-bar');

      const [barOne, barTwo] = animations[i];
      const b1style = arrayBars[barOne].style;
      const b2style = arrayBars[barTwo].style;

      const color = i % 2 === 0 ? 'red' : '#ECECEC';
      var isSwap = i % 2 === 1 ? true : false;

      setTimeout(() => {

        if (isSwap ) {

          const [b1height, b2height] = swap[j++];

          b1style.height = `${b1height}px`;
          b2style.height = `${b2height}px`;
        }

        b1style.backgroundColor = color;
        b2style.backgroundColor = color;

        if ( i === animations.length-1 ) {
          enableButtons();
          this.setState({array});
        }
      }, i*(speed));
    }
  }

  selectionSort() {

    disableButtons();
    var speed = parseInt(document.getElementById('input-speed').value);
    speed = (1/speed) * 1000;

    const [animations,array] = doSelSort(this.state.array);

    var previousBarOne = 0;
    var previousBarTwo = 1;
    var j = 0;

    for ( let i = 0 ; i < animations.length ; i++ ) {

      const arrayBars = document.getElementsByClassName('array-bar');

      const [isSwap, barOne, barTwo, h1, h2] = animations[i];
      const b1style = arrayBars[barOne].style;
      const b2style = arrayBars[barTwo].style;

      const prevb1style = arrayBars[previousBarOne].style;
      const prevb2style = arrayBars[previousBarTwo].style;

      setTimeout(() => {

        prevb1style.backgroundColor = '#ECECEC';
        prevb2style.backgroundColor = '#ECECEC';

        if (!isSwap ) {
          b1style.backgroundColor = 'red';
          b2style.backgroundColor = 'red';
        } else {
            const b1height = 10;
            const b2height = 50;

            b1style.height = `${h2}px`;
            b2style.height = `${h1}px`;
        }

        if ( i === animations.length-1) {
          enableButtons();
          this.setState({array});
        }

      }, i*(speed));

      previousBarOne = barOne;
      previousBarTwo = barTwo;

    }
  }

  insertionSort() {

    disableButtons();
    var speed = parseInt(document.getElementById('input-speed').value);
    speed = (1/speed) * 1000;

    const array = doInsertionSort(this.state.array);

    for (var i = 0; i < array.length; i++) {
      console.log(array[i]);
    }



  }

  quickSort() {

  }

  heapSort() {

  }

  mergeSort() {

  }


  render() {
    const {array} = this.state;

    // hold values in array-bar objects
    return (
      <div className='array-container'>

        <div className='title'>Sorting Visualized</div>

        {array.map((value,index) => (
            <div
            className="array-bar"
            key={index}
            style={{height: `${value}px`}}></div>
          ))}

          <div className='buttons'>

            <input className='speed-style' id='input-speed' placeholder='Animation Speed(1-1000)' type="text" name="fname"></input>
            <button id='newArray' className='button-type' onClick={() => window.location.reload()}>Generate New Array</button>
            <button id='bubble' className='button-type' onClick={() => this.bubbleSort()}>BubbleSort</button>
            <button id='selection' className='button-type' onClick={() => this.selectionSort()}>SelectionSort</button>
            <button id='insertion' className='button-type' onClick={() => this.insertionSort()}>InsertionSort</button>
            <button id='quick' className='button-type' onClick={() => this.quickSort()}>QuickSort</button>
            <button id='heap' className='button-type' onClick={() => this.heapSort()}>HeapSort</button>
            <button id='merge' className='button-type' onClick={() => this.mergeSort()}>MergeSort</button>

          </div>
      </div>
    );
  }
}

function disableButtons() {
  document.getElementById("bubble").disabled = true;
  document.getElementById("selection").disabled = true;
  document.getElementById("insertion").disabled = true;
  document.getElementById("quick").disabled = true;
  document.getElementById("heap").disabled = true;
  document.getElementById("merge").disabled = true;
  document.getElementById("input-speed").disabled = true;
}

function enableButtons() {
  document.getElementById("bubble").disabled = false;
  document.getElementById("selection").disabled = false;
  document.getElementById("insertion").disabled = false;
  document.getElementById("quick").disabled = false;
  document.getElementById("heap").disabled = false;
  document.getElementById("merge").disabled = false;
  document.getElementById("input-speed").disabled = false;
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
