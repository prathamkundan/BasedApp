import '../static/Modal.css';

function Modal({content, closeAction, completeAction}) {
    const completeClose = ()=>{
        completeAction();
        closeAction();
    }
    return (
        <div className='modal'>
            <div className='overlay' onClick={closeAction}></div>
            <div className='modal-content'>
                <div className="container">
                    <h3>{content.heading}</h3>
                    {content.body}
                </div>
                <div className="container d-flex justify-content-end">
                <button className="btn btn-primary mx-2" onClick={closeAction}>Cancel</button>
                <button className="btn btn-danger" onClick={completeClose}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Modal