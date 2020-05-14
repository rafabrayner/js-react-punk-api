import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import HttpService from '../../utils/HttpService';
import Load from '../../components/load';
import Wrapper from '../../components/wrapper';
import './beerList.css';

class BeersList extends Component {
  state = {
    beers: [],
    isLoad: true,
  };

  page = 1;
  perPage = 6;
  totalBeers = 325;
  numberOfPages = Math.ceil(this.totalBeers/this.perPage);
  
  async getBeersList() {
    try {
      const data = await HttpService.get('beers' + this.getQueryParams())
      this.setState({ beers: data })
      console.log(this.state);
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        ...this.state,
        isLoad: false,
      })
    }
  }

  handleClickDetail(id) {
    this.props.history.push(`/beer/${id}`)
  }

  handlePageChange(value) {
    if(value !== this.page) {
      this.page = value;
      this.setState({
        ...this.state,
        isLoad: true,
      })
      this.getBeersList();
    }
  };
  getQueryParams() {
    return `?page=${this.page}&per_page=${this.perPage}`;
  }

  componentDidMount() {
    this.getBeersList();
  }

  render() {
    
    return (
      <>
        {this.state.isLoad ? (
          <Load />
        ) : (
            <>
              <Wrapper>
                <div className="container">
                  {this.state.beers.map(({id, image_url, name, tagline, first_brewed, description}) => (
                    <div className="m-1" key={id}>
                      <Card className="root">
                        <CardHeader
                          title={name}
                          subheader={"First Brewed " + first_brewed}
                        />
                        <CardMedia
                          className="media"
                          image={image_url ? image_url : process.env.PUBLIC_URL + '/no-image-available-icon.jpg'}
                          title={tagline}
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <Button variant="contained" color="primary" onClick={() => this.handleClickDetail(id)} >Detalhes do Produto</Button>
                        </CardActions>
                      </Card>
                    </div>
                  ))}
                  <Pagination count={this.numberOfPages} page={this.page} onChange={(event, value) => this.handlePageChange(value)} />
                </div>
              </Wrapper>
            </>
          )}
      </>
    )
  }
}

export default BeersList
