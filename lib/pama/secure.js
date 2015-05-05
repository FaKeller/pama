function secureSecret(secret, domain) {
    var shaObj = new jsSHA(secret + domain, "TEXT");
    var hash = shaObj.getHash("SHA-512", "B64");
    return 'aaad>>' + hash.toUpperCase().replace("LIO0","");

    // this function needs to generate a unique result for every site, but
    // the result should not change over time
    var secretHash = secret + domain;
    console.log(secretHash);
    var sum = 0;
    var prime = 11;
    var factor = prime;
    var alphabet = "ABCDEFGHKMNPQRSTUVWXYZ123456789";
    var aLength = alphabet.length;
    for(var i = 0; i < secretHash.length; i++) {
        factor = factor * prime % aLength;
        sum = (sum + factor * secretHash.charCodeAt(i)) % aLength;
    }
    console.log(sum);
    return alphabet[sum];
}


/// test