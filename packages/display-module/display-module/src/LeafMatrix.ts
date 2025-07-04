import { ILeafMatrixModule, ILayoutData, IScrollPointData } from '@leafer/interface'
import { AroundHelper, MatrixHelper } from '@leafer/math'


const { setLayout, multiplyParent, translateInner, defaultWorld } = MatrixHelper
const { toPoint, tempPoint } = AroundHelper

export const LeafMatrix: ILeafMatrixModule = {

    __updateWorldMatrix(): void {

        const { parent, __layout } = this
        multiplyParent(this.__local || __layout, parent ? parent.__world : defaultWorld, this.__world, !!__layout.affectScaleOrRotation, this.__ as ILayoutData, parent && (parent.scrollY || parent.scrollX) && parent.__ as IScrollPointData)

    },

    __updateLocalMatrix(): void {

        if (this.__local) {

            const layout = this.__layout, local = this.__local, data = this.__

            if (layout.affectScaleOrRotation) {

                if ((layout.scaleChanged && (layout.resized || (layout.resized = 'scale'))) || layout.rotationChanged) {
                    setLayout(local, data as ILayoutData, null, null, layout.affectRotation)
                    layout.scaleChanged = layout.rotationChanged = undefined
                }

            }

            local.e = data.x + data.offsetX
            local.f = data.y + data.offsetY

            if (data.around || data.origin) {
                toPoint(data.around || data.origin, layout.boxBounds, tempPoint)
                translateInner(local, -tempPoint.x, -tempPoint.y, !data.around)
            }

        }

        this.__layout.matrixChanged = undefined

    }

}


