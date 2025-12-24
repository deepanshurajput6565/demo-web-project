let arr=[56,23,23,17,34,19,12];
function canVote(age){
    return age>=18;

}
let newarr=arr.filter(canVote);
console.log(newarr);

