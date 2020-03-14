import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
    const {
        modal,
        title,
        className,
        toggle,
        actionFunc,
        buttonName,
        tombol,
        style
    } = props;

    return (
        <div>
            <Modal style={{ width: "100%", maxWidth: "830px" }} centered isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody >
                    {props.children}
                </ModalBody>
                {
                    tombol ?
                        <ModalFooter className="p-4">
                            <Button size="md" className="btn btn-green " onClick={actionFunc}>{buttonName}</Button>
                            <Button size="md" className="btn btn-red " onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                        : null
                }
            </Modal>
        </div>
    );
}

export default ModalExample;