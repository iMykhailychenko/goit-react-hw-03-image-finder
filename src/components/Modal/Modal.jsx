import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

export default class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  backdropRef = createRef();

  state = {
    url: this.props.url,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;
    if (prevProps.url === url) return;

    this.setState({ url });
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = ({ code }) => {
    if (code !== 'Escape') return;
    this.setState({ url: '' });
  };

  handleClick = ({ target }) => {
    const { current } = this.backdropRef;
    if (current && target !== current) return;

    this.setState({ url: '' });
  };

  render() {
    const { url } = this.state;

    // Хотел добавить лоадер на подгрузку изображения но попал в когнетивный дисонанс
    // -
    // На чистом js алгоритм моих действий был бы примерно таким:
    // вешаю обработчик события load на картинку и если картинка загрузилась, то стилями скрываю лоадер
    // -
    // С реактом я могу только скрывать лоадер как только получу ответ от сервера
    // но я не знаю как реализовать функционал в котором будет рендериться лоадер и как только изображение подгрузилось
    // (не с сервера, а отобразилось в разметке)
    // то пропадет лоадер и останется фотка.
    // -
    // Реализовать подход с перерендериванием компонента, для того чтобы убрать лоадер и оставить фото,
    // не получиться так как неначто будет вешать событие load.
    // Неужели точно так же как и в подходе с чистым js нужно скрывать стилями?
    // Но если скрывать стилями, то следующий мой вопрос - как именно, с помощью рефов?
    return url !== '' ? (
      <div
        className="Overlay"
        onClick={this.handleClick}
        ref={this.backdropRef}
      >
        <div className="Modal">
          <img src={url} alt="" className="img" />
        </div>
      </div>
    ) : null;
  }
}
