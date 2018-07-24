import React, {Fragment, Component} from 'react';
import NavBar from './HTMLComponents/NavBar';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Users from './Users/Users';
import Posts from './Posts/Posts';
import PostsList from './Posts/PostsList';
import PostInfo from './Posts/PostInfo';
import CreateOrEditPost from './Posts/CreateOrEditPost';
import EditUserProfile from "./Users/EditUserProfile";
import {Route, Switch} from 'react-router-dom';
import {logOut} from '../actions/app'


class App extends Component {

    render() {
        const {logOut} = this.props;
        return (
            <Fragment>

                <NavBar logOut={logOut}/>
                <Switch>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/posts" component={Posts}/>
                    <Route exact path="/postsList" component={PostsList}/>
                    <Route exact path="/createPost" component={CreateOrEditPost}/>
                    <Route path="/posts/:id" component={CreateOrEditPost}/>
                    <Route exact path="/postsList/:id" component={PostInfo}/>
                    <Route exact path="/myProfile" component={EditUserProfile}/>

                </Switch>
            </Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logOut
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(App)


//     // Методи життєвого циклу. Які є, що означають, скільки разів використовуються, послідовність
//
//     //Mounting Phase Methods
//
//     // 1. constructor called when the component is first initialized. This method is only called once.
//     componentWillMount() { //2. componentWillMount() - called when a component is about to mount. (до першого рендера - напр. коли відписуємось від якихось подій)
//         console.log('componentWillMount');
//     }
//
//     // 3. render() - called when a component is rendered.
//     componentDidMount() { //4. called when a component has finished mounting. This is where network requests are usually made. (на даний момент ДОМ дерево вже існує, і можна його відображати - спрацьовує після першого рендера
//         console.log('componentDidMount');
//
//         fetch('http://localhost:3030/users', { // фетч приймає 2 параметри. 1. - URL, на который сделать запрос (урл бекенду)2. - необязательный объект с настройками запроса.
//             method: 'GET', //метод запроса,
//             // mode: 'no-cors',mode – одно из: «same-origin», «no-cors», «cors», указывает, в каком режиме кросс-доменности предполагается делать запрос
//             credentials: 'same-origin', //credentials – одно из: «omit», «same-origin», «include», указывает, пересылать ли куки и заголовки авторизации вместе с запросом.
//             headers: { //headers – заголовки запроса (объект),
//                 Accept: 'application/json', // в якому форматі відсилаємо і очікуємо відповідь
//                 'Content-Type': 'application/json',
//                 'Token': 'sas'
//             },
//         })
//             .then((resp) => { //проверка на ошибку
//                 if (resp.ok) {
//                     return resp;
//                 }
//
//                 return resp.json().then((error) => {
//                     throw error;
//                 });
//             })
//             .then((resp) => { //если выше все ок, то возвращает промис с нужным форматом (тут - джейсон)
//                 return resp.json();
//             })
//             .then((resp) => {//тут уже полный ответ сервера
//                 console.log(resp);
//
//                 this.setState({
//                     items: resp.data
//                 });
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }
//
//     //Updating Phase Methods
//
// // The updating phase begins when a component's properties or state changes. The following lifecycle methods occur in the order they are listed:
//
//     componentWillReceiveProps(nextProps) { // 5.called when a component has updated and is receiving new props.
//         console.log('componentWillReceiveProps');
//     }
//
//     /*shouldComponentUpdate(){ //6. можна визначити чи буде компонент оновлюватись shouldComponentUpdate(nextProps, nextState) - called after receiving props and is about to update. If this method returns false, componentWillUpdate(), render(), and componentDidUpdate() will not execute.
//       console.log('shouldComponentUpdate');
//       return false;
//     }*/
//
//     componentWillUpdate() { // 7. componentWillUpdate(nextProps, nextState) - called when a component is about to be updated.
//         console.log('componentWillUpdate');
//     }
//
//     // 8. render() - called when a component is rerendered. другий рендер(після оновлення)
//
//     componentDidUpdate() {//9.componentDidUpdate(prevProps, prevState) - called when a component has finished updating.
//         console.log('componentDidUpdate');
//     }
//
//     //Unmounting Phase Methods
//     //    The unmounting phase begins when a component is being removed from the DOM. The following life cycle method occurs during the unmounting phase:
//
//     componentWillUnmount() { // 10 called immediately before a component unmounts. This is where any cleanups are made such as cancelling timers or network requests.
//         console.log('componentWillUnmount');
//     }


