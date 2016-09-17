/// <reference path="assvg/sprite.ts" />
/// <reference path="assvg/stage.ts" />


class SvgSample1 {
    private mStage: asSvg.Stage;
    private mSelected: asSvg.DisplayObject;


    constructor(pElement: HTMLElement) {

        this.initStage(pElement);
        for (var i: number = 0; i < 5; i++) {
            this.addSpaceShip();
        }
        for (var i: number = 0; i < 5; i++) {
            this.addEllipse();
        }
    }
    //____________________________________________________

    private initStage(pElement: HTMLElement) {
        let w = window.innerWidth - 30;
        let h = window.innerHeight - 30;
        this.mStage = asSvg.Stage.cretaeStage(pElement, w, h);
        this.mStage.activeMouseLocation();
        this.mStage.addEventListener(asBase.events.MouseEvents.MOUSE_UP, (e: MouseEvent) => this.onMouseUp(e), this);
        this.setTitel(w/2);
       
    } 
    //____________________________________________________

    private setTitel(pX: number) {
        
        //let aText: asSvg.TextField = new asSvg.TextField();
        //aText.setFill(0x990000);
        //aText.setLineStyle(2,0x10aa00);
        //aText.text = "Drag & Drop";
        //aText.fontSize = 50;
        //aText.font = "arial";
        //aText.element.setAttribute("unselectable", "on");
        //this.mStage.addChild(aText);
        //aText.x = pX - aText.width / 2;
        //aText.y = 80;
    }
    //____________________________________________________

    private addEllipse() {

        // create a sprite
        let aSprite = new asSvg.Sprite();
        // Set The Sprite location on his parent
        aSprite.x = Math.random() * 500 + 200;
        aSprite.y = Math.random() * 500 + 200;
        // Set the DisplayObject rotation
        aSprite.rotation = Math.random() * 360;
        // Add the Sprite to the Stage
        this.mStage.addChild(aSprite);

        // Creating an Ellipse with center on 10,10 and two random radiuses
        let aEllipse1: asSvg.Ellipse = new asSvg.Ellipse(8, 8, Math.random() * 10 + 10, Math.random() * 20 + 20);
        // Set The DisplayObject color
        aEllipse1.setFill(0x10ff00, 0.5);
        // Add the DisplayObject to the parent sprite
        aSprite.addChild(aEllipse1);
        // Creating an Ellipse with center on -10,-10 and two random radiuses
        let aEllipse2: asSvg.Ellipse = new asSvg.Ellipse(-8, -8, Math.random() * 10 + 10, Math.random() * 20 + 20);
        // Set The DisplayObject color
        aEllipse2.setFill(0xff0000, 0.5);
        // Add the DisplayObject to the parent sprite
        aSprite.addChild(aEllipse2);


        aSprite.addEventListener(asBase.events.MouseEvents.MOUSE_DOWN, (e: MouseEvent) => this.onMouseDown(e), this);
    }
    //____________________________________________________

    private addSpaceShip() {
        // load svg from "assets/svgs/SpaceShip01.svg"
        let aLoader: asSvg.Loader = new asSvg.Loader("assets/svgs/SpaceShip01.svg");
        aLoader.x = Math.random() * 500 + 200;
        aLoader.y = Math.random() * 500 + 200;
        aLoader.rotation = Math.random() * 360;
        aLoader.scaleX = aLoader.scaleY = Math.random() * 0.5 + 0.4;
        this.mStage.addChild(aLoader);
        aLoader.addEventListener(asBase.events.MouseEvents.MOUSE_DOWN, (e: MouseEvent) => this.onMouseDown(e), this);
    }
    //____________________________________________________

    private onMouseUp(e: MouseEvent) {
        if (this.mSelected == null) {
            return;
        }
        this.mSelected.stopDrag();
    }
    //____________________________________________________

    private onMouseDown(e: MouseEvent) {
        if (this.mSelected != null) {
            this.mSelected.stopDrag();
        }
        this.mSelected = (e.currentTarget as any).asObject;
        if (this.mSelected == null) {
            return;
        }
        this.mSelected.startDrag();
    }

}
//_______________________________________________________________________
