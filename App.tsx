import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SearchComponent } from './src/components/SearchComponent';
import { ResultsComponent } from './src/components/ResultsComponent';
import { BookComponent } from './src/components/BookComponent';
import { Book } from './src/model/book';

export interface Props {

}

interface State {
  term: string;
  book: Book;
  books: Book[];
  showSearch: boolean;
  showResults: boolean;
  showBook: boolean;
}
export default class App extends Component<Props, State> {
  constructor(props: Props, state: State){
    super(props);
    this.state = {
      showSearch: true,
      showResults: false,
      showBook: false,
      books: []
    } as State;
  }
  returnToSearch(): void {
    this.setState({
      showSearch: true,
      showResults: false,
      showBook: false,
      books: []
    })
  }
  goToResults(term: string): void{
    this.setState({ 
      term: term, 
      showSearch: false,
      showResults: true,
      showBook: false
    });
  }
  returnToResults(): void {
    this.setState({ 
      term: this.state.term,
      book: undefined,
      books: this.state.books, 
      showSearch: false,
      showResults: true,
      showBook: false
    });
  }
  showBook(selected: Book, books: Book[]): void {
    this.setState({
      term: this.state.term,
      book: selected,
      books: books,
      showSearch: false,
      showResults: false,
      showBook: true
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.showSearch && <SearchComponent onSearch={(term) => this.goToResults(term)}/>}
        {this.state.showResults && <ResultsComponent 
                                        term={this.state.term} 
                                        books={this.state.books} 
                                        return={() => this.returnToSearch()}
                                        goToBook={(selected: Book, books: Book[]) => this.showBook(selected, books)}
                                        />}
        {this.state.showBook && <BookComponent book={this.state.book} return={() => this.returnToResults()}/>}
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
