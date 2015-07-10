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

for( var j=1; j<=100; j++){
	if( isPrime(j)){
		console.log(j)
	}
}