class ColorHelper{
    colorArray = new Array();

    constructor(args){
        this.colorArray = this.fillColorArray(100,0.8);
    }

    fillColorArray(num,gamma){
        let arr = new Array();
        for(let i=0;i<num;i++){
            let red = Math.floor(Math.random()* 255);
            let green = Math.floor(Math.random()* 255);
            let blue = Math.floor(Math.random()* 255);
            const rgba = `rgba(${red},${green},${blue},${gamma})`;
            arr.push(rgba);
        }
        return arr;
    }

    GetColorArray(num, seed){
        return this.colorArray.slice(seed*num,seed*num + num );
    }
}



module.exports={ColorHelper}