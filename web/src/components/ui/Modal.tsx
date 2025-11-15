import Icon from "./Icon";
import {createPortal} from "react-dom";
interface ModalInterface {
    body?: any
    footer?: any
    header?: any
    open: boolean
    onClose: any
}
const Modal = ({body, footer, header,  open, onClose}: ModalInterface) => {
    if (!open) return null
    return createPortal(
        <>
            <div className="modal-mask" onClick={onClose}>
                <div className="modal-wrapper">
                    <div className="modal-container delete-modal" onClick={e => {
                        e.stopPropagation();
                    }}>

                        <div className="modal-header">
                            {header}
                            <span onClick={onClose} className="modal-close"><Icon name="cancel" width="18px" height="18px"/></span>
                        </div>

                        <div className="modal-body">
                            <div className="modal__fieldset">
                                {body}
                            </div>
                        </div>

                        <div className="modal-footer">
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

export default Modal;