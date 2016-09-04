[Allseated](http://www.allseated.com/) offers exact floorplans to scale, guest lists, and seating arrangements.
Event data updates hosted in the cloud, provide instant access and perfect coordination.

As part of our floorplan editor we created SVG library with ActionScript 3 like API
we share it here as open source. for any ActionScript 3.0 developer that want to use the power of SVG with his familiar API.

## getting started

1. Including the asBase & asSvg folders in your TypeScript Project.

### 2. Create the stage
Init the stage using `asSvg.Stage.cretaeStage`

pElement: - div element that will contain the SVG.
pWidth:number
pHieght:number

`let aStage:asSvg.Stage = asSvg.Stage.cretaeStage(pElement, pWidth, pHieght);`

### 3. addElement

All the elements are inherits from DisplayObject ( sound Familiar)
this code will add an Ellipse element

Creating an Ellipse with center on 0,0 and two random radiuses

`let aEllipse: asSvg.Ellipse = new asSvg.Ellipse(0, 0, Math.random() * 100 + 50, Math.random() * 50 + 50);`

Set The DisplayObject color

`aEllipse.setFill(0xffffff, 0.5);`

Set The DisplayObject location on his parent

`aEllipse.x = Math.random() * 500 + 200;`

`aEllipse.y = Math.random() * 500 + 200;`

Set the DisplayObject rotation

`aEllipse.rotation = Math.random() * 360;`

Add the DisplayObject to the Stage

`this.mStage.addChild(aEllipse);`

for sample let's add Circle

### 4. lats play with scene graph

create a sprite
let aSprite = new asSvg.Sprite();
Set The Sprite location on his parent
aSprite.x = Math.random() * 500 + 200;
aSprite.y = Math.random() * 500 + 200;
Set the DisplayObject rotation
aSprite.rotation = Math.random() * 360;
Add the Sprite to the Stage
this.mStage.addChild(aSprite);

Creating an Ellipse with center on 10,10 and two random radiuses

`let aEllipse1: asSvg.Ellipse = new asSvg.Ellipse(8, 8, Math.random() * 10 + 10, Math.random() * 20 + 20);`

Set The DisplayObject color

`aEllipse1.setFill(0x10ff00, 0.5);`

Add the DisplayObject to the parent sprite

`aSprite.addChild(aEllipse1);`

Creating an Ellipse with center on -10,-10 and two random radiuses

`let aEllipse2: asSvg.Ellipse = new asSvg.Ellipse(-8, -8, Math.random() * 10 + 10, Math.random() * 20 + 20);`

Set The DisplayObject color

`aEllipse2.setFill(0xff0000, 0.5);`

Add the DisplayObject to the parent sprite

`aSprite.addChild(aEllipse2);`

5. load another svg

If needed in JavaScript ES5 or ES6 Please send a note and we will provide it.
