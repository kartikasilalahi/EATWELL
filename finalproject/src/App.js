import React, { Component } from 'react';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { APIURL } from './helper/apiurl'
import Axios from 'axios';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Login_User, reLogin, Logout_Success } from './redux/action'
import Home from './pages/home'
import Help from './pages/help'
import Joinmitra from './pages/resto/joinresto'
import Detailproduk from './pages/detailproduk'
import Lamanmitra from './pages/resto/lamanresto'
import Verifikasi from './components/verivied'
import Waitingverified from './components/waitingverified'
import AkunUser from './pages/user/akun'
import Lamanadmin from './pages/admin/lamanadmin'
import Notfound from './components/notfound'

class App extends Component {

  componentDidMount() {
    var id = localStorage.getItem('id')
    if (id) {
      Axios.get(`${APIURL}auth/login/${id}`)
        .then(res => {
          console.log(res.data.result)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('id', res.data.id)
          this.props.reLogin(res.data.result)
        }).catch(err => {
          console.log(err)
        })
    } else {
      this.props.Logout_Success()
    }

  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/help' component={Help} />
          <Route exact path='/join' component={Joinmitra} />
          <Route exact path='/detailproduk/:idproduk' component={Detailproduk} />
          <Route exact path='/lamanmitra' component={Lamanmitra} />
          <Route exact path='/verified' exact component={Verifikasi} />
          <Route exact path='/waitingverified' exact component={Waitingverified} />
          <Route exact path='/akun' exact component={AkunUser} />
          <Route exact path='/admin' exact component={Lamanadmin} />
          <Route exact path='/notfound' exact component={Notfound} />
        </Switch>
      </div>
    );
  }
}




export default connect(null, { Login_User, reLogin, Logout_Success })(App);
