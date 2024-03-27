class HelperRandom{
    constructor(seed = 10){
        this.seed = seed;
        this.bigPrime = 593441843;
        this.bigPrime2 = 674506081;
    }
    
    hash(x, y){
        let v1 = x;
        let v0 = y;
        
        let sum = 0;
        for (let i = 0; i < 32; i++){
            sum += this.seed;
            v0 += ((v1<<4) + this.bigPrime) ^ (v1 + sum) ^ ((v1>>5) + this.bigPrime2);
            v1 += ((v0<<4) + this.bigPrime) ^ (v0 + sum) ^ ((v0>>5) + this.bigPrime2);
        }

        return (x + y) % 2 ? v0 : v1;
    }

    randomHash(x, y){
        let bigNum = (1 << 20);
        return (Math.abs(this.hash(x, y)) % bigNum) / bigNum;
    }
}