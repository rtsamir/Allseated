////   http://allseated/GitHub/asyncEx/

class DoSomething  {
    mData;
    mProcessName;
    mCallBack;

    constructor() {
    }
    //________________________________________

    do(pData,pProcessName,pCallback,){
        this.mCallBack = pCallback;
        this.mData = pData;
        this.setProcess(pProcessName);
    }
    //________________________________________

    async setProcess(pProcessName){
        this.mProcessName = pProcessName;
        await this.process(); 
        this.mData.processName = pProcessName;
        this.mCallBack(this.mData);
    }
    //__________________________________________

    process(pData) {
        return new Promise((resolve, reject) => {
            this.mData.time = 100 + 2000*Math.random();
            setTimeout(function (aTime) { 
                resolve(); },this.mData.time);
        });
    }              
}























//_________________________________________________________

function process(pMilliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(function () { resolve(); }, 500 + 1000*Math.random());
    });
}