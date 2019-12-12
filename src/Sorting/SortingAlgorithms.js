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
      j--;
    }
    array[j+1] = key;

  }

  return [array];
}
