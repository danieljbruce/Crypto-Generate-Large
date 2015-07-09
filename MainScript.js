

var fGenerateLargePrime = function(pPrimeList, pLowerBound, pTimeOut){
	 var lclStartDate = new Date();
	 var lclStartTime = lclStartDate.getTime();
	 
	 var lclReturnValue = pPrimeList.getNumberCoprimeWithList(pLowerBound);
	 while(true){
		
		
		if (lclReturnValue.isPrime()) {
			break;
		} else {
			var lclDateNow = new Date();
			var lclTimeNow = lclDateNow.getTime();
			lclReturnValue = bigInt(pPrimeList.getNumberCoprimeWithList(lclReturnValue + 2, pTimeOut - lclTimeNow + lclStartTime));
		}
		
		var lclDateNow = new Date();
		var lclTimeNow = lclDateNow.getTime();
		if (lclStartTime + pTimeOut < lclTimeNow || lclReturnValue === -1){
			return -1;
		}
	}
	return lclReturnValue;
}

var fGenerateLargePrimeWithMultipleAttempts = function(pLowerBound, pTimeOut){
	var lclStartDate = new Date();
	var lclStartTime = lclStartDate.getTime();
	var yourPL = new PrimeList(5);
	
	while (true){
		var lclDateNow = new Date();
		var lclTimeNow = lclDateNow.getTime();
		if (lclTimeNow > lclStartTime + pTimeOut){
			return -1;
		}
		
		var lclNumberGenerated = bigInt(fGenerateLargePrime(yourPL, pLowerBound, Math.min(30, pTimeOut - lclTimeNow + lclStartTime)));
		if (lclNumberGenerated.neq(bigInt(-1)))
			return lclNumberGenerated;
	}
}

var fGenerateCoprime = function(pLowerLimit, pUpperLimit, pTarget){
	var lclTest = fGenerateBigLimitedInt(pLowerLimit, pUpperLimit);
	while (bigInt.gcd(bigInt(lclTest),bigInt(pTarget)).neq(1)){
		lclTest = fGenerateBigLimitedInt(pLowerLimit, pUpperLimit);
	}
	return lclTest;
}

var yourPL = new PrimeList(20);

var fGenerateMassiveSecureInteger = function(){
	
	return yourPL.getNumberCoprimeWithList(fGenerateBigInt(10), 20);
}

var robinson = fGenerateLargePrimeWithMultipleAttempts(fGenerateBigInt(1), 1000);
if (bigInt(robinson).eq(bigInt(-1))){
	throw "Too Big";
}

$("#GenerateButton").click(function(){
	try {
		//var robinson = fGenerateLargePrimeWithMultipleAttempts(fGenerateBigInt(1), 5000);
		var lclModulus = fGenerateMassiveSecureInteger();
		var lclExp1 = fGenerateCoprime(lclModulus.divide(6), lclModulus.divide(6).multiply(5), lclModulus);
		var lclExp2 = fGenerateCoprime(lclModulus.divide(6), lclModulus.divide(6).multiply(5), lclModulus);
		
		//use .modPow(exp, mod)
		$("#Box1").val(lclModulus);
		$("#Box2").val(lclExp1);
		$("#Box3").val(lclExp2);
		
		alert(bigInt.gcd(lclModulus,lclExp1));
		alert(bigInt.gcd(lclModulus,lclExp2));
		
		//$("#Box2").val(robinson.isPrime());
		//$("#Box3").val(robinson);
	}
	catch(err){
		console.log(err.message);
	}
});

$("#KillButton").click(function(){
	
})
