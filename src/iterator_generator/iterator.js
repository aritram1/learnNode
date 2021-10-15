// const G = {
//     createPositiveGenerator: function(){

//     },
//     createNegativeGenerator: function(){

//     }
// }
// module.exports = G;


class specialNumbersList{
    numbers=[];
    formattedNumbers=[];
    currentIndex=0;
    constructor(values){
        
        console.log('before>' + values.legth);

        // generate sample values
        // values = specialNumbersList.generateRandomNumbers();
        if(values){
            for(let i=0; i<10; i++){
                values.push({
                    value: Math.random()
                });
            }
        }

        console.log('after>' + values.length);
        
        for(let i=0; i<values.length; i++){
            this.numbers.push(values[i]);
        }
    }

    [Symbol.iterator](){
        return {
            next: ()=>{
                let currentItem = this.numbers[this.currentIndex];
                let item = {
                    value: currentItem,
                    done: this.currentIndex >= this.numbers.length
                }
                this.currentIndex = this.currentIndex < this.numbers.length ? this.currentIndex+1 : this.numbers.length;
                return item;
            }
        };
         
    }

    values(){
        let result = [];
        for(let item of this.numbers){
            let v = this[Symbol.iterator]();
            result.push(v.next());
        }
        return result;
    }
}   

let allItems = [];
let allSpecialNumbers = new specialNumbersList(allItems=[]);
console.log('allSpecialNumbers BEFORE ITERATION->' + JSON.stringify(allSpecialNumbers));
for(item of allSpecialNumbers){
    console.log(`Item value is => ${item.value}`);
}
console.log('allSpecialNumbers AFTER ITERATION ->' + JSON.stringify(allSpecialNumbers));

//console.log(allSpecialNumbers.values());
