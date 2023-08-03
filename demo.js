function vowelCount(str) {
    let count = 0;
    let vowels = "aeiou";
    for(let i =0; i<str.length; i++) {
        if(vowels.indexOf(str[i]) > -1) {
            count++;
        }
    }
    return count;
}
let myStr = "loOk at thE pictUre";
let res = vowelCount(myStr.toLowerCase());
console.log(res);