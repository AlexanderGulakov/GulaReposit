import React, {Component, Fragment,PureComponent} from 'react';
import Button from './Button';

class App extends PureComponent {//Pure використовувати якщо немає великої вкладеності, інакше краще звичайний
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
    //МЕТОДИ ЖИТТЄВОГО ЦИКЛУ. Які є, що означають, скільки разів використовуються, послідовність

    componentWillMount(){ //до першого рендера (використовується коли відписуємось від якихось подій)
        console.log('componentWillMount');
    }

    componentDidMount(){ //на даний момент дом дерево вже існує і можна відображати його, (спрацьовує після першого рендера)
        console.log('componentDidMount');
        fetch('http://localhost:3030/users', {//2 параметри - 1-ий - урл бекенду!
            method: 'GET',//по замовчуванню
            credentials: 'same-origin', //
            headers: { //вказуэмо в якому форматі відсилаємо і очікуємо у відповідь
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => { //приймаэмо перший респонз, просто перевыряэмо на помилку
                if (resp.ok) {//якщо ок - передаэмо далі в наступний then
                    return resp;
                }

                return resp.json().then((error) => {// якщо не ок - обробляэться помилка
                    throw error;
                });
            })
            .then((resp) => { //валідна відповідь, парсимо у джейсон форматі
                return resp.json();
            })
            .then((resp) => {//передаєм в консоль лог
                console.log(resp);
                this.setState({
                    items:resp.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps');
    }
    // shouldComponentUpdate(){ //можна визначити чи буде компонент оновлюватись
    //     return false;
    // }
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }



    setClicked(e) {
        const {onButtonClick} = this.props;

        onButtonClick(e);

        this.setState({
            wasClicked: true,
        });
    }

    renderLi = (el, ind) => {
        return (
            <li key={ind}>{el.name}</li>
        );
    };

    render() {
        const {buttonText, wasClicked, items} = this.state;

        return (
            <Fragment>
                <h1>Hello world</h1>
                {/*<button*/}
                {/*style={{*/}
                {/*color: wasClicked ? 'red' : 'blue'*/}
                {/*}}*/}
                {/*onClick={this.setClicked}*/}
                {/*>{buttonText}</button>*/}
                <Button
                    title={buttonText}
                    onClick={this.setClicked}
                    className={wasClicked ? 'red-text' : 'blue-text'}
                />
                <Button
                    title="TEST2"
                    onClick={this.setClicked}
                    className={wasClicked ? 'blue-text' : 'red-text'}
                />
                <ul className="list">
                    {items.map(this.renderLi)}
                </ul>
            </Fragment>
        );
    }
}

export default App;