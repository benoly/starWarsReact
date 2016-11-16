var Person = React.createClass({
  render: function(){
    return(
      <div className = "card">
        <h3>Name: {this.props.name}</h3>
        <h5>Height: {this.props.height}</h5>
        <h5>Mass: {this.props.mass}</h5>
        <h5>Hair Color: {this.props.haircolor}</h5>
        <h5>Skin Color: {this.props.skincolor}</h5>
        <h5>Eye Color: {this.props.eyecolor}</h5>
        <h5>Birth Year: {this.props.birthyear}</h5>
        <h5>Gender: {this.props.gender}</h5>
      </div>
    )
  }
});

var Planet = React.createClass({
  render: function(){
    return(
      <div className = "card">
        <h3>Name: {this.props.name}</h3>
      </div>
    )
  }
});

var StarWarsList = React.createClass({
  render: function(){
    var PersonNodes = this.props.data.map(function(person){
      return (
        <Person
          name={person.name}
          height={person.height}
          mass={person.mass}
          haircolor={person.hair_color}
          skincolor={person.skin_color}
          eyecolor={person.eye_color}
          birthyear={person.birth_year}
          gender={person.gender}
        />
    );
  });
  var PlanetsNodes = this.props.data.map(function(planet){
    return (
      <Planet
        name={planet.name}
        rotationperiod={planet.rotation_period}
        orbitalperiod={planet.orbital_period}
        diameter={planet.diameter}
        climate={planet.climate}
        gravity={planet.gravity}
        terrain={planet.terrain}
        surfacewater={planet.surface_water}
        population={planet.population}
        />
    )
  });
    return (
      <div className="container">
        {PersonNodes}
        {PlanetsNodes}
      </div>
    );
  }
});

var StarWarsPage = React.createClass({
  loadPeopleFromServer: function(){
    $.ajax({
      method: "GET",
      url: "http://swapi.co/api/people",
      success: function(data){
        console.log(data);
        this.setState({data: data.results});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(status, err.toString());
      }.bind(this)
    })
  },

    loadPlanetsFromServer: function(){
      $.ajax({
        method: "GET",
        url: "http://swapi.co/api/planets",
        success: function(data){
          console.log(data);
          this.setState({data: data.results});
        }.bind(this),
        error: function(xhr, status, err){
          console.log(status, err.toString());
        }.bind(this)
      })
    },

  getInitialState: function(){
    return {
      data: []
    };
  },

  render: function() {
    return (
      <div>
        <button className="button" onClick={this.loadPeopleFromServer}>Get Peeps</button>
        <button className="button" onClick={this.loadPlanetsFromServer}>Get Planets</button>
        <StarWarsList data={this.state.data}/>
      </div>
    );
  }
});

ReactDOM.render(
  <StarWarsPage />,
  document.getElementById('content')
);
