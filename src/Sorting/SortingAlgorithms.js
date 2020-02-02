export function doBubbleSort(array) {

  const animations = [];
  const swap = [];
  var compares = 0;
  var swaps = 0;

  for (var i = 0; i < array.length-1; i++) {
    for (var j = 0; j < array.length-i-1; j++) {

      // Push to animations for comparison color change
      animations.push([j,j+1]);
      animations.push([j,j+1]);
      compares++;
      if (array[j] > array[j+1]) {
        swap.push([array[j+1],array[j]]);
        swap.push([array[j+1],array[j]]);
        var temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
        swaps++;
      } else {
        swap.push([array[j],array[j+1]]);
        swap.push([array[j],array[j+1]]);
      }
    }
  }

  return [animations,swap,array,compares,swaps];
}


export function doSelSort(array) {

    const animations = [];
    var min = array[0];
    var minIndex = 0;
    var comps = 0;
    var swaps = 0;

  for ( let i = 0 ;i < array.length ; i++ ) {

    min = array[i];
    minIndex = i;

    for ( let j = i ; j < array.length ; j++ ) {
      animations.push([false,j,minIndex]);
      comps++;
      if ( min > array[j] ) {
        min = array[j];
        minIndex = j;
      }
    }
    animations.push([true,i,minIndex,array[i],array[minIndex]]);
    swaps++;
    let temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return [animations,array,comps,swaps];
}

export function doInsertionSort(array) {

  const animations = [];
  var swaps = 0;
  var comps = 0;

  for ( let i = 1 ; i < array.length ; i++ ) {

    let key = array[i];
    let j = i-1;

    while( j >= 0 && array[j] >= key) {
      comps++;
      swaps++;
      array[j+1] = array[j];
      animations.push([false,j+1,j,array[j+1],array[j]]);
      animations.push([true,j+1,j,array[j+1],array[j]]);
      j--;
    }
    comps++;
    array[j+1] = key;
  }
  return [animations,array,comps,swaps];
}

export function doQuickSort(array) {

  const animations = [];
  var cs = [0,0];

  var low = 0;
  var high = array.length - 1;

  quickSort(array,animations, low, high, cs);
  return [animations,array,cs[0],cs[1]];
}

function quickSort(array,animations,low,high,cs) {

  if (low < high) {
    var i = 0;
    i = divide(array,animations, low, high,cs);

    quickSort(array,animations, low, i - 1,cs);
    quickSort(array,animations, i + 1, high,cs);
  }

}

function divide(array,animations,low,high,cs) {
  var pi = low;
  var lower = low + 1;
  animations.push([true,pi,0,0,0,0]);

  for (var i = lower; i <= high; i++) {
    cs[0]++;
    if (array[i] < array[pi]) {
      animations.push([false,pi,lower,i,array[lower],array[i]]);
      cs[1]++;
      exch(array, i, lower);
      lower++;
    }
  }
  --lower;
  animations.push([false,pi,lower,pi,array[lower],array[pi]]);
  cs[1]++;
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
  var cs = [0,0];

  divide2(array, animations, 0, (array.length - 1),cs);
  return [animations,array, cs[0],cs[1]];
}

function divide2(array,animations,left,right,cs) {

  cs[0]++;
  if (left < right) {
            var mid = Math.floor((left + right) / 2);
            divide2(array, animations, left, mid,cs);
            divide2(array, animations, mid + 1, right,cs);

            merge(array, animations, left, mid, right,cs);
        }
}

function merge(array, animations, left, mid, right,cs) {

  let aux = array.slice();

  var i = left;
  var j = mid+1;
  for (let k = left; k <= right; k++) {
    if (i > mid) {
      array[k] = aux[j++];
      cs[0]++;
      cs[1]++;
    } else if (j > right) {
      array[k] = aux[i++];
      cs[0]++;
      cs[1]++;
    } else if (aux[j] <= aux[i]) {
      array[k] = aux[j++];
      cs[0]++;
      cs[1]++;
    } else {
      array[k] = aux[i++];
      cs[0]++;
      cs[1]++;
    }
    animations.push([false, k, array[k]]);
    animations.push([true, k, array[k]]);
  }
}

export function doHeapSort(array) {

  const animations = [];
  var cs = [0,0];

  let n = array.length;
          for (let k = Math.floor(n / 2); k >= 1; k--)
              sink(array,animations, k, n,cs);
          while (n > 1) {
              cs[0]++;
              exch2(array, 1, n--);
              sink(array,animations, 1, n,cs);
              animations.push([false,1,n,array[1],array[n]]);
              animations.push([true,1,n,array[1],array[n]]);

          }
  return [animations,array,cs[0],cs[1]];
}

function sink(array, animations, k, n, cs) {

  while (2 * k <= n) {
    let j = 2 * k;
    cs[0]++;

    if (j < n && less(array, j, j + 1)){
      cs[0]++;
      j++;
    }

    if (!less(array, k, j)){
      break;
    }

    if ( array[j] != undefined ) {
      animations.push([false,k,j,array[k],array[j]]);
      animations.push([true,k,j,array[k],array[j]]);
    }
    cs[1]++;
    exch2(array, k, j);
    k = j;
        }
}

function exch2(array, i , j) {
  let swap = array[i - 1];
  array[i - 1] = array[j - 1];
  array[j - 1] = swap;
}

function less(array,i,j) {
  return array[i-1]<array[j-1];
}
