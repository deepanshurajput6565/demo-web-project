// arrow function
const a =["hydrogen","helium","litium","berillium"];
const a1= a.map(function(s){
    return s.length;
})
console.log("normal way :",a1);
const a2= a.map((s)=>s.length);
console.log("usiing arrow func :",a2); 


 


