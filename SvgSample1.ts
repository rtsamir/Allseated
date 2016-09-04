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

    }
    //____________________________________________________

    private initStage(pElement: HTMLElement) {
        let w = window.innerWidth - 30;
        let h = window.innerHeight - 30;
        this.mStage = asSvg.Stage.cretaeStage(pElement, w, h);
        this.mStage.addEventListener(asBase.events.MouseEvents.MOUSE_UP, (e: MouseEvent) => this.onMouseUp(e), this);
        this.setTitel(w/2);
       
    } 
    //____________________________________________________

    private setTitel(pX: number) {
        
        let aText: asSvg.TextField = new asSvg.TextField();
        aText.setFill(0x990000);
        aText.setLineStyle(2,0x10aa00);
        aText.text = "Drag & Drop";
        aText.fontSize = 50;
        aText.font = "arial";
        this.mStage.addChild(aText);
        aText.x = pX - aText.width / 2;
        aText.y = 80;
    }
    //____________________________________________________

    private addSpaceShip() {
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
        this.mSelected = (e.currentTarget as any).displayObject;
        if (this.mSelected == null) {
            return;
        }
        this.mSelected.startDrag();
    }

}
//_______________________________________________________________________
