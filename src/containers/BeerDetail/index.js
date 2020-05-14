import React, { Component } from 'react'
import HttpService from '../../utils/HttpService'
import Load from '../../components/load'
import Wrapper from '../../components/wrapper';

class BeerDetail extends Component {

  state = {
    beer: {},
    isLoad: true,
  }

  handleClickBack() {
    this.props.history.push('/')
  }

  async getUserData() {
    try {
      const data = await HttpService.get(`beers/${this.props.match.params.beerId}`)
      this.setState({ beer: data })
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        ...this.state,
        isLoad: false
      })
    }
  }

  componentDidMount() {
    this.getUserData()
  }

  render() {
    const { beer: { id, image_url, name, tagline, first_brewed, description, ingredients }, isLoad } = this.state
    return (
      <>
        {isLoad ? (
          <Load />
        ) : (
            <>
              <Wrapper goBack={() => this.handleClickBack()}>
                <div className="container">
                  <div className="m-1">
                    
                  </div>
                </div>
              </Wrapper>
            </>
          )}
      </>
    );
  }
}

export default BeerDetail


