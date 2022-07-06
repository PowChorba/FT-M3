function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let num = 1
  while(max ? num <= max : true){
    if(num % 3 === 0 && num % 5 === 0){
      yield 'Fizz Buzz'
    } else if(num % 3 === 0){
      yield 'Fizz'
    }else if (num % 5 === 0){
      yield 'Buzz'
    }else {

      yield num
    }
    num++;
  }
}

module.exports = fizzBuzzGenerator;
