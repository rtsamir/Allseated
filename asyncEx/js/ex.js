/// http://allseated/GitHub/asyncEx/


const aTextArea = document.getElementById("TextArea");

for(let i = 0; i < 10; i++){
    const aSample = new DoSomething();
    let aData = {};
    aData.id = i;
    let aProcessName = "process_" + aData.id;
    aSample.do(aData,aProcessName,onDataReady)
}

function onDataReady(pData){
    aTextArea.innerHTML += "\n  Id: "+pData.id +
    "   Process Name:" + pData.processName;
}

//_________________________________________________________

