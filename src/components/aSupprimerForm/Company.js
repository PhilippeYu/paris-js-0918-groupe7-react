import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const suggestions = [
  { label: 'Allianz' },
  { label: 'Apicil' },
  { label: 'Banque Courtois' },
  { label: 'Banque Populaire' },
  { label: 'Blocs & Compagnie' },
  { label: 'Caisse d\'Epargne' },
  { label: 'Carrefour' },
  { label: 'Club Avantage' },
  { label: 'COVEA' },
  { label: 'Crédit Agricole' },
  { label: 'Crédit coopératif' },
  { label: 'Crédit du Nord' },
  { label: 'Crédit Foncier' },
  { label: 'Crédit Mutuel' },
  { label: 'DAS' },
  { label: 'E Leclerc' },
  { label: 'Euler Hermes' },
  { label: 'Finance Innovation' },
  { label: 'Generali' },
  { label: 'Groupama' },
  { label: 'Groupe Casino' },
  { label: 'HSBC' },
  { label: 'iBP' },
  { label: 'IT-CE' },
  { label: 'Klesia - Madom' },
  { label: 'Laser' },
  { label: 'Le Crédit Lyonnais' },
  { label: 'Macif' },
  { label: 'MAIF' },
  { label: 'MGEN' },
  { label: 'MMA' },
  { label: 'Natixis' },
  { label: 'Paris&Co' },
  { label: 'Swiss Life' },
];

const renderInputComponent = (inputProps) => {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

 const getSuggestions = (value) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const getSuggestionValue = (suggestion) => {
  return suggestion.label;
}

const styles = theme => ({
  container: {
    position: 'relative',
    width: 300,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 3,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class Company extends React.Component {
  state = {
    single: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search your company',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

Company.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Company);
