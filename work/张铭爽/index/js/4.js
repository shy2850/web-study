function sort( arr ){
	for( var i=arr.length -1; i>=0; i--){
		for( var j=i+1; j<arr.length; j++){
			if( arr[j-1]>arr[j]){
				var temp = arr[j];
				arr[j] = arr[j-1];
				arr[j-1] = temp;
				console.log(arr);
			}
		}
	}
}

var a = [5,14,34,55,26,1,9,29];

sort(a)