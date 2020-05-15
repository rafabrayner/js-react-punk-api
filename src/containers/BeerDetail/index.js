import React, { Component } from 'react'
import HttpService from '../../utils/HttpService'
import Load from '../../components/load'
import Wrapper from '../../components/wrapper';
import './beerDetail.css'

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
      this.setState({ beer: data[0] })
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
                  <div className="productDetail">

                    <div className="productImage"  style ={ { backgroundImage: "url("+image_url+")" } }></div>
                    <h1 className="title">{name}</h1>
                    <h3 className="subtitle">{tagline}</h3>
                    <span className="firstBrewed">{"First Brewed " + first_brewed}</span>
                    <p>{description}</p>

                    <p><strong>{'INGREDIENTES'}</strong></p>

                    <div>
                      <span><strong>{'Malte'}</strong></span>
                      <ul>
                        {ingredients.malt.map(({name, amount}, index) => (
                          <li key={index}>
                            {amount.value + ' ' + amount.unit + ' of ' + name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span><strong>{'Lúpulo'}</strong></span>
                      <ul>
                        {ingredients.hops.map(({name, amount}, index) => (
                          <li key={index}>
                            {amount.value + ' ' + amount.unit + ' of ' + name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                        <span><strong>{'Levedura: ' }</strong>{ingredients.yeast}</span>
                    </div>

                    
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


