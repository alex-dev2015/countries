import React, { Component } from 'react'
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

export default class Header extends Component {

  handleInputChange = (event) =>{
    const newText = event.target.value;

    this.props.onChangeFilter(newText);
  }

  render() {

    const { filter , countryCount , totalPopulation} = this.props;

    return (
      <div className={css.flexRow} >
        <input 
          style={{width: '300px', margin: '10px'}}
          type="text"
          value={filter}
          onChange={this.handleInputChange}
          placeholder="Filtro"
        /> |
        <span className={css.countries}>
            Países: <strong>{countryCount}</strong>{' '} 
        </span>{' '} |
        <span className={css.population}>População: <strong> { formatNumber(totalPopulation)} </strong>  </span> {' '}
      </div>
    )
  }
}
