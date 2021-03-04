const MB_PER_IMAGE_1024 = (1024 * 1024*4)/1000000 /// 67.108864
const MB_PER_IMAGE_4096 = (4096 * 4096*4)/1000000 /// 67.108864

class Scene  {
    constructor(pDiv) {
        this.frameCounter = 0;
        this.fps = 0;
        this.data = document.getElementById("data");
        this.mScene = new THREE.Scene();
        this.mCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.mCamera.position.z = 150;
        this.mRenderer = new THREE.WebGLRenderer();
        this.mRenderer.setSize(window.innerWidth, window.innerHeight);
        this.mBallsCounter = 0;
        this.mBalls = [];
        this.mIsActive = true;
        this.mRenderer.domElement.addEventListener("webglcontextlost", (event) => this.onWebglContextLost(event), false);
        this.mRenderer.domElement.addEventListener("webglcontextrestored", () => this.setupWebGLStateAndResources(), false);
        this.mGLContext = this.mRenderer.domElement.getContext('webgl');
        this.mWEBGLLoseContext = this.mGLContext.getExtension('WEBGL_lose_context');
        this.mCameraSpeed = -0.1;
        this.mState = " Geometry"
        this.mMemory = 0;
        document.body.appendChild(this.mRenderer.domElement);
        this.mContainer = new THREE.Object3D(); 
        this.mScene.add(this.mContainer);
        setInterval(() => this.calcFPS(), 1000);
        this.animate();
        this.addBalls();

    }
                //__________________________________________________________________

                async addBalls() {
                   
                 
                    this.mState = "Geometry"
                    await this.addBalls1024();
                    await sleep(5000);
                    this.mState = "Memory"
                    await this.addBalls4096();
                    this.mState = "FPS"
                    await sleep(5000);
                    this.mState = "Done"
                }
                
            //__________________________________________________________________

            async addBalls4096() {
                for(let i = 0; i < 2; i++){
                    for(let b = 0; b < 20; b++){
                        await sleep(200);
                        this.addBall(4096);
                    }
                    await sleep(2000);
                }
            }
        //__________________________________________________________________

        async addBalls1024() {
            for(let i = 0; i < 2; i++){
                for(let b = 0; b < 20; b++){
                    await sleep(20);
                    this.addBall(1024);
                }
                await sleep(2000);
            }
        }
    //__________________________________________________________________

    setupWebGLStateAndResources() {
        alert("setupWebGLStateAndResources");

        this.mBalls = [];
        this.mScene = new THREE.Scene();
        this.mCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.mCamera.position.z = 50;
        //this.mRenderer = new THREE.WebGLRenderer();
        //this.mRenderer.setSize(window.innerWidth, window.innerHeight);
        this.mBallsCounter = 0;

        this.mIsActive = true;
    }
    //_______________________________________________________

    onWebglContextLost(event) {
        this.mIsActive = false;
        alert("The limit is:\n" + this.data.innerHTML+ "\n Please refrash the tab.");

        
        event.preventDefault();
      
         for (let i = 0; i < this.mBalls.length; i++) {
            this.mContainer.remove(this.mBalls[i]);
        }
         // setTimeout(()=>this.stage1(),3000)

    }
    //_______________________________________________________

    stage1() {
       
        this.mWEBGLLoseContext.restoreContext();
        
        //setTimeout(() => this.setupWebGLStateAndResources(), 2000)
    }
    //_______________________________________________________

    calcFPS() {
        this.fps = this.frameCounter;
        this.frameCounter = 0;
    }
    //_______________________________________________________

    addBall(pRes) {
        if (!this.mIsActive) {
            return;
        }
        this.mBallsCounter++;
        let aBall = new Ball(pRes);
        this.mContainer.add(aBall);
        this.mBalls.push(aBall);
    }
    //_______________________________________________________

    animate() {
        this.mContainer.rotation.y += 0.01;
        let aTextures1024 = 40;
        let aTextures4096 = 40;
       if(this.mRenderer.info.memory.textures <= 40) {
        this.data.innerHTML = "Checking: Geometry"
            aTextures1024 = this.mRenderer.info.memory.textures;
            aTextures4096 = 0;
        }else if(this.mRenderer.info.memory.textures < 80) {
            aTextures1024 = 40;
            aTextures4096 = this.mRenderer.info.memory.textures - 40;
            this.data.innerHTML = "Geometry - Pass.  Checking: Memory"
        }else if(this.mState != "Done") {
            this.data.innerHTML = "Geometry - Pass. Memory - pass. Checking: FPS" 
        }else{
            if(this.fps > 24){
                this.data.innerHTML = "Geometry - Pass. Memory - pass. CPU - High" 
            }else if(this.fps > 18){
                this.data.innerHTML = "Geometry - Pass. Memory - pass. CPU - Medium" 
            }else if(this.fps > 10){
                this.data.innerHTML = "Geometry - Pass. Memory - pass. CPU - Low" 
            }else{
                this.data.innerHTML = "Geometry - Pass. Memory - pass. CPU - faile" 
            }
        }
        let aMem = (((MB_PER_IMAGE_1024  * aTextures1024)  + (MB_PER_IMAGE_4096  * aTextures4096))/ 1000).toFixed(2);
       
        this.data.innerHTML +=  "\n\nDarwCalls:" +  this.mRenderer.info.render.calls + " Poly:" + this.mRenderer.info.render.triangles + " FPS:" + this.fps
        this.data.innerHTML += "\nMem:" + aMem + "GB Textures:" + this.mRenderer.info.memory.textures + " Geometries:" + this.mRenderer.info.memory.geometries;
        requestAnimationFrame(() => this.animate());
        if (!this.mIsActive) {
            return;
        }
        this.frameCounter++;
        this.mRenderer.render(this.mScene, this.mCamera);
    }
}


//////////////////////////////////////////////////////////////

class Ball extends THREE.Object3D {
    constructor(pRes) {
        super();
        const numOfPoly = (pRes == 1024)?200:10;
        const aGeometry = new THREE.SphereGeometry(3, numOfPoly, numOfPoly);
        var aTexture = new THREE.TextureLoader().load("https://allseated-res.cloudinary.com/image/upload/v1/3Dassets/textures/texture_"+pRes+".jpg");
        const aMaterial = new THREE.MeshBasicMaterial({ map: aTexture, color: 0xffffff });
        //const aMaterial = new THREE.MeshBasicMaterial({color: 0x00ffff });
        this.mSphere = new THREE.Mesh(aGeometry, aMaterial);
        this.add(this.mSphere);
        this.setPosition();
    }
    //_______________________________
    setPosition() {
        this.position.x = Math.random() * 100 - 50;
        this.position.y = Math.random() * 100 - 50;
        this.position.z = Math.random() * 100 - 100;
    }

}

new Scene();


function sleep(pMilliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(function () { resolve(); }, pMilliseconds);
    });
}