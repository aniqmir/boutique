import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from 'material-ui/Icon';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';


const styles = theme => ({
  button: {
    margin:theme.spacing.unit,
    display:'flex',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  menu: {
    width: 200,
  },
  card: {
    marginLeft:100,
    marginRight:100,
    marginTop:10,
    maxWidth: 350,
  },
});


class TextFields extends React.Component {
  state = {
    username: '',
    password: '',
    cnic: '',
    type:''
  };

  handleChange = name => event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state)
  };

  //change function
  changeuserName = e => {
    this.setState({
      username: e.target.value
    });
  };

  changepassword = e => {
    this.setState({
      password: e.target.value
    });
  }

  changecnics = e => {
    this.setState({
      cnic: e.target.value
    });
  }


  changeType = e => {
    this.setState({
      type: e.target.value
    });
  }

  handleClick = () => {
    console.log(this.props.token);
    //api call to store data in database here

    
      console.log(this.state)
      var details = {
       'name': this.state.username,
       'type': this.state.type,
       'password':this.state.password,
        'cnic':this.state.cnic,
        'token':this.props.token
   };
   
  
   var formBody = [];
   for (var property in details) {
     var encodedKey = encodeURIComponent(property);
     var encodedValue = encodeURIComponent(details[property]);
     formBody.push(encodedKey + "=" + encodedValue);
   }
   formBody = formBody.join("&");
   
   fetch('/head/AddEmp', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
     },
     body: formBody
   })
   .then(res=>res.json())
   .then(res=>{
  
     console.log("we are in this function");
     if(res){
      console.log(res);
       console.log("After function");
     };
   }
   );
      //form saaf kia hai 
    this.setState({
      username:'',
      password:'',
      cnic:'',
      type:''
    })
    }


    
  
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
      <form className={classes.container} noValidate autoComplete="off"> 
      <CardContent>
      <TextField
          id="username"
          label="Username"
          value={this.state.username}
          placeholder="Enter User Name"
          className={classes.textField}
          onChange={e => this.changeuserName(e)}
          margin="normal"
          refs='name'
          
        />
        </CardContent>
        <CardContent>
        <TextField
          id="password"
          label="Password"
          value={this.state.password}
          placeholder="Enter Password"
          onChange={e => this.changepassword(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="cnic"
          label="CNIC"
          value={this.state.cnic}
          placeholder="Enter CNIC"
          onChange={e => this.changecnics(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="type"
          label="Type"
          value={this.state.type}
          placeholder="Enter Type"
          onChange={e => this.changeType(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick} >
        <AddIcon/>
        </Button>
        </CardContent>
        </form>
      </Card>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);