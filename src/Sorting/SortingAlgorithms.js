export function doBubbleSort(array) {

  const animations = [];
  const swap = [];

  for (var i = 0; i < array.length-1; i++) {
    for (var j = 0; j < array.length-i-1; j++) {

      // Push to animations for comparison color change
      animations.push([j,j+1]);
      animations.push([j,j+1]);
      if (array[j] > array[j+1]) {
        swap.push([array[j+1],array[j]]);
        swap.push([array[j+1],array[j]]);
        var temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      } else {
        swap.push([array[j],array[j+1]]);
        swap.push([array[j],array[j+1]]);
      }
    }
  }

  return [animations,swap,array];
}


export function doSelSort(array) {

    const animations = [];
    var min = array[0];
    var minIndex = 0;

  for ( let i = 0 ;i < array.length ; i++ ) {

    min = array[i];
    minIndex = i;

    for ( let j = i ; j < array.length ; j++ ) {
      animations.push([false,j,minIndex]);
      if ( min > array[j] ) {
        min = array[j];
        minIndex = j;
      }
    }
    animations.push([true,i,minIndex,array[i],array[minIndex]]);
    let temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return [animations,array];
}

export function doInsertionSort(array) {

  const animations = [];

  for ( let i = 1 ; i < array.length ; i++ ) {

    let key = array[i];
    let j = i-1;

    while( j >= 0 && array[j] >= key) {
      array[j+1] = array[j];
      animations.push([false,j+1,j,array[j+1],array[j]]);
      animations.push([true,j+1,j,array[j+1],array[j]]);
      j--;
    }
    array[j+1] = key;
  }
  return [animations,array];
}

export function doQuickSort(array) {

  const animations = [];

  var low = 0;
  var high = array.length - 1;

  quickSort(array,animations, low, high);

  return [animations,array];
}

function quickSort(array,animations,low,high) {

  if (low < high) {
    var i = 0;
    i = divide(array,animations, low, high);

    quickSort(array,animations, low, i - 1);
    quickSort(array,animations, i + 1, high);
  }

}

function divide(array,animations,low,high) {
  var pi = low;
  var lower = low + 1;
  animations.push([true,pi,0,0,0,0]);

  for (var i = lower; i <= high; i++) {

    if (array[i] < array[pi]) {
      animations.push([false,pi,lower,i,array[lower],array[i]]);
      exch(array, i, lower);
      lower++;
    }
  }
  --lower;
  animations.push([false,pi,lower,pi,array[lower],array[pi]]);
  exch(array, lower, pi);
  pi = lower;

  return pi;
}

function exch(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export function doMergeSort(array) {
  const animations = [];
  divide2(array, animations, 0, (array.length - 1));
  return [animations,array];
}

function divide2(array,animations,left,right) {

  if (left < right) {
            var mid = Math.floor((left + right) / 2);
            divide2(array, animations, left, mid);
            divide2(array, animations, mid + 1, right);

            merge(array, animations, left, mid, right);
        }
}

function merge(array, animations, left, mid, right) {

  let aux = array.slice();

  var i = left;
  var j = mid+1;
  for (let k = left; k <= right; k++) {
    if (i > mid) {
      array[k] = aux[j++];
    } else if (j > right) {
      array[k] = aux[i++];
    } else if (aux[j] <= aux[i]) {
      array[k] = aux[j++];
    } else {
      array[k] = aux[i++];
    }
    animations.push([false, k, array[k]]);
    animations.push([true, k, array[k]]);
  }
}
