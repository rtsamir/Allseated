module asBase.math {
    export class MathUtils {

        static RAD_TO_DEG = 180 / Math.PI
        static DEG_TO_RAD = Math.PI / 180;


        static interpolate(pP1: asBase.math.Point, pP2: asBase.math.Point, pVal: number):Point {
            var aDx = (pP2.x - pP1.x) * pVal;
            var aDy = (pP2.y - pP1.y) * pVal;
            return (new asBase.math.Point(pP1.x + aDx, pP1.y + aDy))

        }
        //_____________________________________________________________________

        static distance(pP1: asBase.math.Point, pP2: asBase.math.Point): number {
            var aDx = (pP1.x - pP2.x);
            var aDy = (pP1.y - pP2.y);
            return (Math.sqrt((aDx * aDx) + (aDy * aDy)));

        }
        //_____________________________________________________________________

        public static rotatePoint(pPoint: asBase.math.Point, pAngle: number): Point {
            var aRadAngle: number = pAngle * MathUtils.DEG_TO_RAD;
            var aX: number = pPoint.x * Math.cos(aRadAngle) - pPoint.y * Math.sin(aRadAngle);
            var aY: number = pPoint.x * Math.sin(aRadAngle) + pPoint.y * Math.cos(aRadAngle);
            return (new asBase.math.Point(aX, aY));
        }
        //_____________________________________________________________________

        public static isRectOverlap(pRect1: ClientRect, pRect2: ClientRect): boolean {
            return !(pRect2.left > pRect1.right ||
                pRect2.right < pRect1.left ||
                pRect2.top > pRect1.bottom ||
                pRect2.bottom < pRect1.top);
        }
        //_____________________________________________________________________

        public static combineRectToBaseRect(pBaseRect: ClientRect, pWithRect: ClientRect): ClientRect {
                pBaseRect.left = Math.min(pBaseRect.left, pWithRect.left);
                pBaseRect.right = Math.max(pBaseRect.right, pWithRect.right);
                pBaseRect.top = Math.min(pBaseRect.top, pWithRect.top);
                pBaseRect.bottom = Math.max(pBaseRect.bottom, pWithRect.bottom); 
            
            return pBaseRect;
        }



    }
}