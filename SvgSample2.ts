/// <reference path="assvg/sprite.ts" />
/// <reference path="assvg/stage.ts" />


class SvgSample2 {
    private mStage: asSvg.Stage;
    private mSpaceShip: asSvg.DisplayObject;


    constructor(pElement: HTMLElement) {
        this.init(pElement);
        let aFPS = 30;
        setInterval(() =>this.enterFrame(), 1000 / aFPS);
    }
    //____________________________________________________

    private init(pElement: HTMLElement) {
        let w = window.innerWidth - 30;
        let h = window.innerHeight - 30;
        this.mStage = asSvg.Stage.cretaeStage(pElement, w, h);
        this.mStage.activeMouseLocation();
        this.addSpaceShip(w/2,h/2);
        this.setTitel(w / 2);

    }
    //____________________________________________________

    private setTitel(pX: number) {

        let aText: asSvg.TextField = new asSvg.TextField();
        aText.setFill(0x990000);
        aText.setLineStyle(2, 0x10aa00);
        aText.text = "Turn to the cursor";
        aText.fontSize = 50;
        aText.font = "arial";
        this.mStage.addChild(aText);
        aText.x = pX - aText.width / 2;
        aText.y = 80;
    }

    //____________________________________________________

    private addSpaceShip(pX:number,pY:number) {
        this.mSpaceShip = new asSvg.Loader("assets/svgs/SpaceShip01.svg");
        this.mSpaceShip.x = pX;
        this.mSpaceShip.y = pY;
        this.mStage.addChild(this.mSpaceShip);
    }
    //____________________________________________________

    private enterFrame() {
        let aAngle: number = Math.atan2(this.mSpaceShip.mouseY, this.mSpaceShip.mouseX);
        let aDeltaAngle:number = aAngle * 180 / Math.PI - this.mSpaceShip.rotation;
        if (aDeltaAngle > 180) {
            aDeltaAngle -= 360;
        }
        if (aDeltaAngle < -180) {
            aDeltaAngle += 360;
        }
        this.mSpaceShip.rotation += aDeltaAngle / 10;

    }
}
//_______________________________________________________________________
