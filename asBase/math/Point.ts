module asBase.math {
    export class Point {

        //------------------------------
        // Members
        //------------------------------
        public x;
        public y;

        constructor(iX:number = 0,iY:number = 0) {
            this.x = iX;
            this.y = iY;
        }


        /****************************
        * Override methods
        ****************************/



        /****************************
        * Methods
        ****************************/
        public subtract(p: Point): Point {
            return (new Point(this.x - p.x, this.y - p.y));
        }
        //________________________________________________________________

        public add(p: Point): Point {
            return (new Point(this.x + p.x, this.y + p.y));
        }

        //________________________________________________________________

        public static interpolate(p1: Point, p2: Point, pFrac:number): Point {
            var aX = p1.x + (p2.x - p1.x) * pFrac;
            var aY = p1.y + (p2.y - p1.y) * pFrac;
            return (new Point(aX,aY));
        }
        
        /****************************
        * Getters and Setters
        ****************************/
        public set length(pVal) {
            let aV: number = this.length / pVal;
            this.x /= aV;
            this.y /= aV;
        }
        
        public get length(): number {
            return (Math.sqrt(this.x * this.x + this.y * this.y));
        }
        //________________________________________________________________
        public static get myName(): string {
            return "Point";
        }
        //______________________________________________
        public get myClassName(): string {
            return "Point";
        }
        //______________________________________________


    }
}