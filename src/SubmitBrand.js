import React, { Component } from 'react';
import update from 'immutability-helper';
import { Snackbar } from 'material-ui';
import BrandDialog from './BrandDialog';
import ResponsiveContainer from './ResponsiveContainer';
import { registerBrandInCity } from './api/apiHelper'

const toastDuration = 4000;

//bad for maintainability -- need to figure out better place to hold messages
const messageColor = (message) => message.includes('Congrats') ? '#388E3C' : '#D50000';

class SubmitBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: {
        show: props.show,
        brand: props.brand,
        city: '',
      },
      toast: {
        open: false,
        message: '',
      },
    };

    this.closeDialog = this.closeDialog.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.confirmBrand = this.confirmBrand.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dialog: {
        show: nextProps.show,
        brand: nextProps.brand,
      }
    })
  }

  closeDialog() {
    this.setState(() => ({
      dialog: {
        show: false,
      }
    }))
  }

  changeCity(event) {
    const city = event.target.value;

    this.setState((prevState) =>
      update(prevState, {
        dialog: { city: { $set: city } }
      })
    );
  }

  confirmBrand() {
    const { city, brand } = this.state.dialog;
    registerBrandInCity(brand, city)
      .then(message => {
        this.setState({
          toast: {
            open: true,
            message: message,
          }
        })
      });
    this.closeDialog();

    setTimeout(() => this.setState({
      toast: {
        open: false,
        message: '',
      }
    }), toastDuration)
  }

  render() {
    return (
      <div>
        <BrandDialog
          brand={ this.state.dialog.brand } city={ this.state.dialog.city }
          onChangeCity={ this.changeCity } open={ this.state.dialog.show }
          submit={ this.confirmBrand } closeDialog={ this.closeDialog }/>
        <Toast { ...this.state.toast }/>
      </div>
    )
  }
}

const Toast = ({ open, message }) => {
  const {
    body,
    style,
    content
  } = mobileStyles(message);

  return ResponsiveContainer({
    mobileComponent: <Snackbar open={ open }message={ message }
                        autoHideDuration={ toastDuration } bodyStyle={ body }
                        style={ style } contentStyle={ content } />,
    desktopComponent: <Snackbar open={ open } message={ message }
                        autoHideDuration={ toastDuration }
                        bodyStyle={{ backgroundColor: messageColor(message) }} />
  })
};

const mobileStyles = (message) => ({
  body: {
    backgroundColor: messageColor(message),
    height: 200,
    maxWidth: 'none',
  },
  style: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default SubmitBrand;