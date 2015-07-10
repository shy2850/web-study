function isPrime( n ){
	if( n===2 || n === 3){
		return true;
	}
	for( var i=2; i<n; i++){
		if( !(n%i )){
			return false;
		}
	}
	return true;
}

function sumPrimes ( n ){
	var sum = 0;
	for( var j=1; j<=n; j++){
		if( isPrime(j)){
			sum += j;
		}
	};
	return sum;
}

console.log( sumPrimes(30) );

