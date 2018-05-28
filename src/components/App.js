import React, {Component, Fragment} from 'react';
import Button from './Button';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Test',
            wasClicked: false,
            items: [{
                name: '1'
            }, {
                name: '2'
            }, {
                name: '3'
            }]
        };

        this.setClicked = this.setClicked.bind(this);

        console.log('constructor');
    }

    // Методи життєвого циклу. Які є, що означають, скільки разів використовуються, послідовність

    //Mounting Phase Methods

    // 1. constructor called when the component is first initialized. This method is only called once.
    componentWillMount() { //2. componentWillMount() - called when a component is about to mount. (до першого рендера - напр. коли відписуємось від якихось подій)
        console.log('componentWillMount');
    }

    // 3. render() - called when a component is rendered.
    componentDidMount() { //4. called when a component has finished mounting. This is where network requests are usually made. (на даний момент ДОМ дерево вже існує, і можна його відображати - спрацьовує після першого рендера
        console.log('componentDidMount');

        fetch('http://localhost:3030/users', { // фетч приймає 2 параметри. 1. - URL, на который сделать запрос (урл бекенду)2. - необязательный объект с настройками запроса.
            method: 'GET', //метод запроса,
            // mode: 'no-cors',mode – одно из: «same-origin», «no-cors», «cors», указывает, в каком режиме кросс-доменности предполагается делать запрос
            credentials: 'same-origin', //credentials – одно из: «omit», «same-origin», «include», указывает, пересылать ли куки и заголовки авторизации вместе с запросом.
            headers: { //headers – заголовки запроса (объект),
                Accept: 'application/json', // в якому форматі відсилаємо і очікуємо відповідь
                'Content-Type': 'application/json',
                'Token': 'sas'
            },
        })
            .then((resp) => { //проверка на ошибку
                if (resp.ok) {
                    return resp;
                }

                return resp.json().then((error) => {
                    throw error;
                });
            })
            .then((resp) => { //если выше все ок, то возвращает промис с нужным форматом (тут - джейсон)
                return resp.json();
            })
            .then((resp) => {//тут уже полный ответ сервера
                console.log(resp);

                this.setState({
                    items: resp.data
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //Updating Phase Methods

// The updating phase begins when a component's properties or state changes. The following lifecycle methods occur in the order they are listed:

    componentWillReceiveProps(nextProps) { // 5.called when a component has updated and is receiving new props.
        console.log('componentWillReceiveProps');
    }

    /*shouldComponentUpdate(){ //6. можна визначити чи буде компонент оновлюватись shouldComponentUpdate(nextProps, nextState) - called after receiving props and is about to update. If this method returns false, componentWillUpdate(), render(), and componentDidUpdate() will not execute.
      console.log('shouldComponentUpdate');
      return false;
    }*/

    componentWillUpdate() { // 7. componentWillUpdate(nextProps, nextState) - called when a component is about to be updated.
        console.log('componentWillUpdate');
    }

    // 8. render() - called when a component is rerendered. другий рендер(після оновлення)

    componentDidUpdate() {//9.componentDidUpdate(prevProps, prevState) - called when a component has finished updating.
        console.log('componentDidUpdate');
    }

    //Unmounting Phase Methods
    //    The unmounting phase begins when a component is being removed from the DOM. The following life cycle method occurs during the unmounting phase:

    componentWillUnmount() { // 10 called immediately before a component unmounts. This is where any cleanups are made such as cancelling timers or network requests.
        console.log('componentWillUnmount');
    }


    setClicked(e) {
        const {onButtonClick} = this.props;

        //onButtonClick(e);

        this.setState({
            wasClicked: true,
        }, () => {
            console.log(this.state.wasClicked);
        });
        console.log(this.state.wasClicked);
    }

    renderLi = (el, ind) => {
        return (
            <li key={ind}>{el.name}</li>
        );
    };

    render() {
        const {buttonText, wasClicked, items} = this.state;
        console.log(this.props);
        return (
            <Fragment>
                <h1>Hello world</h1>
                <Button
                    title={buttonText}
                    onClick={this.setClicked}
                    className={wasClicked ? 'red-text' : 'blue-text'}
                />
                <Button
                    title="TEST2"
                    onClick={this.setClicked}
                    className={!wasClicked ? 'red-text' : 'blue-text'}
                />
                <ul className="list">
                    {items.map(this.renderLi)}
                </ul>
            </Fragment>
        );
    }
}

export default App;