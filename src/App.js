import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {

  constructor(){
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: '',
    }
  };

  async componentDidMount(){
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await res.json();

    const allCountries = data.map(({ name , numericCode, flag, population}) => {
        return {
          id: numericCode,
          name,
          filterName: name.toLowerCase(),
          flag,
          population,
        }
    })
    
    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries) ,
    });



    
  }

  handleChangeFilter = (newText) =>{
     this.setState({
        filter: newText,
    });

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = this.state.allCountries.filter((country) =>{
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = filteredCountries.reduce((accumulator, current) => {
      return accumulator + current.population
    }, 0 );

    
    this.setState({
      filteredCountries,
      filteredPopulation,
    });
  }

  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;

    

    return (
      <div className="container">
        <h1>React Coutries</h1>

        <Header 
          filter={filter} 
          onChangeFilter={this.handleChangeFilter} 
          totalPopulation={filteredPopulation}
          countryCount={filteredCountries.length}
        />

        <Countries countries={filteredCountries} />

      </div>
    )
  }
}
