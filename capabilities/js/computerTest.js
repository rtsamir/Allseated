class Scene  {
    constructor(pDiv) {
        this.frameCounter = 0;
        this.fps = 0;
        this.data = document.getElementById("data");
        this.mScene = new THREE.Scene();
        this.mCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.mCamera.position.z = 50;
        this.mRenderer = new THREE.WebGLRenderer();
        this.mRenderer.setSize(window.innerWidth, window.innerHeight);
        this.mBallsCounter = 0;
        this.mBalls = [];
        this.mIsActive = true;
        this.mRenderer.domElement.addEventListener("webglcontextlost", (event) => this.onWebglContextLost(event), false);
        this.mRenderer.domElement.addEventListener("webglcontextrestored", () => this.setupWebGLStateAndResources(), false);
        this.mGLContext = this.mRenderer.domElement.getContext('webgl');
        this.mWEBGLLoseContext = this.mGLContext.getExtension('WEBGL_lose_context');

        document.body.appendChild(this.mRenderer.domElement);
        this.animate();
        
        setInterval(() => this.addBall(),2000)
        setInterval(() => this.calcFPS(), 1000);
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

        alert("The limit is:\n" + this.data.innerHTML+ "\n Please refrash the tab.");

        this.mIsActive = false;
        event.preventDefault();
      
         for (let i = 0; i < this.mBalls.length; i++) {
             this.mScene.remove(this.mBalls[i]);
        }
         setTimeout(()=>this.stage1(),3000)

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

    addBall() {
        if (!this.mIsActive) {
            return;
        }
        this.mBallsCounter++;
        let aBall = new Ball();
        this.mScene.add(aBall);
        this.mBalls.push(aBall);
    }
    //_______________________________________________________

    animate() {
        let aMem = ((67.108864 * this.mRenderer.info.memory.textures) / 1000).toFixed(2);
        this.data.innerHTML ="DarwCalls:" +  this.mRenderer.info.render.calls + " Poly:" + this.mRenderer.info.render.triangles + " FPS:" + this.fps +
            "\nMem:" + aMem + "GB Textures:" + this.mRenderer.info.memory.textures + " Geometries:" + this.mRenderer.info.memory.geometries;
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
    constructor() {
        super();
        const aGeometry = new THREE.SphereGeometry(3, 100, 100);
        //var aTexture = new THREE.TextureLoader().load("capabilities/images/texture_1024.jpg");
        var aTexture = new THREE.TextureLoader().load("capabilities/images/texture_4096.jpg");
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