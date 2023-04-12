function PopupImage(props) {
  return (
    <div className={`popup popup-img ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__img-container">
        <img className="popup__img" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__figcaption">{props.card.name}</figcaption>
        <button className="popup__close-button" type="button" onClick={props.onClose} ></button>
      </div>
    </div>
  )
}
export default PopupImage;