const set = new Set([ 'c']);
if (set.has('a')) {
  set.delete('a');
}else {
  set.add('b');
}


console.log([...set]);
