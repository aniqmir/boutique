import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Search from './DropDownSelect';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3F51B5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class CustomizedTable extends React.Component {
  componentDidMount(){
    var details = {
     'token':this.state.t
 };
 

 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 
 
 fetch('/admin/ShowArticles', {
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
    console.log(res.token);
     console.log("After function");
   };
 }
 );
      this.setState({
      userName:'',
      Password:'',
      type:''
    })

  }
  constructor(props){
    super(props);
    
    this.state = {
      t:this.props.token,
    }
  }
  render() {
    const { classes } = this.props;
{/*

}*/}
  return (
    <Paper className={classes.root}>
    <Search/>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell numeric>Type</CustomTableCell>
            <CustomTableCell numeric>Price</CustomTableCell>
            <CustomTableCell numeric>ID</CustomTableCell>
            <CustomTableCell numeric>Status</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*data to be replaced with json pacakage from api*/}
          {data.map(n => {
            return (
              <TableRow className={classes.row} key={n.id}>
                <CustomTableCell>{n.name}</CustomTableCell>
                <CustomTableCell numeric>{n.calories}</CustomTableCell>
                <CustomTableCell numeric>{n.fat}</CustomTableCell>
                <CustomTableCell numeric>{n.carbs}</CustomTableCell>
                <CustomTableCell numeric>{n.protein}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
  }
  

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
